import os
import sqlite3

# Get the directory where this script is located
script_dir = os.path.dirname(os.path.abspath(__file__))
db_path = os.path.join(script_dir, "favorites.db")
db = sqlite3.connect(db_path)
db.row_factory = sqlite3.Row

# ask user
favorite = input("Favorite: ")

# safe SQL query (parameterised)
rows = db.execute(
    "SELECT COUNT(*) AS n FROM favorites WHERE problem = ?",
    (favorite,)
).fetchall()

# get first result
row = rows[0]

# print count
print(row["n"])

db.close()