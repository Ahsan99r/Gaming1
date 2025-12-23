// Wait for the DOM to be fully loaded before running scripts
document.addEventListener('DOMContentLoaded', () => {

    // --- Preloader ---
    const preloader = document.querySelector('.preloader');
    window.addEventListener('load', () => {
        preloader.style.opacity = '0';
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500); // Match CSS transition time
    });

    // --- Mobile Navigation ---
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close menu when a link is clicked
    document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }));

    // --- Sticky Header on Scroll ---
    const header = document.querySelector('.header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.background = 'var(--dark-section-bg)';
        } else {
            header.style.background = 'var(--header-bg)';
        }
    });

    // --- Scroll Reveal Animations ---
    const scrollElements = document.querySelectorAll('.section-padding, .feature-item, .news-item, .game-card');

    const elementInView = (el, dividend = 1) => {
        const elementTop = el.getBoundingClientRect().top;
        return (
            elementTop <= (window.innerHeight || document.documentElement.clientHeight) / dividend
        );
    };

    const displayScrollElement = (element) => {
        element.classList.add('animate-on-scroll');
    };

    const hideScrollElement = (element) => {
        element.classList.remove('animate-on-scroll');
    };

    const handleScrollAnimation = () => {
        scrollElements.forEach((el) => {
            if (elementInView(el, 1.25)) {
                el.classList.add('visible');
            } else {
                 // Optional: remove class to re-animate on scroll up
                 // el.classList.remove('visible');
            }
        })
    }
    
    // Initialize elements with the class for animation
    scrollElements.forEach(el => el.classList.add('animate-on-scroll'));
    
    window.addEventListener('scroll', () => {
        handleScrollAnimation();
    });
    // Trigger on load
    handleScrollAnimation();


    // --- Animated Counters ---
    const statsContainer = document.querySelector('.stats-counter');
    let countersAnimated = false;

    const animateCounters = () => {
        const counters = document.querySelectorAll('.stat-item h3');
        const speed = 200; // The lower the #, the faster the count

        counters.forEach(counter => {
            const updateCount = () => {
                const target = +counter.getAttribute('data-target');
                const count = +counter.innerText;
                const inc = target / speed;

                if (count < target) {
                    counter.innerText = Math.ceil(count + inc);
                    setTimeout(updateCount, 10);
                } else {
                    counter.innerText = target.toLocaleString(); // Add commas for larger numbers
                }
            };
            updateCount();
        });
    };
    
    // Using Intersection Observer for better performance
    const observerOptions = {
        root: null,
        threshold: 0.5 // Trigger when 50% of the element is visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !countersAnimated) {
                animateCounters();
                countersAnimated = true; // Ensure it only runs once
                observer.unobserve(entry.target); // Stop observing after animation
            }
        });
    }, observerOptions);

    if (statsContainer) {
        observer.observe(statsContainer);
    }


    // --- Game Details Modal ---
    const modal = document.getElementById('game-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalDescription = document.getElementById('modal-description');
    const closeButton = document.querySelector('.close-button');
    const gameCards = document.querySelectorAll('.game-card');

    gameCards.forEach(card => {
        card.addEventListener('click', () => {
            const title = card.getAttribute('data-title');
            const description = card.getAttribute('data-description');
            
            modalTitle.textContent = title;
            modalDescription.textContent = description;
            modal.style.display = 'block';
        });
    });

    // Close modal actions
    closeButton.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    });

    // --- Contact Form Validation ---
    const contactForm = document.getElementById('contact-form');
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault(); // Prevent actual submission for this demo

        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();
        let isValid = true;

        // Simple validation
        if (name === '' || email === '' || message === '') {
            alert('Please fill in all fields.');
            isValid = false;
        } else if (!validateEmail(email)) {
            alert('Please enter a valid email address.');
            isValid = false;
        }

        if (isValid) {
            alert('Thank you for your message! We will get back to you soon.');
            contactForm.reset(); // Clear the form
        }
    });

    function validateEmail(email) {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

});
