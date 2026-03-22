// substitution.c

#include "cs50.h"
#include <ctype.h>
#include <stdio.h>
#include <string.h>

// Function prototype
bool is_valid_key(string key);

int main(int argc, string argv[])
{
    // STEP 1: Validate arguments
    if (argc != 2 || !is_valid_key(argv[1]))
    {
        printf("Usage: ./substitution key\n");
        return 1;
    }

    // STEP 2: Get plaintext
    string plaintext = get_string("plaintext:  ");

    // STEP 3: Encrypt
    printf("ciphertext: ");

    for (int i = 0; i < strlen(plaintext); i++)
    {
        char c = plaintext[i];

        if (isupper(c))
        {
            int index = c - 'A';
            char sub = argv[1][index];
            printf("%c", toupper(sub));
        }
        else if (islower(c))
        {
            int index = c - 'a';
            char sub = argv[1][index];
            printf("%c", tolower(sub));
        }
        else
        {
            printf("%c", c);
        }
    }

    printf("\n");
    return 0;
}

// Validate key
bool is_valid_key(string key)
{
    // 1. Must be 26 characters
    if (strlen(key) != 26)
    {
        return false;
    }

    // Track seen letters
    bool seen[26] = {false};

    for (int i = 0; i < 26; i++)
    {
        char c = key[i];

        // 2. Must be alphabetic
        if (!isalpha(c))
        {
            return false;
        }

        int index = tolower(c) - 'a';

        // 3. Check duplicates
        if (seen[index])
        {
            return false;
        }

        seen[index] = true;
    }

    return true;
}