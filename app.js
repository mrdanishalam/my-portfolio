// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionality
    initNavigation();
    initTypingAnimation();
    initParticleSystem();
    initScrollAnimations();
    initSkillAnimations();
    initContactForm();
    initCustomCursor();
    initDownloadButton();
    initMobileMenu();
});

// Navigation functionality - FIXED
function initNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section');
    
    // Smooth scrolling for navigation links - FIXED
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
                
                // Update active state immediately
                navLinks.forEach(navLink => navLink.classList.remove('active'));
                link.classList.add('active');
            }
        });
    });
    
    // Update active navigation on scroll - IMPROVED
    function updateActiveNav() {
        let current = '';
        const scrollPosition = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                current = sectionId;
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }
    
    // Throttled scroll listener for better performance
    let isScrolling = false;
    window.addEventListener('scroll', () => {
        if (!isScrolling) {
            window.requestAnimationFrame(() => {
                updateActiveNav();
                isScrolling = false;
            });
            isScrolling = true;
        }
    });
    
    updateActiveNav();
}

// Typing Animation
function initTypingAnimation() {
    const typingText = document.querySelector('.typing-text');
    const cursor = document.querySelector('.cursor');
    const text = 'Full Stack Developer & Problem Solver';
    let index = 0;
    
    function typeText() {
        if (index < text.length) {
            typingText.textContent += text.charAt(index);
            index++;
            setTimeout(typeText, 100);
        } else {
            // Hide cursor after typing is complete
            setTimeout(() => {
                cursor.style.display = 'none';
            }, 1000);
        }
    }
    
    // Clear initial text and start typing
    typingText.textContent = '';
    setTimeout(typeText, 1000);
}

// Particle System - OPTIMIZED
function initParticleSystem() {
    const particlesContainer = document.querySelector('.particles');
    const particleCount = window.innerWidth < 768 ? 30 : 50; // Fewer particles on mobile
    
    for (let i = 0; i < particleCount; i++) {
        createParticle();
    }
    
    function createParticle() {
        const particle = document.createElement('div');
        const types = ['particle-1', 'particle-2', 'particle-3'];
        const type = types[Math.floor(Math.random() * types.length)];
        
        particle.className = `particle ${type}`;
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        
        particlesContainer.appendChild(particle);
        animateParticle(particle);
    }
    
    function animateParticle(particle) {
        const duration = 10000 + Math.random() * 20000;
        const startX = parseFloat(particle.style.left);
        const startY = parseFloat(particle.style.top);
        const endX = Math.random() * 100;
        const endY = Math.random() * 100;
        
        particle.animate([
            { 
                transform: `translate(0, 0)`,
                opacity: 0.3
            },
            { 
                transform: `translate(${endX - startX}vw, ${endY - startY}vh)`,
                opacity: 1
            },
            { 
                transform: `translate(${endX - startX}vw, ${endY - startY}vh)`,
                opacity: 0.3
            }
        ], {
            duration: duration,
            iterations: Infinity,
            direction: 'alternate',
            easing: 'ease-in-out'
        });
    }
}

// Scroll Animations - IMPROVED
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                
                // Trigger skill animations when skills section is visible
                if (entry.target.classList.contains('skills')) {
                    setTimeout(() => {
                        animateSkillBars();
                        animateCircularProgress();
                    }, 300);
                }
            }
        });
    }, observerOptions);
    
    // Observe elements for animations
    const animatedElements = document.querySelectorAll(
        '.timeline-item, .skill-category, .project-card, .about-card'
    );
    
    animatedElements.forEach((el, index) => {
        el.style.animationDelay = `${index * 0.1}s`;
        observer.observe(el);
    });
    
    // Observe sections
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        observer.observe(section);
    });
}

