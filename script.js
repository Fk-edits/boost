// Telegram Mini App - Social Boost
// Bot: @DawudBoost_Bot
// Service URL: https://fk-edits.github.io/-/

class SocialBoostApp {
    constructor() {
        this.serviceUrl = 'https://fk-edits.github.io/-/';
        this.telegram = window.Telegram?.WebApp;
        this.init();
    }
    
    init() {
        // Initialize Telegram Web App
        if (this.telegram) {
            this.telegram.ready();
            this.telegram.expand();
            console.log('Telegram WebApp initialized');
        }
        
        // Set bot username
        this.setBotInfo();
        
        // Bind events
        this.bindEvents();
        
        // Animate elements
        this.animateElements();
        
        console.log('Social Boost App initialized');
    }
    
    setBotInfo() {
        const botName = '@DawudBoost_Bot';
        document.querySelector('.footer p').textContent = botName;
        document.title = `Social Boost | ${botName}`;
    }
    
    bindEvents() {
        // Boost Button
        const boostBtn = document.getElementById('boostBtn');
        if (boostBtn) {
            boostBtn.addEventListener('click', () => this.handleBoost());
        }
        
        // Open Service Button
        const openBtn = document.getElementById('openBtn');
        if (openBtn) {
            openBtn.addEventListener('click', () => this.handleOpenService());
        }
    }
    
    handleBoost() {
        this.createConfetti();
        this.showMessage('🚀 Boost activated!', 'success');
        
        // Send data to bot if Telegram WebApp is available
        if (this.telegram && this.telegram.sendData) {
            const data = {
                action: 'boost',
                timestamp: Date.now(),
                bot: '@booottttttttttt_bot'
            };
            this.telegram.sendData(JSON.stringify(data));
        }
    }
    
    handleOpenService() {
        // Show loading animation
        this.showLoading();
        
        // Create confetti effect
        this.createConfetti();
        
        // Show message
        this.showMessage('Opening service...', 'info');
        
        // Wait 1.5 seconds to show animation, then open URL
        setTimeout(() => {
            this.hideLoading();
            
            // Open the service URL
            if (this.telegram && this.telegram.openLink) {
                // Use Telegram's method for better mobile experience
                this.telegram.openLink(this.serviceUrl);
            } else {
                // Fallback for browser testing
                window.open(this.serviceUrl, '_blank');
            }
        }, 1500);
    }
    
    showLoading() {
        const overlay = document.getElementById('loadingOverlay');
        if (overlay) {
            overlay.style.display = 'flex';
        }
    }
    
    hideLoading() {
        const overlay = document.getElementById('loadingOverlay');
        if (overlay) {
            overlay.style.display = 'none';
        }
    }
    
