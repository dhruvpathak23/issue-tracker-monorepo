@echo off
REM Issue Tracker - Deployment Script for Windows

echo.
echo 🚀 Issue Tracker Deployment Helper
echo ====================================
echo.

REM Check if git is initialized
if not exist ".git" (
    echo ⚠️  Git not initialized. Initializing...
    git init
    git add .
    git commit -m "Initial commit: Issue Tracker Application"
    echo ✅ Git initialized
)

REM Check current git status
echo 📊 Checking git status...
git status

echo.
echo 🔑 Deployment Options:
echo 1. Railway.app (Recommended - Easiest)
echo 2. Render.com
echo 3. Docker Hub + Cloud Provider
echo 4. Manual Docker Deployment
echo.

set /p option="Select deployment option (1-4): "

if "%option%"=="1" (
    echo.
    echo 🚂 Railway.app Deployment
    echo =========================
    echo.
    echo Steps to deploy on Railway:
    echo 1. Go to https://railway.app
    echo 2. Sign up or log in with GitHub
    echo 3. Create new project → Deploy from GitHub repo
    echo 4. Select this repository
    echo 5. Create separate services for backend and frontend
    echo 6. Configure environment variables
    echo 7. Deploy!
    echo.
    echo 📝 Remember to update frontend API URL after backend deploys
    echo.
) else if "%option%"=="2" (
    echo.
    echo 🎨 Render.com Deployment
    echo ========================
    echo.
    echo Steps to deploy on Render:
    echo 1. Go to https://render.com
    echo 2. Sign up or log in with GitHub
    echo 3. Create new Web Service for backend
    echo 4. Create new Static Site for frontend
    echo 5. Deploy!
    echo.
) else if "%option%"=="3" (
    echo.
    echo 🐳 Docker Hub + Cloud Provider
    echo ===============================
    echo.
    echo Build Docker images:
    echo docker build -t yourusername/issue-tracker-backend:latest .\backend
    echo docker build -t yourusername/issue-tracker-frontend:latest .\frontend
    echo.
    echo Push to Docker Hub:
    echo docker push yourusername/issue-tracker-backend:latest
    echo docker push yourusername/issue-tracker-frontend:latest
    echo.
    echo Then deploy on AWS, Azure, Google Cloud, or DigitalOcean
    echo.
) else if "%option%"=="4" (
    echo.
    echo 🐳 Manual Docker Deployment
    echo ===========================
    echo.
    
    REM Check if Docker is installed
    docker --version >nul 2>&1
    if errorlevel 1 (
        echo ❌ Docker is not installed. Please install Docker first.
        exit /b 1
    )
    
    echo Building Docker images...
    docker build -t issue-tracker-backend .\backend
    docker build -t issue-tracker-frontend .\frontend
    
    echo.
    echo ✅ Docker images built successfully!
    echo.
    echo To run locally:
    echo docker-compose -f docker-compose.prod.yml up -d
    echo.
    echo To push to Docker Hub:
    echo docker tag issue-tracker-backend yourusername/issue-tracker-backend:latest
    echo docker tag issue-tracker-frontend yourusername/issue-tracker-frontend:latest
    echo docker push yourusername/issue-tracker-backend:latest
    echo docker push yourusername/issue-tracker-frontend:latest
    echo.
) else (
    echo ❌ Invalid option. Please select 1-4.
    exit /b 1
)

echo.
echo 📚 For detailed instructions, see DEPLOYMENT_GUIDE.md
echo.
echo 🔗 Useful Links:
echo   - Railway Docs: https://docs.railway.app
echo   - Render Docs: https://render.com/docs
echo   - Docker Docs: https://docs.docker.com
echo.
echo ✨ Good luck with your deployment!
echo.
pause
