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

# print sorted by POPULARITY (highest first)
for language in sorted(counts, key=counts.get, reverse=True):
    print(f"{language}: {counts[language]}")