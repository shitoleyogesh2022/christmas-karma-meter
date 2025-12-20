class ChristmasKarmaMeter {
    constructor() {
        this.currentQuestion = 0;
        this.score = 0;
        this.answers = [];
        this.sharesUsed = 0;
        this.maxFreeShares = localStorage.getItem('premiumUser') ? 999 : 1;
        this.questionImages = ['🎅', '🎁', '🤝', '👨‍👩‍👧‍👦', '😌', '💝', '🌍'];
        this.questions = [
            {
                text: "When you see someone struggling with heavy shopping bags, what do you do?",
                image: "🎅",
                options: [
                    { text: "Immediately offer to help carry them", points: 5 },
                    { text: "Ask if they need assistance", points: 4 },
                    { text: "Smile and continue walking", points: 2 },
                    { text: "Pretend not to notice", points: 1 }
                ]
            },
            {
                text: "How do you feel about giving gifts during Christmas?",
                image: "🎁",
                options: [
                    { text: "I love finding the perfect gift for each person", points: 5 },
                    { text: "I enjoy giving but sometimes stress about it", points: 4 },
                    { text: "I give because it's expected", points: 2 },
                    { text: "I prefer receiving over giving", points: 1 }
                ]
            },
            {
                text: "A homeless person asks for help on Christmas Eve. You:",
                image: "🤝",
                options: [
                    { text: "Buy them a warm meal and spend time talking", points: 5 },
                    { text: "Give them money and wish them well", points: 4 },
                    { text: "Apologize and say you have no cash", points: 2 },
                    { text: "Avoid eye contact and walk away", points: 1 }
                ]
            },
            {
                text: "Your family is arguing during Christmas dinner. You:",
                image: "👨‍👩‍👧‍👦",
                options: [
                    { text: "Try to mediate and bring peace", points: 5 },
                    { text: "Change the subject to something positive", points: 4 },
                    { text: "Stay quiet and hope it passes", points: 2 },
                    { text: "Leave the table", points: 1 }
                ]
            },
            {
                text: "How do you handle Christmas stress?",
                image: "😌",
                options: [
                    { text: "Focus on gratitude and helping others", points: 5 },
                    { text: "Take deep breaths and remember what matters", points: 4 },
                    { text: "Complain to friends and family", points: 2 },
                    { text: "Get irritated with everyone around me", points: 1 }
                ]
            },
            {
                text: "When someone gives you a gift you don't like, you:",
                image: "💝",
                options: [
                    { text: "Express genuine gratitude for their thoughtfulness", points: 5 },
                    { text: "Thank them warmly despite your feelings", points: 4 },
                    { text: "Say thanks but show little enthusiasm", points: 2 },
                    { text: "Make it obvious you don't like it", points: 1 }
                ]
            },
            {
                text: "Your Christmas wish for the world would be:",
                image: "🌍",
                options: [
                    { text: "Peace, love, and an end to suffering", points: 5 },
                    { text: "Happiness and health for everyone", points: 4 },
                    { text: "A better year ahead", points: 2 },
                    { text: "Good things for me and my loved ones", points: 1 }
                ]
            }
        ];
        
        this.karmaLevels = [
            {
                min: 30, max: 35,
                title: "🌟 Christmas Angel",
                message: "WOW! You're absolutely incredible! 💫 Your heart radiates pure Christmas magic. You're the reason people believe in miracles and kindness. Keep spreading that beautiful light - the world needs more angels like you! ✨"
            },
            {
                min: 25, max: 29,
                title: "🎄 Holiday Hero",
                message: "Amazing! You're a true Christmas champion! 🏆 Your generous spirit and caring heart make every day brighter. You understand that love multiplies when shared. Keep being the hero in someone's story! 💝"
            },
            {
                min: 20, max: 24,
                title: "❄️ Festive Friend",
                message: "You're wonderful! Your warm heart is already making a difference! 🤗 You have so much love to give, and every small act of kindness creates ripples of joy. You're closer to Christmas magic than you think! 🌟"
            },
            {
                min: 15, max: 19,
                title: "🎁 Holiday Learner",
                message: "You're on a beautiful journey! 🌈 Every step toward kindness matters, and you're already showing such promise. This Christmas season is your chance to discover the incredible joy that comes from giving and loving! 💖"
            },
            {
                min: 7, max: 14,
                title: "🔔 Christmas Seeker",
                message: "Your adventure begins now! 🚀 Everyone starts somewhere, and recognizing the need for more love in your life is the first beautiful step. This Christmas, open your heart and watch the magic unfold! You've got this! 💪✨"
            }
        ];

        this.init();
    }

    init() {
        console.log('Initializing Christmas Karma Meter...');
        this.createSnowfall();
        this.bindEvents();
        this.checkPremiumStatus();
        
        // Test button existence
        console.log('Start button exists:', !!document.getElementById('start-btn'));
        console.log('Enter code button exists:', !!document.getElementById('enter-code-btn'));
    }

    checkPremiumStatus() {
        if (localStorage.getItem('premiumUser')) {
            document.getElementById('premium-access').style.display = 'block';
        }
    }

    createSnowfall() {
        const snowContainer = document.querySelector('.snow-container');
        const snowflakes = ['❄', '❅', '❆'];
        
        for (let i = 0; i < 50; i++) {
            const snowflake = document.createElement('div');
            snowflake.className = 'snowflake';
            snowflake.innerHTML = snowflakes[Math.floor(Math.random() * snowflakes.length)];
            snowflake.style.left = Math.random() * 100 + '%';
            snowflake.style.animationDuration = Math.random() * 3 + 2 + 's';
            snowflake.style.animationDelay = Math.random() * 2 + 's';
            snowContainer.appendChild(snowflake);
        }
    }

    bindEvents() {
        // Add error handling for missing elements
        const addEventListenerSafe = (id, event, handler) => {
            const element = document.getElementById(id);
            if (element) {
                element.addEventListener(event, handler);
            } else {
                console.warn(`Element with id '${id}' not found`);
            }
        };
        
        addEventListenerSafe('start-btn', 'click', () => this.startQuiz());
        addEventListenerSafe('restart-btn', 'click', () => this.restart());
        addEventListenerSafe('share-btn', 'click', () => this.shareResult());
        addEventListenerSafe('premium-btn', 'click', () => {
            if (localStorage.getItem('premiumUser')) {
                this.showPremiumDashboard();
            } else {
                this.showPremium();
            }
        });
        addEventListenerSafe('buy-premium', 'click', () => this.buyPremium());
        addEventListenerSafe('donate-premium', 'click', () => this.donatePremium('premium-screen'));
        addEventListenerSafe('donate-more', 'click', () => this.donatePremium('header-button'));
        addEventListenerSafe('premium-donate', 'click', () => this.donatePremium('activities-tab'));
        addEventListenerSafe('analysis-donate', 'click', () => this.donatePremium('analysis-tab'));
        addEventListenerSafe('back-to-result', 'click', () => this.showResult());
        addEventListenerSafe('back-to-main', 'click', () => {
            if (this.score > 0) {
                this.showResult();
            } else {
                this.showScreen('welcome-screen');
            }
        });
        addEventListenerSafe('enter-code-btn', 'click', () => this.showPremiumCodeScreen());
        addEventListenerSafe('verify-code-btn', 'click', () => this.verifyPremiumCode());
        addEventListenerSafe('back-to-welcome', 'click', () => this.showScreen('welcome-screen'));
        addEventListenerSafe('dashboard-btn', 'click', () => this.showPremiumDashboard());
        // Tab switching and activity completion - will be bound after DOM loads
        setTimeout(() => {
            document.querySelectorAll('.tab-btn').forEach(btn => {
                btn.addEventListener('click', (e) => this.switchTab(e.target.dataset.tab));
            });
            
            document.querySelectorAll('.activity-btn').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    e.target.textContent = 'Completed! ✅';
                    e.target.classList.add('completed');
                    e.target.disabled = true;
                });
            });
        }, 100);
    }

    startQuiz() {
        console.log('Starting quiz...');
        this.showScreen('quiz-screen');
        this.displayQuestion();
    }

    displayQuestion() {
        const question = this.questions[this.currentQuestion];
        document.getElementById('question-text').textContent = question.text;
        document.getElementById('question-image').textContent = question.image;
        
        const optionsContainer = document.getElementById('options-container');
        optionsContainer.innerHTML = '';
        
        // Shuffle options to prevent predictable answers
        const shuffledOptions = [...question.options].sort(() => Math.random() - 0.5);
        
        shuffledOptions.forEach((option, index) => {
            const optionElement = document.createElement('div');
            optionElement.className = 'option';
            optionElement.textContent = option.text;
            optionElement.addEventListener('click', () => this.selectOption(option.points, optionElement));
            optionsContainer.appendChild(optionElement);
        });

        this.updateProgress();
    }

    selectOption(points, optionElement) {
        optionElement.classList.add('selected');
        this.createConfetti();
        
        this.score += points;
        this.answers.push(points);
        this.currentQuestion++;

        if (this.currentQuestion < this.questions.length) {
            setTimeout(() => this.displayQuestion(), 800);
        } else {
            setTimeout(() => {
                this.createTreasureBlast();
                setTimeout(() => this.showResult(), 1000);
            }, 500);
        }
    }

    updateProgress() {
        const progress = ((this.currentQuestion + 1) / this.questions.length) * 100;
        document.getElementById('progress').style.width = progress + '%';
        
        const treasureBox = document.getElementById('treasure-box');
        if (progress === 100) {
            treasureBox.style.animation = 'bounce 0.5s ease-out, glow 0.5s ease-out, spin 1s ease-out';
        }
    }

    showResult() {
        const karmaLevel = this.karmaLevels.find(level => 
            this.score >= level.min && this.score <= level.max
        );

        const percentage = Math.round((this.score / 35) * 100);
        document.getElementById('karma-score').textContent = percentage + '%';
        document.getElementById('karma-title').textContent = karmaLevel.title;
        document.getElementById('karma-message').textContent = karmaLevel.message;
        
        if (localStorage.getItem('premiumUser')) {
            document.querySelector('.share-counter').style.display = 'none';
            document.getElementById('premium-btn').textContent = 'Access Karma Dashboard ✨';
        } else {
            const sharesLeft = this.maxFreeShares - this.sharesUsed;
            document.getElementById('shares-left').textContent = sharesLeft;
            if (this.sharesUsed > 0 && sharesLeft <= 0) {
                document.querySelector('.share-counter').style.background = 'linear-gradient(135deg, #ffebee, #ffcdd2)';
                document.querySelector('.share-counter p').innerHTML = 'Share with more friends? <strong>Unlock Premium!</strong>';
            }
        }

        this.showScreen('result-screen');
    }

    shareResult() {
        if (this.sharesUsed >= this.maxFreeShares) {
            alert('🎁 You\'ve used your free share! Get Premium for unlimited sharing and detailed insights!');
            this.showPremium();
            return;
        }

        const karmaLevel = this.karmaLevels.find(level => 
            this.score >= level.min && this.score <= level.max
        );

        const shareText = `🎄 I just discovered my Christmas Karma! I'm a ${karmaLevel.title} with a score of ${this.score}/35! ✨ Can you beat my score? Take the test: ChristmasKarmaMeter.com 🎁 #ChristmasKarma #HolidaySpirit`;
        
        this.sharesUsed++;
        
        if (!localStorage.getItem('premiumUser')) {
            const sharesLeft = this.maxFreeShares - this.sharesUsed;
            document.getElementById('shares-left').textContent = sharesLeft;
            if (sharesLeft <= 0) {
                document.querySelector('.share-counter').style.background = 'linear-gradient(135deg, #ffebee, #ffcdd2)';
                document.querySelector('.share-counter p').innerHTML = 'Share with more friends? <strong>Unlock Premium!</strong>';
            }
        }
        
        if (navigator.share) {
            navigator.share({
                title: 'My Christmas Karma Result',
                text: shareText,
                url: window.location.href
            });
        } else {
            navigator.clipboard.writeText(shareText).then(() => {
                alert('🎄 Result copied! Challenge your friends to beat your karma score!');
            });
        }
        
        this.createShareCelebration();
    }

    showPremium() {
        this.showScreen('premium-screen');
    }

    async buyPremium() {
        try {
            const backendUrl = CONFIG.getBackendUrl();
            
            const orderResponse = await fetch(`${backendUrl}/api/create-order`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ amount: 4900, currency: 'INR' })
            });
            
            const orderData = await orderResponse.json();
            if (!orderData.success) throw new Error('Failed to create order');
            
            const options = {
                "key": orderData.key_id,
                "amount": orderData.amount,
                "currency": orderData.currency,
                "name": "Christmas Karma Meter",
                "description": "Premium Christmas Insights",
                "order_id": orderData.order_id,
                "handler": (response) => this.verifyPayment(response),
                "prefill": { "name": "Christmas User", "email": "christmaskarmameter@gmail.com" },
                "theme": { "color": "#ff6b6b" }
            };
            
            const rzp = new Razorpay(options);
            rzp.on('payment.failed', (response) => {
                alert('🚫 Payment Failed: ' + response.error.description);
            });
            rzp.open();
        } catch (error) {
            alert('🚫 Failed to initiate payment. Please try again.');
        }
    }
    
    async verifyPayment(response) {
        try {
            const backendUrl = CONFIG.getBackendUrl();
            
            const verifyResponse = await fetch(`${backendUrl}/api/verify-payment`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    razorpay_order_id: response.razorpay_order_id,
                    razorpay_payment_id: response.razorpay_payment_id,
                    razorpay_signature: response.razorpay_signature
                })
            });
            
            const verifyData = await verifyResponse.json();
            if (verifyData.success) {
                this.handlePaymentSuccess(response);
            } else {
                throw new Error('Payment verification failed');
            }
        } catch (error) {
            alert('🚫 Payment verification failed. Please contact support.');
        }
    }

    async donatePremium(sourceButton = 'unknown') {
        console.log('Donation triggered from:', sourceButton);
        
        let customAmount;
        let inputField;
        
        // Determine which input field to use based on source button
        switch(sourceButton) {
            case 'premium-screen':
                inputField = document.getElementById('donation-amount');
                break;
            case 'activities-tab':
                inputField = document.getElementById('premium-donation-amount');
                break;
            case 'analysis-tab':
                inputField = document.getElementById('analysis-donation-amount');
                break;
            case 'header-button':
                // For header button, try to find any visible input field
                inputField = document.getElementById('premium-donation-amount') || 
                           document.getElementById('analysis-donation-amount');
                break;
            default:
                // Fallback - find any available input
                inputField = document.getElementById('donation-amount') || 
                           document.getElementById('premium-donation-amount') || 
                           document.getElementById('analysis-donation-amount');
        }
        
        if (inputField && inputField.value && parseInt(inputField.value) > 0) {
            customAmount = parseInt(inputField.value) * 100;
            console.log('Using input from', sourceButton, ':', inputField.value);
        } else {
            // Fallback to ₹111 if somehow no input is found
            customAmount = 11100;
            console.log('Using fallback amount: 111');
        }
        
        // Minimum donation validation
        if (customAmount < 5000) { // Minimum ₹50
            alert('🎄 Minimum donation amount is ₹50. Thank you for your generosity!');
            return;
        }
        
        console.log('Final donation amount:', customAmount/100, 'rupees');
        
        // Mark as donation for success message
        localStorage.setItem('isDonation', 'true');
        
        try {
            const backendUrl = CONFIG.getBackendUrl();
            
            const orderResponse = await fetch(`${backendUrl}/api/create-order`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ amount: customAmount, currency: 'INR' })
            });
            
            const orderData = await orderResponse.json();
            if (!orderData.success) throw new Error('Failed to create order');
            
            console.log('Order created with amount:', orderData.amount/100, 'rupees');
            
            const options = {
                "key": orderData.key_id,
                "amount": orderData.amount,
                "currency": orderData.currency,
                "name": "Christmas Karma Meter",
                "description": `Donation + Premium Access (₹${customAmount/100})`,
                "order_id": orderData.order_id,
                "handler": (response) => this.verifyPayment(response),
                "prefill": { "name": "Generous User", "email": "christmaskarmameter@gmail.com" },
                "theme": { "color": "#ff9800" }
            };
            
            const rzp = new Razorpay(options);
            rzp.on('payment.failed', (response) => {
                alert('🚫 Payment Failed: ' + response.error.description);
                localStorage.removeItem('isDonation');
            });
            rzp.open();
        } catch (error) {
            console.error('Donation error:', error);
            alert('🚫 Failed to initiate donation. Please try again.');
            localStorage.removeItem('isDonation');
        }
    }

    handlePaymentSuccess(response) {
        console.log('Payment Success:', response);
        
        // Generate premium code via backend
        this.generatePremiumCode(response.razorpay_payment_id);
        
        // Enable premium features
        this.maxFreeShares = 999;
        localStorage.setItem('premiumUser', 'true');
        localStorage.setItem('paymentId', response.razorpay_payment_id);
        
        this.showPremiumDashboard();
    }
    
    async generatePremiumCode(paymentId) {
        try {
            const backendUrl = CONFIG.getBackendUrl();
            
            const response = await fetch(`${backendUrl}/api/generate-code`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ payment_id: paymentId })
            });
            
            const result = await response.json();
            
            if (result.success) {
                localStorage.setItem('premiumCode', result.code);
                
                // Check if it was a donation
                const isDonation = localStorage.getItem('isDonation');
                if (isDonation) {
                    alert(`💖 Thank you for your generous donation! Your Premium Code: ${result.code}\n\nSave this code to access premium on up to 2 devices! Welcome to Premium! ✨`);
                    localStorage.removeItem('isDonation');
                } else {
                    alert(`🎄 Payment Successful! Your Premium Code: ${result.code}\n\nSave this code to access premium on up to 2 devices! Welcome to Premium! ✨`);
                }
            }
        } catch (error) {
            console.error('Failed to generate premium code:', error);
            
            // Generate local premium code as fallback
            const localCode = 'CK' + Math.random().toString(36).substr(2, 4).toUpperCase();
            localStorage.setItem('premiumCode', localCode);
            
            // Check if it was a donation
            const isDonation = localStorage.getItem('isDonation');
            if (isDonation) {
                alert(`💖 Thank you for your generous donation! Your Premium Code: ${localCode}\n\nSave this code to access premium on up to 2 devices! Welcome to Premium! ✨`);
                localStorage.removeItem('isDonation');
            } else {
                alert(`🎄 Payment Successful! Your Premium Code: ${localCode}\n\nSave this code to access premium on up to 2 devices! Welcome to Premium! ✨`);
            }
        }
    }
    showPremiumCodeScreen() {
        console.log('Showing premium code screen...');
        this.showScreen('premium-code-screen');
    }
    async verifyPremiumCode() {
        const codeInput = document.getElementById('premium-code-input');
        const enteredCode = codeInput.value.trim().toUpperCase();
        
        if (!enteredCode || enteredCode.length !== 6) {
            alert('🎄 Please enter a valid 6-character premium code!');
            return;
        }
        
        try {
            const backendUrl = CONFIG.getBackendUrl();
            
            const response = await fetch(`${backendUrl}/api/verify-code`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ code: enteredCode })
            });
            
            const result = await response.json();
            
            if (result.success) {
                // Enable premium features
                this.maxFreeShares = 999;
                localStorage.setItem('premiumUser', 'true');
                localStorage.setItem('premiumCode', enteredCode);
                
                alert('🎄 Premium code verified! Welcome to Premium! ✨');
                this.showPremiumDashboard();
            } else {
                alert('🚫 ' + (result.message || 'Invalid code or device limit reached!'));
            }
        } catch (error) {
            console.error('Code verification failed:', error);
            
            // Fallback: Check if code starts with 'CK' (local verification)
            if (enteredCode.startsWith('CK') && enteredCode.length === 6) {
                // Enable premium features
                this.maxFreeShares = 999;
                localStorage.setItem('premiumUser', 'true');
                localStorage.setItem('premiumCode', enteredCode);
                
                alert('🎄 Premium code verified! Welcome to Premium! ✨');
                this.showPremiumDashboard();
            } else {
                alert('🚫 Failed to verify code. Please check your internet connection or try again.');
            }
        }
    }

    showPremiumDashboard() {
        this.generatePremiumAnalysis();
        this.showScreen('premium-dashboard');
    }

    generatePremiumAnalysis() {
        const empathyScore = Math.floor(Math.random() * 20) + 75;
        const generosityScore = Math.floor(Math.random() * 25) + 70;
        const peaceScore = Math.floor(Math.random() * 30) + 65;
        
        document.getElementById('empathy-score').style.width = empathyScore + '%';
        document.getElementById('generosity-score').style.width = generosityScore + '%';
        document.getElementById('peace-score').style.width = peaceScore + '%';
        
        document.getElementById('empathy-text').textContent = this.getScoreText(empathyScore, 'empathy');
        document.getElementById('generosity-text').textContent = this.getScoreText(generosityScore, 'generosity');
        document.getElementById('peace-text').textContent = this.getScoreText(peaceScore, 'peace');
    }

    getScoreText(score, type) {
        const texts = {
            empathy: {
                high: "You deeply understand others' feelings and respond with compassion.",
                medium: "You show good emotional awareness and care for others.",
                low: "You're developing your ability to connect with others emotionally."
            },
            generosity: {
                high: "You give freely of your time, resources, and love to others.",
                medium: "You enjoy helping others and sharing what you have.",
                low: "You're learning to find joy in giving and helping others."
            },
            peace: {
                high: "You naturally bring calm and resolution to conflicts.",
                medium: "You prefer harmony and work to maintain peaceful relationships.",
                low: "You're developing skills to handle conflicts constructively."
            }
        };
        
        if (score >= 80) return texts[type].high;
        if (score >= 60) return texts[type].medium;
        return texts[type].low;
    }

    switchTab(tabName) {
        document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
        document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
        
        document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');
        document.getElementById(`${tabName}-tab`).classList.add('active');
    }

    showScreen(screenId) {
        document.querySelectorAll('.screen').forEach(screen => {
            screen.classList.remove('active');
        });
        document.getElementById(screenId).classList.add('active');
    }

    createConfetti() {
        const container = document.getElementById('confetti-container');
        const confettiEmojis = ['🎉', '✨', '🎊', '⭐', '💫', '🌟'];
        
        for (let i = 0; i < 15; i++) {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            confetti.textContent = confettiEmojis[Math.floor(Math.random() * confettiEmojis.length)];
            confetti.style.left = Math.random() * 100 + '%';
            confetti.style.animationDelay = Math.random() * 0.5 + 's';
            container.appendChild(confetti);
            
            setTimeout(() => confetti.remove(), 3000);
        }
    }

    createTreasureBlast() {
        const container = document.getElementById('confetti-container');
        const treasureEmojis = ['🎁', '💎', '👑', '🏆', '🌟', '✨'];
        
        for (let i = 0; i < 30; i++) {
            const blast = document.createElement('div');
            blast.className = 'confetti';
            blast.textContent = treasureEmojis[Math.floor(Math.random() * treasureEmojis.length)];
            blast.style.left = Math.random() * 100 + '%';
            blast.style.animationDelay = Math.random() * 0.3 + 's';
            blast.style.fontSize = '2rem';
            container.appendChild(blast);
            
            setTimeout(() => blast.remove(), 3000);
        }
    }

    createShareCelebration() {
        const container = document.getElementById('confetti-container');
        const shareEmojis = ['💝', '🤝', '💕', '🎄', '❤️', '🎊'];
        
        for (let i = 0; i < 20; i++) {
            const celebration = document.createElement('div');
            celebration.className = 'confetti';
            celebration.textContent = shareEmojis[Math.floor(Math.random() * shareEmojis.length)];
            celebration.style.left = Math.random() * 100 + '%';
            celebration.style.animationDelay = Math.random() * 0.2 + 's';
            container.appendChild(celebration);
            
            setTimeout(() => celebration.remove(), 3000);
        }
    }

    restart() {
        this.currentQuestion = 0;
        this.score = 0;
        this.answers = [];
        this.sharesUsed = 0;
        this.showScreen('welcome-screen');
    }
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded, initializing Christmas Karma Meter...');
    try {
        new ChristmasKarmaMeter();
        console.log('Christmas Karma Meter initialized successfully');
    } catch (error) {
        console.error('Failed to initialize Christmas Karma Meter:', error);
    }
});