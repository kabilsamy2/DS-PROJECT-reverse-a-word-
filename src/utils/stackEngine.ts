import type { StackItem, StackStep, PalindromeAnalysis } from '../types/stack';

/**
 * Reverses a string using the classical stack algorithm.
 * Case-preserving for display.
 */
export function reverseWordStack(input: string): string {
  const stack: string[] = [];
  for (let i = 0; i < input.length; i++) {
    stack.push(input[i]);
  }
  let reversed = '';
  while (stack.length > 0) {
    reversed += stack.pop();
  }
  return reversed;
}

/**
 * Normalize a string for palindrome testing.
 * Removes non-alphanumeric characters and converts to lowercase.
 */
export function normalizeString(str: string): string {
  return str.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
}

/**
 * Performs full palindrome detection and complexity analysis.
 */
export function analyzePalindrome(input: string, caseSensitive: boolean = false): PalindromeAnalysis {
  const original = input;
  const reversed = reverseWordStack(input);
  const charCount = input.length;
  const pushCount = charCount;
  const popCount = charCount;

  if (!input.trim()) {
    return {
      isPalindrome: false,
      original,
      reversed: '',
      normalizedOriginal: '',
      normalizedReversed: '',
      charCount: 0,
      pushCount: 0,
      popCount: 0,
      timeComplexity: 'O(0)',
      spaceComplexity: 'O(0)',
      explanation: 'Please enter a word or phrase to begin the stack reversal and palindrome analysis.',
      caseSensitive,
    };
  }

  let isPalindrome = false;
  let normOrig = '';
  let normRev = '';

  if (caseSensitive) {
    isPalindrome = original === reversed;
    normOrig = original;
    normRev = reversed;
  } else {
    normOrig = normalizeString(original);
    normRev = normalizeString(reversed);
    isPalindrome = normOrig.length > 0 && normOrig === normRev;
  }

  let explanation = '';
  if (isPalindrome) {
    if (caseSensitive) {
      explanation = `"${original}" is an exact case-sensitive palindrome. Original and reversed strings match letter-for-letter.`;
    } else {
      explanation = `"${original}" is a valid palindrome! After normalizing (ignoring case, spaces, and punctuation: "${normOrig}"), the forward and reverse sequences match identically.`;
    }
  } else {
    explanation = `"${original}" becomes "${reversed}" because the stack returns characters in reverse order (LIFO). The normalized strings ("${normOrig}" vs "${normRev}") do not match, so this is NOT a palindrome.`;
  }

  return {
    isPalindrome,
    original,
    reversed,
    normalizedOriginal: normOrig,
    normalizedReversed: normRev,
    charCount,
    pushCount,
    popCount,
    timeComplexity: 'O(n)',
    spaceComplexity: 'O(n)',
    explanation,
    caseSensitive,
  };
}

/**
 * Generates an array of explicit algorithmic steps simulating the C Stack operations.
 */