// Skill Animations - FIXED
function initSkillAnimations() {
    let skillsAnimated = false;
    
    window.animateSkillBars = function() {
        if (skillsAnimated) return;
        skillsAnimated = true;
        
        const progressBars = document.querySelectorAll('.progress');
        progressBars.forEach((bar, index) => {
            setTimeout(() => {
                const level = bar.getAttribute('data-level');
                bar.style.width = level + '%';
            }, index * 200);
        });
    };
    
    window.animateCircularProgress = function() {
        const circles = document.querySelectorAll('.circle-progress');
        circles.forEach((circle, index) => {
            setTimeout(() => {
                const level = parseInt(circle.getAttribute('data-level'));
                const degrees = (level / 100) * 360;
                circle.style.background = `conic-gradient(#00D4FF ${degrees}deg, rgba(255,255,255,0.1) 0deg)`;
            }, index * 300);
        });
    };
}

// Contact Form - ENHANCED
function initContactForm() {
    const form = document.getElementById('contactForm');
    const inputs = form.querySelectorAll('input, textarea');
    
    // Floating label animation
    inputs.forEach(input => {
        input.addEventListener('focus', () => {
            input.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', () => {
            if (!input.value.trim()) {
                input.parentElement.classList.remove('focused');
            }
        });
        
        input.addEventListener('input', () => {
            if (input.value.trim()) {
                input.parentElement.classList.add('focused');
            }
        });
        
        // Check if input has value on load
        if (input.value.trim()) {
            input.parentElement.classList.add('focused');
        }
    });
    
    // Form validation and submission
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);
        
        // Validate form
        const errors = validateForm(data);
        displayErrors(errors);
        
        if (Object.keys(errors).length === 0) {
            // Simulate form submission
            await submitForm(data);
        }
    });
    
    function validateForm(data) {
        const errors = {};
        
        if (!data.name || data.name.trim().length < 2) {
            errors.name = 'Name must be at least 2 characters long';
        }
        
        if (!data.email || !isValidEmail(data.email)) {
            errors.email = 'Please enter a valid email address';
        }
        
        if (!data.subject || data.subject.trim().length < 5) {
            errors.subject = 'Subject must be at least 5 characters long';
        }
        
        if (!data.message || data.message.trim().length < 10) {
            errors.message = 'Message must be at least 10 characters long';
        }
        
        return errors;
    }
    
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    function displayErrors(errors) {
        // Clear previous errors
        const errorMessages = document.querySelectorAll('.error-message');
        errorMessages.forEach(msg => {
            msg.textContent = '';
            msg.classList.remove('show');
        });
        
        // Display new errors
        Object.keys(errors).forEach(field => {
            const input = document.getElementById(field);
            const errorMsg = input.parentElement.querySelector('.error-message');
            if (errorMsg) {
                errorMsg.textContent = errors[field];
                errorMsg.classList.add('show');
                input.style.borderColor = '#ff4757';
            }
        });
        
        // Reset border color for valid fields
        const validFields = ['name', 'email', 'subject', 'message'].filter(field => !errors[field]);
        validFields.forEach(field => {
            const input = document.getElementById(field);
            if (input) {
                input.style.borderColor = 'rgba(0, 212, 255, 0.3)';
            }
        });
    }
    
    async function submitForm(data) {
        const submitBtn = form.querySelector('.btn-submit');
        const submitText = submitBtn.querySelector('.submit-text');
        const statusDiv = form.querySelector('.form-status');
        
        // Show loading state
        submitBtn.disabled = true;
        submitText.textContent = 'Sending...';
        
        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            // Show success message
            statusDiv.textContent = 'Message sent successfully! Thank you for reaching out.';
            statusDiv.className = 'form-status success';
            
            // Reset form
            form.reset();
            inputs.forEach(input => {
                input.parentElement.classList.remove('focused');
                input.style.borderColor = 'rgba(0, 212, 255, 0.3)';
            });
            
        } catch (error) {
            // Show error message
            statusDiv.textContent = 'Failed to send message. Please try again.';
            statusDiv.className = 'form-status error';
        } finally {
            // Reset button
            submitBtn.disabled = false;
            submitText.textContent = 'Send Message';
            
            // Hide status message after 5 seconds
            setTimeout(() => {
                statusDiv.className = 'form-status';
            }, 5000);
        }
    }
}

