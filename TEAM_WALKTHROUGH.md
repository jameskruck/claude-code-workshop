# Claude Code Workshop - Complete Team Walkthrough

*A comprehensive guide for Learning Experience Designers getting started with AI-assisted development*

---

## 🎯 Workshop Overview

This workshop teaches you to build educational tools using **Claude Code** - Anthropic's AI-powered development environment. You'll go from idea to deployed application in under an hour.

### What You'll Accomplish Today
- ✅ **Deploy your own workshop environment** with AI chat capabilities
- ✅ **Build a working educational tool** from scratch using Claude Code  
- ✅ **Deploy your tool online** for students and colleagues to use
- ✅ **Master the AI development workflow** for future projects

---

## 📋 Part 1: Pre-Workshop Setup (15 minutes)

Complete these steps BEFORE the live session to maximize hands-on time.

### Step 1: Create Required Accounts

**GitHub Account (Free)**
1. Go to [github.com](https://github.com) 
2. Sign up with your **work email** (keeps projects organized)
3. Verify your email address
4. ✅ **Checkpoint:** You can create repositories

**Render Account (Free)**  
1. Go to [render.com](https://render.com)
2. Click **"Sign Up"** and use **"Sign up with GitHub"**
3. Authorize Render to access your repositories
4. ✅ **Checkpoint:** You see the Render dashboard

**Anthropic Account (Pro/Max Required)**
1. Go to [console.anthropic.com](https://console.anthropic.com)
2. Sign up and complete email verification
3. Go to **Settings → API Keys**
4. Click **"Create Key"** and copy it somewhere safe
5. ✅ **Checkpoint:** You have an API key starting with `sk-ant-`

> 💡 **Cost Note:** Claude Code requires a Claude Pro ($20/month) or Max ($40/month) subscription, or Console access with billing setup. GitHub and Render offer free tiers sufficient for workshop needs.

### Step 2: Fork the Workshop Repository

1. Go to [github.com/jameskruck/claude-code-workshop](https://github.com/jameskruck/claude-code-workshop)
2. Click **"Fork"** in the top-right corner
3. Keep all default settings and click **"Create fork"**
4. ✅ **Checkpoint:** You now have `your-username/claude-code-workshop`

### Step 3: Deploy Your Workshop

**Deploy to Render:**
1. In Render dashboard, click **"New +"** → **"Web Service"**
2. Select your forked `claude-code-workshop` repository
3. Keep all default settings (Render detects everything automatically)
4. Click **"Create Web Service"**
5. Wait 2-3 minutes for deployment to complete

**Add Your API Key:**
1. In Render, go to your service → **"Environment"** tab
2. Add environment variable:
   - **Key:** `ANTHROPIC_API_KEY`  
   - **Value:** [paste your Anthropic API key]
3. Click **"Save Changes"** (service will redeploy automatically)

**Test Your Workshop:**
1. Click your service URL (e.g., `https://your-workshop-name.onrender.com`)
2. Try the AI chat in Activity 2 - ask: "What educational tools would help MBA students?"
3. ✅ **Checkpoint:** AI responds with specific suggestions

---

## 🚀 Part 2: Live Workshop Activities (45 minutes)

### Activity 1: AI Idea Generation (10 minutes)

**Goal:** Use AI to brainstorm educational tool ideas tailored to business education.

**What to do:**
1. Navigate to your deployed workshop → Activities section
2. Try the suggested prompts or ask your own questions:
   - "What tools would help case study discussions?"
   - "How can I streamline student feedback collection?"
   - "What simple tools save instructors time?"

**Expected outcome:** 3-4 specific tool ideas with educational rationale

### Activity 2: Select Your Project (5 minutes)

**Choose one project to build:**

🔄 **Student Feedback Collector**
- Simple form with ratings and comments
- Results dashboard for instructors
- *Perfect for:* Course evaluation, session feedback

⏰ **Study Session Timer** 
- Pomodoro-style timer with breaks
- Progress tracking across sessions
- *Perfect for:* Focus techniques, time management training

📝 **Quick Quiz Builder**
- Create multiple-choice quizzes
- Immediate feedback and scoring
- *Perfect for:* Knowledge checks, review sessions

📔 **Learning Journal**
- Daily reflection with guided prompts
- Historical entries and progress view
- *Perfect for:* Leadership development, skill reflection

**Selection tip:** Choose based on immediate need or personal interest - you can build others later!

### Activity 3: Build with Claude Code (20 minutes)

**Step 3.1: Access Claude Code**
1. Open [claude.ai/code](https://claude.ai/code) in a new tab
2. Sign in with your Anthropic account

**Step 3.2: Copy Your Starting Prompt**
1. In your workshop → Activities → Activity 3
2. Select your chosen project and copy the prompt
3. Example for Feedback Collector:
```
Create a student feedback collection web application. Include: a form with name, course, 5-star rating for overall satisfaction, 5-star rating for content quality, text area for comments, and a submit button. Also create a simple results page that shows all submitted feedback in a clean list. Use modern, clean styling with a professional look. Make it mobile-friendly.
```

**Step 3.3: Build and Iterate**
1. Paste prompt into Claude Code and hit Enter
2. Watch as Claude Code creates your application
3. Test the preview - try all features
4. Ask for improvements:
   - "Make the design more modern with better colors"
   - "Add data validation to the form"
   - "Create a way to delete entries"
   - "Improve the mobile layout"

**Success markers:**
- ✅ Core functionality works as expected
- ✅ Design looks professional  
- ✅ Mobile-friendly layout
- ✅ You understand how to request changes

### Activity 4: Deploy Your Tool (10 minutes)

**Step 4.1: Create GitHub Repository**
1. In Claude Code, ask: *"Help me create a new GitHub repository for this project and push all my files. I want to deploy this educational tool online. Walk me through each step."*
2. Follow Claude Code's step-by-step instructions
3. ✅ **Checkpoint:** Your code is on GitHub

**Step 4.2: Deploy to Render**
1. In Render dashboard → **"New +"** → **"Web Service"**
2. Connect your new educational tool repository
3. Keep default settings and deploy
4. ✅ **Checkpoint:** Your tool is live and accessible online!

**Step 4.3: Test and Share**
1. Visit your deployed tool URL
2. Test all features on desktop and mobile
3. Share URL with a colleague for feedback
4. 🎉 **Success:** You've built and deployed an educational tool!

---

## 💡 Part 3: What You've Learned

### The AI Development Workflow

**You now understand the complete process:**

```
💡 Idea → 🤖 AI Build → 🧪 Test → 🔄 Iterate → 🚀 Deploy → 📤 Share
```

**This workflow works for ANY educational tool you can imagine:**
- Student polling systems
- Interactive case study tools  
- Peer review platforms
- Grade calculators
- Schedule coordinators
- Resource libraries

### Key Skills Acquired

**✅ AI Communication**
- How to write effective prompts
- How to request specific improvements
- How to troubleshoot issues with AI assistance

**✅ Development Process**
- Testing applications during development
- Understanding basic web app structure
- Deploying applications to the internet

**✅ Educational Technology**
- Identifying opportunities for simple tools
- Designing user-friendly interfaces
- Planning feature iterations based on feedback

---

## 🚀 Part 4: Your Next Steps

### Immediate Actions (This Week)

**1. Gather Feedback**
- Share your tool with 2-3 colleagues
- Ask: "What works well? What's confusing? What's missing?"
- Document their suggestions

**2. Plan Version 2**  
- Based on feedback, identify 1-2 improvements
- Return to Claude Code and implement changes
- Redeploy updated version

**3. Identify Your Next Tool**
- Look for daily annoyances in your educational work
- Ask: "Could a simple digital tool solve this?"
- Start with paper sketches or mockups

### Building Your Skills (This Month)

**Practice Projects** (Start simple, build complexity)
1. **Personal webpage** - Practice basic design and content
2. **Simple calculator** - Learn form handling and logic
3. **Resource collection tool** - Practice data organization
4. **Your department's specific need** - Apply skills to real problems

**Learning Resources**
- 📖 [Claude Code Documentation](https://docs.anthropic.com/en/docs/claude-code) 
- 🎥 Workshop video recordings (coming soon)
- 💬 Internal EdTech Lab office hours (monthly)

### Advanced Capabilities (Future Exploration)

As you get comfortable, these become possible:
- **API integrations** (connect to Ivey systems)
- **Database storage** (persistent data across sessions)
- **User authentication** (login systems)
- **Email notifications** (automated communications)
- **Advanced styling** (custom branding and design)

---

## 🛠️ Troubleshooting Guide

### Common Issues and Solutions

**🚫 "API key not configured"**
- **Fix:** Add `ANTHROPIC_API_KEY` to Render environment variables
- **Check:** Visit `/api/health` on your deployed site

**⚠️ Claude Code won't load**
- **Fix:** Clear browser cache and try incognito mode
- **Check:** Verify your Anthropic account is active

**❌ Deployment failed**
- **Fix:** Check Render deployment logs for specific errors  
- **Check:** Ensure package.json has correct Node.js version

**🐌 App is slow to load**
- **Reason:** Free Render services "sleep" after 15 minutes
- **Fix:** First visit takes 10-15 seconds (subsequent visits are instant)
- **Upgrade:** $7/month for always-on service

**🔒 Can't push to GitHub**
- **Fix:** Ensure you're pushing to YOUR fork, not the original repo
- **Check:** Git remote URL should include your username

### Getting Help

**During Workshop:**
- 🙋 Ask questions anytime - everyone is learning!
- 💬 Share screens for debugging help
- 🔄 Try slightly different prompts if Claude Code seems stuck

**After Workshop:**
- 📧 Email technical questions: `jkruck@ivey.ca`
- 📅 Monthly office hours (schedule TBA)
- 🔍 Claude Code community forums and documentation

---

## 📊 Success Metrics

**By end of workshop, you should have:**
- ✅ Successfully deployed workshop environment with working AI chat
- ✅ Built and tested a complete educational tool
- ✅ Deployed your tool online with shareable URL
- ✅ Gathered feedback from at least one colleague
- ✅ Identified ideas for your next 2-3 tools

**Longer-term success indicators:**
- 🔄 You regularly use AI for solving small educational challenges
- 🚀 You've built 3+ tools that colleagues actively use
- 💡 You proactively suggest AI solutions during department meetings
- 🎯 You help other educators get started with AI-assisted development

---

## 🎉 Conclusion

**You're now equipped with a superpower:** the ability to rapidly prototype and deploy educational tools using AI assistance. 

**Remember:**
- 🚀 **Start small** - Simple tools often have the biggest impact
- 🔄 **Iterate quickly** - Feedback leads to better tools
- 💡 **Think problems-first** - Technology should solve real challenges
- 🤝 **Share generously** - Your tools can help colleagues too

**Most importantly:** This is just the beginning. Every educational challenge you face is now a potential opportunity to build something helpful.

Welcome to AI-assisted educational technology development! 🎯

---

## 📚 Appendix: Quick Reference

### Essential Claude Code Prompts

**Starting a new project:**
```
Create a [type] web application for [educational purpose]. Include [key features]. Use clean, professional styling and make it mobile-friendly.
```

**Making improvements:**
```
Improve the [specific aspect] of this application. Make it more [adjective] and add [specific feature].
```

**Debugging:**
```
I'm getting this error: [error message]. Here's my code: [code]. Can you help me fix it?
```

**Deployment help:**
```
Help me deploy this to [platform]. Walk me through each step and explain what each command does.
```

### Useful Resources

- 🏠 **Workshop Home:** Your deployed workshop URL
- 💻 **Claude Code:** [claude.ai/code](https://claude.ai/code)
- 📚 **Documentation:** [Claude Code Docs](https://docs.anthropic.com/en/docs/claude-code)
- 🚀 **Render:** [render.com](https://render.com)
- 📁 **GitHub:** [github.com](https://github.com)
- 🔑 **Anthropic API:** [console.anthropic.com](https://console.anthropic.com)

**Built with ❤️ for Ivey EdTech Lab**  
*Empowering educators through AI-assisted development*