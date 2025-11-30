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




// Light/Dark mode toggle
    const modeIcon = document.getElementById('mode-icon');
    modeIcon.addEventListener('click', () => {
        document.body.classList.toggle('light-mode');
        if (document.body.classList.contains('light-mode')) {
            modeIcon.innerHTML = '<i class="fas fa-moon"></i>';
        } else {
            modeIcon.innerHTML = '<i class="fas fa-sun"></i>';
        }
    });

    // Canvas animation setup
    function n(e) {
        this.init(e || {});
    }
    n.prototype = {
        init: function (e) {
            this.phase = e.phase || 0;
            this.offset = e.offset || 0;
            this.frequency = e.frequency || 0.001;
            this.amplitude = e.amplitude || 1;
        },
        update: function () {
            return (
                (this.phase += this.frequency), (e = this.offset + Math.sin(this.phase) * this.amplitude)
            );
        },
        value: function () {
            return e;
        },
    };

    function Line(e) {
        this.init(e || {});
    }

    Line.prototype = {
        init: function (e) {
            this.spring = e.spring + 0.1 * Math.random() - 0.05;
            this.friction = E.friction + 0.01 * Math.random() - 0.005;
            this.nodes = [];
            for (var t, n = 0; n < E.size; n++) {
                t = new Node();
                t.x = pos.x;
                t.y = pos.y;
                this.nodes.push(t);
            }
        },
        update: function () {
            var e = this.spring,
                t = this.nodes[0];
            t.vx += (pos.x - t.x) * e;
            t.vy += (pos.y - t.y) * e;
            for (var n, i = 0, a = this.nodes.length; i < a; i++)
                (t = this.nodes[i]),
                    0 < i &&
                    ((n = this.nodes[i - 1]),
                        (t.vx += (n.x - t.x) * e),
                        (t.vy += (n.y - t.y) * e),
                        (t.vx += n.vx * E.dampening),
                        (t.vy += n.vy * E.dampening)),
                    (t.vx *= this.friction),
                    (t.vy *= this.friction),
                    (t.x += t.vx),
                    (t.y += t.vy),
                    (e *= E.tension);
        },
        draw: function () {
            var e,
                t,
                n = this.nodes[0].x,
                i = this.nodes[0].y;
            ctx.beginPath();
            ctx.moveTo(n, i);
            for (var a = 1, o = this.nodes.length - 2; a < o; a++) {
                e = this.nodes[a];
                t = this.nodes[a + 1];
                n = 0.5 * (e.x + t.x);
                i = 0.5 * (e.y + t.y);
                ctx.quadraticCurveTo(e.x, e.y, n, i);
            }
            e = this.nodes[a];
            t = this.nodes[a + 1];
            ctx.quadraticCurveTo(e.x, e.y, t.x, t.y);
            ctx.stroke();
            ctx.closePath();
        },
    };

    function onMousemove(e) {
        function o() {
            lines = [];
            for (var e = 0; e < E.trails; e++)
                lines.push(new Line({ spring: 0.45 + (e / E.trails) * 0.025 }));
        }
        function c(e) {
            e.touches
                ? ((pos.x = e.touches[0].pageX), (pos.y = e.touches[0].pageY))
                : ((pos.x = e.clientX), (pos.y = e.clientY)),
                e.preventDefault();
        }
        function l(e) {
            1 == e.touches.length && ((pos.x = e.touches[0].pageX), (pos.y = e.touches[0].pageY));
        }
        document.removeEventListener('mousemove', onMousemove),
            document.removeEventListener('touchstart', onMousemove),
            document.addEventListener('mousemove', c),
            document.addEventListener('touchmove', c),
            document.addEventListener('touchstart', l),
            c(e),
            o(),
            render();
    }

    function render() {
        if (ctx.running) {
            ctx.globalCompositeOperation = 'source-over';
            ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
            ctx.globalCompositeOperation = 'lighter';
            ctx.strokeStyle = 'hsla(' + Math.round(f.update()) + ',90%,50%,0.25)';
            ctx.lineWidth = 1;
            for (var e, t = 0; t < E.trails; t++) {
                (e = lines[t]).update();
                e.draw();
            }
            ctx.frame++;
            window.requestAnimationFrame(render);
        }
    }

    function resizeCanvas() {
        ctx.canvas.width = window.innerWidth;
        ctx.canvas.height = window.innerHeight;
    }

    var ctx,
        f,
        e = 0,
        pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 },
        lines = [],
        E = {
            debug: true,
            friction: 0.5,
            trails: 20,
            size: 50,
            dampening: 0.25,
            tension: 0.98,
        };
    function Node() {
        this.x = 0;
        this.y = 0;
        this.vy = 0;
        this.vx = 0;
    }

    window.onload = function () {
        ctx = document.getElementById('canvas').getContext('2d');
        ctx.running = true;
        ctx.frame = 1;
        f = new n({
            phase: Math.random() * 2 * Math.PI,
            amplitude: 85,
            frequency: 0.0015,
            offset: 285,
        });
        document.addEventListener('mousemove', onMousemove);
        document.addEventListener('touchstart', onMousemove);
        document.body.addEventListener('orientationchange', resizeCanvas);
        window.addEventListener('resize', resizeCanvas);
        window.addEventListener('focus', () => {
            if (!ctx.running) {
                ctx.running = true;
                render();
            }
        });
        window.addEventListener('blur', () => {
            ctx.running = true;
        });
        resizeCanvas();
        render(); // Start the animation
    };


    document.querySelector(".logo").addEventListener("click", () => {
    window.location.reload(); // Page refresh
});



  document.querySelector(".footer-logo").addEventListener("click", () => {
    window.location.reload(); // Page refresh
});