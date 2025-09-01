# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is an interactive workshop application for Learning Experience Designers at Ivey Business School. The workshop teaches participants how to build educational tools using Claude Code and AI assistance. The application features an AI chat assistant specialized in educational technology, guided activities, and hands-on building experiences.

## Commands

### Development Commands
```bash
# Start the server (production mode)
npm start

# Start with auto-reload (development mode)
npm run dev

# Install dependencies
npm install
```

### Server Operations
```bash
# Start on specific port
PORT=3001 node server.js
PORT=3002 node server.js  
PORT=3005 node server.js

# Check server health
curl http://localhost:3000/api/health
```

### Deployment
```bash
# Deploy to Render (see DEPLOYMENT.md for full instructions)
git add .
git commit -m "Deploy workshop"
git push origin main
```

## Architecture Overview

### Core Components

**Frontend Structure:**
- `index.html` - Main workshop interface with 4 activity sections
- `activities.html` - Interactive workshop activities page
- `setup.html` - Claude Code setup and getting started
- `next-steps.html` - Post-workshop guidance and resources
- `resources.html` - Additional learning materials

**Backend Architecture:**
- `server.js` - Express server with AI chat API and analytics endpoints
- `/api/chat` - AI assistant endpoint with context-aware responses
- `/api/health` - Server health check
- `/api/feedback` - Workshop feedback collection
- `/api/analytics` - Session tracking and metrics

**JavaScript Modules:**
- `script.js` - Main workshop navigation and interactive elements
- `ai-chat-widget.js` - Dedicated AI chat interface with activity-specific contexts

### AI Assistant Context System

The AI assistant (`buildActivityPrompt()` function in server.js:137) provides specialized responses based on activity type:

- `idea-generation` - Brainstorming educational tools
- `project-refinement` - Clarifying and focusing tool ideas  
- `technical-guidance` - Implementation advice and Claude Code prompts
- `implementation-support` - Troubleshooting and iteration help

The assistant automatically loads workshop context from README.md, SESSION_LOG.md, DEPLOYMENT.md, and Starter Pack contents to provide informed responses.

### Workshop Data Integration

The `loadWorkshopData()` function dynamically reads repository files to provide context-aware AI responses, including:
- Repository documentation and guides
- Development history from session logs
- Available starter pack resources
- Deployment configuration

## Environment Configuration

### Required Environment Variables
- `ANTHROPIC_API_KEY` - Claude API key for AI chat functionality
- `PORT` - Server port (defaults to 3000)
- `NODE_ENV` - Environment setting (auto-set in production)

### Configuration Files
- `.env` - Local environment variables (use `.env.example` as template)
- `render.yaml` - Render deployment configuration
- `package.json` - Node.js dependencies and scripts

## Development Workflow

### User Instructions
- **Always commit and push code when completing tasks** - After finishing any development work, commit changes and push to git repository
- **AI Chat requires API key setup** - The workshop's core Activity 2 depends on working AI chat. Ensure ANTHROPIC_API_KEY is configured in environment
- **Workshop timing is realistic** - 75 minutes total with realistic time allocations that account for debugging, questions, and learning pace

### Working with AI Chat
The AI assistant is configured specifically for educational technology in business school contexts. It understands:
- Case-based learning methodologies
- MBA and executive education needs
- Budget-conscious educational solutions
- Integration with existing academic workflows

### Adding New Workshop Content
1. Update HTML files for new activities or sections
2. Modify `buildActivityPrompt()` in server.js for new AI contexts
3. Update navigation in `script.js` if adding new sections
4. Test AI responses with new activity types

### Customization Points
- **AI Context**: Modify `buildActivityPrompt()` for different educational contexts
- **Workshop Structure**: Update HTML files and navigation system
- **Branding**: Modify CSS variables in `styles.css`
- **Tool Templates**: Add new project options in Activity 2 setup section

## Special Permissions

This repository has Claude Code permissions configured for:
- Node.js server operations on multiple ports
- Git operations for deployment workflows
- Access to educational-prompts-hub repository for content integration

## Workshop Analytics

The application tracks participant engagement through:
- Chat interactions with AI assistant
- Project selections and prompt copying
- Progress through workshop activities
- User feedback and ratings

All analytics data is logged to console and can be extended for database storage in production deployments.