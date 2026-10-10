import React, { useState, useEffect } from 'react';
import { ArrowDown, ArrowUp, Cpu } from 'lucide-react';

export const HeroSection: React.FC = () => {
  // Subtle animated stack demonstration in the hero
  const demoSequence = [
    { items: ['L'], op: 'PUSH(\'L\')', top: 0 },
    { items: ['L', 'I'], op: 'PUSH(\'I\')', top: 1 },
    { items: ['L', 'I', 'F'], op: 'PUSH(\'F\')', top: 2 },
    { items: ['L', 'I', 'F', 'O'], op: 'PUSH(\'O\')', top: 3 },
    { items: ['L', 'I', 'F'], op: 'POP() -> \'O\'', top: 2 },
    { items: ['L', 'I'], op: 'POP() -> \'F\'', top: 1 },
    { items: ['L'], op: 'POP() -> \'I\'', top: 0 },
    { items: [], op: 'POP() -> \'L\'', top: -1 },
  ];

  const [stepIndex, setStepIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setStepIndex((prev) => (prev + 1) % demoSequence.length);
    }, 1800);
    return () => clearInterval(timer);
  }, [demoSequence.length]);

  const currentDemo = demoSequence[stepIndex];

  return (
    <section className="hero-section">
      <div className="hero-content">
        {/* Badge */}
        <div className="hero-badge-container">
          <span className="badge-pill">
            <Cpu size={14} className="badge-icon-spin" />
            DATA STRUCTURES • STACK • C PROGRAMMING
          </span>
        </div>

        {/* Headings */}
        <h1 className="hero-title">
          STACK LAB
          <span className="hero-subtitle-gradient">Reverse &amp; Discover</span>
        </h1>

        <p className="hero-description">
          Explore the power of <span className="highlight-text">LIFO (Last In, First Out)</span> through interactive word reversal, palindrome verification, and step-by-step memory visualization.
        </p>

        {/* Student Credential Capsule */}
        <div className="hero-student-capsule">
          <span className="capsule-label">Developed by:</span>
          <span className="capsule-val">KABIL SAMY KM</span>
          <span className="capsule-sep">•</span>
          <span className="capsule-val">RA2511003040086</span>
          <span className="capsule-sep">•</span>
          <span className="capsule-val">CSE - A</span>
        </div>
      </div>

      {/* Futuristic Animated Stack Illustration */}
      <div className="hero-illustration">
        <div className="hero-stack-card glass-panel">
          <div className="hero-card-header">
            <div className="hero-card-dots">
              <span className="dot red"></span>
              <span className="dot yellow"></span>
              <span className="dot green"></span>
            </div>
            <span className="hero-card-tag">STACK SIMULATOR</span>
            <span className="hero-top-indicator">
              TOP = {currentDemo.top >= 0 ? currentDemo.top : '-1 (EMPTY)'}
            </span>
          </div>

          <div className="hero-stack-chamber">
            <div className="chamber-top-rim">
              <span>CHAMBER OPENING</span>
              {currentDemo.op.startsWith('PUSH') ? (
                <span className="op-pill push">
                  <ArrowDown size={12} /> {currentDemo.op}
                </span>
              ) : (
                <span className="op-pill pop">
                  <ArrowUp size={12} /> {currentDemo.op}
                </span>
              )}
            </div>

            <div className="chamber-elements">
              {[3, 2, 1, 0].map((slotIdx) => {
                const char = currentDemo.items[slotIdx];
                const isOccupied = Boolean(char);
                const isTop = slotIdx === currentDemo.top;

                return (
                  <div
                    key={slotIdx}
                    className={`chamber-slot ${isOccupied ? 'occupied' : 'empty'} ${isTop ? 'is-top' : ''}`}
                  >
                    <span className="slot-idx">[{slotIdx}]</span>
                    {isOccupied ? (
                      <div className="slot-block">
                        <span className="block-char">{char}</span>
                        <span className="block-ascii">ASCII {char.charCodeAt(0)}</span>
                      </div>
                    ) : (
                      <span className="slot-null">NULL</span>
                    )}
                    {isTop && <span className="top-arrow-badge">◀ TOP</span>}
                  </div>
                );
              })}
            </div>

            <div className="chamber-base">
              <span>STACK BASE [LIFO ANCHOR]</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
