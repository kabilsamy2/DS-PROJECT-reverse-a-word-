import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { WordWorkspace } from './components/WordWorkspace';
import { LiveStackVisualizer } from './components/LiveStackVisualizer';
import { ResultInsightsCard } from './components/ResultInsightsCard';
import { AlgorithmCodePanel } from './components/AlgorithmCodePanel';
import { RecentHistory } from './components/RecentHistory';
import { StudentEvaluationModal } from './components/StudentEvaluationModal';
import { LifoGuideModal } from './components/LifoGuideModal';
import { Footer } from './components/Footer';
import {
  analyzePalindrome,
  generateStackSteps,
  soundEngine,
} from './utils/stackEngine';
import type { HistoryRecord } from './types/stack';
import './App.css';

export const App: React.FC = () => {
  // Theme state
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    return (localStorage.getItem('stacklab_theme') as 'dark' | 'light') || 'dark';
  });

  // Sound FX state
  const [soundEnabled, setSoundEnabled] = useState<boolean>(() => {
    const saved = localStorage.getItem('stacklab_sound');
    return saved !== null ? saved === 'true' : true;
  });

  // Workspace input & options
  const [currentInput, setCurrentInput] = useState<string>('HELLO');
  const [activeWord, setActiveWord] = useState<string>('HELLO');
  const [caseSensitive, setCaseSensitive] = useState<boolean>(false);

  // History state (last 5 operations)
  const [history, setHistory] = useState<HistoryRecord[]>(() => {
    try {
      const saved = localStorage.getItem('stacklab_history');
      if (saved) return JSON.parse(saved);
    } catch {
      // Ignore
    }
    return [
      {
        id: 'init-1',
        word: 'LEVEL',
        reversed: 'LEVEL',
        isPalindrome: true,
        timestamp: Date.now() - 360000,
      },
      {
        id: 'init-2',
        word: 'RADAR',
        reversed: 'RADAR',
        isPalindrome: true,
        timestamp: Date.now() - 240000,
      },
      {
        id: 'init-3',
        word: 'HELLO',
        reversed: 'OLLEH',
        isPalindrome: false,
        timestamp: Date.now() - 60000,
      },
    ];
  });

  // Modals state
  const [isStudentModalOpen, setIsStudentModalOpen] = useState(false);
  const [isLifoModalOpen, setIsLifoModalOpen] = useState(false);

  // Update theme attribute on root
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('stacklab_theme', theme);
  }, [theme]);

  // Sync sound engine
  useEffect(() => {
    soundEngine.enabled = soundEnabled;
    localStorage.setItem('stacklab_sound', String(soundEnabled));
  }, [soundEnabled]);

  // Sync history to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('stacklab_history', JSON.stringify(history));
    } catch {
      // Ignore storage errors
    }
  }, [history]);

  // Compute Palindrome Analysis
  const analysis = useMemo(() => {
    return analyzePalindrome(activeWord, caseSensitive);
  }, [activeWord, caseSensitive]);

  // Compute Algorithmic Simulation Steps
  const stackSteps = useMemo(() => {
    return generateStackSteps(activeWord);
  }, [activeWord]);

  // Execute word reversal
  const handleExecuteReversal = useCallback((word: string) => {
    const trimmed = word.trim();
    if (!trimmed) return;

    setActiveWord(word);

    // Save to history (keep top 5)
    const result = analyzePalindrome(word, caseSensitive);
    const newRecord: HistoryRecord = {
      id: `hist-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      word,
      reversed: result.reversed,
      isPalindrome: result.isPalindrome,
      timestamp: Date.now(),
    };

    setHistory((prev) => {
      // Avoid duplicate consecutive entries
      const filtered = prev.filter((item) => item.word.toLowerCase() !== word.toLowerCase());
      return [newRecord, ...filtered].slice(0, 5);
    });
  }, [caseSensitive]);

  // Clear workspace
  const handleClear = useCallback(() => {
    soundEngine.playClick();
    setCurrentInput('');
    setActiveWord('');
  }, []);

  // Reuse history entry
  const handleReuseHistory = useCallback((word: string) => {
    setCurrentInput(word);
    handleExecuteReversal(word);
  }, [handleExecuteReversal]);

  // Clear all history
  const handleClearHistory = useCallback(() => {
    setHistory([]);
    try {
      localStorage.removeItem('stacklab_history');
    } catch {
      // Ignore
    }
  }, []);

  return (
    <div className="app-root">
      <div className="grid-overlay" aria-hidden="true"></div>

      {/* Top Navigation */}
      <Navbar
        theme={theme}
        onToggleTheme={() => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))}
        soundEnabled={soundEnabled}
        onToggleSound={() => setSoundEnabled((s) => !s)}
        onOpenStudentModal={() => setIsStudentModalOpen(true)}
        onOpenLifoModal={() => setIsLifoModalOpen(true)}
      />

      {/* Main Application Container */}
      <main className="app-container">
        {/* Hero Section */}
        <HeroSection />

        {/* Word Reversal Interactive Workspace */}
        <WordWorkspace
          currentInput={currentInput}
          onInputChange={setCurrentInput}
          onExecuteReversal={handleExecuteReversal}
          onClear={handleClear}
          analysis={analysis}
          caseSensitive={caseSensitive}
          onToggleCaseSensitive={() => {
            soundEngine.playClick();
            setCaseSensitive((prev) => !prev);
          }}
        />

        {/* Live Stack Interactive Visualizer */}
        <LiveStackVisualizer
          steps={stackSteps}
          originalWord={activeWord}
        />

        {/* Recent History of Reversals */}
        <RecentHistory
          history={history}
          onReuse={handleReuseHistory}
          onClearHistory={handleClearHistory}
        />

        {/* Algorithm Breakdown & C Source Code Panel */}
        <AlgorithmCodePanel />
      </main>

      {/* Floating Bottom-Right Result Insights Card */}
      <ResultInsightsCard analysis={analysis} />

      {/* Modals */}
      <StudentEvaluationModal
        isOpen={isStudentModalOpen}
        onClose={() => setIsStudentModalOpen(false)}
      />

      <LifoGuideModal
        isOpen={isLifoModalOpen}
        onClose={() => setIsLifoModalOpen(false)}
      />

      {/* Comprehensive Academic Footer */}
      <Footer onOpenStudentModal={() => setIsStudentModalOpen(true)} />
    </div>
  );
};

export default App;
