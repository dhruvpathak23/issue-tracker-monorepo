# 🚂 How to Fix the Railway Build Error

## The Problem
Railway analyzed your root directory and found both `backend/` and `frontend/` folders, but doesn't know which one to build. In a monorepo, you need **separate services** for each.

## The Solution: Create Two Services on Railway

### Step 1: Delete the Failed Project
1. Go to your Railway dashboard
2. Find the "issue-tracker-monorepo" project that failed
3. Click the project name at the top
4. Go to **Settings** → **Danger Zone**
5. Click **Delete Project**
6. Confirm deletion

### Step 2: Create Backend Service
1. Go to Railway dashboard
2. Click **"New Project"**
3. Select **"Deploy from GitHub repo"**
4. Search for and select: `dhruvpathak23/issue-tracker-monorepo`
5. **IMPORTANT**: When prompted, select the **`backend/` folder** as root
6. Click **Deploy**
7. Railway detects Python and builds automatically
8. Wait for it to finish (should be GREEN ✅)
9. Copy your backend URL (e.g., `https://issue-tracker-backend-xyz.railway.app`)

### Step 3: Create Frontend Service
1. Click **"New Project"** again
2. Select **"Deploy from GitHub repo"**
3. Search for and select: `dhruvpathak23/issue-tracker-monorepo`
4. **IMPORTANT**: When prompted, select the **`frontend/` folder** as root
5. Click **Deploy**
6. Railway detects Node.js and builds automatically
7. Wait for it to finish (should be GREEN ✅)
8. Copy your frontend URL (e.g., `https://issue-tracker-frontend-xyz.railway.app`)

### Step 4: Connect Frontend to Backend
1. In your code editor, open: `frontend/src/environments/environment.prod.ts`
2. Change the `apiUrl` to your backend URL:
   ```typescript
   export const environment = {
     production: true,
     apiUrl: 'https://issue-tracker-backend-xyz.railway.app'  // ← Your actual URL
   };
   ```
3. Commit and push:
   ```bash
   git add frontend/src/environments/environment.prod.ts
   git commit -m "Update API URL for production"
   git push
   ```
4. Frontend auto-redeploys with correct API URL ✨

### Step 5: Test Your Live App
1. Visit your frontend URL in browser
2. Register a new account
3. Create an issue
4. Visit backend URL to see live database dashboard
5. Should all work! 🎉

## Why Two Services?
- Each service has its own configuration
- Backend runs on Python/FastAPI
- Frontend runs on Node.js/Angular
- They deploy independently
- They scale independently

## Troubleshooting

**Q: I don't see an option to select a folder?**
A: Some versions of Railway UI are different. Look for "Root Directory" or "Source Path" setting.

**Q: Build still failing?**
A: Check the build logs in Railway dashboard. Common issues:
- Missing dependencies (check `requirements.txt` or `package.json`)
- Wrong Node.js version (should be 18.x)
- Wrong Python version (should be 3.11+)

**Q: Can't find my GitHub repo?**
A: Make sure it's public! Go to GitHub → Settings → Change visibility if needed.

## Next Steps After Both Are Live

1. **Share Your Live App** 🎉
   ```
   "Just deployed my Issue Tracker!
   🎯 Check it out: https://your-frontend-url
   Built with FastAPI + Angular
   Source: https://github.com/dhruvpathak23/issue-tracker-monorepo"
   ```

2. **Monitor Your Apps**
   - Check Railway dashboard daily
   - Monitor logs for errors
   - Check metrics

3. **Make Updates**
   - Edit code
   - Push to GitHub
   - Railway auto-redeploys! 🚀

Good luck! You're almost there! 🚂
