# Workshop Videos Guide

This directory will contain video tutorials for the workshop setup process. Each video should be clear, concise, and focus on the specific task.

## Planned Videos

### 1. `account-creation-overview.mp4` (2:15)
**Purpose**: Quick overview of creating all three required accounts  
**Content**:
- Brief intro explaining why these accounts are needed
- Quick walkthrough of GitHub signup process
- Quick walkthrough of Render signup process  
- Quick walkthrough of Anthropic Console signup
- Tips for keeping track of login credentials

### 2. `fork-clone-tutorial.mp4` (3:45)
**Purpose**: Complete guide to forking and cloning the repository  
**Content**:
- Navigate to the workshop repository
- Fork the repository (show fork dialog)
- Clone using Git command line
- Alternative: Download as ZIP
- Verify files are on local computer
- Common troubleshooting tips

### 3. `render-deployment.mp4` (2:30)
**Purpose**: Deploy workshop to Render step-by-step  
**Content**:
- Navigate to Render dashboard
- Create new web service
- Connect GitHub account
- Select forked repository
- Review auto-detected settings
- Deploy and wait for completion
- Test live URL

### 4. `api-key-setup.mp4` (2:00)
**Purpose**: Configure Anthropic API key for AI chat  
**Content**:
- Navigate to Anthropic Console
- Access API Keys in Settings
- Create new API key
- Copy the key (security reminder)
- Navigate to Render environment settings
- Add ANTHROPIC_API_KEY variable
- Redeploy and test AI chat

### 5. `complete-setup-walkthrough.mp4` (8:00) - Optional
**Purpose**: Full end-to-end setup process  
**Content**: All steps from start to finish in one video

## Video Specifications

- **Format**: MP4 (H.264 encoding)
- **Resolution**: 1920x1080 minimum (1080p)
- **Frame Rate**: 30fps
- **Audio**: Clear narration, no background music
- **Duration**: Keep individual videos under 4 minutes
- **File Size**: Optimize for web (target under 50MB per video)

## Video Content Guidelines

### Recording Tips
1. **Screen Resolution**: Use consistent 1920x1080 resolution
2. **Browser Setup**: Clean browser, zoom level at 100%
3. **Mouse Highlighting**: Use cursor highlighting or clicks
4. **Pacing**: Move slowly enough to follow, pause at key moments
5. **Narration**: Explain what you're doing and why

### Script Structure
1. **Intro** (5-10 seconds): "In this video, we'll..."
2. **Steps** (bulk of video): Clear step-by-step actions
3. **Verification** (10-15 seconds): "You'll know it worked when..."
4. **Outro** (5 seconds): "Next, we'll..." or "That's it!"

### Common Elements to Include
- Clear explanation of what step achieves
- Where to find buttons/links (be specific)
- What to expect when something is loading
- How to know when step is complete
- Common mistakes to avoid

## Placeholder Integration

The HTML currently shows video placeholders with:
- Play button (▶)
- Video title
- Duration badge
- Description

These will be replaced with actual embedded videos when available.

## Hosting Options

Consider these platforms for video hosting:
1. **YouTube** (unlisted videos) - Free, reliable
2. **Vimeo** - Professional, customizable player
3. **Direct hosting** - Host MP4 files directly (larger bandwidth usage)

## Implementation Notes

When videos are ready:
1. Replace video-placeholder divs with actual video embeds
2. Maintain same styling and responsive behavior
3. Keep fallback text for accessibility
4. Test on mobile devices