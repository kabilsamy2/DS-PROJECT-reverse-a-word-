import React, { useState } from 'react';
import {
  Activity,
  Minimize2,
  Maximize2,
  Sparkles,
} from 'lucide-react';
import type { PalindromeAnalysis } from '../types/stack';

interface ResultInsightsCardProps {
  analysis: PalindromeAnalysis;
}

export const ResultInsightsCard: React.FC<ResultInsightsCardProps> = ({ analysis }) => {
  const [isMinimized, setIsMinimized] = useState(false);

  if (!analysis.original) {
    return null;
  }

  return (
    <div
      className={`insights-floating-card glass-panel ${
        analysis.isPalindrome ? 'border-emerald' : 'border-violet'
      } ${isMinimized ? 'is-minimized' : ''}`}
      id="result-insights-card"
    >
      {/* Card Header */}
      <div className="insights-header">
        <div className="insights-title-group">
          <Activity size={16} className="insights-icon" />
          <span className="insights-title">RESULT INSIGHTS</span>
        </div>

        <div className="insights-header-actions">
          <span
            className={`insights-status-chip ${
              analysis.isPalindrome ? 'chip-palindrome' : 'chip-not-palindrome'
            }`}
          >
            {analysis.isPalindrome ? 'PALINDROME' : 'NON-PALINDROME'}
          </span>

          <button
            type="button"
            className="btn-minimize"
            onClick={() => setIsMinimized((prev) => !prev)}
            title={isMinimized ? 'Expand Result Insights' : 'Minimize Result Insights'}
            aria-label="Toggle Insights Card"
          >
            {isMinimized ? <Maximize2 size={13} /> : <Minimize2 size={13} />}
          </button>
        </div>
      </div>

      {/* Card Content (if not minimized) */}
      {!isMinimized && (
        <div className="insights-body">
          {/* Natural Language Explanation Box */}
          <div className="insights-explanation-box">
            <Sparkles size={14} className="explanation-sparkle" />
            <p className="explanation-text">{analysis.explanation}</p>
          </div>

          {/* Quick Metrics Grid */}
          <div className="insights-metrics-grid">
            <div className="metric-cell">
              <span className="metric-label">ORIGINAL</span>
              <span className="metric-value truncate">{analysis.original}</span>
            </div>

            <div className="metric-cell">
              <span className="metric-label">REVERSED</span>
              <span className="metric-value truncate cyan-text">{analysis.reversed}</span>
            </div>

            <div className="metric-cell">
              <span className="metric-label">CHARS PROCESSED</span>
              <span className="metric-value font-mono">{analysis.charCount}</span>
            </div>

            <div className="metric-cell">
              <span className="metric-label">PUSH / POP OPS</span>
              <span className="metric-value font-mono">
                {analysis.pushCount} push / {analysis.popCount} pop
              </span>
            </div>

            <div className="metric-cell">
              <span className="metric-label">TIME COMPLEXITY</span>
              <span className="metric-value font-mono text-cyan">O(n)</span>
            </div>

            <div className="metric-cell">
              <span className="metric-label">PALINDROME STATUS</span>
              <span
                className={`metric-value font-semibold ${
                  analysis.isPalindrome ? 'text-emerald' : 'text-rose'
                }`}
              >
                {analysis.isPalindrome ? '✓ DETECTED' : '✗ NOT MATCHED'}
              </span>
            </div>
          </div>

          <div className="insights-footer-note">
            <span>Student: KABIL SAMY KM (RA2511003040086) • CSE - A</span>
          </div>
        </div>
      )}
    </div>
  );
};
