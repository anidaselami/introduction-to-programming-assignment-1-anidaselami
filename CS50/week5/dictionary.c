#include <ctype.h>
#include <stdbool.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <strings.h> // for strcasecmp
#include "dictionary.h"

// Number of buckets in hash table
#define N 26

// Node for linked list
typedef struct node
{
    char word[LENGTH + 1];
    struct node *next;
} node;

// Hash table
node *table[N];

// Global word counter
unsigned int word_count = 0;

// Hash function: simple hash based on first letter
unsigned int hash(const char *word)
{
    return tolower(word[0]) - 'a';
}

// Load dictionary into memory
bool load(const char *dictionary)
{
    FILE *file = fopen(dictionary, "r");
    if (!file)
        return false;

    char word[LENGTH + 1];

    while (fscanf(file, "%45s", word) != EOF)
    {
        node *n = malloc(sizeof(node));
        if (!n)
        {
            fclose(file);
            return false;
        }
        strcpy(n->word, word);

        unsigned int index = hash(word);
        n->next = table[index];
        table[index] = n;

        word_count++;
    }

    fclose(file);
    return true;
}

// Check if word is in dictionary
bool check(const char *word)
{
    unsigned int index = hash(word);
    node *cursor = table[index];
    while (cursor != NULL)
    {
        if (strcasecmp(cursor->word, word) == 0)
            return true;
        cursor = cursor->next;
    }
    return false;
}

// Return number of words loaded
unsigned int size(void)
{
    return word_count;
}

// Unload dictionary from memory
bool unload(void)
{
    for (int i = 0; i < N; i++)
    {
        node *cursor = table[i];
        while (cursor != NULL)
        {
            node *tmp = cursor;
            cursor = cursor->next;
            free(tmp);
        }
    }
    return true;
}