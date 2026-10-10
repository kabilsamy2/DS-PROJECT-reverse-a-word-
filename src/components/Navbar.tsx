import React from 'react';
import { Layers, Volume2, VolumeX, Moon, Sun, Info, Award } from 'lucide-react';
import { soundEngine } from '../utils/stackEngine';

interface NavbarProps {
  theme: 'dark' | 'light';
  onToggleTheme: () => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
  onOpenStudentModal: () => void;
  onOpenLifoModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  theme,
  onToggleTheme,
  soundEnabled,
  onToggleSound,
  onOpenStudentModal,
  onOpenLifoModal,
}) => {
  return (
    <header className="navbar-container">
      <div className="navbar-inner">
        {/* Brand Logo */}
        <div className="brand-group">
          <div className="brand-icon-wrapper">
            <Layers className="brand-icon" />
            <span className="brand-pulse-dot"></span>
          </div>
          <div>
            <div className="brand-title">
              STACK<span className="brand-highlight">LAB</span>
            </div>
            <div className="brand-tagline">Reverse & Discover • LIFO Engine</div>
          </div>
        </div>

        {/* Center Pill: Course context */}
        <div className="header-course-badge">
          <span className="badge-pill">
            <span className="indicator-dot"></span>
            DATA STRUCTURES • STACK • C
          </span>
        </div>

        {/* Right Controls */}
        <div className="header-actions">
          {/* Student Evaluation Quick Badge */}
          <button
            type="button"
            className="student-quick-btn"
            onClick={onOpenStudentModal}
            title="Click to view Project & Student Evaluation details"
            aria-label="View Student Details"
          >
            <Award size={16} className="student-badge-icon" />
            <span className="student-name">KABIL SAMY KM</span>
            <span className="student-reg">RA2511003040086</span>
            <span className="student-class">CSE - A</span>
          </button>

          {/* LIFO Info Modal Button */}
          <button
            type="button"
            className="btn-icon"
            onClick={onOpenLifoModal}
            title="What is LIFO? (Educational Guide)"
            aria-label="Explain LIFO"
          >
            <Info size={17} />
          </button>

          {/* Sound FX Toggle */}
          <button
            type="button"
            className="btn-icon"
            onClick={() => {
              onToggleSound();
              if (!soundEnabled) {
                soundEngine.playClick();
              }
            }}
            title={soundEnabled ? 'Mute Audio Effects' : 'Enable Audio Effects'}
            aria-label="Toggle Sound"
          >
            {soundEnabled ? <Volume2 size={17} /> : <VolumeX size={17} />}
          </button>

          {/* Theme Toggle */}
          <button
            type="button"
            className="btn-icon"
            onClick={onToggleTheme}
            title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            aria-label="Toggle Theme"
          >
            {theme === 'dark' ? <Sun size={17} /> : <Moon size={17} />}
          </button>
        </div>
      </div>
    </header>
  );
};
