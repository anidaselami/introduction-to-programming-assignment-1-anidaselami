import csv

with open("favorites.csv", "r") as file:
    reader = csv.DictReader(file)
    counts = {}

    for row in reader:
        favorite = row["language"]

        if favorite in counts:
            counts[favorite] += 1
        else:
            counts[favorite] = 1

# print sorted alphabetically
for language in sorted(counts):
    print(f"{language}: {counts[language]}")