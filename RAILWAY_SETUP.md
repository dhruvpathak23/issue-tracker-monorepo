# Railway.app Step-by-Step Deployment Guide

## Why Railway?
✅ Free tier available  
✅ Auto-deploys on GitHub push  
✅ Built-in database support  
✅ Custom domains  
✅ Environment variables management  
✅ 5-minute setup  

---

## Prerequisites
- GitHub account with this repository
- Railway.app account (free)

---

## Part 1: Deploy Backend

### Step 1: Create Railway Account
1. Go to https://railway.app
2. Click "Sign Up"
3. Choose "GitHub"
4. Authorize Railway to access your GitHub

### Step 2: Create Backend Project
1. Click "New Project" on Railway dashboard
2. Select "Deploy from GitHub repo"
3. Find and select `issue-tracker-monorepo`
4. Railway shows your repo contents
5. Click "Deploy"
6. Railway auto-detects it's a Python project
7. Installation starts automatically ✨

### Step 3: Wait for Deployment
- Watch the logs scroll by
- Wait for "Deployed" status
- Railway shows your backend URL:
  ```
  https://issue-tracker-backend-xyz.railway.app
  ```
  **SAVE THIS URL - You'll need it for frontend!**

### Step 4: Test Backend
Visit this URL in your browser:
```
https://issue-tracker-backend-xyz.railway.app
```

You should see:
- ✅ Database Viewer dashboard
- ✅ User count and issue count
- ✅ Tables showing sample data
- ✅ Auto-refresh every 5 seconds

---

## Part 2: Deploy Frontend

### Step 1: Create Frontend Project
1. On Railway dashboard, click "New Project"
2. Select "Deploy from GitHub repo" again
3. Select same `issue-tracker-monorepo` repo
4. Click "Deploy"

### Step 2: Configure Frontend Service
1. Click the frontend service to open settings
2. Go to "Settings" tab
3. Find "Build" section:
   - **Build Command**: `npm run build`
   - **Start Command**: `npx http-server dist/issue-tracker-frontend -p $PORT`
   - **Node Version**: `18` (should auto-detect)

4. Save changes
5. Railway redeploys with correct settings
6. Get your frontend URL:
   ```
   https://issue-tracker-frontend-xyz.railway.app
   ```

---

## Part 3: Connect Frontend to Backend (CRITICAL!)

The frontend needs to know where the backend API is!

### Step 1: Edit Frontend Environment File
1. Open your code editor
2. Go to: `frontend/src/environments/environment.prod.ts`
3. Update the `apiUrl`:

```typescript
export const environment = {
  production: true,
  apiUrl: 'https://issue-tracker-backend-xyz.railway.app'  // ← Your actual backend URL
};
```

### Step 2: Commit and Push
```bash
git add frontend/src/environments/environment.prod.ts
git commit -m "Update API URL for production"
git push origin main
```

### Step 3: Wait for Auto-Redeploy
- Railway automatically detects the GitHub push
- Frontend rebuilds with new API URL
- Watch logs for "Deployed" status
- Takes about 1-2 minutes

---

## Part 4: Test Your Live App! 🎉

### Step 1: Visit Frontend
Click the frontend URL from Railway dashboard:
```
https://issue-tracker-frontend-xyz.railway.app
```

### Step 2: Test Features
- ✅ See login/register page
- ✅ Create account or login
- ✅ Create an issue
- ✅ See issues list
- ✅ Backend live dashboard still works

### Step 3: Check Backend Dashboard
Visit your backend URL to see:
- ✅ Live database viewer
- ✅ User/issue counts
- ✅ Updated data from your frontend activity

---

## Part 5: Share Your App! 📢

### Get Share Link
1. Copy your frontend URL from Railway
2. Format: `https://issue-tracker-frontend-xyz.railway.app`

### Share On:
- 📌 GitHub README
- 🐦 Twitter/X
- 💼 LinkedIn
- 📧 Email to friends
- 💬 Discord/Slack

### Example Share Text:
```
🎯 Check out my Issue Tracker App!
Built with FastAPI + Angular + SQLite
Live at: https://issue-tracker-frontend-xyz.railway.app
Source: https://github.com/yourusername/issue-tracker-monorepo
```

---

## Troubleshooting

### Frontend shows blank page
**Problem**: API URL not updated  
**Solution**: 
1. Update `environment.prod.ts` with correct backend URL
2. Push to GitHub
3. Wait for redeploy

### "Cannot POST /auth/register"
**Problem**: Backend URL wrong in frontend  
**Solution**: Check environment file, redeploy

### Seeing old code
**Problem**: Cache issues  
**Solution**: 
1. Hard refresh browser (Ctrl+Shift+R on Windows, Cmd+Shift+R on Mac)
2. Clear browser cache
3. Check Railway logs for build errors

### Build failed message
**Problem**: Missing dependencies or syntax error  
**Solution**:
1. Check Railway logs for error details
2. Fix issue locally
3. Push to GitHub
4. Railway auto-retries

---

## Railway Dashboard Features

### Monitor Your App
- **Logs**: See real-time application logs
- **Metrics**: CPU, memory, network usage
- **Environment**: View/edit environment variables
- **Domains**: Add custom domain (paid feature)
- **Deployments**: View deployment history

### Useful Environment Variables to Set
In Railway Dashboard → Environment tab:

```
SECRET_KEY = your-secure-key-here
DEBUG = false
LOG_LEVEL = info
```

---

## Adding Custom Domain (Optional)

1. Go to your service in Railway
2. Click "Settings"
3. Look for "Domains" section
4. Add your custom domain
5. Follow DNS setup instructions

---

## Monitoring & Maintenance

### Daily Checks
- [ ] Check Railway logs for errors
- [ ] Test login/registration
- [ ] Create a test issue
- [ ] View backend dashboard

### Weekly
- [ ] Check for Python/Node.js updates
- [ ] Review error logs
- [ ] Check database size

### Monthly
- [ ] Update dependencies
- [ ] Backup database (if important data)
- [ ] Review costs (should be free tier)

---

## Useful Railway Commands

```bash
# See your deployed projects
railway service list

# View logs for a service
railway logs

# Set environment variables
railway variable set KEY=value

# Check service status
railway status
```

---

## Getting Help

### Railway Support
- Docs: https://docs.railway.app
- GitHub Issues: https://github.com/railwayapp/railway
- Discord: Join Railway community

### FastAPI Issues
- Docs: https://fastapi.tiangolo.com
- GitHub: https://github.com/tiangolo/fastapi

### Angular Issues
- Docs: https://angular.io
- Stack Overflow: Tag [angular]

---

## Success Checklist ✅

- [ ] Backend deployed and accessible
- [ ] Frontend deployed and accessible
- [ ] Frontend API URL updated to backend URL
- [ ] Can login to frontend
- [ ] Can create issues
- [ ] Backend database viewer shows live data
- [ ] App shared with others
- [ ] Monitoring enabled

---

## You're Live! 🚀

Your Issue Tracker is now live on the internet!

**Frontend**: `https://issue-tracker-frontend-xyz.railway.app`  
**Backend**: `https://issue-tracker-backend-xyz.railway.app`  
**Dashboard**: `https://issue-tracker-backend-xyz.railway.app`  

Share these links and enjoy your live app!

---

**Next Steps**:
1. Add features to your app
2. Deploy again (automatic on GitHub push)
3. Invite users to test
4. Gather feedback
5. Improve and repeat!

Happy deploying! 🎉
