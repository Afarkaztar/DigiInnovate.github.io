// Dark Mode Toggle
const darkModeToggle = document.getElementById('darkModeToggle');
const body = document.body;

darkModeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    const isDarkMode = body.classList.contains('dark-mode');
    localStorage.setItem('darkMode', isDarkMode);
    updateDarkModeIcon(isDarkMode);
});

function updateDarkModeIcon(isDarkMode) {
    const icon = darkModeToggle.querySelector('i');
    icon.className = isDarkMode ? 'fas fa-sun' : 'fas fa-moon';
}

// Check for saved dark mode preference
const savedDarkMode = localStorage.getItem('darkMode') === 'true';
if (savedDarkMode) {
    body.classList.add('dark-mode');
    updateDarkModeIcon(true);
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Animate elements on scroll
function animateOnScroll() {
    const elements = document.querySelectorAll('.animate-on-scroll');
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        if (elementTop < window.innerHeight - elementVisible) {
            element.classList.add('animate__animated', 'animate__fadeInUp');
        }
    });
}

window.addEventListener('scroll', animateOnScroll);

// Form validation
const contactForm = document.getElementById('contactForm');
contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    if (validateForm()) {
        // Here you would typically send the form data to a server
        alert('Pesan Anda telah terkirim!');
        contactForm.reset();
    }
});

function validateForm() {
    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const message = document.getElementById('message');
    let isValid = true;

    if (name.value.trim() === '') {
        setErrorFor(name, 'Nama tidak boleh kosong');
        isValid = false;
    } else {
        setSuccessFor(name);
    }

    if (email.value.trim() === '') {
        setErrorFor(email, 'Email tidak boleh kosong');
        isValid = false;
    } else if (!isValidEmail(email.value.trim())) {
        setErrorFor(email, 'Email tidak valid');
        isValid = false;
    } else {
        setSuccessFor(email);
    }

    if (message.value.trim() === '') {
        setErrorFor(message, 'Pesan tidak boleh kosong');
        isValid = false;
    } else {
        setSuccessFor(message);
    }

    return isValid;
}

function setErrorFor(input, message) {
    const formControl = input.parentElement;
    const small = formControl.querySelector('small');
    small.innerText = message;
    formControl.className = 'form-control error';
}

function setSuccessFor(input) {
    const formControl = input.parentElement;
    formControl.className = 'form-control success';
}

function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// GSAP animations
gsap.from('.navbar', {duration: 1, y: '-100%', ease: 'bounce'});
gsap.from('.display-1', {duration: 1, opacity: 0, delay: 0.5, y: -50});
gsap.from('.lead', {duration: 1, opacity: 0, delay: 1, y: -30});

// Intersection Observer for lazy loading images
const images = document.querySelectorAll('img[data-src]');
const imgOptions = {
    threshold: 0,
    rootMargin: "0px 0px 300px 0px"
};

const imgObserver = new IntersectionObserver((entries, imgObserver) => {
    entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        preloadImage(entry.target);
        imgObserver.unobserve(entry.target);
    });
}, imgOptions);

images.forEach(image => imgObserver.observe(image));

function preloadImage(img) {
    const src = img.getAttribute('data-src');
    if (!src) return;
    img.src = src;
}

// Add parallax effect to header
window.addEventListener('scroll', function() {
    const parallax = document.querySelector('header');
    let scrollPosition = window.pageYOffset;
    parallax.style.transform = 'translateY(' + scrollPosition * 0.5 + 'px)';
});

// Count-up animation
const countUpElements = document.querySelectorAll('.count-up');

const countUpAnimation = (el) => {
    const target = parseInt(el.getAttribute('data-target'));
    let count = 0;
    const speed = 2000 / target; // Adjust animation speed here

    const updateCount = () => {
        const increment = target / 200;
        if (count < target) {
            count += increment;
            el.innerText = Math.ceil(count);
            setTimeout(updateCount, speed);
        } else {
            el.innerText = target;
        }
    };

    updateCount();
};

const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            countUpAnimation(entry.target);
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

countUpElements.forEach(el => statsObserver.observe(el));

// Tambahkan ini ke file script.js

gsap.from(".innovation-svg", {duration: 1, opacity: 0, y: 50, delay: 0.5});

gsap.to(".circle1", {duration: 2, rotation: 360, transformOrigin: "center", repeat: -1, ease: "linear"});
gsap.to(".circle2", {duration: 3, rotation: -360, transformOrigin: "center", repeat: -1, ease: "linear"});
gsap.to(".circle3", {duration: 4, rotation: 360, transformOrigin: "center", repeat: -1, ease: "linear"});

const timeline = gsap.timeline({repeat: -1, yoyo: true});
timeline.to(".dot1", {duration: 0.5, scale: 1.5, ease: "power1.inOut"})
        .to(".dot2", {duration: 0.5, scale: 1.5, ease: "power1.inOut"})
        .to(".dot3", {duration: 0.5, scale: 1.5, ease: "power1.inOut"})
        .to(".dot4", {duration: 0.5, scale: 1.5, ease: "power1.inOut"});

// Tambahkan efek parallax
window.addEventListener('scroll', () => {
    const scrollPosition = window.pageYOffset;
    gsap.to(".innovation-svg", {y: scrollPosition * 0.3, ease: "power1.out"});
});

// Tambahkan ini ke file script.js Anda
document.addEventListener('DOMContentLoaded', function() {
    // Simulasi loading time (opsional, hapus jika tidak diperlukan)
    setTimeout(function() {
        const preloader = document.getElementById('preloader');
        preloader.classList.add('preloader-hidden');
        
        // Hapus preloader dari DOM setelah transisi selesai
        preloader.addEventListener('transitionend', function() {
            preloader.remove();
        });
    }, 1000); // Ganti 1000 dengan 0 jika Anda tidak ingin penundaan tambahan
});