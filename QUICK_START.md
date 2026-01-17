# 🚀 Quick Start Guide

## Prerequisites
- Node.js 18+ and npm
- Python 3.11+
- Git

## 5-Minute Setup

### Backend (Terminal 1)
```bash
cd backend
python -m venv venv
# Windows:
venv\Scripts\activate
# macOS/Linux:
source venv/bin/activate

pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```
✅ API ready at http://localhost:8000/docs

### Frontend (Terminal 2)
```bash
cd frontend
npm install
ng serve
```
✅ App ready at http://localhost:4200

## Login
- **URL**: http://localhost:4200
- **Demo Account**: 
  - Username: alice
  - Email: alice@example.com
  - Password: password123

Or create a new account on the Register page.

## Test Features
1. 📋 View issues list
2. 🔍 Search and filter
3. ➕ Create new issue
4. ✏️ Edit an issue
5. 🗑️ Delete an issue
6. 📊 View statistics

## API Playground
Visit http://localhost:8000/docs for interactive API documentation

## Key Files Changed
✅ **backend/requirements.txt** - Fixed missing dependencies

