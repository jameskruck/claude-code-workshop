// Workshop Website Interactive Elements
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, initializing workshop...');
    
    // Multi-page navigation - no need to manage sections
    
    // Navigation functionality
    initializeNavigation();
    
    // Interactive elements
    initializeInteractiveElements();
    
    // Setup functionality
    initializeSetupCheckers();
    
    // AI Chat functionality - embedded chat (only on activities.html)
    initializeAIChat();
    
    // Form handlers
    initializeFormHandlers();
    
    // Custom prompt functionality for Activity 2
    initializeCustomPromptHandling();
    
    // Activity progress tracking
    initializeActivityProgressTracking();
    
    // Setup prerequisite check
    initializePrereqCheck();
    
    // Smooth animations
    initializeAnimations();
    
    console.log('Workshop initialization complete');
});

// Global function for resources page copy buttons
function copyPromptToClipboard(button, text) {
    navigator.clipboard.writeText(text).then(() => {
        const originalText = button.textContent;
        button.textContent = '✓ Copied!';
        button.style.backgroundColor = '#10b981';
        button.style.color = 'white';
        
        setTimeout(() => {
            button.textContent = originalText;
            button.style.backgroundColor = '';
            button.style.color = '';
        }, 2000);
    }).catch(err => {
        console.error('Failed to copy: ', err);
        // Fallback
        const textArea = document.createElement('textarea');
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        
        const originalText = button.textContent;
        button.textContent = '✓ Copied!';
        setTimeout(() => {
            button.textContent = originalText;
        }, 2000);
    });
}

// Ensure only one section is active
function ensureSingleActiveSection(activeId) {
    const sections = document.querySelectorAll('.workshop-section');
    const navItems = document.querySelectorAll('.nav-item');
    
    console.log(`Ensuring only ${activeId} section is active`);
    
    // Remove active from all sections and nav items
    sections.forEach(section => {
        section.classList.remove('active');
        console.log(`Removed active from section: ${section.id}`);
    });
    
    navItems.forEach(nav => nav.classList.remove('active'));
    
    // Add active to target section and nav
    const targetSection = document.getElementById(activeId);
    const targetNav = document.querySelector(`a[href="#${activeId}"]`);
    
    if (targetSection) {
        targetSection.classList.add('active');
        console.log(`Added active to section: ${activeId}`);
    } else {
        console.error(`Section ${activeId} not found`);
    }
    
    if (targetNav) {
        targetNav.classList.add('active');
        console.log(`Added active to nav: ${activeId}`);
    }
}

// Navigation Management - Multi-page version
function initializeNavigation() {
    // For multi-page navigation, we don't need to override click behavior
    // Just ensure the correct nav item is active based on current page
    
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navItems = document.querySelectorAll('.nav-item');
    
    navItems.forEach(item => {
        const href = item.getAttribute('href');
        if (href === currentPage) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
    });
}

// Section Navigation Function (for next/previous buttons) - Multi-page version
function navigateToSection(sectionId) {
    // Map section IDs to page files
    const sectionToPage = {
        'overview': 'index.html',
        'setup': 'setup.html', 
        'activities': 'activities.html',
        'resources': 'resources.html',
        'next-steps': 'next-steps.html'
    };
    
    const targetPage = sectionToPage[sectionId];
    if (targetPage) {
        window.location.href = targetPage;
    }
}

// Interactive Elements
function initializeInteractiveElements() {
    // Project selection
    initializeProjectSelection();
    
    // Copy prompt functionality
    initializeCopyPrompts();
    
    // Checklist functionality
    initializeChecklist();
    
    // Tool card interactions
    const toolCards = document.querySelectorAll('.tool-card');
    toolCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-4px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    });
    
    // Screenshot click-to-zoom functionality
    initializeScreenshotZoom();
    
    // GIF playback controls
    initializeGifControls();
    
    // Video placeholder interactions
    const videoPlaceholders = document.querySelectorAll('.video-placeholder');
    videoPlaceholders.forEach(placeholder => {
        placeholder.addEventListener('click', function() {
            const videoTitle = this.querySelector('h3').textContent;
            showVideoModal(videoTitle);
        });
    });
    
    // Inspiration link tracking
    const inspirationLinks = document.querySelectorAll('.inspiration-link');
    inspirationLinks.forEach(link => {
        link.addEventListener('click', function() {
            const toolName = this.querySelector('.link-text').textContent;
            trackToolUsage(toolName);
        });
    });
}

function initializeProjectSelection() {
    const buildOptions = document.querySelectorAll('.build-option');
    const selectedProjectSpan = document.getElementById('selected-project');
    const promptTemplates = document.querySelectorAll('.prompt-template');
    
    buildOptions.forEach(option => {
        option.addEventListener('click', function() {
            // Remove selected class from all options
            buildOptions.forEach(opt => opt.classList.remove('selected'));
            
            // Add selected class to clicked option
            this.classList.add('selected');
            
            // Update selected project display
            const projectTitle = this.querySelector('h4').textContent;
            selectedProjectSpan.textContent = projectTitle;
            
            // Show corresponding prompt template
            const projectType = this.getAttribute('data-project');
            promptTemplates.forEach(template => {
                template.classList.remove('active');
                if (template.getAttribute('data-for') === projectType) {
                    template.classList.add('active');
                }
            });
            
            // Add visual feedback
            this.style.transform = 'scale(1.02)';
            setTimeout(() => {
                this.style.transform = '';
            }, 200);
            
            // Store selection for later use
            sessionStorage.setItem('selectedProject', JSON.stringify({
                type: projectType,
                title: projectTitle
            }));
            
            // Scroll to prompt templates
            document.querySelector('.prompt-templates').scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            });
        });
    });
    
    // Load saved selection
    const savedProject = sessionStorage.getItem('selectedProject');
    if (savedProject) {
        const project = JSON.parse(savedProject);
        const correspondingOption = document.querySelector(`[data-project="${project.type}"]`);
        if (correspondingOption) {
            correspondingOption.click();
        }
    }
}

function initializeCopyPrompts() {
    const copyButtons = document.querySelectorAll('.copy-prompt');
    
    copyButtons.forEach(button => {
        button.addEventListener('click', function() {
            const promptBox = this.parentNode;
            const code = promptBox.querySelector('code');
            const text = code.textContent;
            
            // Copy to clipboard
            navigator.clipboard.writeText(text).then(() => {
                // Visual feedback
                const originalText = this.textContent;
                this.textContent = 'Copied!';
                this.classList.add('copied');
                
                // Reset after 2 seconds
                setTimeout(() => {
                    this.textContent = originalText;
                    this.classList.remove('copied');
                }, 2000);
                
                // Track copy action
                const projectType = this.closest('.prompt-template').getAttribute('data-for');
                trackPromptCopy(projectType);
            }).catch(err => {
                console.error('Failed to copy text: ', err);
                // Fallback for older browsers
                selectText(code);
            });
        });
    });
}

function selectText(element) {
    const range = document.createRange();
    range.selectNodeContents(element);
    const selection = window.getSelection();
    selection.removeAllRanges();
    selection.addRange(range);
}

