// Smooth scrolling for navigation links
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        scrollToSection(targetId);
    });
});

function scrollToSection(sectionId) {
    const targetElement = document.getElementById(sectionId);
    if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth' });
    }
}

// Navbar scroll effect
window.addEventListener('scroll', function() {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(18, 18, 18, 0.95)';
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.5)';
    } else {
        navbar.style.background = 'rgba(18, 18, 18, 0.9)';
        navbar.style.boxShadow = 'none';
    }
});

// Parallax effect on hero
window.addEventListener('scroll', function() {
    const parallax = document.querySelector('.parallax');
    const scrolled = window.pageYOffset;
    const rate = scrolled * -0.5;
    parallax.style.transform = `translateY(${rate}px)`;
});

// Scroll-triggered animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
}, observerOptions);

document.querySelectorAll('.animate-on-scroll').forEach(el => {
    observer.observe(el);
});

// -----------------------------
// EMAILJS FORM SUBMISSION
// -----------------------------

// Initialize EmailJS
emailjs.init("sb3j2XrU9Pyfw2c2Q");  // <-- Your Public Key

document.getElementById('contact-form').addEventListener('submit', function(e) {
    e.preventDefault();

    const form = this;

    const formData = {
        name: form.name.value,
        email: form.email.value,
        phone: form.phone.value,
        message: form.message.value
    };

    // Send email via EmailJS
    emailjs.send("service_3upcig3", "template_qo8nsqv", formData)
        .then(function(response) {
            showSuccessMessage();
            form.reset();
        })
        .catch(function(error) {
            alert("Error sending message. Please try again!");
            console.error("EmailJS Error:", error);
        });
});

// Success popup
function showSuccessMessage() {
    const popup = document.createElement('div');
    popup.className = 'success-popup';
    popup.innerHTML = `
        <div class="success-content">
            <i class="fas fa-check-circle"></i>
            <h3>Message Sent!</h3>
            <p>Thank you for reaching out. I'll get back to you soon.</p>
            <button onclick="closePopup()">OK</button>
        </div>
    `;
    document.body.appendChild(popup);

    setTimeout(() => popup.classList.add('show'), 100);
    setTimeout(() => closePopup(), 5000);
}

function closePopup() {
    const popup = document.querySelector('.success-popup');
    if (popup) {
        popup.classList.remove('show');
        setTimeout(() => popup.remove(), 300);
    }
}

// Add popup CSS
const style = document.createElement('style');
style.textContent = `
    .success-popup {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 10000;
        opacity: 0;
        transition: opacity 0.3s;
    }
    .success-popup.show {
        opacity: 1;
    }
    .success-content {
        background: #1a1a1a;
        padding: 2rem;
        border-radius: 10px;
        text-align: center;
        max-width: 400px;
        animation: popupFadeIn 0.5s ease-out;
    }
    .success-content i {
        font-size: 3rem;
        color: #00d4ff;
        margin-bottom: 1rem;
    }
    .success-content h3 {
        color: #00d4ff;
        margin-bottom: 1rem;
    }
    .success-content button {
        background: #00d4ff;
        color: #121212;
        border: none;
        padding: 0.5rem 1rem;
        border-radius: 5px;
        cursor: pointer;
        margin-top: 1rem;
    }
    @keyframes popupFadeIn {
        from { transform: scale(0.8); opacity: 0; }
        to { transform: scale(1); opacity: 1; }
    }
`;
document.head.appendChild(style);

// Initial animations
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(() => {
        document.querySelectorAll('.animate-fade-in').forEach(el => {
            el.style.opacity = '1';
        });
    }, 100);
});
