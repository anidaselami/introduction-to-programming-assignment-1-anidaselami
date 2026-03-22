#include <getopt.h>
#include <stdio.h>
#include <stdlib.h>
#include "bmp.h"
#include "helpers.h"

int main(int argc, char *argv[])
{
    if (argc != 4)
    {
        printf("Usage: ./filter [flag] infile outfile\n");
        return 1;
    }

    char filter = argv[1][1]; // argv[1] = "-g" or "-b" etc
    char *infile = argv[2];
    char *outfile = argv[3];

    FILE *inptr = fopen(infile, "rb");
    if (!inptr)
    {
        printf("Could not open %s.\n", infile);
        return 2;
    }

    FILE *outptr = fopen(outfile, "wb");
    if (!outptr)
    {
        fclose(inptr);
        printf("Could not create %s.\n", outfile);
        return 3;
    }

    BITMAPFILEHEADER bf;
    fread(&bf, sizeof(BITMAPFILEHEADER), 1, inptr);

    BITMAPINFOHEADER bi;
    fread(&bi, sizeof(BITMAPINFOHEADER), 1, inptr);

    if (bf.bfType != 0x4d42 || bf.bfOffBits != 54 || bi.biSize != 40 ||
        bi.biBitCount != 24 || bi.biCompression != 0)
    {
        fclose(inptr);
        fclose(outptr);
        printf("Unsupported file format.\n");
        return 4;
    }

    int width = bi.biWidth;
    int height = abs(bi.biHeight);
    int padding = (4 - (width * sizeof(RGBTRIPLE)) % 4) % 4;

    RGBTRIPLE(*image)
    [width] = calloc(height, width * sizeof(RGBTRIPLE));
    if (!image)
    {
        printf("Not enough memory.\n");
        fclose(inptr);
        fclose(outptr);
        return 5;
    }

    for (int i = 0; i < height; i++)
    {
        fread(image[i], sizeof(RGBTRIPLE), width, inptr);
        fseek(inptr, padding, SEEK_CUR);
    }

    switch (filter)
    {
    case 'b':
        blur(height, width, image);
        break;
    case 'g':
        grayscale(height, width, image);
        break;
    case 'r':
        reflect(height, width, image);
        break;
    default:
        printf("Invalid filter.\n");
        free(image);
        fclose(inptr);
        fclose(outptr);
        return 6;
    }

    fwrite(&bf, sizeof(BITMAPFILEHEADER), 1, outptr);
    fwrite(&bi, sizeof(BITMAPINFOHEADER), 1, outptr);

    for (int i = 0; i < height; i++)
    {
        fwrite(image[i], sizeof(RGBTRIPLE), width, outptr);
        for (int k = 0; k < padding; k++)
            fputc(0x00, outptr);
    }

    free(image);
    fclose(inptr);
    fclose(outptr);
    return 0;
}