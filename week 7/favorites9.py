import sqlite3

conn = sqlite3.connect("favorites.db")
conn.row_factory = sqlite3.Row
cur = conn.cursor()

cur.execute("""
    SELECT language, COUNT(*) AS n
    FROM favorites
    GROUP BY language
    ORDER BY n DESC;
""")
rows = cur.fetchall()

for row in rows:
    print(f"{row['language']} {row['n']}")