/* ==========================================
   SHAH JEE LAPTOPS SUPPLIER - ANIMATION SCRIPT
   Scroll reveal with Intersection Observer,
   staggered card animations, and dynamic transitions.
========================================== */

document.addEventListener('DOMContentLoaded', () => {

    /* ==========================================
       1. INTERSECTION OBSERVER FOR SCROLL REVEAL
    ========================================== */
    const observerOptions = {
        root: null, // Use the viewport
        rootMargin: '0px 0px -50px 0px', // Trigger slightly before the section comes into full view
        threshold: 0.15 // 15% of element must be visible
    };

    const revealOnScroll = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                // Unobserve after revealing to prevent unnecessary re-animations
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Auto-attach reveal class to key home section containers
    const sectionsToAnimate = [
        '.collections-section .section-header',
        '.collections-carousel-wrapper',
        '.services-section .section-header',
        '.services-carousel-wrapper',
        '.social-section .section-header',
        '.social-carousel-wrapper'
    ];

    sectionsToAnimate.forEach(selector => {
        const element = document.querySelector(selector);
        if (element) {
            element.classList.add('reveal');
            revealOnScroll.observe(element);
        }
    });


    /* ==========================================
       2. STAGGERED CARD ANIMATIONS
    ========================================== */
    const attachStaggeredAnimation = (parentSelector, cardSelector) => {
        const parent = document.querySelector(parentSelector);
        if (parent) {
            const cards = parent.querySelectorAll(cardSelector);
            cards.forEach((card, index) => {
                card.classList.add('reveal');
                card.classList.add(`delay-${(index % 5) + 1}`);
                revealOnScroll.observe(card);
            });
        }
    };

    // Attach staggered entry for collection, service, and social cards
    attachStaggeredAnimation('#collections-carousel', '.collection-card');
    attachStaggeredAnimation('#services-carousel', '.service-card');
    attachStaggeredAnimation('#social-carousel', '.social-card');


    /* ==========================================
       3. SMOOTH HORIZONTAL CAROUSEL SCROLL HINT
    ========================================== */
    const scrollHints = document.querySelectorAll('.scroll-hint');

    scrollHints.forEach(hint => {
        hint.addEventListener('click', () => {
            const parentSection = hint.closest('section');
            if (parentSection) {
                const carousel = parentSection.querySelector('.collections-carousel, .services-carousel, .social-carousel');
                if (carousel) {
                    carousel.scrollBy({
                        left: 280,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

});