import React from 'react';
import { Layers, Award, ChevronUp } from 'lucide-react';

interface FooterProps {
  onOpenStudentModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenStudentModal }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="footer-container">
      <div className="footer-inner">
        {/* Main Footer Info Grid */}
        <div className="footer-grid">
          {/* Column 1: Project Identity */}
          <div className="footer-col">
            <div className="footer-brand">
              <Layers className="footer-brand-icon" size={20} />
              <span className="footer-brand-title">STACK LAB</span>
            </div>
            <p className="footer-tagline">
              DS PROJECT | STACK DATA STRUCTURE
            </p>
            <p className="footer-mission">
              "Learning Data Structures, One Operation at a Time."
            </p>
          </div>

          {/* Column 2: Student Credentials Card */}
          <div className="footer-col">
            <div className="footer-student-box glass-panel" onClick={onOpenStudentModal}>
              <div className="student-box-header">
                <Award size={16} className="text-cyan" />
                <span className="student-box-title">PROJECT DEVELOPER</span>
              </div>
              <div className="student-box-details">
                <div className="detail-row">
                  <span className="d-label">Developed by:</span>
                  <span className="d-val font-semibold highlight-cyan">KABIL SAMY KM</span>
                </div>
                <div className="detail-row">
                  <span className="d-label">Registration Number:</span>
                  <span className="d-val font-mono">RA2511003040086</span>
                </div>
                <div className="detail-row">
                  <span className="d-label">Class:</span>
                  <span className="d-val">CSE - A</span>
                </div>
                <div className="detail-row">
                  <span className="d-label">Subject:</span>
                  <span className="d-val">Data Structures (CS201)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Column 3: Tech Stack & LIFO Specs */}
          <div className="footer-col">
            <div className="footer-specs">
              <span className="specs-title">TECHNICAL SPECIFICATIONS</span>
              <ul className="specs-list">
                <li>• Architecture: C11 Stack Implementation &amp; React Virtualizer</li>
                <li>• Data Structure: Array-based Stack (LIFO Principle)</li>
                <li>• Operations: PUSH, POP, PEEK, IS_FULL, IS_EMPTY</li>
                <li>• Complexity: Time O(n), Space O(n)</li>
                <li>• Palindrome: Case-preserving &amp; Alphanumeric Normalized</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Footer Bottom Bar */}
        <div className="footer-bottom-bar">
          <div className="bottom-left">
            <span>© 2026 STACK LAB • Academic Project Portfolio</span>
            <span className="sep">•</span>
            <span>KABIL SAMY KM (RA2511003040086) • CSE - A</span>
          </div>

          <button
            type="button"
            className="btn-scroll-top"
            onClick={scrollToTop}
            title="Scroll to top of page"
            aria-label="Scroll to top"
          >
            <span>BACK TO TOP</span>
            <ChevronUp size={15} />
          </button>
        </div>
      </div>
    </footer>
  );
};