export function generateStackSteps(input: string): StackStep[] {
  if (!input) return [];

  const steps: StackStep[] = [];
  const chars = Array.from(input);
  const n = chars.length;
  // Step 0 (Init) + n PUSH steps + n POP steps + 1 Final Verification step
  const totalSteps = 1 + n + n + 1;

  // Step 0: Initial State
  steps.push({
    stepNumber: 0,
    totalSteps: totalSteps - 1,
    type: 'IDLE',
    char: '',
    charIndex: -1,
    topIndex: -1,
    stackSnapshot: [],
    inputScannedIndex: 0,
    reversedSoFar: '',
    description: 'Stack initialized with empty array. TOP pointer is set to -1.',
    codeSnippet: 'initStack(&s); // s.top = -1',
  });

  const simulatedStack: StackItem[] = [];

  // PUSH Phase (Steps 1 to n)
  for (let i = 0; i < n; i++) {
    const char = chars[i];
    const newItem: StackItem = {
      id: `item-${i}-${char}`,
      char,
      index: i,
      ascii: char.charCodeAt(0),
    };
    simulatedStack.push(newItem);

    steps.push({
      stepNumber: steps.length,
      totalSteps: totalSteps - 1,
      type: 'PUSH',
      char,
      charIndex: i,
      topIndex: simulatedStack.length - 1,
      stackSnapshot: [...simulatedStack],
      inputScannedIndex: i + 1,
      reversedSoFar: '',
      description: `PUSH('${char}') -> Read '${char}' from input[${i}]. Incremented TOP to ${simulatedStack.length - 1} and stored at stack[${simulatedStack.length - 1}].`,
      codeSnippet: `push(&s, '${char}'); // top = ${simulatedStack.length - 1}, stack[${simulatedStack.length - 1}] = '${char}'`,
    });
  }

  // POP Phase (Steps n+1 to 2n)
  let reversedAcc = '';
  for (let i = 0; i < n; i++) {
    const poppedItem = simulatedStack.pop()!;
    reversedAcc += poppedItem.char;
    const currentTop = simulatedStack.length - 1;

    steps.push({
      stepNumber: steps.length,
      totalSteps: totalSteps - 1,
      type: 'POP',
      char: poppedItem.char,
      charIndex: poppedItem.index,
      topIndex: currentTop,
      stackSnapshot: [...simulatedStack],
      inputScannedIndex: n,
      reversedSoFar: reversedAcc,
      description: `POP() -> Extracted '${poppedItem.char}' from stack top (LIFO). Appended to reversed output. TOP decremented to ${currentTop}.`,
      codeSnippet: `c = pop(&s); // returned '${poppedItem.char}', top now = ${currentTop}`,
    });
  }

  // Final Step: Complete & Verify
  steps.push({
    stepNumber: steps.length,
    totalSteps: totalSteps - 1,
    type: 'DONE',
    char: '',
    charIndex: -1,
    topIndex: -1,
    stackSnapshot: [],
    inputScannedIndex: n,
    reversedSoFar: reversedAcc,
    description: `Reversal complete! Stack is empty (TOP = -1). Final reversed string: "${reversedAcc}".`,
    codeSnippet: 'output[j] = \'\\0\'; // String reversal finalized in O(n) time',
  });

  return steps;
}

/**
 * Web Audio API Sound Synthesizer for cybernetic sound effects.
 * Safe fallback if Web Audio is unsupported or muted.
 */
class SoundEngine {
  private ctx: AudioContext | null = null;
  public enabled: boolean = true;

  private initCtx() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
  }

  public playPush() {
    if (!this.enabled) return;
    try {
      this.initCtx();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(320, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(740, this.ctx.currentTime + 0.12);
      gain.gain.setValueAtTime(0.08, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.12);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.12);
    } catch {
      // Audio not permitted or failed
    }
  }

  public playPop() {
    if (!this.enabled) return;
    try {
      this.initCtx();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(680, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(260, this.ctx.currentTime + 0.14);
      gain.gain.setValueAtTime(0.09, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.14);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.14);
    } catch {
      // Ignore audio error
    }
  }

  public playSuccess() {
    if (!this.enabled) return;
    try {
      this.initCtx();
      if (!this.ctx) return;
      const freqs = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6 arpeggio
      freqs.forEach((freq, idx) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.value = freq;
        const startTime = this.ctx.currentTime + idx * 0.08;
        gain.gain.setValueAtTime(0.08, startTime);
        gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.35);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(startTime);
        osc.stop(startTime + 0.35);
      });
    } catch {
      // Ignore
    }
  }

  public playClick() {
    if (!this.enabled) return;
    try {
      this.initCtx();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(800, this.ctx.currentTime);
      gain.gain.setValueAtTime(0.04, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.04);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.04);
    } catch {
      // Ignore
    }
  }
}

export const soundEngine = new SoundEngine();
