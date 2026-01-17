# Issue Tracker - Deployment Guide

## 🚀 Public Deployment Options

Choose one of these platforms to deploy your app publicly:

### **Option 1: Railway.app (RECOMMENDED - Easiest)**

Railway.app is the easiest option - it integrates directly with GitHub and deploys automatically.

#### Steps:

1. **Create Railway Account**
   - Go to [railway.app](https://railway.app)
   - Sign up with GitHub

2. **Deploy Backend**
   - Click "New Project" → "Deploy from GitHub repo"
   - Select your `issue-tracker-monorepo` repository
   - Select the `backend` directory
   - Railway will auto-detect Python and install dependencies
   - Set environment variables (if needed):
     - `SECRET_KEY` = your-secure-key
   - Deploy will start automatically

3. **Deploy Frontend**
   - Create another project → "Deploy from GitHub repo"
   - Select same repo, but select `frontend` directory
   - Railway will build with `npm run build`
   - Get your public frontend URL

4. **Configure Frontend API URL**
   - After backend is deployed, you'll get a public URL (e.g., `https://backend-xyz.railway.app`)
   - Update frontend API service with this URL
   - Redeploy frontend

#### Advantages:
- ✅ Free tier available
- ✅ Auto-deploys on GitHub push
- ✅ Built-in database support
- ✅ Custom domain support
- ✅ Environment variable management

---

### **Option 2: Render.com (Also Easy)**

Similar to Railway, very straightforward.

1. Go to [render.com](https://render.com)
2. Connect GitHub account
3. Create new Web Service for backend
4. Create new Static Site for frontend
5. Configure build commands

---

### **Option 3: Docker Hub + Cloud Provider**

Push Docker images to Docker Hub and deploy anywhere.

```bash
# Build Docker images
docker build -t yourusername/issue-tracker-backend:latest ./backend
docker build -t yourusername/issue-tracker-frontend:latest ./frontend

# Push to Docker Hub
docker push yourusername/issue-tracker-backend:latest
docker push yourusername/issue-tracker-frontend:latest
```

Then deploy on:
- **AWS** (ECS, Elastic Beanstalk)
- **Azure** (Container Instances, App Service)
- **Google Cloud** (Cloud Run, GKE)
- **DigitalOcean** (App Platform, Kubernetes)

---

### **Option 4: Heroku (if free tier is available)**

```bash
heroku login
heroku create your-app-name-backend
git push heroku main:main
```

---

## 📝 Quick Setup Checklist

- [ ] Update frontend environment to use live backend API URL
- [ ] Set up environment variables (SECRET_KEY, etc.)
- [ ] Configure CORS on backend for production domain
- [ ] Set up database backups (if needed)
- [ ] Enable HTTPS/SSL
- [ ] Add custom domain (optional)
- [ ] Set up monitoring/logging

---

## 🔗 Frontend Environment Configuration

Create an environment file for production:

```typescript
// frontend/src/environments/environment.prod.ts
export const environment = {
  production: true,
  apiUrl: 'https://your-backend-url.railway.app'  // Update this!
};
```

---

## 🛡️ Security Checklist

- [ ] Change `SECRET_KEY` to a strong random value
- [ ] Enable HTTPS (all platforms do this automatically)
- [ ] Set `CORS_ORIGINS` to your frontend domain only
- [ ] Use environment variables for sensitive data
- [ ] Keep dependencies updated
- [ ] Enable database encryption (if supported)

---

## 📊 Monitoring & Logs

Most platforms provide built-in logging:
- **Railway**: View logs in dashboard
- **Render**: Real-time logs in UI
- **Azure**: Application Insights
- **AWS**: CloudWatch

---

## 💡 Next Steps

1. **Choose Platform**: Railway recommended for ease
2. **Push to GitHub**: Make sure your code is on GitHub
3. **Connect Platform**: Follow platform's GitHub integration
4. **Monitor**: Check logs and health status
5. **Share URL**: Get your public app link and share!

---

**Need Help?**
- Railway Docs: https://docs.railway.app
- Render Docs: https://render.com/docs
- FastAPI Deployment: https://fastapi.tiangolo.com/deployment/
- Angular Deployment: https://angular.io/guide/deployment
