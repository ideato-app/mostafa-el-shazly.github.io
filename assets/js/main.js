// Initialize AOS (Animate On Scroll)
document.addEventListener('DOMContentLoaded', function () {
    // Initialize AOS with responsive settings
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        mirror: false,
        disable: 'mobile' // Disable animations on mobile for better performance
    });

    // Initialize Typed.js with Arabic text
    const typed = new Typed('#typed', {
        strings: [
            'طالب زراعة',
            'متخصص في إنتاج الحيوان والدواجن',
            'شغوف بالزراعة المستدامة',
            'مبتكر زراعي مستقبلي'
        ],
        typeSpeed: 50,
        backSpeed: 30,
        backDelay: 2000,
        loop: true
    });

    // Mobile Menu Toggle with improved touch interaction
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('nav');
    const navLinks = document.querySelectorAll('nav ul li a');

    if (menuToggle) {
        menuToggle.addEventListener('click', function () {
            nav.classList.toggle('active');
            menuToggle.classList.toggle('active');

            // Toggle aria-expanded for accessibility
            const expanded = menuToggle.getAttribute('aria-expanded') === 'true' || false;
            menuToggle.setAttribute('aria-expanded', !expanded);

            // Prevent body scrolling when menu is open
            document.body.classList.toggle('menu-open');
        });
    }

    // Close mobile menu when clicking outside
    document.addEventListener('click', function (e) {
        if (!nav.contains(e.target) && !menuToggle.contains(e.target) && nav.classList.contains('active')) {
            nav.classList.remove('active');
            menuToggle.classList.remove('active');
            menuToggle.setAttribute('aria-expanded', 'false');
            document.body.classList.remove('menu-open');
        }
    });

    // Enhanced smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();

            // Remove active class from all links
            navLinks.forEach(item => item.classList.remove('active'));

            // Add active class to clicked link
            this.classList.add('active');

            // Close mobile menu when a link is clicked
            if (nav.classList.contains('active')) {
                nav.classList.remove('active');
                menuToggle.classList.remove('active');
                menuToggle.setAttribute('aria-expanded', 'false');
                document.body.classList.remove('menu-open');
            }

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                // Get header height dynamically for accurate scrolling
                const headerHeight = document.querySelector('header').offsetHeight;
                const offsetTop = targetElement.offsetTop;

                window.scrollTo({
                    top: offsetTop - headerHeight,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Change header style on scroll with improved performance
    const header = document.querySelector('header');

    // Use throttling to improve scroll performance
    let scrollTimeout;

    window.addEventListener('scroll', function () {
        if (!scrollTimeout) {
            scrollTimeout = setTimeout(function () {
                if (window.scrollY > 100) {
                    header.classList.add('scrolled');
                } else {
                    header.classList.remove('scrolled');
                }
                scrollTimeout = null;
            }, 50);
        }
    });

    // Animate skill bars on scroll with intersection observer for better performance
    const skillSection = document.querySelector('.skills');
    const progressBars = document.querySelectorAll('.progress');

    if (skillSection && progressBars.length) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    progressBars.forEach(bar => {
                        const width = bar.style.width;
                        bar.style.width = '0';
                        setTimeout(() => {
                            bar.style.width = width;
                        }, 100);
                    });
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });

        observer.observe(skillSection);
    }

    // Enhanced form validation with better UX feedback
    const contactForm = document.querySelector('.contact-form form');
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            // Basic form validation
            const formInputs = this.querySelectorAll('input, textarea');
            let isValid = true;

            formInputs.forEach(input => {
                if (!input.value.trim()) {
                    isValid = false;
                    showError(input, 'This field is required');
                } else {
                    removeError(input);

                    // Email validation
                    if (input.type === 'email') {
                        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                        if (!emailRegex.test(input.value)) {
                            isValid = false;
                            showError(input, 'Please enter a valid email');
                        }
                    }
                }
            });

            if (isValid) {
                // Show loading state
                const submitBtn = this.querySelector('button[type="submit"]');
                submitBtn.classList.add('btn-loading');
                submitBtn.disabled = true;

                // Simulate form submission (replace with actual form submission)
                setTimeout(() => {
                    submitBtn.classList.remove('btn-loading');
                    submitBtn.disabled = false;
                    alert('Message sent successfully!');
                    contactForm.reset();
                }, 1500);
            }
        });

        // Clear error message when user types
        const formInputs = contactForm.querySelectorAll('input, textarea');
        formInputs.forEach(input => {
            input.addEventListener('input', function () {
                removeError(this);
            });
        });
    }

    // Helper functions for form validation
    function showError(input, message) {
        const formGroup = input.closest('.form-group');
        let errorElement = formGroup.querySelector('.error-message');

        if (!errorElement) {
            errorElement = document.createElement('div');
            errorElement.className = 'error-message';
            formGroup.appendChild(errorElement);
        }

        errorElement.textContent = message;
        formGroup.classList.add('error');
    }

    function removeError(input) {
        const formGroup = input.closest('.form-group');
        const errorElement = formGroup.querySelector('.error-message');

        if (errorElement) {
            errorElement.remove();
        }

        formGroup.classList.remove('error');
    }

    // Add active class to navigation links based on scroll position
    window.addEventListener('scroll', function () {
        const scrollPosition = window.scrollY;

        // Get all sections
        const sections = document.querySelectorAll('section');

        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                // Remove active class from all links
                navLinks.forEach(link => link.classList.remove('active'));

                // Add active class to corresponding link
                const activeLink = document.querySelector(`nav ul li a[href="#${sectionId}"]`);
                if (activeLink) {
                    activeLink.classList.add('active');
                }
            }
        });
    });
});

// Create animated floating leaves with improved performance
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

    // Add class to body when page is fully loaded
    window.addEventListener('load', function () {
        document.body.classList.add('page-loaded');
    });
}); 