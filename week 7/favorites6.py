import csv

with open("favorites.csv", "r") as file:
    reader = csv.DictReader(file)
    counts = {}

    for row in reader:
        favorite = row["language"]

        try:
            counts[favorite] += 1
        except KeyError:
            counts[favorite] = 1

for favorite in counts:
    print(f"{favorite}: {counts[favorite]}")