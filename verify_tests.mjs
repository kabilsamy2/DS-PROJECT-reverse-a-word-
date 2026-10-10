// Automated Test Verification for STACK LAB engine
import { reverseWordStack, normalizeString, analyzePalindrome, generateStackSteps } from './src/utils/stackEngine.js';

console.log('Running test suite for STACK LAB...\n');

let failed = 0;

function assert(condition, message) {
  if (!condition) {
    console.error(`❌ FAIL: ${message}`);
    failed++;
  } else {
    console.log(`✅ PASS: ${message}`);
  }
}

// 1. Test word reversal
assert(reverseWordStack('HELLO') === 'OLLEH', 'Reversal of HELLO -> OLLEH');
assert(reverseWordStack('STACK') === 'KCATS', 'Reversal of STACK -> KCATS');
assert(reverseWordStack('LEVEL') === 'LEVEL', 'Reversal of LEVEL -> LEVEL');
assert(reverseWordStack('MADAM') === 'MADAM', 'Reversal of MADAM -> MADAM');
assert(reverseWordStack('RaceCar') === 'raCecaR', 'Case-preserving reversal of RaceCar -> raCecaR');
assert(reverseWordStack('') === '', 'Empty string reversal');

// 2. Test Palindrome detection
const pHello = analyzePalindrome('HELLO', false);
assert(!pHello.isPalindrome, 'HELLO is NOT a palindrome');
assert(pHello.reversed === 'OLLEH', 'HELLO reversed matches OLLEH');
assert(pHello.pushCount === 5 && pHello.popCount === 5, 'HELLO has 5 PUSH and 5 POP ops');

const pLevel = analyzePalindrome('LEVEL', false);
assert(pLevel.isPalindrome, 'LEVEL is a palindrome');

const pMadam = analyzePalindrome('MADAM', false);
assert(pMadam.isPalindrome, 'MADAM is a palindrome');

const pRadar = analyzePalindrome('RADAR', false);
assert(pRadar.isPalindrome, 'RADAR is a palindrome');

const pRaceCar = analyzePalindrome('RaceCar', false);
assert(pRaceCar.isPalindrome, 'RaceCar is a palindrome in case-insensitive mode');

const pPhrase = analyzePalindrome('A man, a plan, a canal: Panama', false);
assert(pPhrase.isPalindrome, 'Phrase "A man, a plan, a canal: Panama" is detected as palindrome');
assert(pPhrase.normalizedOriginal === 'amanaplanacanalpanama', 'Phrase normalized correctly');

const pEmpty = analyzePalindrome('', false);
assert(!pEmpty.isPalindrome, 'Empty input is NOT marked as a palindrome');

// 3. Test Stack Steps Generation
const stepsHello = generateStackSteps('HELLO');
// Total steps: step 0 (init) + 5 push + 5 pop + 1 done = 12 steps
assert(stepsHello.length === 12, `HELLO generates 12 steps (got ${stepsHello.length})`);
assert(stepsHello[0].type === 'IDLE' && stepsHello[0].topIndex === -1, 'Step 0 is IDLE with TOP = -1');
assert(stepsHello[1].type === 'PUSH' && stepsHello[1].char === 'H' && stepsHello[1].topIndex === 0, 'Step 1 pushes H with TOP = 0');
assert(stepsHello[5].type === 'PUSH' && stepsHello[5].char === 'O' && stepsHello[5].topIndex === 4, 'Step 5 pushes O with TOP = 4');
assert(stepsHello[6].type === 'POP' && stepsHello[6].char === 'O' && stepsHello[6].topIndex === 3, 'Step 6 pops O with TOP = 3 (LIFO)');
assert(stepsHello[10].type === 'POP' && stepsHello[10].char === 'H' && stepsHello[10].topIndex === -1, 'Step 10 pops H with TOP = -1 (LIFO final item)');
assert(stepsHello[11].type === 'DONE' && stepsHello[11].reversedSoFar === 'OLLEH', 'Step 11 finalizes OLLEH');

if (failed === 0) {
  console.log('\n🎉 ALL 15 AUTOMATED TESTS PASSED SUCCESSFULLY!');
} else {
  console.error(`\n⚠️ ${failed} test(s) failed.`);
  process.exit(1);
}