// Custom Cursor - FIXED
function initCustomCursor() {
    // Create custom cursor element
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    cursor.style.cssText = `
        position: fixed;
        width: 20px;
        height: 20px;
        background: radial-gradient(circle, #00D4FF 0%, transparent 70%);
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        transition: transform 0.1s ease;
        mix-blend-mode: difference;
    `;
    document.body.appendChild(cursor);
    
    let mouseX = 0;
    let mouseY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        cursor.style.left = mouseX - 10 + 'px';
        cursor.style.top = mouseY - 10 + 'px';
    });
    
    // Add cursor effects for interactive elements
    const interactiveElements = document.querySelectorAll(
        'a, button, .project-card, .skill-bar, .timeline-dot, .nav-link'
    );
    
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.style.transform = 'scale(1.5)';
            cursor.style.background = 'radial-gradient(circle, #8B5CF6 0%, transparent 70%)';
        });
        
        el.addEventListener('mouseleave', () => {
            cursor.style.transform = 'scale(1)';
            cursor.style.background = 'radial-gradient(circle, #00D4FF 0%, transparent 70%)';
        });
    });
}

// Download Button - ENHANCED
function initDownloadButton() {
    const downloadBtn = document.getElementById('downloadBtn');
    
    downloadBtn.addEventListener('click', () => {
        // Add animation class
        downloadBtn.classList.add('downloading');
        
        // Create and trigger download
        const pdfContent = `%PDF-1.3
%âãÏÓ
1 0 obj
<<
/Type /Catalog
/Outlines 2 0 R
/Pages 3 0 R
>>
endobj
2 0 obj
<<
/Type /Outlines
/Count 0
>>
endobj
3 0 obj
<<
/Type /Pages
/Count 1
/Kids [4 0 R]
>>
endobj
4 0 obj
<<
/Type /Page
/Parent 3 0 R
/Resources <<
/Font <<
/F1 9 0 R 
>>
/ProcSet 8 0 R
>>
/MediaBox [0 0 612.0000 792.0000]
/Contents 5 0 R
>>
endobj
5 0 obj
<< /Length 1074 >>
stream
2 J
BT
0 0 0 rg
/F1 0027 Tf
57.3750 722.2800 Td
( Your Name - Resume ) Tj
ET
BT
/F1 0010 Tf
57.3750 688.7800 Td
( Full Stack Developer & Problem Solver ) Tj
ET
endstream
endobj
6 0 obj
<<
/Type /Font
/Subtype /Type1
/BaseFont /Helvetica
>>
endobj
xref
0 7
0000000000 65535 f 
0000000009 00000 n 
0000000074 00000 n 
0000000120 00000 n 
0000000179 00000 n 
0000000364 00000 n 
0000001504 00000 n 
trailer
<<
/Size 7
/Root 1 0 R
>>
startxref
1608
%%EOF`;
        
        // Simulate download progress
        const progress = downloadBtn.querySelector('.download-progress');
        progress.style.left = '0%';
        progress.style.transition = 'left 1.5s ease';
        
        setTimeout(() => {
            progress.style.left = '100%';
        }, 100);
        
        setTimeout(() => {
            // Create and trigger download
            const blob = new Blob([pdfContent], { type: 'application/pdf' });
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = "MdDanish_Alam_Resume (2) (1)-3.pdf";
            link.download = 'Md_Danish_Alam_Resume.pdf';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(url);
            
            downloadBtn.classList.remove('downloading');
            
            // Reset progress
            progress.style.transition = 'none';
            progress.style.left = '-100%';
        }, 1500);
    });
}

// Mobile Menu - ENHANCED
function initMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    if (!hamburger || !navMenu) return;
    
    hamburger.addEventListener('click', (e) => {
        e.stopPropagation();
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.classList.toggle('menu-open');
    });
    
    // Close menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.classList.remove('menu-open');
        });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.classList.remove('menu-open');
        }
    });
    
    // Close menu on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.classList.remove('menu-open');
        }
    });
}

