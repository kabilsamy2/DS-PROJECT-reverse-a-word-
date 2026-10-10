import React, { useState, useEffect, useRef } from 'react';
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  RotateCcw,
  Gauge,
  Layers,
  ArrowDown,
  ArrowUp,
  Terminal,
} from 'lucide-react';
import type { StackStep } from '../types/stack';
import { soundEngine } from '../utils/stackEngine';

interface LiveStackVisualizerProps {
  steps: StackStep[];
  originalWord: string;
}

type SpeedOption = 0.5 | 1 | 1.5 | 2;

export const LiveStackVisualizer: React.FC<LiveStackVisualizerProps> = ({
  steps,
  originalWord,
}) => {
  const [currentStepIdx, setCurrentStepIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState<SpeedOption>(1);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Reset to initial step when steps change (new word entered)
  useEffect(() => {
    setCurrentStepIdx(0);
    setIsPlaying(false);
  }, [steps]);

  const currentStep: StackStep | undefined = steps[currentStepIdx] || steps[0];

  // Sound triggering when step index changes
  const triggerStepSound = (step: StackStep) => {
    if (!step) return;
    if (step.type === 'PUSH') {
      soundEngine.playPush();
    } else if (step.type === 'POP') {
      soundEngine.playPop();
    } else if (step.type === 'DONE') {
      soundEngine.playSuccess();
    }
  };

  // Auto-play loop
  useEffect(() => {
    if (!isPlaying) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    const intervalMap: Record<SpeedOption, number> = {
      0.5: 1400,
      1: 850,
      1.5: 550,
      2: 320,
    };

    timerRef.current = setInterval(() => {
      setCurrentStepIdx((prevIdx) => {
        if (prevIdx >= steps.length - 1) {
          setIsPlaying(false);
          return prevIdx;
        }
        const nextIdx = prevIdx + 1;
        triggerStepSound(steps[nextIdx]);
        return nextIdx;
      });
    }, intervalMap[speed]);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, speed, steps]);

  const handleNextStep = () => {
    if (currentStepIdx < steps.length - 1) {
      const nextIdx = currentStepIdx + 1;
      setCurrentStepIdx(nextIdx);
      triggerStepSound(steps[nextIdx]);
    }
  };

  const handlePrevStep = () => {
    if (currentStepIdx > 0) {
      const prevIdx = currentStepIdx - 1;
      setCurrentStepIdx(prevIdx);
      soundEngine.playClick();
    }
  };

  const handleTogglePlay = () => {
    soundEngine.playClick();
    if (currentStepIdx >= steps.length - 1) {
      // Loop from beginning if already at end
      setCurrentStepIdx(0);
      setIsPlaying(true);
    } else {
      setIsPlaying((prev) => !prev);
    }
  };

  const handleReset = () => {
    soundEngine.playClick();
    setIsPlaying(false);
    setCurrentStepIdx(0);
  };

  if (!steps || steps.length === 0) {
    return (
      <div className="visualizer-empty glass-panel">
        <Layers size={36} className="empty-icon" />
        <h3>Visualizer Ready</h3>
        <p>Enter a word above to see the step-by-step stack reversal animation.</p>
      </div>
    );
  }

  // Calculate stack capacity to render empty slots up to max(originalWord.length, 6)
  const displayCapacity = Math.max(originalWord.length, 5);
  const slots = Array.from({ length: displayCapacity }, (_, i) => displayCapacity - 1 - i);

  return (
    <div className="visualizer-container glass-panel">
      {/* Visualizer Top Bar */}
      <div className="visualizer-top-bar">
        <div className="visualizer-heading-group">
          <span className="section-dot"></span>
          <h2 className="visualizer-title">LIVE STACK VISUALIZATION</h2>
          <span className="badge-pill">C RUNTIME EMULATOR</span>
        </div>

        <div className="visualizer-meta-group">
          {/* Step Counter Badge */}
          <div className="step-counter-badge">
            <span className="step-label">STEP</span>
            <span className="step-val">{currentStep ? currentStep.stepNumber : 0}</span>
            <span className="step-sep">/</span>
            <span className="step-total">{steps.length - 1}</span>
          </div>

          {/* Speed Selector */}
          <div className="speed-selector-group">
            <Gauge size={14} className="speed-icon" />
            <span className="speed-label">SPEED:</span>
            {([0.5, 1, 1.5, 2] as SpeedOption[]).map((s) => (
              <button
                key={s}
                type="button"
                className={`speed-pill ${speed === s ? 'active' : ''}`}
                onClick={() => setSpeed(s)}
              >
                {s}x
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Progress Track */}
      <div className="progress-bar-track">
        <div
          className="progress-bar-fill"
          style={{ width: `${(currentStepIdx / (steps.length - 1)) * 100}%` }}
        ></div>
      </div>

      {/* Main Multi-Stage Pipeline Visualization */}
      <div className="pipeline-grid">
        {/* Stage 1: Input String Buffer */}
        <div className="pipeline-card glass-panel">
          <div className="pipeline-header">
            <span className="pipeline-tag">1. INPUT STRING BUFFER</span>
            <span className="pipeline-status">
              {currentStep.type === 'PUSH' ? 'SCANNING CHAR' : 'READ COMPLETE'}
            </span>
          </div>

          <div className="buffer-ribbon">
            {Array.from(originalWord).map((c, i) => {
              const isCurrentlyScanned =
                currentStep.type === 'PUSH' && currentStep.charIndex === i;
              const isAlreadyPushed = i < currentStep.inputScannedIndex;

              return (
                <div
                  key={i}
                  className={`buffer-cell ${isCurrentlyScanned ? 'active-scan' : ''} ${
                    isAlreadyPushed ? 'passed' : ''
                  }`}
                >
                  <span className="buffer-char">{c === ' ' ? '␣' : c}</span>
                  <span className="buffer-idx">[{i}]</span>
                  {isCurrentlyScanned && <span className="scan-arrow">▼ PUSH</span>}
                </div>
              );
            })}
          </div>
          <div className="buffer-caption">
            Characters read sequentially from left to right (index 0 to n-1).
          </div>
        </div>

        {/* Stage 2: The Physical Stack Chamber */}
        <div className="stack-chamber-container glass-panel glass-panel-glow">
          <div className="chamber-header">
            <div className="chamber-title-row">
              <Layers size={16} className="chamber-icon" />
              <span className="chamber-title">STACK MEMORY CHAMBER</span>
            </div>
            <div className="chamber-top-badge">
              <span className="top-indicator-text">
                TOP = {currentStep.topIndex >= 0 ? currentStep.topIndex : '-1 (EMPTY)'}
              </span>
            </div>
          </div>

          {/* Chamber Aperture / Entrance */}
          <div className="chamber-aperture">
            <div className="aperture-glow"></div>
            <span className="aperture-text">
              {currentStep.type === 'PUSH' && (
                <span className="op-enter push-enter">
                  <ArrowDown size={14} /> PUSHING '{currentStep.char}' INTO STACK
                </span>
              )}
              {currentStep.type === 'POP' && (
                <span className="op-enter pop-enter">
                  <ArrowUp size={14} /> POPPING '{currentStep.char}' OUT OF STACK (LIFO)
                </span>
              )}
              {currentStep.type === 'IDLE' && 'STACK READY (EMPTY)'}
              {currentStep.type === 'DONE' && 'REVERSAL FINISHED • STACK CLEARED'}
            </span>
          </div>

          {/* Vertical Stack Column */}
          <div className="stack-column-tube">
            {slots.map((slotIndex) => {
              const stackItem = currentStep.stackSnapshot[slotIndex];
              const isOccupied = Boolean(stackItem);
              const isTop = slotIndex === currentStep.topIndex;

              return (
                <div
                  key={slotIndex}
                  className={`stack-memory-slot ${isOccupied ? 'slot-occupied' : 'slot-free'} ${
                    isTop ? 'slot-is-top' : ''
                  }`}
                >
                  {/* Left Slot Index */}
                  <div className="slot-index-pill">
                    <span>idx [{slotIndex}]</span>
                  </div>

                  {/* Stack Block */}
                  {isOccupied ? (
                    <div className="stack-block-content animate-stack-in">
                      <div className="block-main">
                        <span className="block-letter">{stackItem.char === ' ' ? '␣' : stackItem.char}</span>
                        <span className="block-meta">ASCII: {stackItem.ascii}</span>
                      </div>
                      <span className="block-order-tag">
                        pushed #{stackItem.index + 1}
                      </span>
                    </div>
                  ) : (
                    <div className="slot-empty-placeholder">
                      <span className="empty-text">NULL (FREE MEMORY)</span>
                    </div>
                  )}

                  {/* Right TOP Pointer Arrow */}
                  <div className="slot-top-pointer">
                    {isTop && (
                      <div className="top-badge-callout">
                        <span className="arrow-callout">◀</span>
                        <span className="top-callout-text">TOP ({slotIndex})</span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}

            {/* Stack Base Anchor */}
            <div className="stack-chamber-bottom">
              <span className="base-grid"></span>
              <span className="base-label">STACK BOTTOM [INDEX 0] • LIFO ANCHOR</span>
            </div>
          </div>

          <div className="chamber-footer-stats">
            <span>Size: {currentStep.stackSnapshot.length} items</span>
            <span>•</span>
            <span>Capacity: {displayCapacity} slots</span>
            <span>•</span>
            <span>LIFO: Last In, First Out</span>
          </div>
        </div>

        {/* Stage 3: Reversed Output Buffer */}
        <div className="pipeline-card glass-panel">
          <div className="pipeline-header">
            <span className="pipeline-tag-cyan">3. REVERSED OUTPUT BUFFER</span>
            <span className="pipeline-status">
              {currentStep.reversedSoFar.length} / {originalWord.length} CHARACTERS POPPED
            </span>
          </div>

          <div className="buffer-ribbon">
            {Array.from(originalWord).map((_, i) => {
              const poppedChar = currentStep.reversedSoFar[i];
              const isJustPopped =
                currentStep.type === 'POP' && i === currentStep.reversedSoFar.length - 1;

              return (
                <div
                  key={i}
                  className={`buffer-cell reversed-cell ${poppedChar ? 'filled' : 'empty'} ${
                    isJustPopped ? 'just-received' : ''
                  }`}
                >
                  <span className="buffer-char">
                    {poppedChar !== undefined ? (poppedChar === ' ' ? '␣' : poppedChar) : '—'}
                  </span>
                  <span className="buffer-idx">[{i}]</span>
                  {isJustPopped && <span className="received-badge">NEW</span>}
                </div>
              );
            })}
          </div>

          <div className="buffer-caption">
            Characters appended in the exact order popped from the stack.
          </div>
        </div>
      </div>

      {/* Control Buttons Bar */}
      <div className="controls-bar glass-panel">
        <div className="controls-button-group">
          {/* Reset */}
          <button
            type="button"
            className="btn-secondary btn-control"
            onClick={handleReset}
            title="Reset to Step 0"
          >
            <RotateCcw size={16} />
            <span>RESET</span>
          </button>

          {/* Previous Step */}
          <button
            type="button"
            className="btn-secondary btn-control"
            onClick={handlePrevStep}
            disabled={currentStepIdx === 0}
            title="Step backward"
          >
            <SkipBack size={16} />
            <span>PREV</span>
          </button>

          {/* Play / Pause */}
          <button
            type="button"
            className="btn-primary btn-play-pause"
            onClick={handleTogglePlay}
            title={isPlaying ? 'Pause animation' : 'Play animation'}
          >
            {isPlaying ? <Pause size={18} /> : <Play size={18} />}
            <span>{isPlaying ? 'PAUSE' : 'PLAY ANIMATION'}</span>
          </button>

          {/* Next Step */}
          <button
            type="button"
            className="btn-secondary btn-control"
            onClick={handleNextStep}
            disabled={currentStepIdx >= steps.length - 1}
            title="Step forward"
          >
            <span>NEXT</span>
            <SkipForward size={16} />
          </button>
        </div>

        {/* Step Scrubber */}
        <div className="scrubber-wrapper">
          <input
            type="range"
            min={0}
            max={steps.length - 1}
            value={currentStepIdx}
            onChange={(e) => {
              const val = Number(e.target.value);
              setCurrentStepIdx(val);
              triggerStepSound(steps[val]);
            }}
            className="step-slider"
            aria-label="Step slider"
          />
        </div>
      </div>

      {/* Algorithmic Execution Status Card */}
      <div className="execution-console glass-panel">
        <div className="console-header">
          <div className="console-title-group">
            <Terminal size={14} className="console-icon" />
            <span className="console-title">C RUNTIME LOG &amp; EXPLANATION</span>
          </div>
          <span className="console-op-pill">
            OP: {currentStep.type}
          </span>
        </div>

        <div className="console-body">
          <div className="console-description">
            <span className="console-arrow">➜</span>
            <span className="console-desc-text">{currentStep.description}</span>
          </div>

          <div className="console-code-snippet">
            <span className="code-lang-tag">C11</span>
            <code className="console-code">{currentStep.codeSnippet}</code>
          </div>
        </div>
      </div>
    </div>
  );
};
