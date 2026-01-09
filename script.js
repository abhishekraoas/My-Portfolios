// ================================
// Theme Toggle
// ================================
const themeToggle = document.getElementById('themeToggle');
const html = document.documentElement;

// Check for saved theme preference or default to light mode
const currentTheme = localStorage.getItem('theme') || 'light';
html.setAttribute('data-theme', currentTheme);

// Update icon based on current theme
function updateThemeIcon() {
    const icon = themeToggle.querySelector('i');
    const currentTheme = html.getAttribute('data-theme');
    
    if (currentTheme === 'dark') {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    } else {
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
    }
}

// Initialize icon
updateThemeIcon();

// Toggle theme
themeToggle.addEventListener('click', () => {
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon();
});

// ================================
// Navigation & Mobile Menu
// ================================
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');
const navbar = document.querySelector('.navbar');

// Toggle mobile menu
navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    
    // Animate hamburger
    const spans = navToggle.querySelectorAll('span');
    if (navMenu.classList.contains('active')) {
        spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
    } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    }
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        const spans = navToggle.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    });
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// ================================
// Smooth Scrolling
// ================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ================================
// Scroll to Top Button
// ================================
const scrollTopBtn = document.getElementById('scrollTop');

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        scrollTopBtn.classList.add('visible');
    } else {
        scrollTopBtn.classList.remove('visible');
    }
});

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ================================
// Intersection Observer for Animations
// ================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-up');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.info-card, .timeline-item, .project-card, .skill-category').forEach(el => {
    observer.observe(el);
});

// ================================
// Contact Form Handling
// ================================
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;
    
    // Create mailto link
    const mailtoLink = `mailto:abhishekrao1984@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`)}`;
    
    // Open email client
    window.location.href = mailtoLink;
    
    // Show success message
    showNotification('Thank you! Your message has been prepared. Please send it from your email client.', 'success');
    
    // Reset form
    contactForm.reset();
});

// ================================
// Notification System
// ================================
function showNotification(message, type = 'success') {
    // Remove existing notification if any
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
        <span>${message}</span>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 30px;
        background: ${type === 'success' ? '#10b981' : '#ef4444'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
        display: flex;
        align-items: center;
        gap: 0.75rem;
        z-index: 10000;
        animation: slideInRight 0.3s ease-out;
        max-width: 400px;
    `;
    
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease-out';
        setTimeout(() => notification.remove(), 300);
    }, 5000);
}

// Add notification animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ================================
// Active Navigation Link
// ================================
const sections = document.querySelectorAll('section[id]');

function highlightNavigation() {
    const scrollY = window.pageYOffset;
    
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinks.forEach(link => link.classList.remove('active'));
            if (navLink) {
                navLink.classList.add('active');
            }
        }
    });
}

window.addEventListener('scroll', highlightNavigation);

// ================================
// Typing Effect for Hero Title
// ================================
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Optional: Uncomment to enable typing effect
// window.addEventListener('load', () => {
//     const heroTitle = document.querySelector('.hero-title');
//     const originalText = heroTitle.textContent;
//     typeWriter(heroTitle, originalText, 80);
// });

// ================================
// Skills Progress Animation (Optional Enhancement)
// ================================
function animateSkillBars() {
    const skillTags = document.querySelectorAll('.skill-tags span');
    
    skillTags.forEach((tag, index) => {
        setTimeout(() => {
            tag.style.opacity = '0';
            tag.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                tag.style.transition = 'all 0.5s ease';
                tag.style.opacity = '1';
                tag.style.transform = 'translateY(0)';
            }, 50);
        }, index * 50);
    });
}

// Observe skills section
const skillsSection = document.querySelector('.skills');
if (skillsSection) {
    const skillsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateSkillBars();
                skillsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });
    
    skillsObserver.observe(skillsSection);
}

// ================================
// Dynamic Year in Footer
// ================================
const footer = document.querySelector('.footer p');
if (footer) {
    footer.innerHTML = footer.innerHTML.replace('2026', new Date().getFullYear());
}

// ================================
// Prevent Form Submission on Enter (except textarea)
// ================================
document.querySelectorAll('input').forEach(input => {
    input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && input.type !== 'submit') {
            e.preventDefault();
        }
    });
});

// ================================
// Add Loading Animation
// ================================
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Add fade-in animation on load
document.body.style.opacity = '0';
document.body.style.transition = 'opacity 0.5s ease';

window.addEventListener('load', () => {
    document.body.style.opacity = '1';
});

// ================================
// Console Message (Easter Egg)
// ================================
console.log('%c👋 Hello there!', 'color: #6366f1; font-size: 24px; font-weight: bold;');
console.log('%cLooking for something? Feel free to explore the code!', 'color: #8b5cf6; font-size: 14px;');
console.log('%c💼 Abhishek Rao - Tester Trainee & Web Developer', 'color: #10b981; font-size: 12px;');
console.log('%c📧 abhishekrao1984@gmail.com', 'color: #3b82f6; font-size: 12px;');

// ================================
// Performance Monitoring (Optional)
// ================================
if ('performance' in window) {
    window.addEventListener('load', () => {
        setTimeout(() => {
            const perfData = window.performance.timing;
            const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
            console.log(`%c⚡ Page loaded in ${pageLoadTime}ms`, 'color: #f59e0b; font-size: 12px;');
        }, 0);
    });
}
