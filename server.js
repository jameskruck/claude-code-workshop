const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.static(path.join(__dirname)));

// Serve static files
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// AI Chat endpoint for workshop activities
app.post('/api/chat', async (req, res) => {
    console.log('Chat request received:', req.body);
    
    try {
        const { message, activityType, context } = req.body;
        
        if (!message) {
            console.log('Error: No message provided');
            return res.status(400).json({ error: 'Message is required' });
        }

        if (!process.env.ANTHROPIC_API_KEY) {
            console.log('Error: Anthropic API key not found');
            return res.status(500).json({ error: 'API key not configured' });
        }

        // Build activity-specific system prompt
        let systemPrompt = buildActivityPrompt(activityType, context);

        // Make request to Anthropic API
        const response = await fetch('https://api.anthropic.com/v1/messages', {
            method: 'POST',
            headers: {
                'x-api-key': process.env.ANTHROPIC_API_KEY,
                'Content-Type': 'application/json',
                'anthropic-version': '2023-06-01'
            },
            body: JSON.stringify({
                model: 'claude-3-haiku-20240307',
                max_tokens: 800,
                messages: [
                    { 
                        role: 'user', 
                        content: `${systemPrompt}\n\nUser: ${message}` 
                    }
                ]
            })
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error('Anthropic API Error:', errorData);
            return res.status(500).json({ error: 'AI service temporarily unavailable' });
        }

        const data = await response.json();
        const aiResponse = data.content[0]?.text || 'Sorry, I couldn\'t generate a response.';

        res.json({ response: aiResponse });

    } catch (error) {
        console.error('Chat endpoint error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Build context-specific prompts for different activities
function buildActivityPrompt(activityType, context) {
    const baseContext = `You are an AI assistant helping Learning Experience Designers at Ivey Business School (Western University) during a Claude Code workshop. You specialize in educational technology and understand the unique needs of business education.

Key context about Ivey:
- Premier business school focusing on case-based learning
- Students are MBA candidates and executives
- Faculty emphasize practical application and leadership development
- Technology should enhance, not complicate, learning experiences
- Budget-conscious environment favoring simple, effective solutions`;

    switch (activityType) {
        case 'idea-generation':
            return `${baseContext}

You are helping brainstorm educational tool ideas. Focus on:
1. Tools that solve real problems in business education
2. Simple solutions that can be built quickly with AI assistance
3. Ideas that enhance case discussions, group work, or skill development
4. Tools that work well for both in-person and remote learning
5. Solutions that save instructor time while improving student engagement

Provide 3-4 specific, actionable ideas with brief explanations of their educational value. Be encouraging and practical.`;

        case 'project-refinement':
            return `${baseContext}

You are helping refine a specific educational tool idea. Focus on:
1. Clarifying the core problem the tool solves
2. Identifying the minimum viable features
3. Suggesting simple implementation approaches
4. Considering the user experience for both students and faculty
5. Thinking about how this fits into existing Ivey workflows

Ask clarifying questions and provide specific, actionable suggestions. Keep solutions simple and achievable.`;

        case 'technical-guidance':
            return `${baseContext}

You are providing technical guidance for building educational tools. Focus on:
1. Breaking down complex ideas into simple components
2. Recommending beginner-friendly technologies and approaches
3. Suggesting realistic timelines and development phases
4. Providing specific prompts they can use with Claude Code
5. Considering hosting and deployment options suitable for educational use

Be practical, encouraging, and provide step-by-step guidance. Assume limited technical background.`;

        case 'implementation-support':
            return `${baseContext}

You are helping with the actual building process. Focus on:
1. Troubleshooting specific issues or challenges
2. Suggesting improvements to existing tools
3. Helping adapt generic solutions to Ivey's specific needs
4. Providing specific code suggestions or Claude Code prompts
5. Helping plan next steps and iterations

Be specific, practical, and provide actionable advice. Help them think through both technical and pedagogical considerations.`;

        default:
            return `${baseContext}

You are a general assistant helping with educational tool development. Provide helpful, context-appropriate guidance based on their question. Focus on practical solutions that work well in business education environments.`;
    }
}

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({ 
        status: 'OK', 
        timestamp: new Date().toISOString(),
        hasApiKey: !!process.env.ANTHROPIC_API_KEY,
        apiKeyPrefix: process.env.ANTHROPIC_API_KEY ? process.env.ANTHROPIC_API_KEY.substring(0, 7) + '...' : 'none'
    });
});

// Feedback endpoint for workshop analytics
app.post('/api/feedback', (req, res) => {
    try {
        const feedback = req.body;
        console.log('Workshop feedback received:', feedback);
        
        // Add timestamp if not present
        if (!feedback.timestamp) {
            feedback.timestamp = new Date().toISOString();
        }
        
        // In a production environment, you'd save this to a database
        // For now, we'll just log it
        console.log('Feedback logged:', {
            activityType: feedback.activityType,
            helpful: feedback.helpful,
            rating: feedback.rating,
            comment: feedback.comment ? feedback.comment.substring(0, 50) + '...' : 'No comment',
            timestamp: feedback.timestamp
        });
        
        res.json({ success: true, message: 'Feedback received successfully' });
        
    } catch (error) {
        console.error('Feedback endpoint error:', error);
        res.status(500).json({ error: 'Failed to process feedback' });
    }
});

// Analytics endpoint for workshop insights
app.post('/api/analytics', (req, res) => {
    try {
        const analyticsData = req.body;
        console.log('Workshop analytics received:', analyticsData);
        
        // Log useful workshop metrics
        console.log('Analytics summary:', {
            sessionId: analyticsData.sessionId,
            activityProgress: analyticsData.activityProgress,
            toolsExplored: analyticsData.toolsExplored,
            promptsCopied: analyticsData.promptsCopied,
            chatInteractions: analyticsData.chatInteractions,
            timestamp: new Date().toISOString()
        });
        
        res.json({ success: true, message: 'Analytics data received' });
        
    } catch (error) {
        console.error('Analytics endpoint error:', error);
        res.status(500).json({ error: 'Failed to process analytics data' });
    }
});

app.listen(PORT, () => {
    console.log(`Claude Code Workshop server running on port ${PORT}`);
    console.log('Workshop features:');
    console.log('- Interactive AI chat for Learning Experience Designers');
    console.log('- Context-aware suggestions for Ivey Business School');
    console.log('- Real-time feedback and analytics');
    console.log('- Educational tool building guidance');
    
    if (!process.env.ANTHROPIC_API_KEY) {
        console.warn('⚠️  ANTHROPIC_API_KEY not found. AI chat will not work.');
        console.log('Add your API key to .env file: ANTHROPIC_API_KEY=your_key_here');
    } else {
        console.log('✅ Anthropic API configured successfully');
    }
});