function initializeChecklist() {
    const checkboxes = document.querySelectorAll('.checklist-item input[type="checkbox"]');
    
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
            const label = this.parentNode;
            const text = label.querySelector('span') || label.lastChild;
            
            if (this.checked) {
                if (text && text.nodeType === Node.TEXT_NODE) {
                    text.textContent = text.textContent.trim();
                }
                label.classList.add('completed');
            } else {
                label.classList.remove('completed');
            }
            
            // Update progress
            updateBuildingProgress();
        });
        
        // Load saved state
        const itemText = checkbox.parentNode.textContent.trim();
        const savedState = localStorage.getItem(`checklist_${itemText}`);
        if (savedState === 'true') {
            checkbox.checked = true;
            checkbox.parentNode.classList.add('completed');
        }
        
        // Save state on change
        checkbox.addEventListener('change', function() {
            const itemText = this.parentNode.textContent.trim();
            localStorage.setItem(`checklist_${itemText}`, this.checked);
        });
    });
}

function updateBuildingProgress() {
    const checkboxes = document.querySelectorAll('.checklist-item input[type="checkbox"]');
    const completed = Array.from(checkboxes).filter(cb => cb.checked).length;
    const total = checkboxes.length;
    const percentage = Math.round((completed / total) * 100);
    
    // Store progress
    const progress = JSON.parse(localStorage.getItem('workshopProgress') || '{}');
    progress.buildingProgress = {
        completed,
        total,
        percentage,
        timestamp: new Date().toISOString()
    };
    localStorage.setItem('workshopProgress', JSON.stringify(progress));
    
    // Visual feedback for completion
    if (percentage === 100) {
        showCompletionCelebration();
    }
}

