import csv
import sqlite3

# Create a SQLite database
conn = sqlite3.connect("favorites.db")
c = conn.cursor()

# Create the favorites table
c.execute('''CREATE TABLE IF NOT EXISTS favorites
             (timestamp TEXT, language TEXT, problem TEXT)''')

# Read the CSV file and insert data
with open("favorites.csv", "r") as file:
    reader = csv.DictReader(file)
    for row in reader:
        c.execute("INSERT INTO favorites (timestamp, language, problem) VALUES (?, ?, ?)",
                  (row["Timestamp"], row["language"], row["problem"]))

# Commit and close
conn.commit()
conn.close()

print("Database created successfully!")
