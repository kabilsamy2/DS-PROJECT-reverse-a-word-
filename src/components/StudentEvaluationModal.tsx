import React from 'react';
import { Award, X, CheckCircle, BookOpen, User, Hash, School, Layers } from 'lucide-react';
import { soundEngine } from '../utils/stackEngine';

interface StudentEvaluationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const StudentEvaluationModal: React.FC<StudentEvaluationModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div
        className="modal-card glass-panel"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="eval-modal-title"
      >
        <div className="modal-header">
          <div className="modal-title-group">
            <Award className="modal-title-icon" size={20} />
            <h3 id="eval-modal-title" className="modal-title">
              STUDENT IDENTITY &amp; FACULTY EVALUATION
            </h3>
          </div>
          <button
            type="button"
            className="modal-close-btn"
            onClick={() => {
              soundEngine.playClick();
              onClose();
            }}
            aria-label="Close modal"
          >
            <X size={18} />
          </button>
        </div>

        <div className="modal-body">
          {/* Student Info Card */}
          <div className="student-credentials-card glass-panel">
            <div className="cred-grid">
              <div className="cred-item">
                <span className="cred-label"><User size={13} /> STUDENT NAME</span>
                <span className="cred-value highlight-cyan">KABIL SAMY KM</span>
              </div>
              <div className="cred-item">
                <span className="cred-label"><Hash size={13} /> REGISTER NUMBER</span>
                <span className="cred-value highlight-cyan">RA2511003040086</span>
              </div>
              <div className="cred-item">
                <span className="cred-label"><School size={13} /> DEPARTMENT / CLASS</span>
                <span className="cred-value">CSE - A</span>
              </div>
              <div className="cred-item">
                <span className="cred-label"><BookOpen size={13} /> PROJECT SUBJECT</span>
                <span className="cred-value">Data Structures (CS201)</span>
              </div>
              <div className="cred-item full-width">
                <span className="cred-label"><Layers size={13} /> CORE DATA STRUCTURE</span>
                <span className="cred-value">Stack — LIFO (Last In, First Out) Algorithm</span>
              </div>
            </div>
          </div>

          {/* Project Objectives & Highlights */}
          <div className="eval-checklist-box">
            <h4 className="checklist-heading">FACULTY EVALUATION CRITERIA &amp; VERIFICATION</h4>
            <ul className="eval-checklist">
              <li>
                <CheckCircle size={15} className="check-emerald" />
                <div>
                  <strong>Authentic Stack Reversal:</strong> Pushes string characters into a LIFO array buffer and pops them sequentially in O(n) time.
                </div>
              </li>
              <li>
                <CheckCircle size={15} className="check-emerald" />
                <div>
                  <strong>Dynamic Palindrome Detection:</strong> Compares normalized alphanumeric forward and backward sequences while preserving original casing in output.
                </div>
              </li>
              <li>
                <CheckCircle size={15} className="check-emerald" />
                <div>
                  <strong>Live Memory Visualization:</strong> Emulates physical stack chamber with dynamic TOP pointer, character ASCII, and step-by-step playback.
                </div>
              </li>
              <li>
                <CheckCircle size={15} className="check-emerald" />
                <div>
                  <strong>Standard C11 Source Implementation:</strong> Standalone C code using struct Stack, character array, top pointer, overflow/underflow safety. Compiles with GCC with zero warnings.
                </div>
              </li>
              <li>
                <CheckCircle size={15} className="check-emerald" />
                <div>
                  <strong>Complexity Rigor:</strong> Demonstrates O(n) Linear Time Complexity and O(n) Space Complexity.
                </div>
              </li>
            </ul>
          </div>

          <div className="modal-quote">
            <em>"Learning Data Structures, One Operation at a Time."</em>
          </div>
        </div>

        <div className="modal-footer">
          <button
            type="button"
            className="btn-primary"
            onClick={() => {
              soundEngine.playClick();
              onClose();
            }}
          >
            CONFIRM &amp; RETURN TO LAB
          </button>
        </div>
      </div>
    </div>
  );
};