function showCompletionCelebration() {
    // Create celebration modal
    const celebration = document.createElement('div');
    celebration.className = 'celebration-modal';
    celebration.innerHTML = `
        <div class="celebration-content">
            <div class="celebration-icon">🎉</div>
            <h3>Congratulations!</h3>
            <p>You've completed your educational tool! 🚀</p>
            <p>Don't forget to share it with colleagues and plan your next project.</p>
            <button class="celebration-close">Continue</button>
        </div>
    `;
    
    document.body.appendChild(celebration);
    
    // Style the celebration
    celebration.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(197, 183, 131, 0.9);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1000;
        animation: fadeIn 0.5s ease;
    `;
    
    // Close handler
    celebration.querySelector('.celebration-close').addEventListener('click', () => {
        celebration.remove();
    });
    
    // Auto-close after 5 seconds
    setTimeout(() => {
        if (celebration.parentNode) {
            celebration.remove();
        }
    }, 5000);
}

// Setup Checkers and Progress Tracking
function initializeSetupCheckers() {
    // System requirements checker
    initializeSystemCheck();
    
    // Account setup progress tracking
    initializeAccountProgress();
    
    // Deployment prompt copying
    initializeDeploymentPrompts();
    
    // Enhanced checkbox interactions
    initializeEnhancedCheckboxes();
}

function initializeSystemCheck() {
    // Check browser compatibility
    checkBrowserCompatibility();
    
    // Check internet connection
    checkInternetConnection();
    
    // Manual checks are handled by user
}

function checkBrowserCompatibility() {
    const browserStatus = document.getElementById('browser-status');
    const browserCheck = document.getElementById('check-browser');
    
    if (!browserStatus) return;
    
    // Detect browser and version
    const userAgent = navigator.userAgent;
    let browserInfo = {
        name: 'Unknown',
        version: 0,
        compatible: false
    };
    
    // Simple browser detection
    if (userAgent.includes('Chrome')) {
        const match = userAgent.match(/Chrome\/(\d+)/);
        browserInfo = {
            name: 'Chrome',
            version: match ? parseInt(match[1]) : 0,
            compatible: match ? parseInt(match[1]) >= 60 : false
        };
    } else if (userAgent.includes('Firefox')) {
        const match = userAgent.match(/Firefox\/(\d+)/);
        browserInfo = {
            name: 'Firefox',
            version: match ? parseInt(match[1]) : 0,
            compatible: match ? parseInt(match[1]) >= 55 : false
        };
    } else if (userAgent.includes('Safari') && !userAgent.includes('Chrome')) {
        browserInfo = {
            name: 'Safari',
            version: 11, // Assume recent Safari
            compatible: true
        };
    } else if (userAgent.includes('Edge')) {
        browserInfo = {
            name: 'Edge',
            version: 79, // Assume recent Edge
            compatible: true
        };
    }
    
    if (browserInfo.compatible) {
        browserStatus.innerHTML = `<span class="status-good">✓ ${browserInfo.name} (Compatible)</span>`;
        browserCheck.checked = true;
    } else {
        browserStatus.innerHTML = `<span class="status-checking">⚠ ${browserInfo.name} (Update recommended)</span>`;
    }
}

function checkInternetConnection() {
    const internetStatus = document.getElementById('internet-status');
    const internetCheck = document.getElementById('check-internet');
    
    if (!internetStatus) return;
    
    // Test connection with a small fetch request
    fetch('/api/health', { 
        method: 'GET',
        cache: 'no-cache'
    })
    .then(response => {
        if (response.ok) {
            internetStatus.innerHTML = '<span class="status-good">✓ Connected</span>';
            internetCheck.checked = true;
        } else {
            internetStatus.innerHTML = '<span class="status-checking">⚠ Limited connectivity</span>';
        }
    })
    .catch(() => {
        internetStatus.innerHTML = '<span class="status-checking">⚠ Connection issues detected</span>';
    });
}

function initializeAccountProgress() {
    const checkboxes = document.querySelectorAll('#claude-complete, #github-complete, #render-complete');
    const progressFill = document.getElementById('setup-progress');
    const progressPercent = document.getElementById('setup-percent');
    
    if (!progressFill || !progressPercent) return;
    
    function updateProgress() {
        const completed = Array.from(checkboxes).filter(cb => cb.checked).length;
        const total = checkboxes.length;
        const percentage = Math.round((completed / total) * 100);
        
        progressFill.style.width = `${percentage}%`;
        progressPercent.textContent = `${percentage}%`;
        
        // Save progress
        const progress = JSON.parse(localStorage.getItem('workshopProgress') || '{}');
        progress.accountSetup = {
            completed,
            total,
            percentage,
            timestamp: new Date().toISOString()
        };
        localStorage.setItem('workshopProgress', JSON.stringify(progress));
        
        // Show celebration if all complete
        if (percentage === 100) {
            setTimeout(() => {
                showSetupCompleteCelebration();
            }, 500);
        }
    }
    
    // Load saved progress
    const savedProgress = JSON.parse(localStorage.getItem('workshopProgress') || '{}');
    if (savedProgress.accountSetup) {
        checkboxes.forEach((checkbox, index) => {
            if (index < savedProgress.accountSetup.completed) {
                checkbox.checked = true;
            }
        });
        updateProgress();
    }
    
    // Add event listeners
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', updateProgress);
    });
}

function showSetupCompleteCelebration() {
    // Create celebration toast
    const toast = document.createElement('div');
    toast.className = 'setup-celebration-toast';
    toast.innerHTML = `
        <div class="toast-content">
            <div class="toast-icon">🎉</div>
            <div class="toast-text">
                <strong>Setup Complete!</strong>
                <p>You're ready to start building!</p>
            </div>
        </div>
    `;
    
    // Style the toast
    toast.style.cssText = `
        position: fixed;
        top: 2rem;
        right: 2rem;
        background: linear-gradient(135deg, #c5b783 0%, #b8a56f 100%);
        color: #2c2c2c;
        padding: 1rem;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 1000;
        animation: slideInRight 0.5s ease;
        max-width: 300px;
    `;
    
    document.body.appendChild(toast);
    
    // Auto-remove after 4 seconds
    setTimeout(() => {
        if (toast.parentNode) {
            toast.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => {
                if (toast.parentNode) {
                    toast.remove();
                }
            }, 300);
        }
    }, 4000);
}

function initializeDeploymentPrompts() {
    const copyButtons = document.querySelectorAll('.copy-prompt-btn');
    
    copyButtons.forEach(button => {
        button.addEventListener('click', function() {
            const prompt = this.getAttribute('data-prompt');
            
            if (!prompt) return;
            
            // Copy to clipboard
            navigator.clipboard.writeText(prompt).then(() => {
                // Visual feedback
                const originalText = this.textContent;
                this.textContent = 'Copied!';
                this.classList.add('copied');
                
                // Reset after 2 seconds
                setTimeout(() => {
                    this.textContent = originalText;
                    this.classList.remove('copied');
                }, 2000);
                
                // Track copy action
                trackDeploymentPromptCopy(prompt);
            }).catch(err => {
                console.error('Failed to copy prompt: ', err);
                // Fallback for older browsers
                fallbackCopyTextToClipboard(prompt);
            });
        });
    });
}

function fallbackCopyTextToClipboard(text) {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    
    // Avoid scrolling to bottom
    textArea.style.top = "0";
    textArea.style.left = "0";
    textArea.style.position = "fixed";
    
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
        document.execCommand('copy');
    } catch (err) {
        console.error('Fallback: Could not copy text: ', err);
    }
    
    document.body.removeChild(textArea);
}

function trackDeploymentPromptCopy(prompt) {
    const analytics = JSON.parse(localStorage.getItem('workshopAnalytics') || '{}');
    analytics.deploymentPrompts = analytics.deploymentPrompts || [];
    
    analytics.deploymentPrompts.push({
        timestamp: new Date().toISOString(),
        promptType: prompt.includes('GitHub') ? 'github' : 'troubleshooting',
        promptPreview: prompt.substring(0, 50) + '...'
    });
    
    // Keep only last 10 prompts
    if (analytics.deploymentPrompts.length > 10) {
        analytics.deploymentPrompts = analytics.deploymentPrompts.slice(-10);
    }
    
    analytics.lastActivity = new Date().toISOString();
    localStorage.setItem('workshopAnalytics', JSON.stringify(analytics));
    
    console.log('Deployment prompt copy tracked');
}

// AI Chat Functionality - Embedded chat for Activity 2
function initializeAIChat() {
    const chatInput = document.getElementById('chat-input');
    const sendButton = document.getElementById('send-chat');
    const chatMessages = document.getElementById('chat-messages');
    const chatStatus = document.getElementById('chat-status');
    const suggestionButtons = document.querySelectorAll('.suggestion-btn');
    
    console.log('Initializing embedded AI chat:', {
        chatInput: !!chatInput,
        sendButton: !!sendButton,
        chatMessages: !!chatMessages,
        currentPage: window.location.pathname
    });
    
    // Only initialize if embedded chat elements exist (activities.html)
    if (!chatInput || !sendButton || !chatMessages) {
        console.log('Embedded chat elements not found, skipping initialization');
        return;
    }
    
    console.log('Embedded chat initialized successfully');
    
    // Enable/disable send button based on input
    chatInput?.addEventListener('input', function() {
        const hasText = this.value.trim().length > 0;
        sendButton.disabled = !hasText;
    });
    
    // Send message on button click
    sendButton?.addEventListener('click', function() {
        const message = chatInput.value.trim();
        if (message) {
            sendChatMessage(message);
        }
    });
    
    // Send message on Enter (but allow Shift+Enter for new lines)
    chatInput?.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            const message = this.value.trim();
            if (message && !sendButton.disabled) {
                sendChatMessage(message);
            }
        }
    });
    
    // Handle suggestion button clicks
    suggestionButtons.forEach(button => {
        button.addEventListener('click', function() {
            const message = this.getAttribute('data-message');
            if (message) {
                chatInput.value = message;
                sendButton.disabled = false;
                sendChatMessage(message);
            }
        });
    });
    
    // Auto-resize chat input
    chatInput?.addEventListener('input', function() {
        this.style.height = 'auto';
        this.style.height = Math.min(this.scrollHeight, 120) + 'px';
    });
}

async function sendChatMessage(message) {
    const chatInput = document.getElementById('chat-input');
    const sendButton = document.getElementById('send-chat');
    const chatMessages = document.getElementById('chat-messages');
    const chatStatus = document.getElementById('chat-status');
    
    // Clear input and disable button
    chatInput.value = '';
    sendButton.disabled = true;
    chatInput.style.height = 'auto';
    
    // Add user message to chat
    addMessageToChat('user', message);
    
    // Show typing indicator
    showTypingIndicator();
    
    // Update status
    chatStatus.textContent = 'AI is thinking...';
    chatStatus.className = 'chat-status loading';
    
    try {
        const response = await fetch('/api/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                message: message,
                activityType: 'idea-generation',
                context: {
                    institution: 'Business Education',
                    role: 'Learning Experience Designer',
                    focus: 'Educational tool development'
                }
            })
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        
        // Remove typing indicator
        removeTypingIndicator();
        
        // Add AI response to chat
        addMessageToChat('ai', data.response);
        
        // Update status
        chatStatus.textContent = 'Ready for your next question!';
        chatStatus.className = 'chat-status success';
        
        // Track the interaction
        trackChatInteraction(message, data.response);
        
    } catch (error) {
        console.error('Chat error:', error);
        
        // Remove typing indicator
        removeTypingIndicator();
        
        // Show error message
        addMessageToChat('ai', 'Sorry, I\'m having trouble connecting right now. Please try again in a moment, or continue with the workshop activities below.');
        
        // Update status
        chatStatus.textContent = 'Connection error. Please try again.';
        chatStatus.className = 'chat-status error';
    }
    
    // Clear status after a few seconds
    setTimeout(() => {
        if (chatStatus.className.includes('success') || chatStatus.className.includes('error')) {
            chatStatus.textContent = '';
            chatStatus.className = 'chat-status';
        }
    }, 3000);
}

function addMessageToChat(sender, message) {
    const chatMessages = document.getElementById('chat-messages');
    
    const messageDiv = document.createElement('div');
    messageDiv.className = `${sender}-message`;
    
    const avatar = document.createElement('div');
    avatar.className = 'message-avatar';
    avatar.textContent = sender === 'ai' ? '🤖' : '👤';
    
    const content = document.createElement('div');
    content.className = 'message-content';
    
    // Process message content (basic markdown-like formatting)
    const formattedMessage = formatMessageContent(message);
    content.innerHTML = formattedMessage;
    
    messageDiv.appendChild(avatar);
    messageDiv.appendChild(content);
    
    chatMessages.appendChild(messageDiv);
    
    // Scroll to bottom
    chatMessages.scrollTop = chatMessages.scrollHeight;
    
    // Animate in
    messageDiv.style.opacity = '0';
    messageDiv.style.transform = 'translateY(20px)';
    
    setTimeout(() => {
        messageDiv.style.transition = 'all 0.3s ease';
        messageDiv.style.opacity = '1';
        messageDiv.style.transform = 'translateY(0)';
    }, 50);
}

function formatMessageContent(message) {
    // Basic formatting for AI responses
    let formatted = message;
    
    // Convert line breaks to paragraphs
    formatted = formatted.split('\n\n').map(para => 
        para.trim() ? `<p>${para.replace(/\n/g, '<br>')}</p>` : ''
    ).join('');
    
    // Handle numbered lists (simple detection)
    formatted = formatted.replace(/^(\d+)\.\s+(.+)$/gm, '<li>$2</li>');
    if (formatted.includes('<li>')) {
        formatted = formatted.replace(/(<li>.*<\/li>)/s, '<ol>$1</ol>');
    }
    
    // Handle bullet points
    formatted = formatted.replace(/^[-•]\s+(.+)$/gm, '<li>$1</li>');
    if (formatted.includes('<li>') && !formatted.includes('<ol>')) {
        formatted = formatted.replace(/(<li>.*<\/li>)/s, '<ul>$1</ul>');
    }
    
    // Bold text (basic)
    formatted = formatted.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    
    return formatted;
}

function showTypingIndicator() {
    const chatMessages = document.getElementById('chat-messages');
    
    const typingDiv = document.createElement('div');
    typingDiv.className = 'ai-message typing-indicator';
    typingDiv.id = 'typing-indicator';
    
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

function removeTypingIndicator() {
    const typingIndicator = document.getElementById('typing-indicator');
    if (typingIndicator) {
        typingIndicator.remove();
    }
}

function trackChatInteraction(userMessage, aiResponse) {
    const analytics = JSON.parse(localStorage.getItem('workshopAnalytics') || '{}');
    analytics.chatInteractions = analytics.chatInteractions || [];
    
    analytics.chatInteractions.push({
        timestamp: new Date().toISOString(),
        userMessage: userMessage.substring(0, 100) + (userMessage.length > 100 ? '...' : ''),
        aiResponseLength: aiResponse.length,
        activityType: 'idea-generation'
    });
    
    // Keep only last 10 interactions
    if (analytics.chatInteractions.length > 10) {
        analytics.chatInteractions = analytics.chatInteractions.slice(-10);
    }
    
    analytics.lastActivity = new Date().toISOString();
    localStorage.setItem('workshopAnalytics', JSON.stringify(analytics));
    
    console.log('Chat interaction tracked');
}

// Form Handlers
function initializeFormHandlers() {
    // Practice input validation
    const practiceInputs = document.querySelectorAll('.practice-input');
    practiceInputs.forEach(input => {
        input.addEventListener('input', function() {
            validatePrompt(this);
        });
        
        input.addEventListener('blur', function() {
            if (this.value.trim()) {
                showPromptFeedback(this);
            }
        });
    });
    
    // Brainstorm template auto-save
    const brainstormInputs = document.querySelectorAll('.brainstorm-section textarea');
    brainstormInputs.forEach(input => {
        input.addEventListener('input', function() {
            saveBrainstormData(this);
        });
    });
    
    // Load saved brainstorm data
    loadBrainstormData();
}

// Animation and Visual Effects
// Custom Prompt Handling for Activity 2
function initializeCustomPromptHandling() {
    const promptStorage = document.getElementById('custom-prompt-storage');
    const saveButton = document.getElementById('save-custom-prompt');
    const saveStatus = document.getElementById('prompt-save-status');
    const promptDisplay = document.getElementById('saved-prompt-display');
    const copySavedButton = document.getElementById('copy-saved-prompt');
    
    // Only initialize if elements exist (we're on activities page)
    if (!promptStorage || !saveButton) return;
    
    // Load any previously saved prompt
    loadSavedPrompt();
    
    // Save custom prompt to local storage
    saveButton.addEventListener('click', function() {
        const promptText = promptStorage.value.trim();
        
        if (!promptText) {
            showSaveStatus('Please enter a prompt first!', 'error');
            return;
        }
        
        // Visual feedback during save
        const originalText = this.textContent;
        this.textContent = 'Saving...';
        this.disabled = true;
        
        // Simulate save delay for better UX
        setTimeout(() => {
            // Save to localStorage
            localStorage.setItem('customClaudePrompt', promptText);
            
            // Update displays
            updatePromptDisplay(promptText);
            showSaveStatus('Prompt saved successfully! ✓', 'success');
            
            // Enable copy button
            if (copySavedButton) {
                copySavedButton.disabled = false;
            }
            
            // Reset button
            this.textContent = '✓ Saved!';
            setTimeout(() => {
                this.textContent = originalText;
                this.disabled = false;
            }, 2000);
            
            // Auto-check the "saved-prompt" checkbox
            const savedPromptCheckbox = document.getElementById('saved-prompt');
            if (savedPromptCheckbox) {
                savedPromptCheckbox.checked = true;
                localStorage.setItem('activity-2-saved-prompt', 'true');
                // Trigger the completion check
                if (window.checkActivity2Completion) {
                    window.checkActivity2Completion();
                }
            }
            
        }, 500);
    });
    
    // Copy saved prompt functionality
    if (copySavedButton) {
        copySavedButton.addEventListener('click', function() {
            const savedPrompt = localStorage.getItem('customClaudePrompt');
            if (savedPrompt) {
                copyToClipboard(savedPrompt);
                showSaveStatus('Custom prompt copied to clipboard! ✓', 'success');
            }
        });
    }
    
    // Handle fallback prompt copying
    document.querySelectorAll('.copy-prompt-btn').forEach(button => {
        button.addEventListener('click', function() {
            const promptCode = this.parentElement.querySelector('code');
            if (promptCode) {
                copyToClipboard(promptCode.textContent);
                this.textContent = 'Copied!';
                setTimeout(() => {
                    this.textContent = 'Copy';
                }, 2000);
            }
        });
    });
    
    function loadSavedPrompt() {
        const savedPrompt = localStorage.getItem('customClaudePrompt');
        if (savedPrompt) {
            if (promptStorage) promptStorage.value = savedPrompt;
            updatePromptDisplay(savedPrompt);
            if (copySavedButton) copySavedButton.disabled = false;
        }
    }
    
    function updatePromptDisplay(promptText) {
        if (promptDisplay) {
            promptDisplay.innerHTML = `<div class="saved-prompt-text">${promptText}</div>`;
        }
    }
    
    function showSaveStatus(message, type) {
        if (saveStatus) {
            saveStatus.textContent = message;
            saveStatus.className = `save-status ${type}`;
            setTimeout(() => {
                saveStatus.textContent = '';
                saveStatus.className = 'save-status';
            }, 3000);
        }
    }
    
    function copyToClipboard(text) {
        if (navigator.clipboard && window.isSecureContext) {
            navigator.clipboard.writeText(text);
        } else {
            // Fallback for older browsers
            const textArea = document.createElement('textarea');
            textArea.value = text;
            document.body.appendChild(textArea);
            textArea.focus();
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
        }
    }
}

// Activity Progress Tracking
function initializeActivityProgressTracking() {
    // Track Activity 2 completion
    const activity2Checkboxes = ['discussed-challenge', 'got-custom-prompt', 'saved-prompt'];
    const activity2Completion = document.getElementById('activity-2-completion');
    
    if (activity2Completion) {
        activity2Checkboxes.forEach(id => {
            const checkbox = document.getElementById(id);
            if (checkbox) {
                // Load saved state
                const saved = localStorage.getItem(`activity-2-${id}`);
                if (saved === 'true') {
                    checkbox.checked = true;
                }
                
                checkbox.addEventListener('change', function() {
                    // Save state
                    localStorage.setItem(`activity-2-${id}`, this.checked);
                    
                    // Check if all are complete
                    checkActivity2Completion();
                });
            }
        });
        
        // Initial check
        checkActivity2Completion();
    }
    
    // Track Activity 5 (building checklist)
    const activity5Checkboxes = ['basic-functionality', 'clean-styling', 'easy-to-use', 'custom-improvement', 'mobile-tested'];
    
    activity5Checkboxes.forEach(id => {
        const checkbox = document.getElementById(id);
        if (checkbox) {
            // Load saved state
            const saved = localStorage.getItem(`activity-5-${id}`);
            if (saved === 'true') {
                checkbox.checked = true;
            }
            
            checkbox.addEventListener('change', function() {
                // Save state
                localStorage.setItem(`activity-5-${id}`, this.checked);
                
                // Visual feedback
                const label = this.closest('.checklist-item');
                if (this.checked) {
                    label.style.background = '#f0f9ff';
                    label.style.borderColor = '#10b981';
                } else {
                    label.style.background = '';
                    label.style.borderColor = '';
                }
            });
        }
    });
    
    window.checkActivity2Completion = function() {
        const activity2Checkboxes = ['discussed-challenge', 'got-custom-prompt', 'saved-prompt'];
        const allComplete = activity2Checkboxes.every(id => {
            const checkbox = document.getElementById(id);
            return checkbox && checkbox.checked;
        });
        
        const completionDiv = document.getElementById('activity-2-completion');
        if (completionDiv) {
            if (allComplete) {
                completionDiv.style.display = 'block';
                completionDiv.style.animation = 'slideIn 0.5s ease-out';
            } else {
                completionDiv.style.display = 'none';
            }
        }
    }
}

function initializeAnimations() {
    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animateElements = document.querySelectorAll(
        '.tool-card, .objective-item, .activity-item, .resource-category, .step-item'
    );
    
    animateElements.forEach(el => {
        observer.observe(el);
    });
    
    // Progress tracking
    trackWorkshopProgress();
}

// Utility Functions
function validatePrompt(input) {
    const value = input.value.trim();
    const minLength = 10;
    
    // Remove previous validation styling
    input.classList.remove('valid', 'invalid');
    
    if (value.length > minLength) {
        input.classList.add('valid');
        
        // Check for good prompt characteristics
        const hasAction = /create|build|make|generate|add|implement/i.test(value);
        const hasContext = /for|with|using|that|which/i.test(value);
        
        if (hasAction && hasContext) {
            showPromptTip(input, 'Great prompt! It includes an action and context.');
        }
    } else if (value.length > 0) {
        input.classList.add('invalid');
        showPromptTip(input, 'Try to be more specific about what you want to build.');
    }
}

function showPromptFeedback(input) {
    const feedback = generatePromptFeedback(input.value);
    
    // Create or update feedback element
    let feedbackEl = input.parentNode.querySelector('.prompt-feedback');
    if (!feedbackEl) {
        feedbackEl = document.createElement('div');
        feedbackEl.className = 'prompt-feedback';
        input.parentNode.appendChild(feedbackEl);
    }
    
    feedbackEl.innerHTML = feedback;
    feedbackEl.style.opacity = '0';
    feedbackEl.style.transform = 'translateY(-10px)';
    
    // Animate in
    setTimeout(() => {
        feedbackEl.style.opacity = '1';
        feedbackEl.style.transform = 'translateY(0)';
    }, 100);
}

function generatePromptFeedback(prompt) {
    const suggestions = [];
    
    if (!/create|build|make|generate|add|implement/i.test(prompt)) {
        suggestions.push('Consider starting with an action word like "Create", "Build", or "Generate"');
    }
    
    if (!/web|app|tool|form|page/i.test(prompt)) {
        suggestions.push('Specify what type of digital tool you want to create');
    }
    
    if (!/student|teacher|education|learning/i.test(prompt)) {
        suggestions.push('Include educational context to make it more relevant');
    }
    
    if (suggestions.length === 0) {
        return `<div class="feedback-positive">
            <strong>✅ Excellent prompt!</strong> Your request is clear and specific.
        </div>`;
    }
    
    return `<div class="feedback-suggestions">
        <strong>💡 Suggestions to improve your prompt:</strong>
        <ul>${suggestions.map(s => `<li>${s}</li>`).join('')}</ul>
    </div>`;
}

function showPromptTip(input, message) {
    // Remove existing tips
    const existingTip = input.parentNode.querySelector('.prompt-tip');
    if (existingTip) {
        existingTip.remove();
    }
    
    // Create new tip
    const tip = document.createElement('div');
    tip.className = 'prompt-tip';
    tip.textContent = message;
    
    input.parentNode.appendChild(tip);
    
    // Auto remove after 3 seconds
    setTimeout(() => {
        if (tip.parentNode) {
            tip.remove();
        }
    }, 3000);
}

// Claude Code Interactive Setup Functions
function checkClaudeAccount() {
    const accountStatus = document.getElementById('account-status');
    const testStep = document.getElementById('claude-test-step');
    
    // Update status
    accountStatus.textContent = '✅ Complete';
    accountStatus.className = 'substep-status completed';
    
    // Enable next step
    testStep.classList.remove('disabled');
    
    // Celebration animation
    celebrateStepCompletion('account');
    
    // Scroll to next step
    setTimeout(() => {
        testStep.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 800);
}

function copyTestCommand() {
    const commandText = document.getElementById('test-command').textContent;
    const copyBtn = document.getElementById('copy-test-btn');
    
    navigator.clipboard.writeText(commandText).then(() => {
        copyBtn.textContent = 'Copied!';
        copyBtn.classList.add('success');
        
        setTimeout(() => {
            copyBtn.textContent = 'Copy';
            copyBtn.classList.remove('success');
        }, 2000);
    }).catch(() => {
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = commandText;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        
        copyBtn.textContent = 'Copied!';
        setTimeout(() => {
            copyBtn.textContent = 'Copy';
        }, 2000);
    });
}

function checkClaudeTest() {
    const testStatus = document.getElementById('test-status');
    const interfaceStep = document.getElementById('claude-interface-step');
    
    // Update status
    testStatus.textContent = '✅ Complete';
    testStatus.className = 'substep-status completed';
    
    // Enable next step
    interfaceStep.classList.remove('disabled');
    
    // Celebration animation
    celebrateStepCompletion('test');
    
    // Scroll to next step
    setTimeout(() => {
        interfaceStep.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 800);
}

function checkClaudeInterface() {
    const interfaceStatus = document.getElementById('interface-status');
    const claudeSummary = document.getElementById('claude-summary');
    
    // Update status
    interfaceStatus.textContent = '✅ Complete';
    interfaceStatus.className = 'substep-status completed';
    
    // Show completion summary
    claudeSummary.style.display = 'block';
    claudeSummary.style.opacity = '0';
    claudeSummary.style.transform = 'translateY(20px)';
    
    // Celebration animation
    celebrateStepCompletion('interface');
    
    // Animate in summary
    setTimeout(() => {
        claudeSummary.style.opacity = '1';
        claudeSummary.style.transform = 'translateY(0)';
    }, 500);
    
    // Scroll to summary
    setTimeout(() => {
        claudeSummary.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 800);
    
    // Update overall setup progress
    updateSetupProgress();
}

function celebrateStepCompletion(stepName) {
    // Add celebration class for animation
    const step = document.querySelector(`[data-step="${stepName}"]`);
    if (step) {
        step.classList.add('completed');
        
        // Create celebration particles
        createCelebrationParticles(step);
    }
}

function createCelebrationParticles(element) {
    const rect = element.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    for (let i = 0; i < 6; i++) {
        const particle = document.createElement('div');
        particle.className = 'celebration-particle';
        particle.textContent = ['✨', '🎉', '⭐', '💫'][Math.floor(Math.random() * 4)];
        
        particle.style.position = 'fixed';
        particle.style.left = centerX + 'px';
        particle.style.top = centerY + 'px';
        particle.style.fontSize = '20px';
        particle.style.pointerEvents = 'none';
        particle.style.zIndex = '10000';
        
        document.body.appendChild(particle);
        
        // Animate particle
        const angle = (i / 6) * 2 * Math.PI;
        const distance = 100;
        const x = Math.cos(angle) * distance;
        const y = Math.sin(angle) * distance;
        
        particle.animate([
            { 
                transform: 'translate(0, 0) scale(1)', 
                opacity: 1 
            },
            { 
                transform: `translate(${x}px, ${y}px) scale(0.5)`, 
                opacity: 0 
            }
        ], {
            duration: 1000,
            easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
        }).onfinish = () => {
            particle.remove();
        };
    }
}

function updateSetupProgress() {
    // Check if all main setup steps are complete
    const githubComplete = document.getElementById('github-complete')?.checked;
    const claudeStepsComplete = document.getElementById('interface-status')?.textContent === '✅ Complete';
    const renderComplete = document.getElementById('render-complete')?.checked;
    
    const progress = document.querySelector('.progress-fill');
    const progressText = document.querySelector('.progress-text');
    
    let completedSteps = 0;
    const totalSteps = 3;
    
    if (githubComplete) completedSteps++;
    if (claudeStepsComplete) completedSteps++;
    if (renderComplete) completedSteps++;
    
    const percentage = (completedSteps / totalSteps) * 100;
    
    if (progress) {
        progress.style.width = percentage + '%';
    }
    
    if (progressText) {
        progressText.textContent = `Setup Progress: ${completedSteps}/${totalSteps}`;
    }
    
    // If all steps are complete, enable next activity
    if (completedSteps === totalSteps) {
        enableNextActivity();
    }
}

function enableNextActivity() {
    // Find and enable the next workshop section
    const setupSection = document.getElementById('setup');
    const nextSection = setupSection?.nextElementSibling;
    
    if (nextSection) {
        nextSection.classList.add('unlocked');
        
        // Show notification
        showNotification('🎉 Setup complete! You can now proceed to the next activity.', 'success');
    }
}

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span>${message}</span>
            <button onclick="this.parentNode.parentNode.remove()">×</button>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 5000);
}

function saveBrainstormData(input) {
    const section = input.closest('.brainstorm-section');
    const label = section.querySelector('h4').textContent;
    const value = input.value;
    
    // Save to localStorage
    const brainstormData = JSON.parse(localStorage.getItem('workshopBrainstorm') || '{}');
    brainstormData[label] = value;
    localStorage.setItem('workshopBrainstorm', JSON.stringify(brainstormData));
    
    // Visual feedback
    if (value.trim()) {
        section.classList.add('has-content');
    } else {
        section.classList.remove('has-content');
    }
}

function loadBrainstormData() {
    const brainstormData = JSON.parse(localStorage.getItem('workshopBrainstorm') || '{}');
    
    Object.keys(brainstormData).forEach(label => {
        const section = Array.from(document.querySelectorAll('.brainstorm-section h4'))
            .find(h4 => h4.textContent === label)?.parentNode;
        
        if (section) {
            const textarea = section.querySelector('textarea');
            if (textarea) {
                textarea.value = brainstormData[label];
                if (brainstormData[label].trim()) {
                    section.classList.add('has-content');
                }
            }
        }
    });
}

function showVideoModal(title) {
    // Create modal overlay
    const modal = document.createElement('div');
    modal.className = 'video-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <div class="modal-header">
                <h3>${title}</h3>
                <button class="modal-close">&times;</button>
            </div>
            <div class="modal-body">
                <div class="video-coming-soon">
                    <div class="coming-soon-icon">🎬</div>
                    <h4>Video Coming Soon</h4>
                    <p>This video demonstration will be available after the workshop.</p>
                    <p>In the meantime, you can explore the live tools and documentation.</p>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Add modal styles
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 1000;
        opacity: 0;
        transition: opacity 0.3s ease;
    `;
    
    // Animate in
    setTimeout(() => {
        modal.style.opacity = '1';
    }, 10);
    
    // Close handlers
    const closeBtn = modal.querySelector('.modal-close');
    const closeModal = () => {
        modal.style.opacity = '0';
        setTimeout(() => {
            if (modal.parentNode) {
                modal.remove();
            }
        }, 300);
    };
    
    closeBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });
    
    // Escape key
    document.addEventListener('keydown', function escHandler(e) {
        if (e.key === 'Escape') {
            closeModal();
            document.removeEventListener('keydown', escHandler);
        }
    });
}

