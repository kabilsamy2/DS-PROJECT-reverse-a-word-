import React from 'react';
import { X, Layers, ArrowDown, ArrowUp, Lightbulb, Compass } from 'lucide-react';
import { soundEngine } from '../utils/stackEngine';

interface LifoGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LifoGuideModal: React.FC<LifoGuideModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div
        className="modal-card glass-panel"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="lifo-modal-title"
      >
        <div className="modal-header">
          <div className="modal-title-group">
            <Layers className="modal-title-icon" size={20} />
            <h3 id="lifo-modal-title" className="modal-title">
              WHAT IS LIFO? (STACK CORE CONCEPT)
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
          {/* LIFO Definition */}
          <div className="lifo-concept-block glass-panel">
            <h4 className="concept-title">
              <Compass size={16} /> LIFO: LAST IN, FIRST OUT
            </h4>
            <p className="concept-desc">
              In computer science, a <strong>Stack</strong> is a linear data structure that follows the <strong>LIFO (Last In, First Out)</strong> order of operations. This means that the last element added to the structure is always the very first element to be removed.
            </p>
          </div>

          {/* Visual Diagram */}
          <div className="lifo-diagram-grid">
            <div className="lifo-diagram-card glass-panel">
              <div className="diag-icon-title push-color">
                <ArrowDown size={18} /> PUSH OPERATION
              </div>
              <p>Adds an element to the top of the stack.</p>
              <code>top++; stack[top] = item;</code>
            </div>

            <div className="lifo-diagram-card glass-panel">
              <div className="diag-icon-title pop-color">
                <ArrowUp size={18} /> POP OPERATION
              </div>
              <p>Removes the topmost element from the stack.</p>
              <code>item = stack[top]; top--;</code>
            </div>
          </div>

          {/* Real World Analogies */}
          <div className="analogies-block">
            <h4 className="analogies-title">
              <Lightbulb size={16} /> Real-World Analogies:
            </h4>
            <div className="analogies-grid">
              <div className="analogy-pill">
                <strong>Cafeteria Plates:</strong> The plate placed on the top of the pile is the first one taken by the next customer.
              </div>
              <div className="analogy-pill">
                <strong>Browser History:</strong> Clicking the 'Back' button pops the most recently visited URL.
              </div>
              <div className="analogy-pill">
                <strong>Text Editor Undo:</strong> Ctrl+Z pops the most recently typed action from the editor's undo stack.
              </div>
              <div className="analogy-pill">
                <strong>Function Call Stack in C:</strong> The compiler pushes local activation frames on function entry and pops them upon return.
              </div>
            </div>
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
            GOT IT, CLOSE GUIDE
          </button>
        </div>
      </div>
    </div>
  );
};
