import React from 'react';
import { History, RotateCcw, Trash2, CheckCircle2, XCircle } from 'lucide-react';
import type { HistoryRecord } from '../types/stack';
import { soundEngine } from '../utils/stackEngine';

interface RecentHistoryProps {
  history: HistoryRecord[];
  onReuse: (word: string) => void;
  onClearHistory: () => void;
}

export const RecentHistory: React.FC<RecentHistoryProps> = ({
  history,
  onReuse,
  onClearHistory,
}) => {
  if (history.length === 0) {
    return null;
  }

  const formatTime = (ts: number) => {
    const d = new Date(ts);
    return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  };

  return (
    <div className="history-container glass-panel">
      <div className="history-header">
        <div className="history-title-group">
          <History size={16} className="history-icon" />
          <h3 className="history-title">RECENT REVERSAL OPERATIONS (LAST 5)</h3>
          <span className="history-badge">LOCAL SESSION</span>
        </div>

        <button
          type="button"
          className="btn-clear-history"
          onClick={() => {
            soundEngine.playClick();
            onClearHistory();
          }}
          title="Clear recent history"
        >
          <Trash2 size={13} />
          <span>CLEAR HISTORY</span>
        </button>
      </div>

      <div className="history-list">
        {history.map((item) => (
          <div key={item.id} className="history-item glass-panel">
            <div className="history-item-left">
              <span className="history-time">{formatTime(item.timestamp)}</span>
              <div className="history-words">
                <span className="hist-orig" title="Original Input">
                  "{item.word}"
                </span>
                <span className="hist-arrow">➜</span>
                <span className="hist-rev" title="Reversed Output">
                  "{item.reversed}"
                </span>
              </div>
            </div>

            <div className="history-item-right">
              {item.isPalindrome ? (
                <span className="badge-pill badge-emerald hist-badge">
                  <CheckCircle2 size={12} />
                  PALINDROME
                </span>
              ) : (
                <span className="badge-pill badge-violet hist-badge">
                  <XCircle size={12} />
                  NON-PALINDROME
                </span>
              )}

              <button
                type="button"
                className="btn-reuse"
                onClick={() => {
                  soundEngine.playClick();
                  onReuse(item.word);
                }}
                title={`Reuse "${item.word}" in workspace`}
              >
                <RotateCcw size={13} />
                <span>REUSE</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
