/* ==========================================
   SHAH JEE LAPTOPS SUPPLIER - CORE SCRIPT
   Navbar sticky behavior, Mobile menu drawer,
   Hero slider autoplay & navigation, API integrations.
========================================== */

document.addEventListener('DOMContentLoaded', () => {

    /* ==========================================
        1. STICKY NAVBAR & GLASSMORPHISM
    ========================================== */
    const navbar = document.getElementById('navbar');

    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 20) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }

    /* ==========================================
        2. MOBILE DRAWER NAVIGATION
    ========================================== */
    const mobileMenuOpenBtn = document.getElementById('mobile-menu-open');
    const mobileMenuCloseBtn = document.getElementById('mobile-menu-close');
    const mobileDrawer = document.getElementById('mobile-drawer');
    const drawerOverlay = document.getElementById('drawer-overlay');
    const mobileDropdownToggle = document.getElementById('mobile-dropdown-toggle');
    const mobileDropdownContent = document.getElementById('mobile-dropdown-content');

    // Open Mobile Drawer
    if (mobileMenuOpenBtn) {
        mobileMenuOpenBtn.addEventListener('click', () => {
            if (mobileDrawer) mobileDrawer.classList.add('active');
            if (drawerOverlay) drawerOverlay.classList.add('active');
            document.body.style.overflow = 'hidden'; // Prevent background scrolling
        });
    }

    // Close Mobile Drawer Function
    const closeDrawer = () => {
        if (mobileDrawer) mobileDrawer.classList.remove('active');
        if (drawerOverlay) drawerOverlay.classList.remove('active');
        document.body.style.overflow = '';
    };

    if (mobileMenuCloseBtn) mobileMenuCloseBtn.addEventListener('click', closeDrawer);
    if (drawerOverlay) drawerOverlay.addEventListener('click', closeDrawer);

    // Mobile Dropdown Toggle Inside Drawer
    if (mobileDropdownToggle && mobileDropdownContent) {
        mobileDropdownToggle.addEventListener('click', () => {
            mobileDropdownToggle.classList.toggle('active');
            mobileDropdownContent.classList.toggle('active');
        });
    }

    /* ==========================================
        3. HERO SLIDER & DYNAMIC BANNERS
    ========================================== */
    const BANNER_API_URL = "http://localhost:5000/api/banners";

    const slidesWrapper = document.getElementById('hero-slides-wrapper');
    const prevBtn = document.getElementById('slider-prev');
    const nextBtn = document.getElementById('slider-next');
    const dotsContainer = document.getElementById('slider-dots');
    const heroSlider = document.getElementById('hero-slider');

    let currentSlide = 0;
    let slideInterval = null;
    const AUTO_PLAY_TIME = 1500; // 3.5 seconds

    // Render Dots based on total slides
    const renderDots = () => {
        if (!dotsContainer || !slidesWrapper) return;
        const slides = slidesWrapper.querySelectorAll('.hero-slide');
        dotsContainer.innerHTML = '';
        
        slides.forEach((_, idx) => {
            const dotBtn = document.createElement('button');
            dotBtn.className = `dot ${idx === currentSlide ? 'active' : ''}`;
            dotBtn.setAttribute('data-slide', idx);
            dotBtn.setAttribute('aria-label', `Slide ${idx + 1}`);
            dotsContainer.appendChild(dotBtn);
        });
    };

    // Show Specific Slide Function
    const showSlide = (index) => {
        if (!slidesWrapper) return;
        const slides = slidesWrapper.querySelectorAll('.hero-slide');
        if (slides.length === 0) return;

        if (index >= slides.length) index = 0;
        if (index < 0) index = slides.length - 1;

        slides.forEach((slide, i) => {
            if (i === index) {
                slide.classList.add('active');
            } else {
                slide.classList.remove('active');
            }
        });

        if (dotsContainer) {
            const dots = dotsContainer.querySelectorAll('.dot');
            dots.forEach((dot, i) => {
                if (i === index) {
                    dot.classList.add('active');
                } else {
                    dot.classList.remove('active');
                }
            });
        }

        currentSlide = index;
    };

    // Slide Handlers
    const nextSlide = () => {
        const slides = slidesWrapper ? slidesWrapper.querySelectorAll('.hero-slide') : [];
        if (slides.length <= 1) return;
        let nextIndex = (currentSlide + 1) % slides.length;
        showSlide(nextIndex);
    };

    const prevSlide = () => {
        const slides = slidesWrapper ? slidesWrapper.querySelectorAll('.hero-slide') : [];
        if (slides.length <= 1) return;
        let prevIndex = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(prevIndex);
    };

    // Auto Play Controls
    const startAutoPlay = () => {
        stopAutoPlay();
        slideInterval = setInterval(nextSlide, AUTO_PLAY_TIME);
    };

    const stopAutoPlay = () => {
        if (slideInterval) clearInterval(slideInterval);
    };

    // Event Listeners for Arrows & Hover
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            nextSlide();
            startAutoPlay();
        });
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            prevSlide();
            startAutoPlay();
        });
    }

    if (dotsContainer) {
        dotsContainer.addEventListener('click', (e) => {
            if (e.target.classList.contains('dot')) {
                const slideIndex = parseInt(e.target.getAttribute('data-slide'), 10);
                showSlide(slideIndex);
                startAutoPlay();
            }
        });
    }

    if (heroSlider) {
        heroSlider.addEventListener('mouseenter', stopAutoPlay);
        heroSlider.addEventListener('mouseleave', startAutoPlay);
    }

    /* --------------------------------------------------
       DYNAMIC BACKEND BANNERS FETCH & MERGE
    -------------------------------------------------- */
    const loadDynamicBanners = async () => {
        try {
            const res = await fetch(BANNER_API_URL);
            if (res.ok) {
                const result = await res.json();
                const banners = result.data || result || [];

                if (Array.isArray(banners) && banners.length > 0) {
                    banners.forEach((b) => {
                        const slideDiv = document.createElement('div');
                        slideDiv.className = 'hero-slide';

                        const targetUrl = b.linkUrl || b.link || 'collection/allproducts.html';
                        const imgUrl = b.imageUrl || b.image;

                        slideDiv.innerHTML = `
                            <img src="${imgUrl}" alt="Shah Jee Offer Banner" class="slide-bg" onerror="this.src='images/site/fallback-laptop.jpg'">
                            <a href="${targetUrl}" class="banner-corner-btn" title="View Promotion">
                                <span>View Offer</span> <i class="fa-solid fa-arrow-right"></i>
                            </a>
                        `;
                        slidesWrapper.appendChild(slideDiv);
                    });
                }
            }
        } catch (err) {
            console.log("Using static hero banners fallback.");
       } finally {
    renderDots();
    showSlide(0);
    stopAutoPlay();  // <-- Yeh new line add karein
    startAutoPlay(); // Force Start Auto Play
}
    };

    loadDynamicBanners();
});