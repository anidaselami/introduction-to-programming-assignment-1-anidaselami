import random

# generate random number
secret = random.randint(1, 10)

# guesses counter
guesses = 0

# first guess
guess = int(input("Guess a number between 1 and 10: "))

# loop until correct
while guess != secret:
    guesses += 1

    if guess < secret:
        print("Too low!")
    else:
        print("Too high!")

    guess = int(input("Try again: "))

# count the final correct guess
guesses += 1

# success message
print(f"🎉 Correct! The number was {secret}. You guessed it in {guesses} tries.")