function trackToolUsage(toolName) {
    // Simple analytics tracking
    const usage = JSON.parse(localStorage.getItem('workshopAnalytics') || '{}');
    usage.toolClicks = usage.toolClicks || {};
    usage.toolClicks[toolName] = (usage.toolClicks[toolName] || 0) + 1;
    usage.lastActivity = new Date().toISOString();
    
    localStorage.setItem('workshopAnalytics', JSON.stringify(usage));
    
    console.log('Tool usage tracked:', toolName);
}

function trackPromptCopy(projectType) {
    // Track prompt copying
    const usage = JSON.parse(localStorage.getItem('workshopAnalytics') || '{}');
    usage.promptCopies = usage.promptCopies || {};
    usage.promptCopies[projectType] = (usage.promptCopies[projectType] || 0) + 1;
    usage.lastActivity = new Date().toISOString();
    
    localStorage.setItem('workshopAnalytics', JSON.stringify(usage));
    
    console.log('Prompt copy tracked:', projectType);
}

function trackWorkshopProgress() {
    // Track which sections user has visited
    const sections = document.querySelectorAll('.workshop-section');
    const progress = JSON.parse(localStorage.getItem('workshopProgress') || '{}');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const sectionId = entry.target.id;
                if (sectionId) {
                    progress[sectionId] = true;
                    progress.lastVisited = sectionId;
                    progress.timestamp = new Date().toISOString();
                    
                    localStorage.setItem('workshopProgress', JSON.stringify(progress));
                }
            }
        });
    }, { threshold: 0.5 });
    
    sections.forEach(section => {
        observer.observe(section);
    });
}

