/**
 * ============================================================================
 * PROJECT: STACK LAB — Reverse & Discover
 * SUBJECT: Data Structures (CS201)
 * AUTHOR : KABIL SAMY KM
 * REG NO : RA2511003040086
 * CLASS  : CSE - A
 * 
 * CORE CONCEPT: Stack Implementation in C (Array-based, LIFO Principle)
 * Application: String Reversal & Palindrome Detection using Stack
 * Standards  : C11 / C99 Compatible
 * ============================================================================
 */

#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <ctype.h>
#include <stdbool.h>

#define MAX_SIZE 256

/**
 * Stack structure using a fixed-size character array.
 * top points to the index of the most recently inserted element.
 * When stack is empty, top is initialized to -1.
 */
typedef struct {
    char data[MAX_SIZE];
    int top;
} Stack;

// Function Prototypes
void initStack(Stack *s);
bool isFull(const Stack *s);
bool isEmpty(const Stack *s);
void push(Stack *s, char c);
char pop(Stack *s);
char peek(const Stack *s);
void reverseString(const char *input, char *output);
bool isPalindromeNormalized(const char *original, const char *reversed, bool ignoreCaseAndPunct);
void printBanner(void);

/**
 * Initialize stack by setting top pointer to -1.
 */
void initStack(Stack *s) {
    s->top = -1;
}

/**
 * Check if the stack has reached its maximum capacity.
 * Time Complexity: O(1)
 */
bool isFull(const Stack *s) {
    return s->top == (MAX_SIZE - 1);
}

/**
 * Check if the stack is empty.
 * Time Complexity: O(1)
 */
bool isEmpty(const Stack *s) {
    return s->top == -1;
}

/**
 * PUSH Operation:
 * Inserts a character onto the top of the stack.
 * Increments top before storing the element.
 * Time Complexity: O(1)
 */
void push(Stack *s, char c) {
    if (isFull(s)) {
        fprintf(stderr, "[STACK ERROR]: Overflow! Cannot push '%c'.\n", c);
        return;
    }
    s->top++;
    s->data[s->top] = c;
}

/**
 * POP Operation:
 * Removes and returns the top element from the stack.
 * Demonstrates LIFO: The most recently pushed character comes out first.
 * Time Complexity: O(1)
 */
char pop(Stack *s) {
    if (isEmpty(s)) {
        fprintf(stderr, "[STACK ERROR]: Underflow! Stack is empty.\n");
        return '\0';
    }
    char c = s->data[s->top];
    s->top--;
    return c;
}

/**
 * PEEK Operation:
 * Returns the current element at the top without removing it.
 * Time Complexity: O(1)
 */
char peek(const Stack *s) {
    if (isEmpty(s)) {
        return '\0';
    }
    return s->data[s->top];
}

/**
 * String Reversal using Stack:
 * 1. Push all characters of the input string onto the stack.
 * 2. Pop all characters from the stack sequentially into output buffer.
 * Time Complexity: O(n) | Space Complexity: O(n)
 */
void reverseString(const char *input, char *output) {
    Stack s;
    initStack(&s);

    int len = (int)strlen(input);

    // Phase 1: Push all characters onto stack
    for (int i = 0; i < len; i++) {
        push(&s, input[i]);
    }

    // Phase 2: Pop characters into output (LIFO reverses the sequence)
    int j = 0;
    while (!isEmpty(&s)) {
        output[j++] = pop(&s);
    }
    output[j] = '\0';
}

/**
 * Check if string is a palindrome.
 * Compares normalized versions (ignoring whitespace, punctuation, and case).
 */
bool isPalindromeNormalized(const char *original, const char *reversed, bool ignoreCaseAndPunct) {
    char normOrig[MAX_SIZE];
    char normRev[MAX_SIZE];
    int idxOrig = 0;
    int idxRev = 0;

    int lenOrig = (int)strlen(original);
    int lenRev = (int)strlen(reversed);

    if (ignoreCaseAndPunct) {
        // Extract alphanumeric characters only, converted to lowercase
        for (int i = 0; i < lenOrig; i++) {
            if (isalnum((unsigned char)original[i])) {
                normOrig[idxOrig++] = (char)tolower((unsigned char)original[i]);
            }
        }
        normOrig[idxOrig] = '\0';

        for (int i = 0; i < lenRev; i++) {
            if (isalnum((unsigned char)reversed[i])) {
                normRev[idxRev++] = (char)tolower((unsigned char)reversed[i]);
            }
        }
        normRev[idxRev] = '\0';

        if (idxOrig == 0) return false; // Empty alphanumeric string
        return (strcmp(normOrig, normRev) == 0);
    } else {
        return (strcmp(original, reversed) == 0);
    }
}

void printBanner(void) {
    printf("=================================================================\n");
    printf("           STACK LAB: REVERSE & DISCOVER (LIFO ENGINE)          \n");
    printf("=================================================================\n");
    printf(" Student Name : KABIL SAMY KM\n");
    printf(" Register No  : RA2511003040086\n");
    printf(" Department   : CSE - A\n");
    printf(" Project Topic: Stack Data Structure (Word Reversal & Palindrome)\n");
    printf("=================================================================\n\n");
}

int main(void) {
    printBanner();

    char input[MAX_SIZE];
    char reversed[MAX_SIZE];

    printf("Enter a word or phrase to reverse (press Enter to run):\n> ");
    if (fgets(input, sizeof(input), stdin) == NULL) {
        printf("Error reading input.\n");
        return 1;
    }

    // Remove trailing newline character
    size_t len = strlen(input);
    if (len > 0 && input[len - 1] == '\n') {
        input[len - 1] = '\0';
    }

    if (strlen(input) == 0) {
        printf("[WARN] Input cannot be empty! Please run again with text.\n");
        return 0;
    }

    // Perform reversal
    reverseString(input, reversed);

    // Perform Palindrome analysis
    bool isPal = isPalindromeNormalized(input, reversed, true);

    printf("\n----------------------- EXECUTION RESULTS -----------------------\n");
    printf(" Original Input   : \"%s\"\n", input);
    printf(" Reversed String  : \"%s\"\n", reversed);
    printf(" Total Characters : %zu\n", strlen(input));
    printf(" Total PUSH Ops   : %zu\n", strlen(input));
    printf(" Total POP Ops    : %zu\n", strlen(input));
    printf(" Palindrome Check : %s\n", isPal ? "[YES] PALINDROME DETECTED" : "[NO] NOT A PALINDROME");
    printf(" Time Complexity  : O(n)\n");
    printf(" Space Complexity : O(n)\n");
    printf("-----------------------------------------------------------------\n");

    return 0;
}
