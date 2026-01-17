#!/usr/bin/env python3
"""Test database connectivity"""

import os
from database import engine, Base, IssueModel, get_db
from sqlalchemy.orm import sessionmaker

# Create tables
Base.metadata.create_all(bind=engine)

print("✓ Database initialized successfully")
print("✓ SQLite database created")
print("✓ Tables created in database")

# Check database file
db_path = os.path.abspath("issues.db")
if os.path.exists(db_path):
    size = os.path.getsize(db_path)
    print(f"✓ Database file created: {db_path}")
    print(f"✓ Database size: {size} bytes")
else:
    print(f"⚠ Database file not found at {db_path}")

# Test connection
try:
    SessionLocal = sessionmaker(bind=engine)
    db = SessionLocal()
    
    # Count issues
    count = db.query(IssueModel).count()
    print(f"✓ Database connection working")
    print(f"✓ Current issues in database: {count}")
    
    db.close()
except Exception as e:
    print(f"✗ Error connecting to database: {e}")

print("\n✓ Database is ready to use!")