// Additional CSS for dynamic elements
const dynamicStyles = `
    .valid {
        border-color: #28a745 !important;
        box-shadow: 0 0 0 2px rgba(40, 167, 69, 0.2);
    }
    
    .invalid {
        border-color: #dc3545 !important;
        box-shadow: 0 0 0 2px rgba(220, 53, 69, 0.2);
    }
    
    .prompt-tip {
        background: #c5b783;
        color: #2c2c2c;
        padding: 0.5rem 1rem;
        border-radius: 4px;
        font-size: 0.85rem;
        margin-top: 0.5rem;
        animation: slideDown 0.3s ease;
    }
    
    .prompt-feedback {
        margin-top: 1rem;
        transition: all 0.3s ease;
    }
    
    .feedback-positive {
        background: #d4edda;
        color: #155724;
        padding: 1rem;
        border-radius: 4px;
        border: 1px solid #c3e6cb;
    }
    
    .feedback-suggestions {
        background: #fff3cd;
        color: #856404;
        padding: 1rem;
        border-radius: 4px;
        border: 1px solid #ffeaa7;
    }
    
    .feedback-suggestions ul {
        margin: 0.5rem 0 0 1rem;
        padding: 0;
    }
    
    .feedback-suggestions li {
        margin: 0.25rem 0;
    }
    
    .has-content {
        border-left-color: #28a745 !important;
    }
    
    .has-content h4:after {
        content: " ✓";
        color: #28a745;
    }
    
    .selected {
        border-color: #c5b783 !important;
        background: #ffffff !important;
        box-shadow: 0 2px 8px rgba(197, 183, 131, 0.3);
    }
    
    .animate-in {
        animation: slideInUp 0.6s ease forwards;
    }
    
    .modal-content {
        background: white;
        padding: 0;
        border-radius: 8px;
        max-width: 600px;
        width: 90%;
        max-height: 80vh;
        overflow: hidden;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
    }
    
    .modal-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 1.5rem 2rem;
        border-bottom: 2px solid #c5b783;
        background: #f8f9fa;
    }
    
    .modal-header h3 {
        margin: 0;
        color: #2c2c2c;
        font-weight: 600;
    }
    
    .modal-close {
        background: none;
        border: none;
        font-size: 1.5rem;
        cursor: pointer;
        color: #666;
        padding: 0;
        width: 30px;
        height: 30px;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    
    .modal-close:hover {
        color: #2c2c2c;
    }
    
    .modal-body {
        padding: 2rem;
    }
    
    .video-coming-soon {
        text-align: center;
        padding: 2rem;
    }
    
    .coming-soon-icon {
        font-size: 4rem;
        margin-bottom: 1rem;
    }
    
    .video-coming-soon h4 {
        color: #2c2c2c;
        margin-bottom: 1rem;
        font-weight: 600;
    }
    
    .video-coming-soon p {
        color: #666;
        margin: 0.5rem 0;
    }
    
    @keyframes slideDown {
        from {
            opacity: 0;
            transform: translateY(-10px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    @keyframes slideInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;

// Inject dynamic styles
const styleSheet = document.createElement('style');
styleSheet.textContent = dynamicStyles;
document.head.appendChild(styleSheet);

// Workshop completion tracking
window.addEventListener('beforeunload', function() {
    const progress = JSON.parse(localStorage.getItem('workshopProgress') || '{}');
    progress.sessionEnd = new Date().toISOString();
    localStorage.setItem('workshopProgress', JSON.stringify(progress));
});

// Console message for developers
// Setup Prerequisite Check
function initializePrereqCheck() {
    const prereqCheckboxes = ['prereq-github', 'prereq-render', 'prereq-anthropic'];
    const setupCheckSection = document.querySelector('.setup-prereq-check');
    
    if (!setupCheckSection) return;
    
    function updateSetupCheckAppearance() {
        const allChecked = prereqCheckboxes.every(id => {
            const checkbox = document.getElementById(id);
            return checkbox && checkbox.checked;
        });
        
        if (allChecked) {
            // All prerequisites complete - change to green
            setupCheckSection.style.background = 'linear-gradient(135deg, #d1fae5, #a7f3d0)';
            setupCheckSection.style.borderColor = '#10b981';
            
            // Update header text
            const header = setupCheckSection.querySelector('h4');
            if (header) {
                header.innerHTML = '✅ Setup Complete!';
            }
            
            // Add completion message if it doesn't exist
            let completionMsg = setupCheckSection.querySelector('.setup-completion-msg');
            if (!completionMsg) {
                completionMsg = document.createElement('div');
                completionMsg.className = 'setup-completion-msg';
                completionMsg.innerHTML = '<p><strong>Perfect!</strong> You\'re ready to build your educational tool.</p>';
                setupCheckSection.appendChild(completionMsg);
            }
            completionMsg.style.display = 'block';
            
        } else {
            // Not all complete - keep original yellow/warning appearance
            setupCheckSection.style.background = '';
            setupCheckSection.style.borderColor = '';
            
            // Restore original header text
            const header = setupCheckSection.querySelector('h4');
            if (header) {
                header.innerHTML = 'Quick Setup Check';
            }
            
            // Hide completion message
            const completionMsg = setupCheckSection.querySelector('.setup-completion-msg');
            if (completionMsg) {
                completionMsg.style.display = 'none';
            }
        }
    }
    
    // Load saved states and add event listeners
    prereqCheckboxes.forEach(id => {
        const checkbox = document.getElementById(id);
        if (checkbox) {
            // Load saved state
            const saved = localStorage.getItem(`workshop-prereq-${id}`);
            if (saved === 'true') {
                checkbox.checked = true;
            }
            
            // Add change listener
            checkbox.addEventListener('change', function() {
                // Save state
                localStorage.setItem(`workshop-prereq-${id}`, this.checked);
                
                // Update appearance
                updateSetupCheckAppearance();
                
                // Add visual feedback to individual item
                const item = this.closest('.prereq-item');
                if (this.checked) {
                    item.style.background = 'rgba(16, 185, 129, 0.1)';
                    item.style.borderColor = '#10b981';
                } else {
                    item.style.background = '';
                    item.style.borderColor = '';
                }
            });
            
            // Set initial state for individual items
            if (checkbox.checked) {
                const item = checkbox.closest('.prereq-item');
                item.style.background = 'rgba(16, 185, 129, 0.1)';
                item.style.borderColor = '#10b981';
            }
        }
    });
    
    // Initial appearance update
    updateSetupCheckAppearance();
}

// Screenshot Zoom Functionality
function initializeScreenshotZoom() {
    const screenshots = document.querySelectorAll('.step-image:not([data-placeholder])');
    
    screenshots.forEach(img => {
        // Only add zoom if the image actually loads (not a placeholder)
        img.addEventListener('load', function() {
            this.style.cursor = 'zoom-in';
            this.title = 'Click to zoom';
            
            this.addEventListener('click', function() {
                showScreenshotModal(this.src, this.alt);
            });
        });
        
        // Check if image is already loaded
        if (img.complete && img.naturalHeight !== 0) {
            img.style.cursor = 'zoom-in';
            img.title = 'Click to zoom';
            
            img.addEventListener('click', function() {
                showScreenshotModal(this.src, this.alt);
            });
        }
    });
}

function showScreenshotModal(imageSrc, imageAlt) {
    // Create modal overlay
    const modal = document.createElement('div');
    modal.className = 'screenshot-modal';
    modal.innerHTML = `
        <div class="screenshot-modal-overlay">
            <div class="screenshot-modal-content">
                <div class="screenshot-modal-header">
                    <h3>${imageAlt}</h3>
                    <button class="screenshot-modal-close" title="Close (or press Escape)">&times;</button>
                </div>
                <div class="screenshot-modal-body">
                    <img src="${imageSrc}" alt="${imageAlt}" class="zoomed-screenshot">
                </div>
                <div class="screenshot-modal-footer">
                    <p>Click anywhere outside the image or press <kbd>Esc</kbd> to close</p>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Style the modal
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.9);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 2000;
        opacity: 0;
        transition: opacity 0.3s ease;
    `;
    
    // Animate in
    setTimeout(() => {
        modal.style.opacity = '1';
    }, 10);
    
    // Close handlers
    const closeBtn = modal.querySelector('.screenshot-modal-close');
    const overlay = modal.querySelector('.screenshot-modal-overlay');
    
    const closeModal = () => {
        modal.style.opacity = '0';
        setTimeout(() => {
            if (modal.parentNode) {
                modal.remove();
            }
        }, 300);
    };
    
    closeBtn.addEventListener('click', closeModal);
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
            closeModal();
        }
    });
    
    // Escape key
    const escHandler = (e) => {
        if (e.key === 'Escape') {
            closeModal();
            document.removeEventListener('keydown', escHandler);
        }
    };
    document.addEventListener('keydown', escHandler);
    
    // Prevent body scroll while modal is open
    document.body.style.overflow = 'hidden';
    
    // Restore scroll when modal closes
    modal.addEventListener('transitionend', () => {
        if (modal.style.opacity === '0') {
            document.body.style.overflow = '';
        }
    });
}

// Enhanced Checkbox Interactions
function initializeEnhancedCheckboxes() {
    // Find all completion-check sections
    const completionChecks = document.querySelectorAll('.completion-check');
    
    completionChecks.forEach(container => {
        const checkbox = container.querySelector('input[type="checkbox"]');
        if (!checkbox) return;
        
        // Load saved state
        const checkboxId = checkbox.id;
        const savedState = localStorage.getItem(`checkbox-${checkboxId}`);
        if (savedState === 'true') {
            checkbox.checked = true;
            container.classList.add('checked');
        }
        
        // Add change event listener
        checkbox.addEventListener('change', function() {
            // Save state
            localStorage.setItem(`checkbox-${checkboxId}`, this.checked);
            
            if (this.checked) {
                // Add checked class with slight delay for smooth animation
                setTimeout(() => {
                    container.classList.add('checked');
                }, 50);
                
                // Add celebration effect
                createCheckboxCelebration(this);
            } else {
                container.classList.remove('checked');
            }
            
            // Check for final workshop ready state
            checkWorkshopReadyState();
            
            // Check for prereq completion state (activities page)
            checkPrereqCompletionState();
        });
        
        // Add hover effects
        container.addEventListener('mouseenter', function() {
            if (!checkbox.checked) {
                this.style.transform = 'translateY(-2px)';
            }
        });
        
        container.addEventListener('mouseleave', function() {
            if (!checkbox.checked) {
                this.style.transform = '';
            }
        });
    });
    
    // Initial check for workshop ready state
    checkWorkshopReadyState();
    
    // Initial check for prereq completion state
    checkPrereqCompletionState();
}

function createCheckboxCelebration(checkbox) {
    // Create celebration particles around the checkbox
    const rect = checkbox.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    // Create 4 celebration particles
    for (let i = 0; i < 4; i++) {
        const particle = document.createElement('div');
        particle.textContent = ['✨', '🎉', '⭐'][Math.floor(Math.random() * 3)];
        particle.style.cssText = `
            position: fixed;
            left: ${centerX}px;
            top: ${centerY}px;
            font-size: 16px;
            pointer-events: none;
            z-index: 1000;
            color: #10b981;
            font-weight: bold;
        `;
        
        document.body.appendChild(particle);
        
        // Animate particle
        const angle = (i / 4) * 2 * Math.PI;
        const distance = 40;
        const x = Math.cos(angle) * distance;
        const y = Math.sin(angle) * distance;
        
        particle.animate([
            { 
                transform: 'translate(0, 0) scale(1)', 
                opacity: 1 
            },
            { 
                transform: `translate(${x}px, ${y}px) scale(0.5)`, 
                opacity: 0 
            }
        ], {
            duration: 800,
            easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
        }).onfinish = () => {
            particle.remove();
        };
    }
    
    // Add subtle success sound effect (visual only - no actual sound)
    checkbox.style.boxShadow = '0 0 20px rgba(16, 185, 129, 0.6)';
    setTimeout(() => {
        checkbox.style.boxShadow = '';
    }, 600);
}

function checkWorkshopReadyState() {
    // Check if all three final checkboxes are checked
    const finalAccountsComplete = document.getElementById('final-accounts-complete');
    const finalWorkshopDeployed = document.getElementById('final-workshop-deployed');
    const finalClaudeComplete = document.getElementById('final-claude-complete');
    const workshopReady = document.getElementById('workshop-ready');
    
    if (finalAccountsComplete && finalWorkshopDeployed && finalClaudeComplete && workshopReady) {
        const allComplete = finalAccountsComplete.checked && finalWorkshopDeployed.checked && finalClaudeComplete.checked;
        
        if (allComplete) {
            workshopReady.style.display = 'block';
            workshopReady.style.animation = 'slideIn 0.5s ease-out';
            
            // Add extra celebration for completing everything
            setTimeout(() => {
                createCheckboxCelebration(finalClaudeComplete);
            }, 300);
        } else {
            workshopReady.style.display = 'none';
        }
    }
}

function checkPrereqCompletionState() {
    // Check if all prerequisite checkboxes are checked (activities page)
    const prereqGithub = document.getElementById('prereq-github');
    const prereqRender = document.getElementById('prereq-render');
    const prereqAnthropic = document.getElementById('prereq-anthropic');
    const prereqContainer = document.getElementById('prereq-check-container');
    const prereqSuccess = document.getElementById('prereq-success');
    
    if (prereqGithub && prereqRender && prereqAnthropic && prereqContainer) {
        const allPrereqsComplete = prereqGithub.checked && prereqRender.checked && prereqAnthropic.checked;
        
        if (allPrereqsComplete) {
            prereqContainer.classList.add('completed');
            if (prereqSuccess) {
                prereqSuccess.style.display = 'flex';
            }
            
            // Add celebration effect when all prerequisites complete
            setTimeout(() => {
                createCheckboxCelebration(prereqAnthropic);
            }, 200);
        } else {
            prereqContainer.classList.remove('completed');
            if (prereqSuccess) {
                prereqSuccess.style.display = 'none';
            }
        }
    }
}

// GIF Playback Controls
function initializeGifControls() {
    const gifImages = document.querySelectorAll('.gif-image');
    
    gifImages.forEach(gif => {
        const playBtn = gif.parentElement.querySelector('.gif-play-btn');
        if (!playBtn) return;
        
        // Store original src for restarting
        const originalSrc = gif.src;
        
        // Initial pause state - replace with static version or add overlay
        updateGifState(gif, playBtn, true);
        
        // Add click handler
        playBtn.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            
            const isPaused = gif.getAttribute('data-paused') === 'true';
            
            if (isPaused) {
                // Play: reload gif to restart animation
                gif.src = '';
                gif.src = originalSrc;
                updateGifState(gif, playBtn, false);
            } else {
                // Pause: we can't truly pause gifs, but we can indicate paused state
                updateGifState(gif, playBtn, true);
            }
        });
        
        // Also allow clicking on the gif itself
        gif.addEventListener('click', (e) => {
            e.preventDefault();
            playBtn.click();
        });
        
        // Add hover effects
        const gifWrapper = gif.parentElement;
        gifWrapper.addEventListener('mouseenter', () => {
            const controls = gifWrapper.querySelector('.gif-controls');
            controls.style.opacity = '1';
        });
        
        gifWrapper.addEventListener('mouseleave', () => {
            const controls = gifWrapper.querySelector('.gif-controls');
            const isPaused = gif.getAttribute('data-paused') === 'true';
            controls.style.opacity = isPaused ? '0.9' : '0.7';
        });
    });
}

function updateGifState(gif, playBtn, isPaused) {
    gif.setAttribute('data-paused', isPaused);
    
    if (isPaused) {
        playBtn.innerHTML = '▶️ Click to play';
        playBtn.title = 'Click to play GIF';
    } else {
        playBtn.innerHTML = '⏸️ Playing...';
        playBtn.title = 'Click to restart GIF';
        
        // Auto-return to paused state after a delay (simulate gif completion)
        setTimeout(() => {
            if (gif.getAttribute('data-paused') === 'false') {
                updateGifState(gif, playBtn, true);
            }
        }, 5000); // Adjust based on your GIF lengths
    }
}

console.log(`
🎯 Claude Code Workshop - Developer Console
==========================================

This workshop website demonstrates practical AI-assisted development.

Analytics stored in localStorage:
- workshopProgress: Section visit tracking
- workshopAnalytics: Tool usage metrics  
- workshopBrainstorm: User brainstorm data

Try the interactive elements and see how they enhance the learning experience!
`);