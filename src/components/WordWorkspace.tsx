import React, { useState, useEffect, useRef } from 'react';
import {
  RotateCcw,
  Sparkles,
  Trash2,
  CheckCircle2,
  XCircle,
  Copy,
  Check,
  AlertTriangle,
  ToggleLeft,
  ToggleRight,
  ArrowRight,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import type { PalindromeAnalysis } from '../types/stack';
import { soundEngine } from '../utils/stackEngine';

interface WordWorkspaceProps {
  currentInput: string;
  onInputChange: (val: string) => void;
  onExecuteReversal: (word: string) => void;
  onClear: () => void;
  analysis: PalindromeAnalysis;
  caseSensitive: boolean;
  onToggleCaseSensitive: () => void;
}

const PRESETS = [
  'LEVEL',
  'HELLO',
  'MADAM',
  'RADAR',
  'STACK',
  'RaceCar',
  'A man, a plan, a canal: Panama',
];

export const WordWorkspace: React.FC<WordWorkspaceProps> = ({
  currentInput,
  onInputChange,
  onExecuteReversal,
  onClear,
  analysis,
  caseSensitive,
  onToggleCaseSensitive,
}) => {
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [copiedOriginal, setCopiedOriginal] = useState(false);
  const [copiedReversed, setCopiedReversed] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const [presetIndex, setPresetIndex] = useState(0);

  // Trigger celebration confetti when palindrome is detected
  useEffect(() => {
    if (analysis.isPalindrome && analysis.charCount > 0) {
      soundEngine.playSuccess();
      try {
        confetti({
          particleCount: 40,
          spread: 60,
          origin: { y: 0.75 },
          colors: ['#00f2fe', '#10b981', '#a855f7'],
          disableForReducedMotion: true,
        });
      } catch {
        // Safe fallback
      }
    }
  }, [analysis.isPalindrome, analysis.original, analysis.charCount]);

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const trimmed = currentInput.trim();
    if (!trimmed) {
      setErrorMsg('Input cannot be empty. Please enter at least one character to reverse.');
      if (inputRef.current) inputRef.current.focus();
      return;
    }
    if (trimmed.length > 80) {
      setErrorMsg('Input exceeds maximum safe stack limit (80 characters). Please enter a shorter word.');
      return;
    }
    setErrorMsg(null);
    soundEngine.playClick();
    onExecuteReversal(currentInput);
  };

  const handleTryExample = () => {
    const nextPreset = PRESETS[presetIndex % PRESETS.length];
    setPresetIndex((prev) => prev + 1);
    onInputChange(nextPreset);
    setErrorMsg(null);
    soundEngine.playClick();
    onExecuteReversal(nextPreset);
  };

  const handlePresetClick = (preset: string) => {
    onInputChange(preset);
    setErrorMsg(null);
    soundEngine.playClick();
    onExecuteReversal(preset);
  };

  const copyToClipboard = (text: string, isOriginal: boolean) => {
    if (!text) return;
    navigator.clipboard.writeText(text).then(() => {
      if (isOriginal) {
        setCopiedOriginal(true);
        setTimeout(() => setCopiedOriginal(false), 2000);
      } else {
        setCopiedReversed(true);
        setTimeout(() => setCopiedReversed(false), 2000);
      }
    });
  };

  return (
    <div className="workspace-container glass-panel">
      {/* Workspace Header */}
      <div className="workspace-header">
        <div className="header-left">
          <span className="section-dot"></span>
          <h2 className="workspace-title">WORD REVERSAL WORKSPACE</h2>
          <span className="badge-pill">INTERACTIVE LIFO ENGINE</span>
        </div>

        {/* Case sensitivity toggle */}
        <div className="case-toggle-wrapper">
          <button
            type="button"
            className="case-toggle-btn"
            onClick={onToggleCaseSensitive}
            title={caseSensitive ? 'Mode: Exact Case-Sensitive match' : 'Mode: Case-Insensitive (ignores case & punctuation)'}
          >
            {caseSensitive ? (
              <ToggleRight className="toggle-icon active" size={22} />
            ) : (
              <ToggleLeft className="toggle-icon inactive" size={22} />
            )}
            <span className="case-toggle-text">
              {caseSensitive ? 'Strict Case-Sensitive' : 'Ignore Case & Punctuation'}
            </span>
          </button>
        </div>
      </div>

      {/* Main Input Form */}
      <form onSubmit={handleSubmit} className="workspace-form">
        <div className="input-group-wrapper">
          <div className="input-box-relative">
            <input
              ref={inputRef}
              type="text"
              id="word-input"
              value={currentInput}
              onChange={(e) => {
                onInputChange(e.target.value);
                if (errorMsg) setErrorMsg(null);
              }}
              placeholder="Enter a word to reverse..."
              className="terminal-input"
              maxLength={80}
              autoComplete="off"
              spellCheck="false"
            />
            <span className="input-counter">{currentInput.length} / 80</span>
          </div>

          <div className="btn-actions-row">
            <button
              type="submit"
              className="btn-primary"
              id="reverse-btn"
              title="Reverse word using stack algorithm (Enter)"
            >
              <RotateCcw size={16} />
              <span>REVERSE WORD</span>
            </button>

            <button
              type="button"
              className="btn-secondary"
              id="clear-btn"
              onClick={onClear}
              title="Clear input and reset results"
            >
              <Trash2 size={16} />
              <span>CLEAR</span>
            </button>

            <button
              type="button"
              className="btn-secondary btn-example"
              id="example-btn"
              onClick={handleTryExample}
              title="Cycle through standard test cases"
            >
              <Sparkles size={16} />
              <span>TRY EXAMPLE</span>
            </button>
          </div>
        </div>

        {/* Error Validation Alert */}
        {errorMsg && (
          <div className="input-error-alert" role="alert">
            <AlertTriangle size={16} className="error-icon" />
            <span>{errorMsg}</span>
          </div>
        )}
      </form>

      {/* Presets Chips Bar */}
      <div className="presets-bar">
        <span className="presets-label">QUICK PRESETS:</span>
        <div className="preset-chips">
          {PRESETS.map((p) => (
            <button
              key={p}
              type="button"
              className={`preset-chip ${currentInput === p ? 'active' : ''}`}
              onClick={() => handlePresetClick(p)}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      {/* Result Cards Display (Original vs Reversed) */}
      {analysis.original && (
        <div className="results-display-grid">
          {/* Original Word Card */}
          <div className="result-card glass-panel">
            <div className="result-card-header">
              <span className="result-label">ORIGINAL WORD</span>
              <button
                type="button"
                className="btn-mini-copy"
                onClick={() => copyToClipboard(analysis.original, true)}
                title="Copy original word"
              >
                {copiedOriginal ? <Check size={13} /> : <Copy size={13} />}
                <span>{copiedOriginal ? 'COPIED' : 'COPY'}</span>
              </button>
            </div>
            <div className="result-value-box">
              <span className="result-text">{analysis.original}</span>
            </div>
            <div className="char-pills-row">
              {Array.from(analysis.original).map((c, i) => (
                <span key={i} className="char-pill" title={`Index ${i}: ASCII ${c.charCodeAt(0)}`}>
                  {c === ' ' ? '␣' : c}
                  <span className="pill-idx">{i}</span>
                </span>
              ))}
            </div>
          </div>

          {/* Transformation Arrow */}
          <div className="reversal-arrow-center">
            <div className="arrow-circle">
              <ArrowRight size={20} />
            </div>
            <span className="arrow-caption">LIFO REVERSED</span>
          </div>

          {/* Reversed Word Card */}
          <div className="result-card glass-panel glass-panel-glow">
            <div className="result-card-header">
              <span className="result-label-cyan">REVERSED WORD (STACK OUTPUT)</span>
              <button
                type="button"
                className="btn-mini-copy"
                onClick={() => copyToClipboard(analysis.reversed, false)}
                title="Copy reversed word"
              >
                {copiedReversed ? <Check size={13} /> : <Copy size={13} />}
                <span>{copiedReversed ? 'COPIED' : 'COPY'}</span>
              </button>
            </div>
            <div className="result-value-box">
              <span className="result-text cyan-glow">{analysis.reversed}</span>
            </div>
            <div className="char-pills-row">
              {Array.from(analysis.reversed).map((c, i) => (
                <span key={i} className="char-pill reversed-pill" title={`Index ${i}: ASCII ${c.charCodeAt(0)}`}>
                  {c === ' ' ? '␣' : c}
                  <span className="pill-idx">{i}</span>
                </span>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Palindrome Detection Banner */}
      {analysis.original && (
        <div className={`palindrome-banner ${analysis.isPalindrome ? 'is-palindrome' : 'not-palindrome'}`}>
          <div className="palindrome-status-row">
            <div className="palindrome-badge-wrapper">
              {analysis.isPalindrome ? (
                <span className="badge-pill badge-emerald palindrome-main-badge">
                  <CheckCircle2 size={16} />
                  PALINDROME DETECTED
                </span>
              ) : (
                <span className="badge-pill badge-rose palindrome-main-badge">
                  <XCircle size={16} />
                  NOT A PALINDROME
                </span>
              )}
            </div>

            <p className="palindrome-explanation">
              {analysis.explanation}
            </p>
          </div>

          {/* Normalized Comparison Ribbon if punctuation/spaces exist */}
          {!caseSensitive && analysis.normalizedOriginal !== analysis.original && (
            <div className="normalized-comparison">
              <span className="norm-label">NORMALIZED COMPARISON:</span>
              <code className="norm-code">Forward: "{analysis.normalizedOriginal}"</code>
              <span className="norm-vs">==</span>
              <code className="norm-code">Backward: "{analysis.normalizedReversed}"</code>
              <span className={`norm-match ${analysis.isPalindrome ? 'match-yes' : 'match-no'}`}>
                {analysis.isPalindrome ? '(MATCH)' : '(MISMATCH)'}
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
