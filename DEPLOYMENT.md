# Deploying to Render

## Quick Setup (5 minutes)

### 1. Push to GitHub
```bash
git init
git add .
git commit -m "Initial workshop setup"
git branch -M main
git remote add origin https://github.com/your-username/claude-code-workshop.git
git push -u origin main
```

### 2. Deploy to Render
1. Go to [render.com](https://render.com) and sign up/login
2. Click **"New +"** → **"Web Service"**
3. Connect your GitHub repository
4. Render will auto-detect settings from `render.yaml`
5. Add your **Environment Variable**:
   - Key: `ANTHROPIC_API_KEY`
   - Value: `your_actual_api_key_here`
6. Click **"Create Web Service"**

### 3. Workshop Ready!
- Your workshop will be live at: `https://your-service-name.onrender.com`
- Share this URL with workshop attendees
- Deployment takes ~2-3 minutes

## Environment Variables Needed

| Variable | Value | Description |
|----------|--------|-------------|
| `ANTHROPIC_API_KEY` | `sk-ant-...` | Your Claude API key (required) |
| `NODE_ENV` | `production` | Auto-set by Render |
| `PORT` | `3000` | Auto-set by Render |

## Custom Domain (Optional)

To use `workshop.ivey.ca` or similar:
1. In Render dashboard → Settings → Custom Domains
2. Add your domain
3. Update DNS records as shown
4. SSL certificate auto-generated

## Updating the Workshop

After deployment, any changes you push to GitHub will automatically redeploy:
```bash
git add .
git commit -m "Update workshop content"
git push
```

## Free Tier Limits

Render's free tier includes:
- ✅ **750 hours/month** (more than enough)
- ✅ **Custom domains** and SSL
- ✅ **Automatic deployments**
- ❌ **Sleeps after 15 min** of inactivity (wakes in ~10 seconds)

For workshops, the brief wake-up time is usually not noticeable.

## Alternative: Paid Plan ($7/month)

For always-on hosting during workshop series:
- **No sleep** - instant access
- **Better performance**
- **Priority support**

## Troubleshooting

### Common Issues:
1. **"API key not configured"** → Add `ANTHROPIC_API_KEY` in Render dashboard
2. **Build fails** → Check Node.js version in `package.json`
3. **Service won't start** → Check logs in Render dashboard

### Health Check:
Visit `/api/health` to verify:
- Server is running
- API key is configured
- All systems operational

## Security Notes

✅ **API key stored securely** in Render (not in code)  
✅ **HTTPS automatically** enabled  
✅ **No sensitive data** logged or stored permanently  
✅ **CORS properly configured** for browser security  

Perfect for sharing with workshop attendees!