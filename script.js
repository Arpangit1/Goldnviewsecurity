document.addEventListener('DOMContentLoaded', () => {
    
    // Sticky Navbar with Blur effect
    const navbar = document.getElementById('navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('sticky');
        } else {
            navbar.classList.remove('sticky');
        }
    });

    if (window.scrollY > 50) {
        navbar.classList.add('sticky');
    }

    // Mobile Menu Toggle
    const menuToggle = document.getElementById('mobile-menu');
    const navLinks = document.querySelector('.nav-links');
    const menuIcon = menuToggle.querySelector('i');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            if (navLinks.classList.contains('active')) {
                menuIcon.classList.remove('fa-bars');
                menuIcon.classList.add('fa-times');
            } else {
                menuIcon.classList.remove('fa-times');
                menuIcon.classList.add('fa-bars');
            }
        });

        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                menuIcon.classList.remove('fa-times');
                menuIcon.classList.add('fa-bars');
            });
        });
    }

    // Advanced Scroll Animation (Intersection Observer)
    const revealElements = document.querySelectorAll('.reveal');

    const revealCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                
                // Stat Counter Animation Logic
                if(entry.target.classList.contains('stats-container')) {
                    startCounters();
                }

                observer.unobserve(entry.target); 
            }
        });
    };

    const revealOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealObserver = new IntersectionObserver(revealCallback, revealOptions);

    revealElements.forEach(el => {
        revealObserver.observe(el);
    });

    // Stat Counter Animation
    const counters = document.querySelectorAll('.stat-number');
    let countersStarted = false;

    function startCounters() {
        if(countersStarted) return;
        countersStarted = true;

        counters.forEach(counter => {
            counter.innerText = '0';
            const updateCounter = () => {
                const target = +counter.getAttribute('data-target');
                const c = +counter.innerText;
                const increment = target / 50; // Speed of counting

                if (c < target) {
                    counter.innerText = `${Math.ceil(c + increment)}`;
                    setTimeout(updateCounter, 30);
                } else {
                    counter.innerText = target + (target > 50 ? '+' : '');
                }
            };
            updateCounter();
        });
    }

    // FAQ Accordion Logic
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    
    accordionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const content = header.nextElementSibling;
            const isActive = header.classList.contains('active');

            // Close all other accordions
            document.querySelectorAll('.accordion-header').forEach(h => {
                h.classList.remove('active');
                h.nextElementSibling.style.maxHeight = null;
            });

            // Toggle current accordion
            if (!isActive) {
                header.classList.add('active');
                content.style.maxHeight = content.scrollHeight + "px";
            }
        });
    });

    // Form Submission Prevention (for demo)
    const form = document.querySelector('form');
    if(form && !form.getAttribute('onsubmit')) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Thank you for contacting Goldn View Security. We will get back to you shortly.');
            form.reset();
        });
    }

    // Dynamic Active Link highlighting based on current URL path
    const currentPath = window.location.pathname.split('/').pop();
    const navItems = document.querySelectorAll('.nav-links a');
    
    if (currentPath !== '') {
        navItems.forEach(item => {
            if (item.getAttribute('href') === currentPath) {
                navItems.forEach(n => n.classList.remove('active'));
                item.classList.add('active');
            }
        });
    }
    
    // Hover effect to logo
    const logo = document.querySelector('.logo img');
    if (logo) {
        logo.addEventListener('mouseover', () => {
            logo.style.transform = 'scale(1.1) rotate(2deg)';
        });
        logo.addEventListener('mouseout', () => {
            logo.style.transform = 'scale(1) rotate(0deg)';
        });
    }
});