// Additional interactions and micro-animations
document.addEventListener('DOMContentLoaded', function() {
    // Add hover effects to cards
    const cards = document.querySelectorAll('.about-card, .skill-category, .contact-item');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
            this.style.transition = 'transform 0.3s ease';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // Timeline dot hover effects
    const timelineDots = document.querySelectorAll('.timeline-dot');
    timelineDots.forEach(dot => {
        dot.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.5)';
            this.style.boxShadow = '0 0 30px rgba(0, 212, 255, 0.8)';
            this.style.transition = 'all 0.3s ease';
        });
        
        dot.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
            this.style.boxShadow = '0 0 20px rgba(0, 212, 255, 0.6)';
        });
    });
    
    // Button pulse animation on hover
    const buttons = document.querySelectorAll('.btn-neon, .btn-outline, .btn-submit');
    buttons.forEach(btn => {
        btn.addEventListener('mouseenter', function() {
            this.style.animation = 'pulse 0.6s ease-in-out';
        });
        
        btn.addEventListener('animationend', function() {
            this.style.animation = '';
        });
    });
    
    // Parallax effect for hero section - OPTIMIZED
    let ticking = false;
    function updateParallax() {
        const scrolled = window.pageYOffset;
        const heroContent = document.querySelector('.hero-content');
        const particles = document.querySelector('.particles');
        
        if (heroContent && scrolled < window.innerHeight) {
            heroContent.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
        if (particles && scrolled < window.innerHeight) {
            particles.style.transform = `translateY(${scrolled * 0.3}px)`;
        }
        ticking = false;
    }
    
    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(updateParallax);
            ticking = true;
        }
    });
    
    // Smooth reveal animation for sections
    const sections = document.querySelectorAll('section');
    const revealSection = function(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    };
    
    const sectionObserver = new IntersectionObserver(revealSection, {
        root: null,
        threshold: 0.15,
    });
    
    sections.forEach(section => {
        if (section.id !== 'home') { // Don't hide hero section
            section.style.opacity = '0';
            section.style.transform = 'translateY(30px)';
            section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        }
        sectionObserver.observe(section);
    });
    
    // Add loading animation to skill bars
    const skillBars = document.querySelectorAll('.skill-bar');
    skillBars.forEach(bar => {
        bar.addEventListener('mouseenter', function() {
            const progress = this.querySelector('.progress');
            if (progress) {
                progress.style.animation = 'pulse 1s ease-in-out';
            }
        });
        
        bar.addEventListener('mouseleave', function() {
            const progress = this.querySelector('.progress');
            if (progress) {
                progress.style.animation = '';
            }
        });
    });
    
    // Project card interactions - ENHANCED
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.filter = 'brightness(1.1)';
            this.style.transition = 'all 0.3s ease';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.filter = 'brightness(1)';
        });
    });
});

// Performance optimization
function optimizeAnimations() {
    // Reduce animations on low-performance devices
    if (navigator.hardwareConcurrency < 4) {
        document.body.classList.add('reduced-motion');
    }
    
    // Pause animations when tab is not visible
    document.addEventListener('visibilitychange', function() {
        if (document.hidden) {
            document.body.classList.add('paused');
        } else {
            document.body.classList.remove('paused');
        }
    });
    
    // Reduce motion based on user preference
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        document.body.classList.add('reduced-motion');
    }
}

// Initialize performance optimizations
optimizeAnimations();

// Error handling
window.addEventListener('error', function(e) {
    console.log('An error occurred:', e.message);
    // Graceful fallback for any JavaScript errors
});

window.addEventListener('unhandledrejection', function(e) {
    console.log('Unhandled promise rejection:', e.reason);
});

// Utility functions
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

function debounce(func, wait, immediate) {
    let timeout;
    return function executedFunction() {
        const context = this;
        const args = arguments;
        const later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}