    showMessage(text, type = 'info') {
        // Remove existing messages
        const existingMsg = document.querySelector('.message-popup');
        if (existingMsg) existingMsg.remove();
        
        // Create message element
        const message = document.createElement('div');
        message.className = `message-popup message-${type}`;
        message.textContent = text;
        
        // Style the message
        message.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'success' ? '#4CAF50' : type === 'error' ? '#f44336' : '#2196F3'};
            color: white;
            padding: 15px 25px;
            border-radius: 12px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.3);
            z-index: 9999;
            font-weight: bold;
            animation: slideInRight 0.3s ease, fadeOut 0.3s ease 2s forwards;
            max-width: 300px;
        `;
        
        // Add animation styles if not present
        if (!document.querySelector('#message-animations')) {
            const style = document.createElement('style');
            style.id = 'message-animations';
            style.textContent = `
                @keyframes slideInRight {
                    from { transform: translateX(100%); opacity: 0; }
                    to { transform: translateX(0); opacity: 1; }
                }
                @keyframes fadeOut {
                    from { opacity: 1; }
                    to { opacity: 0; }
                }
            `;
            document.head.appendChild(style);
        }
        
        document.body.appendChild(message);
        
        // Auto remove after animation
        setTimeout(() => {
            if (message.parentNode) {
                message.parentNode.removeChild(message);
            }
        }, 2300);
    }
    
    createConfetti() {
        const colors = ['#667eea', '#764ba2', '#f093fb', '#f5576c', '#f6d365', '#fda085'];
        
        for (let i = 0; i < 30; i++) {
            setTimeout(() => {
                const confetti = document.createElement('div');
                confetti.className = 'confetti';
                
                // Random properties
                const color = colors[Math.floor(Math.random() * colors.length)];
                const size = Math.random() * 10 + 5;
                const left = Math.random() * 100;
                const animationDuration = Math.random() * 1 + 1;
                
                confetti.style.cssText = `
                    position: fixed;
                    width: ${size}px;
                    height: ${size}px;
                    background: ${color};
                    border-radius: 50%;
                    top: -20px;
                    left: ${left}vw;
                    z-index: 999;
                    pointer-events: none;
                    animation: fall ${animationDuration}s linear forwards;
                `;
                
                document.body.appendChild(confetti);
                
                // Remove after animation
                setTimeout(() => {
                    if (confetti.parentNode) {
                        confetti.parentNode.removeChild(confetti);
                    }
                }, animationDuration * 1000);
                
            }, i * 50);
        }
        
        // Add fall animation
        if (!document.querySelector('#confetti-animation')) {
            const style = document.createElement('style');
            style.id = 'confetti-animation';
            style.textContent = `
                @keyframes fall {
                    0% {
                        transform: translateY(0) rotate(0deg);
                        opacity: 1;
                    }
                    100% {
                        transform: translateY(100vh) rotate(360deg);
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(style);
        }
    }
    
    animateElements() {
        // Animate service cards
        const cards = document.querySelectorAll('.service-card');
        cards.forEach((card, index) => {
            card.style.animationDelay = `${index * 0.1}s`;
            card.style.animation = 'fadeIn 0.5s ease-out forwards';
            card.style.opacity = '0';
        });
        
        // Add hover effects to buttons
        this.addButtonEffects();
    }
    
    addButtonEffects() {
        const buttons = document.querySelectorAll('.boost-btn, .open-btn');
        
        buttons.forEach(button => {
            // Click effect
            button.addEventListener('click', function(e) {
                // Ripple effect
                const ripple = document.createElement('span');
                const rect = this.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height);
                const x = e.clientX - rect.left - size / 2;
                const y = e.clientY - rect.top - size / 2;
                
                ripple.style.cssText = `
                    position: absolute;
                    border-radius: 50%;
                    background: rgba(255, 255, 255, 0.6);
                    transform: scale(0);
                    animation: ripple 0.6s linear;
                    width: ${size}px;
                    height: ${size}px;
                    top: ${y}px;
                    left: ${x}px;
                    pointer-events: none;
                `;
                
                this.appendChild(ripple);
                
                setTimeout(() => {
                    if (ripple.parentNode) {
                        ripple.parentNode.removeChild(ripple);
                    }
                }, 600);
            });
        });
        
        // Add ripple animation
        if (!document.querySelector('#ripple-animation')) {
            const style = document.createElement('style');
            style.id = 'ripple-animation';
            style.textContent = `
                @keyframes ripple {
                    to {
                        transform: scale(4);
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(style);
        }
    }
}

// Initialize the app when page loads
document.addEventListener('DOMContentLoaded', () => {
    window.app = new SocialBoostApp();
    
    // Set Telegram theme colors if available
    if (window.Telegram?.WebApp?.themeParams) {
        const theme = window.Telegram.WebApp.themeParams;
        document.documentElement.style.setProperty('--tg-bg-color', theme.bg_color || '#667eea');
        document.documentElement.style.setProperty('--tg-text-color', theme.text_color || '#ffffff');
    }
});

// Add a simple error handler
window.onerror = function(msg, url, lineNo, columnNo, error) {
    console.log('Error:', msg, 'Script:', url, 'Line:', lineNo);
    return false;

};
