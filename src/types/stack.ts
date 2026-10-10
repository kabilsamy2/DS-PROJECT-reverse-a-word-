export type OperationType = 'IDLE' | 'PUSH' | 'POP' | 'DONE';

export interface StackItem {
  id: string;
  char: string;
  index: number;
  ascii: number;
}

export interface StackStep {
  stepNumber: number;
  totalSteps: number;
  type: OperationType;
  char: string;
  charIndex: number;
  topIndex: number; // -1 when empty, 0, 1, 2...
  stackSnapshot: StackItem[];
  inputScannedIndex: number; // characters processed so far
  reversedSoFar: string;
  description: string;
  codeSnippet: string;
}

export interface PalindromeAnalysis {
  isPalindrome: boolean;
  original: string;
  reversed: string;
  normalizedOriginal: string;
  normalizedReversed: string;
  charCount: number;
  pushCount: number;
  popCount: number;
  timeComplexity: string;
  spaceComplexity: string;
  explanation: string;
  caseSensitive: boolean;
}

export interface HistoryRecord {
  id: string;
  word: string;
  reversed: string;
  isPalindrome: boolean;
  timestamp: number;
}
