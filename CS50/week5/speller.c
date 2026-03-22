#include <ctype.h>
#include <stdio.h>
#include "dictionary.h"

#define DICTIONARY "dictionary.txt"

int main(int argc, char *argv[])
{
    if (argc != 2 && argc != 3)
    {
        printf("Usage: ./speller [DICTIONARY] text\n");
        return 1;
    }

    char *dictionary = (argc == 3) ? argv[1] : DICTIONARY;
    char *text = (argc == 3) ? argv[2] : argv[1];

    if (!load(dictionary))
    {
        printf("Could not load %s.\n", dictionary);
        return 1;
    }

    FILE *file = fopen(text, "r");
    if (!file)
    {
        printf("Could not open %s.\n", text);
        unload();
        return 1;
    }

    int index = 0, misspellings = 0, words = 0;
    char word[LENGTH + 1];
    char c;

    printf("\nMISSPELLED WORDS\n\n");

    while (fread(&c, sizeof(char), 1, file))
    {
        if (isalpha(c) || (c == '\'' && index > 0))
        {
            word[index++] = c;
            if (index > LENGTH)
            {
                while (fread(&c, sizeof(char), 1, file) && isalpha(c))
                    ;
                index = 0;
            }
        }
        else if (index > 0)
        {
            word[index] = '\0';
            words++;

            if (!check(word))
            {
                printf("%s\n", word);
                misspellings++;
            }

            index = 0;
        }
    }

    fclose(file);

    printf("\nWORDS MISSPELLED:     %d\n", misspellings);
    printf("WORDS IN DICTIONARY:  %d\n", size());
    printf("WORDS IN TEXT:        %d\n", words);

    if (!unload())
    {
        printf("Could not unload %s.\n", dictionary);
        return 1;
    }

    return 0;
}