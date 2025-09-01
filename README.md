# Claude Code Workshop

An interactive workshop for Learning Experience Designers at Ivey Business School to discover and build educational tools using Claude Code and AI assistance.

## Features

### 🤖 **AI-Powered Idea Generation**
- Real-time chat with AI assistant specialized in educational technology
- Context-aware suggestions tailored for Ivey Business School
- Understands case-based learning, MBA programs, and business education needs

### 🛠️ **Hands-on Building Experience**
- Step-by-step guidance to build real educational tools
- Ready-to-use prompts for Claude Code
- Interactive progress tracking and checklists

### 📊 **Professional Workshop Interface**
- Clean, responsive design matching Ivey branding
- Progress tracking and analytics
- Mobile-friendly for tablets and phones

## Quick Start

### 1. Prerequisites
- Node.js 18+ installed
- Anthropic API key (for AI chat functionality)

### 2. Installation
```bash
# Clone or download this repository
cd claude-code-workshop

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env and add your ANTHROPIC_API_KEY
```

### 3. Configuration

**⚠️ IMPORTANT: AI Chat Setup Required**

The workshop's AI assistant requires an Anthropic API key to work. Without this, participants won't be able to use the AI chat feature that's central to Activity 2.

#### Get Your API Key:
1. Go to [console.anthropic.com](https://console.anthropic.com/) 
2. Sign up or log in with your Anthropic account
3. Navigate to **Settings → API Keys**
4. Click **"Create Key"** and copy the key (starts with `sk-ant-`)

#### Add to Your Environment:
Create a `.env` file in your project root:
```bash
# Copy from .env.example and update with your key
cp .env.example .env
```

Edit `.env` and add your key:
```
ANTHROPIC_API_KEY=sk-ant-your_actual_api_key_here
```

#### For Render Deployment:
1. In your Render dashboard → your service → **Environment** tab
2. Add variable: `ANTHROPIC_API_KEY` = your API key
3. Click **"Save Changes"** (service will redeploy automatically)

### 4. Run the Workshop
```bash
# Start the server
npm start

# For development with auto-reload
npm run dev
```

### 5. Access the Workshop
Open your browser to `http://localhost:3000`

## Workshop Structure

### Activity 1: AI-Powered Idea Generation (15 min)
- Interactive chat with AI assistant
- Tailored suggestions for Ivey's educational context
- Brainstorming tools and techniques

### Activity 2: Set Up & Start Building (10 min)
- Access Claude Code
- Copy ready-made prompts for different tool types
- Begin development process

### Activity 3: Build & Customize (25 min)
- Work with Claude Code to create tools
- Interactive progress checklist
- Building tips and common follow-up requests

### Activity 4: Share & Deploy (10 min)
- Share tools via Claude Code preview
- Optional permanent deployment guidance
- Plan next projects

## Educational Tool Options

The workshop includes four beginner-friendly project templates:

1. **🔄 Student Feedback Collector** - Forms with ratings and comments
2. **⏰ Study Session Timer** - Pomodoro-style timer with breaks
3. **📝 Quick Quiz Builder** - Multiple-choice quiz creation and taking
4. **📔 Learning Journal** - Daily reflection with guided prompts

## AI Assistant Capabilities

The integrated AI assistant understands:
- Ivey Business School's case-based learning approach
- MBA and executive education contexts
- Budget-conscious educational technology needs
- Integration with existing workflows
- Simple, practical implementation approaches

## Deployment

### For Render (Recommended)
1. Connect your GitHub repository to Render
2. Create a new Web Service
3. Configure:
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Environment Variables**: Add your `ANTHROPIC_API_KEY`

### For Other Platforms
The application is compatible with:
- Heroku
- Vercel
- Railway
- DigitalOcean App Platform
- Any Node.js hosting service

## Customization

### Adding New Project Templates
1. Add new option to `build-options` in `index.html`
2. Create corresponding prompt template in Activity 2
3. Update the project selection JavaScript in `script.js`

### Modifying AI Context
Edit the `buildActivityPrompt()` function in `server.js` to customize the AI assistant's knowledge and responses for your specific context.

### Styling Changes
- Colors: Update CSS variables for institutional branding
- Typography: Modify font families in `styles.css`
- Layout: Adjust grid systems and spacing

## Analytics & Feedback

The workshop tracks:
- Chat interactions with AI assistant
- Project selections and prompt copying
- Progress through activities
- User feedback and ratings

Data is stored locally in browser storage for privacy and can be exported for analysis.

## Browser Support

- Chrome/Edge 60+
- Firefox 55+
- Safari 11+
- Mobile browsers (responsive design)

## Security Notes

- API keys are stored server-side only
- No user data is permanently stored by default
- All interactions are logged for workshop improvement
- HTTPS recommended for production deployment

## Support

For technical issues or questions about the workshop:
- Check the browser console for error messages
- Ensure your Anthropic API key is correctly configured
- Verify Node.js version compatibility
- Review the server logs for debugging information

## License

MIT License - This workshop is designed for educational use at Ivey Business School.

---

**Built for Ivey Business School EdTech Lab**  
Empowering Learning Experience Designers with AI-assisted tool development.