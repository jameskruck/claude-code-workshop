// Floating AI Chat Widget
// This widget appears on all workshop pages and provides consistent AI assistance

class AIchatWidget {
    constructor() {
        this.isOpen = false;
        // Start minimized by default for less intrusive experience
        this.isMinimized = true;
        this.chatHistory = [];
        this.init();
    }

    init() {
        // Extra safety check - don't create if embedded chat exists
        const embeddedChatExists = document.getElementById('chat-input') || 
                                  document.getElementById('chat-messages') || 
                                  document.getElementById('send-chat');
        
        if (embeddedChatExists) {
            console.log('Embedded chat detected during init, aborting floating widget creation');
            return;
        }
        
        this.createWidget();
        this.attachEventListeners();
        this.loadChatHistory();
        this.checkApiStatus();
        
        // Start minimized by default for better UX
        if (this.isMinimized) {
            this.minimize();
        }
    }

    createWidget() {
        // Prevent duplicate widgets
        if (document.getElementById('ai-chat-widget')) {
            console.log('AI chat widget already exists, skipping creation');
            return;
        }
        
        // Create the main chat widget container
        const widget = document.createElement('div');
        widget.id = 'ai-chat-widget';
        widget.className = 'ai-chat-widget';
        
        widget.innerHTML = `
            <div class="chat-header" id="chat-header">
                <div class="chat-title">
                    <span class="ai-emoji">🤖</span>
                    <span class="title-text">Workshop AI Assistant</span>
                </div>
                <div class="chat-controls">
                    <button class="control-btn minimize-btn" id="minimize-chat" title="Minimize">−</button>
                    <button class="control-btn close-btn" id="close-chat" title="Close">×</button>
                </div>
            </div>
            
            <div class="chat-body" id="chat-body">
                <div class="chat-messages" id="ai-chat-messages">
                    <div class="ai-message welcome-message">
                        <div class="message-avatar">🤖</div>
                        <div class="message-content">
                            <p><strong>Hi! I'm your workshop assistant.</strong></p>
                            <p>I can help with setup issues, tool ideas, technical guidance, and Claude Code questions. I have access to this workshop's repository data.</p>
                            <p>What can I help you with?</p>
                        </div>
                    </div>
                </div>
                
                <div class="chat-input-container">
                    <div class="input-wrapper">
                        <textarea 
                            id="ai-chat-input" 
                            placeholder="Ask me anything about the workshop..."
                            rows="2"
                        ></textarea>
                        <button id="ai-send-chat" class="send-btn" disabled>
                            <span class="send-icon">→</span>
                        </button>
                    </div>
                    <div class="chat-status" id="ai-chat-status"></div>
                    <div class="quick-suggestions">
                        <button class="suggestion-chip" data-message="I'm having trouble with GitHub setup">GitHub Help</button>
                        <button class="suggestion-chip" data-message="What educational tools should I build?">Tool Ideas</button>
                        <button class="suggestion-chip" data-message="How do I use Claude Code effectively?">Claude Code Tips</button>
                    </div>
                </div>
            </div>
            
            <div class="chat-toggle" id="chat-toggle" style="display: none;">
                <button class="toggle-btn">
                    <span class="ai-emoji">🤖</span>
                    <span class="toggle-text">Need a hand?</span>
                </button>
            </div>
        `;

        // Add widget to page
        document.body.appendChild(widget);
        this.widget = widget;
    }

