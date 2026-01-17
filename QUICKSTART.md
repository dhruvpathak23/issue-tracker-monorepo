# Quick Start Guide - Issue Tracker

## Prerequisites
- Node.js & npm (for Angular frontend)
- Python 3.7+ (for FastAPI backend)
- Docker & Docker Compose (optional, for containerized deployment)

---

## Local Development Setup

### 1. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Create virtual environment (optional but recommended)
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Start the server
uvicorn main:app --reload --port 8000
```

**Backend will be available at:** `http://localhost:8000`
**API Documentation:** `http://localhost:8000/docs` (Swagger UI)

---

### 2. Frontend Setup

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start the development server
ng serve
# or: npm start
```

**Frontend will be available at:** `http://localhost:4200`

---

## Docker Deployment

### Using Docker Compose (Recommended)

```bash
# From the monorepo root directory
docker-compose up --build

# Access:
# - Frontend: http://localhost:80
# - Backend API: http://localhost:8000
# - API Docs: http://localhost:8000/docs
```

### Stop containers:
```bash
docker-compose down
```

---

## API Endpoints

### Health Check
```bash
GET http://localhost:8000/health
```

### List Issues
```bash
GET http://localhost:8000/issues
# Query parameters:
#   - search=<string>
#   - status=open|closed
#   - priority=low|medium|high
#   - assignee=<string>
#   - sort=<field> (prefix with - for desc, e.g., -updatedAt)
#   - page=<number> (default: 1)
#   - pageSize=<number> (default: 10)
```

### Get Single Issue
```bash
GET http://localhost:8000/issues/{issue_id}
```

### Create Issue
```bash
POST http://localhost:8000/issues
Content-Type: application/json

{
  "title": "Fix login bug",
  "status": "open",
  "priority": "high",
  "assignee": "alice"  # optional
}
```

### Update Issue
```bash
PUT http://localhost:8000/issues/{issue_id}
Content-Type: application/json

{
  "title": "Updated title",
  "status": "closed",
  "priority": "medium",
  "assignee": "bob"
}
```

### Delete Issue
```bash
DELETE http://localhost:8000/issues/{issue_id}
```

---

## Project Structure

```
frontend/
  ├── src/
  │   ├── app/
  │   │   ├── components/
  │   │   │   ├── issue-list/
  │   │   │   ├── issue-detail/
  │   │   │   └── issue-form/
  │   │   ├── services/
  │   │   │   └── issue.service.ts
  │   │   ├── app.module.ts
  │   │   ├── app-routing.module.ts
  │   │   └── app.component.ts
  │   └── environments/
  │       └── environment.ts

backend/
  ├── main.py
  ├── requirements.txt
  └── Dockerfile
```

---

## Features

### Issue Management
- ✓ Create, read, update, delete issues
- ✓ Assign issues to team members
- ✓ Set priority levels (low, medium, high)
- ✓ Track status (open, closed)

### Search & Filter
- ✓ Full-text search by title
- ✓ Filter by status
- ✓ Filter by priority
- ✓ Filter by assignee
- ✓ Pagination

### User Interface
- ✓ Clean, professional design
- ✓ Responsive layout
- ✓ Form validation
- ✓ Real-time feedback
- ✓ Color-coded badges

---

## Troubleshooting

### Backend Issues

**Port 8000 already in use:**
```bash
# Use a different port
uvicorn main:app --port 8001
# Then update frontend environment.ts with new URL
```

**Module not found:**
```bash
# Reinstall dependencies
pip install -r requirements.txt --force-reinstall
```

### Frontend Issues

**Node modules errors:**
```bash
# Clean install
rm -rf node_modules package-lock.json
npm install
```

**Port 4200 already in use:**
```bash
ng serve --port 4201
```

### Docker Issues

**Images not updating:**
```bash
docker-compose up --build --force-recreate
```

**Container permission errors:**
```bash
# On Windows, ensure Docker daemon is running
# On Linux, might need sudo or group permissions
```

---

## Development Tips

1. **Auto-reload during development:**
   - Backend: `uvicorn main:app --reload`
   - Frontend: `ng serve` (automatic hot reload)

2. **View API documentation:**
   - Go to `http://localhost:8000/docs` for interactive Swagger UI

3. **Debug API calls:**
   - Open browser DevTools → Network tab
   - Check the XHR/Fetch requests to see API communication

4. **Backend data reset:**
   - Restart the backend server to reset in-memory database
   - Sample data is auto-seeded on startup

---

## Next Steps

1. Extend to use a persistent database (SQLite/PostgreSQL)
2. Add user authentication
3. Implement issue comments
4. Add automated testing
5. Deploy to cloud (AWS, Azure, GCP)

---

## Support

For issues or questions, refer to:
- Angular docs: https://angular.io
- FastAPI docs: https://fastapi.tiangolo.com
- Docker docs: https://docs.docker.com
