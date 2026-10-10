import React, { useState } from 'react';
import {
  Code2,
  BookOpen,
  Copy,
  Check,
  Download,
  Terminal,
  Clock,
  HardDrive,
  Info,
} from 'lucide-react';
import { soundEngine } from '../utils/stackEngine';

const C_SOURCE_CODE = `/**
 * ============================================================================
 * PROJECT: STACK LAB — Reverse & Discover
 * SUBJECT: Data Structures (CS201)
 * AUTHOR : KABIL SAMY KM (RA2511003040086) | CSE - A
 * CORE   : Stack Data Structure in C — LIFO Principle
 * ============================================================================
 */

#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <ctype.h>
#include <stdbool.h>

#define MAX_SIZE 256

/* Array-based Stack Structure */
typedef struct {
    char data[MAX_SIZE];
    int top; // Tracks current index of top item (-1 = empty)
} Stack;

/* Initialize stack top to -1 */
void initStack(Stack *s) {
    s->top = -1;
}

/* Check if stack is full (Overflow condition) */
bool isFull(const Stack *s) {
    return s->top == (MAX_SIZE - 1);
}

/* Check if stack is empty (Underflow condition) */
bool isEmpty(const Stack *s) {
    return s->top == -1;
}

/* PUSH: Insert character onto top of stack */
void push(Stack *s, char c) {
    if (isFull(s)) {
        fprintf(stderr, "[ERROR]: Stack Overflow! Cannot push '%c'.\\n", c);
        return;
    }
    s->top++;
    s->data[s->top] = c;
}

/* POP: Remove and return top character (LIFO Principle) */
char pop(Stack *s) {
    if (isEmpty(s)) {
        fprintf(stderr, "[ERROR]: Stack Underflow! Stack is empty.\\n");
        return '\\0';
    }
    char c = s->data[s->top];
    s->top--;
    return c;
}

/* Reverse String using Stack: O(n) Time, O(n) Space */
void reverseString(const char *input, char *output) {
    Stack s;
    initStack(&s);

    int len = (int)strlen(input);

    // Phase 1: Push all characters onto stack
    for (int i = 0; i < len; i++) {
        push(&s, input[i]);
    }

    // Phase 2: Pop characters one by one (reverses sequence)
    int j = 0;
    while (!isEmpty(&s)) {
        output[j++] = pop(&s);
    }
    output[j] = '\\0';
}

/* Palindrome Detection: Compares normalized alphanumeric characters */
bool isPalindromeNormalized(const char *original, const char *reversed) {
    char normOrig[MAX_SIZE], normRev[MAX_SIZE];
    int i1 = 0, i2 = 0;

    for (int i = 0; original[i] != '\\0'; i++) {
        if (isalnum((unsigned char)original[i]))
            normOrig[i1++] = (char)tolower((unsigned char)original[i]);
    }
    normOrig[i1] = '\\0';

    for (int i = 0; reversed[i] != '\\0'; i++) {
        if (isalnum((unsigned char)reversed[i]))
            normRev[i2++] = (char)tolower((unsigned char)reversed[i]);
    }
    normRev[i2] = '\\0';

    if (i1 == 0) return false; // Empty alphanumeric string
    return (strcmp(normOrig, normRev) == 0);
}

int main(void) {
    char input[MAX_SIZE], reversed[MAX_SIZE];

    printf("=== STACK LAB: String Reversal in C (KABIL SAMY KM) ===\\n");
    printf("Enter string: ");
    if (fgets(input, sizeof(input), stdin) == NULL) return 1;

    // Strip trailing newline
    size_t len = strlen(input);
    if (len > 0 && input[len - 1] == '\\n') input[len - 1] = '\\0';

    reverseString(input, reversed);
    bool isPal = isPalindromeNormalized(input, reversed);

    printf("Original : %s\\n", input);
    printf("Reversed : %s\\n", reversed);
    printf("Result   : %s\\n", isPal ? "PALINDROME DETECTED" : "NOT A PALINDROME");
    return 0;
}`;

