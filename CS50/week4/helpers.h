// helpers.h — function prototypes
#include "bmp.h"

// filters
void grayscale(int height, int width, RGBTRIPLE image[height][width]);
void sepia(int height, int width, RGBTRIPLE image[height][width]);
void reflect(int height, int width, RGBTRIPLE image[height][width]);
void blur(int height, int width, RGBTRIPLE image[height][width]);