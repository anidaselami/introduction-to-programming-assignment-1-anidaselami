// caesar.c

#include "cs50.h"
#include <ctype.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

// Function prototypes
bool only_digits(string s);
char rotate(char c, int n);

int main(int argc, string argv[])
{
    // STEP 1: Validate arguments
    if (argc != 2 || !only_digits(argv[1]))
    {
        printf("Usage: ./caesar key\n");
        return 1;
    }

    // STEP 2: Convert key to int
    int key = atoi(argv[1]);

    // STEP 3: Get plaintext
    string plaintext = get_string("plaintext:  ");

    // STEP 4: Encrypt and print
    printf("ciphertext: ");

    for (int i = 0; i < strlen(plaintext); i++)
    {
        char encrypted = rotate(plaintext[i], key);
        printf("%c", encrypted);
    }

    printf("\n");
}

// Check if string contains only digits
bool only_digits(string s)
{
    for (int i = 0; i < strlen(s); i++)
    {
        if (!isdigit(s[i]))
        {
            return false;
        }
    }
    return true;
}

// Rotate character
char rotate(char c, int n)
{
    if (isupper(c))
    {
        return (c - 'A' + n) % 26 + 'A';
    }
    else if (islower(c))
    {
        return (c - 'a' + n) % 26 + 'a';
    }
    else
    {
        return c;
    }
}