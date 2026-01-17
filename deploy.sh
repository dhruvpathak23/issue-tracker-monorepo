#!/bin/bash
# Issue Tracker - Deployment Script

set -e

echo "🚀 Issue Tracker Deployment Helper"
echo "===================================="
echo ""

# Check if git is initialized
if [ ! -d ".git" ]; then
    echo "⚠️  Git not initialized. Initializing..."
    git init
    git add .
    git commit -m "Initial commit: Issue Tracker Application"
    echo "✅ Git initialized"
fi

# Check current git status
echo "📊 Checking git status..."
git status

echo ""
echo "🔑 Deployment Options:"
echo "1. Railway.app (Recommended - Easiest)"
echo "2. Render.com"
echo "3. Docker Hub + Cloud Provider"
echo "4. Manual Docker Deployment"
echo ""

read -p "Select deployment option (1-4): " option

case $option in
    1)
        echo ""
        echo "🚂 Railway.app Deployment"
        echo "========================="
        echo ""
        echo "Steps to deploy on Railway:"
        echo "1. Go to https://railway.app"
        echo "2. Sign up or log in with GitHub"
        echo "3. Create new project → Deploy from GitHub repo"
        echo "4. Select this repository"
        echo "5. Create separate services for backend and frontend"
        echo "6. Configure environment variables"
        echo "7. Deploy!"
        echo ""
        echo "📝 Remember to update frontend API URL after backend deploys"
        echo ""
        ;;
    2)
        echo ""
        echo "🎨 Render.com Deployment"
        echo "========================"
        echo ""
        echo "Steps to deploy on Render:"
        echo "1. Go to https://render.com"
        echo "2. Sign up or log in with GitHub"
        echo "3. Create new Web Service for backend"
        echo "4. Create new Static Site for frontend"
        echo "5. Deploy!"
        echo ""
        ;;
    3)
        echo ""
        echo "🐳 Docker Hub + Cloud Provider"
        echo "==============================="
        echo ""
        echo "Build Docker images:"
        echo "docker build -t yourusername/issue-tracker-backend:latest ./backend"
        echo "docker build -t yourusername/issue-tracker-frontend:latest ./frontend"
        echo ""
        echo "Push to Docker Hub:"
        echo "docker push yourusername/issue-tracker-backend:latest"
        echo "docker push yourusername/issue-tracker-frontend:latest"
        echo ""
        echo "Then deploy on AWS, Azure, Google Cloud, or DigitalOcean"
        echo ""
        ;;
    4)
        echo ""
        echo "🐳 Manual Docker Deployment"
        echo "==========================="
        echo ""
        
        # Check if Docker is installed
        if ! command -v docker &> /dev/null; then
            echo "❌ Docker is not installed. Please install Docker first."
            exit 1
        fi
        
        echo "Building Docker images..."
        docker build -t issue-tracker-backend ./backend
        docker build -t issue-tracker-frontend ./frontend
        
        echo ""
        echo "✅ Docker images built successfully!"
        echo ""
        echo "To run locally:"
        echo "docker-compose -f docker-compose.prod.yml up -d"
        echo ""
        echo "To push to Docker Hub:"
        echo "docker tag issue-tracker-backend yourusername/issue-tracker-backend:latest"
        echo "docker tag issue-tracker-frontend yourusername/issue-tracker-frontend:latest"
        echo "docker push yourusername/issue-tracker-backend:latest"
        echo "docker push yourusername/issue-tracker-frontend:latest"
        echo ""
        ;;
    *)
        echo "❌ Invalid option. Please select 1-4."
        exit 1
        ;;
esac

echo ""
echo "📚 For detailed instructions, see DEPLOYMENT_GUIDE.md"
echo ""
echo "🔗 Useful Links:"
echo "  - Railway Docs: https://docs.railway.app"
echo "  - Render Docs: https://render.com/docs"
echo "  - Docker Docs: https://docs.docker.com"
echo ""
echo "✨ Good luck with your deployment!"