export const AlgorithmCodePanel: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'algorithm' | 'c-code'>('algorithm');
  const [copied, setCopied] = useState(false);
  const [highlightSection, setHighlightSection] = useState<string>('all');

  const handleCopyCode = () => {
    soundEngine.playClick();
    navigator.clipboard.writeText(C_SOURCE_CODE).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const handleDownloadCFile = () => {
    soundEngine.playClick();
    const blob = new Blob([C_SOURCE_CODE], { type: 'text/x-csrc' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'stack_reverse.c';
    a.click();
    URL.revokeObjectURL(url);
  };

  const codeLines = C_SOURCE_CODE.split('\n');

  return (
    <div className="algo-code-container glass-panel">
      {/* Top Tab Bar */}
      <div className="panel-tab-bar">
        <div className="tab-buttons-group">
          <button
            type="button"
            className={`tab-btn ${activeTab === 'algorithm' ? 'active' : ''}`}
            onClick={() => {
              soundEngine.playClick();
              setActiveTab('algorithm');
            }}
          >
            <BookOpen size={16} />
            <span>HOW IT WORKS (ALGORITHM)</span>
          </button>

          <button
            type="button"
            className={`tab-btn ${activeTab === 'c-code' ? 'active' : ''}`}
            onClick={() => {
              soundEngine.playClick();
              setActiveTab('c-code');
            }}
          >
            <Code2 size={16} />
            <span>C SOURCE CODE (C11)</span>
          </button>
        </div>

        {activeTab === 'c-code' && (
          <div className="code-actions-group">
            <button
              type="button"
              className="btn-secondary btn-sm"
              onClick={handleCopyCode}
              title="Copy C source code to clipboard"
            >
              {copied ? <Check size={14} /> : <Copy size={14} />}
              <span>{copied ? 'COPIED!' : 'COPY CODE'}</span>
            </button>

            <button
              type="button"
              className="btn-secondary btn-sm"
              onClick={handleDownloadCFile}
              title="Download standalone stack_reverse.c file"
            >
              <Download size={14} />
              <span>DOWNLOAD .C</span>
            </button>
          </div>
        )}
      </div>

      {/* Tab 1: Algorithm Explanation */}
      {activeTab === 'algorithm' && (
        <div className="algo-view-body">
          {/* LIFO Banner */}
          <div className="lifo-hero-banner">
            <div className="lifo-badge">CORE PRINCIPLE</div>
            <div className="lifo-title">
              LAST IN <span className="arrow-glow">→</span> FIRST OUT (LIFO)
            </div>
            <p className="lifo-subtext">
              The element inserted most recently is always the first element retrieved. When characters are pushed onto the stack from left-to-right, popping them sequentially automatically produces the reverse sequence.
            </p>
          </div>

          {/* Algorithm Steps Grid */}
          <div className="algo-steps-list">
            <div className="step-card glass-panel">
              <span className="step-num">01</span>
              <h4>Read Input String</h4>
              <p>Receive the input text safely from the user (handling spaces and lengths up to MAX_SIZE).</p>
            </div>

            <div className="step-card glass-panel">
              <span className="step-num">02</span>
              <h4>Initialize Empty Stack</h4>
              <p>Set the stack pointer <code>TOP = -1</code> to signify that the stack holds zero elements.</p>
            </div>

            <div className="step-card glass-panel">
              <span className="step-num">03</span>
              <h4>PUSH Each Character</h4>
              <p>Iterate from index 0 to n-1. Increment <code>TOP</code> and store each character onto the stack.</p>
            </div>

            <div className="step-card glass-panel">
              <span className="step-num">04</span>
              <h4>POP Characters Sequentially</h4>
              <p>While <code>TOP != -1</code>, retrieve <code>stack[TOP]</code> and decrement <code>TOP</code>.</p>
            </div>

            <div className="step-card glass-panel">
              <span className="step-num">05</span>
              <h4>Construct Reversed String</h4>
              <p>Append each popped character to the output buffer and null-terminate (<code>'\0'</code>).</p>
            </div>

            <div className="step-card glass-panel">
              <span className="step-num">06</span>
              <h4>Normalized Palindrome Check</h4>
              <p>Strip spaces/punctuation and normalize casing. Compare normalized original with reversed.</p>
            </div>
          </div>

          {/* Complexity Cards */}
          <div className="complexity-grid">
            <div className="complexity-card glass-panel">
              <div className="comp-header">
                <Clock className="comp-icon cyan" size={20} />
                <span className="comp-tag">TIME COMPLEXITY</span>
                <span className="comp-notation">O(n)</span>
              </div>
              <h4>Linear Time Complexity</h4>
              <p>
                Pushing <em>n</em> characters takes <em>n</em> operations (each O(1)). Popping <em>n</em> characters takes <em>n</em> operations (each O(1)). Total time = <em>2n</em> steps, which simplifies to <strong>O(n)</strong>. Reversal executes in direct proportion to the string length.
              </p>
            </div>

            <div className="complexity-card glass-panel">
              <div className="comp-header">
                <HardDrive className="comp-icon violet" size={20} />
                <span className="comp-tag">SPACE COMPLEXITY</span>
                <span className="comp-notation">O(n)</span>
              </div>
              <h4>Linear Auxiliary Space</h4>
              <p>
                The stack stores all <em>n</em> characters simultaneously before popping begins. Auxiliary memory requires <em>n</em> character blocks, yielding <strong>O(n)</strong> space. Stack overflow occurs if <em>n &gt; MAX_SIZE</em>.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: C Source Code Panel */}
      {activeTab === 'c-code' && (
        <div className="c-code-view">
          {/* Quick Filter Sub-bar */}
          <div className="code-filter-bar">
            <span className="filter-label">HIGHLIGHT COMPONENT:</span>
            <button
              type="button"
              className={`filter-chip ${highlightSection === 'all' ? 'active' : ''}`}
              onClick={() => setHighlightSection('all')}
            >
              Full Program
            </button>
            <button
              type="button"
              className={`filter-chip ${highlightSection === 'struct' ? 'active' : ''}`}
              onClick={() => setHighlightSection('struct')}
            >
              Stack Struct
            </button>
            <button
              type="button"
              className={`filter-chip ${highlightSection === 'push-pop' ? 'active' : ''}`}
              onClick={() => setHighlightSection('push-pop')}
            >
              push() &amp; pop()
            </button>
            <button
              type="button"
              className={`filter-chip ${highlightSection === 'reverse' ? 'active' : ''}`}
              onClick={() => setHighlightSection('reverse')}
            >
              reverseString()
            </button>
            <button
              type="button"
              className={`filter-chip ${highlightSection === 'palindrome' ? 'active' : ''}`}
              onClick={() => setHighlightSection('palindrome')}
            >
              isPalindromeNormalized()
            </button>
          </div>

          {/* Compilation Instructions Bar */}
          <div className="compiler-hint-bar">
            <Terminal size={14} className="terminal-hint-icon" />
            <span className="compiler-hint-text">
              Compile with GCC: <code>gcc -std=c11 -Wall -O2 stack_reverse.c -o stack_reverse.exe</code>
            </span>
          </div>

          {/* Editor Window */}
          <div className="code-editor-window">
            <div className="editor-titlebar">
              <div className="editor-dots">
                <span className="editor-dot red"></span>
                <span className="editor-dot yellow"></span>
                <span className="editor-dot green"></span>
              </div>
              <span className="editor-filename">stack_reverse.c — C11 Standard</span>
              <span className="editor-author">Author: KABIL SAMY KM (RA2511003040086)</span>
            </div>

            <pre className="code-content-pre">
              <code>
                {codeLines.map((line, idx) => {
                  const lineNum = idx + 1;
                  let isHighlighted = false;
                  if (highlightSection === 'struct' && lineNum >= 18 && lineNum <= 24) isHighlighted = true;
                  if (highlightSection === 'push-pop' && lineNum >= 38 && lineNum <= 60) isHighlighted = true;
                  if (highlightSection === 'reverse' && lineNum >= 63 && lineNum <= 81) isHighlighted = true;
                  if (highlightSection === 'palindrome' && lineNum >= 84 && lineNum <= 104) isHighlighted = true;

                  return (
                    <div
                      key={idx}
                      className={`code-line-row ${isHighlighted ? 'line-highlighted' : ''}`}
                    >
                      <span className="line-num">{lineNum}</span>
                      <span className="line-code-text">{line}</span>
                    </div>
                  );
                })}
              </code>
            </pre>
          </div>

          {/* Code Notes Explanation */}
          <div className="code-explanations-footer glass-panel">
            <h4><Info size={16} /> Important Implementation Notes</h4>
            <ul>
              <li><strong>Zero Library Dependencies:</strong> Implemented from scratch using standard C arrays and pointer index manipulation.</li>
              <li><strong>Bounds Safety:</strong> <code>isFull()</code> prevents buffer overflow before PUSH; <code>isEmpty()</code> prevents underflow before POP.</li>
              <li><strong>Clean LIFO Extraction:</strong> Popping characters returns the most recently inserted item first, naturally reversing the string.</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};