    attachEventListeners() {
        const chatInput = document.getElementById('ai-chat-input');
        const sendButton = document.getElementById('ai-send-chat');
        const minimizeBtn = document.getElementById('minimize-chat');
        const closeBtn = document.getElementById('close-chat');
        const toggleBtn = document.getElementById('chat-toggle');
        const chatHeader = document.getElementById('chat-header');

        // Input handling
        chatInput.addEventListener('input', () => {
            const hasText = chatInput.value.trim().length > 0;
            sendButton.disabled = !hasText;
            
            // Auto-resize
            chatInput.style.height = 'auto';
            chatInput.style.height = Math.min(chatInput.scrollHeight, 80) + 'px';
        });

        // Send message
        sendButton.addEventListener('click', () => {
            const message = chatInput.value.trim();
            if (message) {
                this.sendMessage(message);
            }
        });

        // Enter to send (Shift+Enter for new line)
        chatInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                const message = chatInput.value.trim();
                if (message && !sendButton.disabled) {
                    this.sendMessage(message);
                }
            }
        });

        // Quick suggestions
        document.querySelectorAll('.suggestion-chip').forEach(chip => {
            chip.addEventListener('click', () => {
                const message = chip.getAttribute('data-message');
                chatInput.value = message;
                sendButton.disabled = false;
                this.sendMessage(message);
            });
        });

        // Controls
        minimizeBtn.addEventListener('click', () => this.minimize());
        closeBtn.addEventListener('click', () => this.close());
        toggleBtn.addEventListener('click', () => this.open());
        
        // Draggable header
        this.makeDraggable(chatHeader);
    }

    makeDraggable(header) {
        let isDragging = false;
        let currentX;
        let currentY;
        let initialX;
        let initialY;

        header.addEventListener('mousedown', (e) => {
            if (e.target.closest('.control-btn')) return;
            
            isDragging = true;
            initialX = e.clientX - this.widget.offsetLeft;
            initialY = e.clientY - this.widget.offsetTop;
            header.style.cursor = 'grabbing';
        });

        document.addEventListener('mousemove', (e) => {
            if (isDragging) {
                e.preventDefault();
                currentX = e.clientX - initialX;
                currentY = e.clientY - initialY;
                
                // Constrain to viewport
                const maxX = window.innerWidth - this.widget.offsetWidth;
                const maxY = window.innerHeight - this.widget.offsetHeight;
                
                currentX = Math.max(0, Math.min(currentX, maxX));
                currentY = Math.max(0, Math.min(currentY, maxY));
                
                this.widget.style.left = currentX + 'px';
                this.widget.style.top = currentY + 'px';
                this.widget.style.right = 'auto';
                this.widget.style.bottom = 'auto';
            }
        });

        document.addEventListener('mouseup', () => {
            isDragging = false;
            header.style.cursor = 'grab';
        });
    }

    async sendMessage(message) {
        const chatInput = document.getElementById('ai-chat-input');
        const sendButton = document.getElementById('ai-send-chat');
        const chatMessages = document.getElementById('ai-chat-messages');
        const chatStatus = document.getElementById('ai-chat-status');

        // Clear input and disable button
        chatInput.value = '';
        sendButton.disabled = true;
        chatInput.style.height = 'auto';

        // Add user message
        this.addMessage('user', message);

        // Show typing indicator
        this.showTypingIndicator();

        // Update status
        chatStatus.textContent = 'AI is thinking...';
        chatStatus.className = 'chat-status loading';

        try {
            // Determine activity type based on current page
            const activityType = this.getActivityType();
            
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    message: message,
                    activityType: activityType,
                    context: {
                        institution: 'Business Education',
                        role: 'Learning Experience Designer',
                        focus: 'Educational tool development',
                        currentPage: window.location.pathname
                    }
                })
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                
                if (errorData.error === 'API key not configured') {
                    throw new Error('API_KEY_MISSING');
                }
                
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();

            // Remove typing indicator
            this.removeTypingIndicator();

            // Add AI response
            this.addMessage('ai', data.response);

            // Update status
            chatStatus.textContent = 'Ready for your next question!';
            chatStatus.className = 'chat-status success';

            // Save to history
            this.saveChatHistory();

        } catch (error) {
            console.error('Chat error:', error);

            // Remove typing indicator
            this.removeTypingIndicator();

            // Show specific error message based on error type
            if (error.message === 'API_KEY_MISSING') {
                this.addMessage('ai', `
                    <div class="error-message">
                        <h4>🔧 AI Chat Setup Required</h4>
                        <p>The AI assistant needs to be configured with an API key to work.</p>
                        <p><strong>For workshop hosts:</strong></p>
                        <ol>
                            <li>Get your API key from <a href="https://console.anthropic.com/" target="_blank">console.anthropic.com</a></li>
                            <li>Add it as ANTHROPIC_API_KEY in your deployment environment</li>
                            <li>Restart your server</li>
                        </ol>
                        <p><strong>For workshop participants:</strong> Please let the host know the AI chat needs to be configured.</p>
                    </div>
                `);
                chatStatus.textContent = 'AI chat not configured - API key needed';
                chatStatus.className = 'chat-status error';
            } else {
                this.addMessage('ai', 'Sorry, I\'m having trouble connecting right now. Please check your setup or try again in a moment.');
                chatStatus.textContent = 'Connection error. Please try again.';
                chatStatus.className = 'chat-status error';
            }
        }

        // Clear status after a few seconds
        setTimeout(() => {
            chatStatus.textContent = '';
            chatStatus.className = 'chat-status';
        }, 3000);
    }

    getActivityType() {
        const path = window.location.pathname;
        const page = path.split('/').pop() || 'index.html';
        
        switch (page) {
            case 'setup.html':
                return 'technical-guidance';
            case 'activities.html':
                return 'implementation-support';
            case 'resources.html':
                return 'project-refinement';
            case 'next-steps.html':
                return 'project-refinement';
            default:
                return 'idea-generation';
        }
    }

    addMessage(sender, content) {
        const chatMessages = document.getElementById('ai-chat-messages');
        
        const messageDiv = document.createElement('div');
        messageDiv.className = `${sender}-message`;
        
        const avatar = document.createElement('div');
        avatar.className = 'message-avatar';
        avatar.textContent = sender === 'ai' ? '🤖' : '👤';
        
        const messageContent = document.createElement('div');
        messageContent.className = 'message-content';
        messageContent.innerHTML = this.formatMessage(content);
        
        messageDiv.appendChild(avatar);
        messageDiv.appendChild(messageContent);
        chatMessages.appendChild(messageDiv);
        
        // Scroll to bottom
        chatMessages.scrollTop = chatMessages.scrollHeight;
        
        // Animate in
        messageDiv.style.opacity = '0';
        messageDiv.style.transform = 'translateY(10px)';
        
        requestAnimationFrame(() => {
            messageDiv.style.transition = 'all 0.3s ease';
            messageDiv.style.opacity = '1';
            messageDiv.style.transform = 'translateY(0)';
        });

        // Add to history
        this.chatHistory.push({ sender, content, timestamp: Date.now() });
    }

    formatMessage(message) {
        // Convert line breaks to paragraphs
        let formatted = message.split('\n\n').map(para => 
            para.trim() ? `<p>${para.replace(/\n/g, '<br>')}</p>` : ''
        ).join('');

        // Handle numbered lists
        formatted = formatted.replace(/^(\d+)\.\s+(.+)$/gm, '<li>$2</li>');
        if (formatted.includes('<li>')) {
            formatted = formatted.replace(/(<li>.*<\/li>)/s, '<ol>$1</ol>');
        }

        // Handle bullet points
        formatted = formatted.replace(/^[-•]\s+(.+)$/gm, '<li>$1</li>');
        if (formatted.includes('<li>') && !formatted.includes('<ol>')) {
            formatted = formatted.replace(/(<li>.*<\/li>)/s, '<ul>$1</ul>');
        }

        // Bold text
        formatted = formatted.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

        return formatted;
    }

    showTypingIndicator() {
        const chatMessages = document.getElementById('ai-chat-messages');
        
        const typingDiv = document.createElement('div');
        typingDiv.className = 'ai-message typing-indicator';
        typingDiv.id = 'ai-typing-indicator';
        
        typingDiv.innerHTML = `
            <div class="message-avatar">🤖</div>
            <div class="message-content">
                <div class="typing-dots">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>
        `;
        
        chatMessages.appendChild(typingDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    removeTypingIndicator() {
        const indicator = document.getElementById('ai-typing-indicator');
        if (indicator) {
            indicator.remove();
        }
    }

    minimize() {
        this.widget.classList.add('minimized');
        document.getElementById('chat-toggle').style.display = 'block';
        localStorage.setItem('aiChatMinimized', 'true');
        this.isMinimized = true;
    }

    open() {
        this.widget.classList.remove('minimized');
        document.getElementById('chat-toggle').style.display = 'none';
        localStorage.setItem('aiChatMinimized', 'false');
        this.isMinimized = false;
    }

    async checkApiStatus() {
        try {
            const response = await fetch('/api/health');
            if (response.ok) {
                const data = await response.json();
                if (!data.hasApiKey) {
                    // Show setup message if API key is missing
                    this.addMessage('ai', `
                        <div class="setup-notice">
                            <h4>⚠️ AI Chat Setup Needed</h4>
                            <p>The AI assistant isn't configured yet. To enable AI chat, the workshop host needs to add an Anthropic API key.</p>
                            <p><strong>Workshop hosts:</strong> Check the setup instructions or contact support for help configuring the API key.</p>
                        </div>
                    `);
                }
            }
        } catch (error) {
            console.log('Could not check API status:', error);
            // Don't show error on initial load, just log it
        }
    }

    close() {
        this.widget.style.display = 'none';
        document.getElementById('chat-toggle').style.display = 'block';
    }

    saveChatHistory() {
        // Keep only last 20 messages
        const recentHistory = this.chatHistory.slice(-20);
        localStorage.setItem('aiChatHistory', JSON.stringify(recentHistory));
    }

    loadChatHistory() {
        try {
            const saved = localStorage.getItem('aiChatHistory');
            if (saved) {
                this.chatHistory = JSON.parse(saved);
                // Don't restore history to UI - start fresh each session
            }
        } catch (error) {
            console.error('Error loading chat history:', error);
        }
    }
}

// Initialize the AI chat widget when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Wait a bit for other scripts to load
    setTimeout(() => {
        // Check if widget already exists to prevent duplicates
        if (document.getElementById('ai-chat-widget')) {
            console.log('AI chat widget already exists, skipping');
            return;
        }
        
        console.log('Creating floating AI chat widget');
        window.aiChatWidget = new AIchatWidget();
    }, 100);
});