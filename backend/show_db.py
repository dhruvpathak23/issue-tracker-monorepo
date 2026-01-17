import sqlite3

conn = sqlite3.connect('issues.db')
conn.row_factory = sqlite3.Row
cursor = conn.cursor()

print('=' * 100)
print('USERS TABLE')
print('=' * 100)
cursor.execute('SELECT id, email, username, fullName, isActive FROM users')
users = cursor.fetchall()
for user in users:
    user_id = user["id"][:12]
    print(f'ID: {user_id}...')
    print(f'  Email: {user["email"]}')
    print(f'  Username: {user["username"]}')
    print(f'  Full Name: {user["fullName"]}')
    print(f'  Active: {user["isActive"]}')
    print()

print('=' * 100)
print('ISSUES TABLE (Total Count by Owner)')
print('=' * 100)
cursor.execute('SELECT u.username, COUNT(i.id) as issue_count FROM issues i JOIN users u ON i.userId = u.id GROUP BY u.id, u.username')
counts = cursor.fetchall()
for row in counts:
    print(f'{row["username"]}: {row["issue_count"]} issues')
print()

print('=' * 100)
print('SAMPLE ISSUES')
print('=' * 100)
cursor.execute('SELECT u.username, i.title, i.status, i.priority FROM issues i JOIN users u ON i.userId = u.id ORDER BY u.username, i.title LIMIT 15')
issues = cursor.fetchall()
for issue in issues:
    print(f'[{issue["username"]}] {issue["title"]} - {issue["status"]}, Priority: {issue["priority"]}')

print()
print('=' * 100)
cursor.execute('SELECT COUNT(*) as count FROM users')
user_count = cursor.fetchone()
cursor.execute('SELECT COUNT(*) as count FROM issues')
issue_count = cursor.fetchone()
print(f'Total Users: {user_count["count"]}')
print(f'Total Issues: {issue_count["count"]}')
print('=' * 100)

conn.close()
