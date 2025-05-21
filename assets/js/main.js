// Initialize AOS (Animate On Scroll)
document.addEventListener('DOMContentLoaded', function () {
    // Initialize AOS
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        mirror: false
    });

    // Initialize Typed.js
    const typed = new Typed('#typed', {
        strings: [
            'Agriculture Student',
            'Animal & Poultry Production Specialist',
            'Passionate about Sustainable Farming',
            'Future Agricultural Innovator'
        ],
        typeSpeed: 50,
        backSpeed: 30,
        backDelay: 2000,
        loop: true
    });

    // Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('nav');

    if (menuToggle) {
        menuToggle.addEventListener('click', function () {
            nav.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });
    }

    // Close mobile menu when clicking outside
    document.addEventListener('click', function (e) {
        if (!nav.contains(e.target) && !menuToggle.contains(e.target) && nav.classList.contains('active')) {
            nav.classList.remove('active');
            menuToggle.classList.remove('active');
        }
    });

    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('nav ul li a');

    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();

            // Close mobile menu when a link is clicked
            if (nav.classList.contains('active')) {
                nav.classList.remove('active');
                menuToggle.classList.remove('active');
            }

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                const offsetTop = targetElement.offsetTop;

                window.scrollTo({
                    top: offsetTop - 80, // Adjust for header height
                    behavior: 'smooth'
                });
            }
        });
    });

    // Change header style on scroll
    const header = document.querySelector('header');
    window.addEventListener('scroll', function () {
        if (window.scrollY > 100) {
            header.style.padding = '10px 0';
            header.style.backgroundColor = 'rgba(255, 255, 255, 0.98)';
            header.style.boxShadow = '0 2px 15px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.padding = '15px 0';
            header.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        }
    });

    // Animate skill bars on scroll
    const skillSection = document.querySelector('.skills');
    const progressBars = document.querySelectorAll('.progress');

    if (skillSection && progressBars.length) {
        let hasAnimated = false;

        window.addEventListener('scroll', function () {
            if (isInViewport(skillSection) && !hasAnimated) {
                progressBars.forEach(bar => {
                    const width = bar.style.width;
                    bar.style.width = '0';
                    setTimeout(() => {
                        bar.style.width = width;
                    }, 100);
                });
                hasAnimated = true;
            }
        });
    }

    // Form validation
    const contactForm = document.querySelector('.contact-form form');
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();
            // Add form submission logic here
            alert('Message sent successfully!');
            contactForm.reset();
        });
    }

    // Helper function to check if element is in viewport
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.bottom >= 0
        );
    }
});

// Create animated floating leaves
document.addEventListener('DOMContentLoaded', function () {
    // Random movement for floating leaves to add variability
    function randomFloat(min, max) {
        return Math.random() * (max - min) + min;
    }

    // Get all floating leaves
    const floatingLeaves = document.querySelectorAll('.floating-leaf');

    // Add random starting positions
    floatingLeaves.forEach(leaf => {
        const randomDelay = randomFloat(0, 10);
        const randomDuration = randomFloat(25, 40);

        leaf.style.animationDelay = `${randomDelay}s`;
        leaf.style.animationDuration = `${randomDuration}s`;
    });
}); 