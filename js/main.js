
/**
 * ============================================
 * MAIN JAVASCRIPT - Adventure Treks avec Ali
 * ============================================
 * Fonctionnalités principales du site
 * Dernière mise à jour: 2024
 */

const App = (function() {
    'use strict';
    
    // ============================================
    // ÉLÉMENTS DU DOM
    // ============================================
    let elements = {};
    
    function cacheElements() {
        elements = {
            preloader: document.getElementById('preloader'),
            header: document.getElementById('header'),
            hamburger: document.getElementById('hamburger'),
            navMenu: document.getElementById('navMenu'),
            scrollToTop: document.querySelector('.scroll-to-top'),
            heroSection: document.querySelector('.hero'),
            allSections: document.querySelectorAll('section[id]'),
            navLinks: document.querySelectorAll('.nav-link'),
            forms: document.querySelectorAll('form'),
            lazyImages: document.querySelectorAll('img[loading="lazy"]')
        };
    }
    
    // ============================================
    // PRELOADER
    // ============================================
    function initPreloader() {
        if (!elements.preloader) return;
        
        window.addEventListener('load', function() {
            setTimeout(() => {
                elements.preloader.classList.add('hidden');
                document.body.style.overflow = '';
            }, 500);
        });
        
        // Fallback si le chargement prend trop de temps
        setTimeout(() => {
            if (!elements.preloader.classList.contains('hidden')) {
                elements.preloader.classList.add('hidden');
                document.body.style.overflow = '';
            }
        }, 5000);
    }
    
    // ============================================
    // HEADER SCROLL EFFECT
    // ============================================
    function initHeaderScroll() {
        if (!elements.header) return;
        
        let lastScroll = 0;
        let ticking = false;
        
        window.addEventListener('scroll', function() {
            if (!ticking) {
                requestAnimationFrame(function() {
                    const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
                    
                    if (currentScroll > 100) {
                        elements.header.classList.add('scrolled');
                    } else {
                        elements.header.classList.remove('scrolled');
                    }
                    
                    lastScroll = currentScroll;
                    ticking = false;
                });
                
                ticking = true;
            }
        }, { passive: true });
    }
    
    // ============================================
    // MOBILE MENU
    // ============================================
    function initMobileMenu() {
        if (!elements.hamburger || !elements.navMenu) return;
        
        elements.hamburger.addEventListener('click', function() {
            this.classList.toggle('active');
            elements.navMenu.classList.toggle('active');
            
            const isExpanded = this.classList.contains('active');
            this.setAttribute('aria-expanded', isExpanded);
            
            if (isExpanded) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        });
        
        // Fermer le menu quand on clique sur un lien
        elements.navMenu.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', function() {
                elements.hamburger.classList.remove('active');
                elements.navMenu.classList.remove('active');
                elements.hamburger.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = '';
            });
        });
        
        // Fermer le menu quand on clique en dehors
        document.addEventListener('click', function(e) {
            if (!elements.navMenu.contains(e.target) && 
                !elements.hamburger.contains(e.target) &&
                elements.navMenu.classList.contains('active')) {
                elements.hamburger.classList.remove('active');
                elements.navMenu.classList.remove('active');
                elements.hamburger.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = '';
            }
        });
    }
    
    // ============================================
    // SCROLL TO TOP BUTTON
    // ============================================
    function initScrollToTop() {
        const scrollBtn = document.createElement('button');
        scrollBtn.className = 'scroll-to-top';
        scrollBtn.innerHTML = '<i class="fas fa-chevron-up"></i>';
        scrollBtn.setAttribute('aria-label', I18n ? I18n.translate('back_to_top') : 'Retour en haut');
        document.body.appendChild(scrollBtn);
        
        elements.scrollToTop = scrollBtn;
        
        function toggleScrollButton() {
            if (window.pageYOffset > 500) {
                scrollBtn.classList.add('visible');
            } else {
                scrollBtn.classList.remove('visible');
            }
        }
        
        window.addEventListener('scroll', UTILS.throttle(toggleScrollButton, 200), { passive: true });
        
        scrollBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // ============================================
    // WHATSAPP FLOATING BUTTON
    // ============================================
    function initWhatsAppFloat() {
        const whatsappBtn = document.querySelector('.whatsapp-float');
        if (whatsappBtn) return; // Déjà présent dans le HTML
        
        const floatBtn = document.createElement('a');
        floatBtn.className = 'whatsapp-float';
        floatBtn.href = SITE_CONFIG.social.whatsappFR;
        floatBtn.target = '_blank';
        floatBtn.rel = 'noopener';
        floatBtn.setAttribute('aria-label', 'Contact WhatsApp');
        floatBtn.innerHTML = '<i class="fab fa-whatsapp"></i>';
        
        // Détecter la langue pour le bon numéro
        if (I18n && I18n.getCurrentLanguage() === 'en') {
            floatBtn.href = SITE_CONFIG.social.whatsappEN;
        }
        
        document.body.appendChild(floatBtn);
        
        // Mettre à jour le numéro quand la langue change
        if (I18n) {
            I18n.onChange(function(lang) {
                floatBtn.href = lang === 'en' ? SITE_CONFIG.social.whatsappEN : SITE_CONFIG.social.whatsappFR;
            });
        }
    }
    
    // ============================================
    // ACTIVE NAV LINK ON SCROLL
    // ============================================
    function initActiveNavOnScroll() {
        if (!elements.allSections.length) return;
        
        const observerOptions = {
            root: null,
            rootMargin: '-50% 0px -50% 0px',
            threshold: 0
        };
        
        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const id = entry.target.getAttribute('id');
                    updateActiveNavLink(id);
                }
            });
        }, observerOptions);
        
        elements.allSections.forEach(section => {
            observer.observe(section);
        });
    }
    
    function updateActiveNavLink(sectionId) {
        elements.navLinks.forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href');
            if (href && href.includes('#' + sectionId)) {
                link.classList.add('active');
            }
        });
    }
    
    // ============================================
    // SMOOTH SCROLL FOR ANCHOR LINKS
    // ============================================
    function initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                
                if (href === '#') return;
                
                const target = document.querySelector(href);
                if (!target) return;
                
                e.preventDefault();
                
                const headerHeight = elements.header ? elements.header.offsetHeight : 0;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            });
        });
    }
    
    // ============================================
    // LAZY LOADING IMAGES
    // ============================================
    function initLazyLoading() {
        if ('loading' in HTMLImageElement.prototype) {
            // Le navigateur supporte le lazy loading natif
            elements.lazyImages.forEach(img => {
                img.src = img.dataset.src || img.src;
            });
            return;
        }
        
        // Fallback avec Intersection Observer
        const imageObserver = new IntersectionObserver(function(entries, observer) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src || img.src;
                    img.classList.add('loaded');
                    observer.unobserve(img);
                }
            });
        }, {
            rootMargin: '50px 0px'
        });
        
        elements.lazyImages.forEach(img => {
            if (img.dataset.src) {
                imageObserver.observe(img);
            }
        });
    }
    
    // ============================================
    // IMAGE ERROR HANDLING
    // ============================================
    function initImageErrorHandling() {
        document.querySelectorAll('img').forEach(img => {
            img.addEventListener('error', function() {
                if (!this.src.includes('placeholder')) {
                    this.src = 'data:image/svg+xml,' + encodeURIComponent(`
                        <svg xmlns="http://www.w3.org/2000/svg" width="800" height="600" viewBox="0 0 800 600">
                            <rect fill="#E9ECEF" width="800" height="600"/>
                            <text fill="#ADB5BD" font-family="Arial" font-size="20" text-anchor="middle" x="400" y="300">
                                Image non disponible
                            </text>
                        </svg>
                    `);
                }
            });
            
            img.addEventListener('load', function() {
                this.classList.add('loaded');
            });
        });
    }
    
    // ============================================
    // REVEAL ON SCROLL ANIMATIONS
    // ============================================
    function initRevealAnimations() {
        const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');
        
        if (!revealElements.length) return;
        
        const revealObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    revealObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.15,
            rootMargin: '0px 0px -50px 0px'
        });
        
        revealElements.forEach(element => {
            revealObserver.observe(element);
        });
    }
    
    // ============================================
    // AOS INITIALIZATION
    // ============================================
    function initAOS() {
        if (typeof AOS !== 'undefined') {
            AOS.init({
                duration: 800,
                easing: 'ease-out-cubic',
                once: true,
                offset: 50,
                disable: 'mobile',
                disable: function() {
                    return window.innerWidth < 768;
                }
            });
        }
    }
    
    // ============================================
    // SWIPER INITIALIZATION
    // ============================================
    function initSwiper() {
        if (typeof Swiper === 'undefined') return;
        
        // Swiper pour les randonnées
        const treksSwiper = document.querySelector('.treks-slider');
        if (treksSwiper) {
            new Swiper(treksSwiper, {
                slidesPerView: 1,
                spaceBetween: 20,
                loop: true,
                autoplay: {
                    delay: 5000,
                    disableOnInteraction: false,
                    pauseOnMouseEnter: true
                },
                pagination: {
                    el: '.swiper-pagination',
                    clickable: true,
                    dynamicBullets: true
                },
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev'
                },
                breakpoints: {
                    640: {
                        slidesPerView: 2,
                        spaceBetween: 20
                    },
                    1024: {
                        slidesPerView: 3,
                        spaceBetween: 30
                    },
                    1280: {
                        slidesPerView: 4,
                        spaceBetween: 30
                    }
                }
            });
        }
        
        // Swiper pour les témoignages
        const testimonialsSwiper = document.querySelector('.testimonials-slider');
        if (testimonialsSwiper) {
            new Swiper(testimonialsSwiper, {
                slidesPerView: 1,
                spaceBetween: 30,
                loop: true,
                autoplay: {
                    delay: 6000,
                    disableOnInteraction: false
                },
                pagination: {
                    el: '.swiper-pagination',
                    clickable: true
                },
                breakpoints: {
                    768: {
                        slidesPerView: 2,
                        spaceBetween: 30
                    },
                    1024: {
                        slidesPerView: 3,
                        spaceBetween: 40
                    }
                }
            });
        }
    }
    
    // ============================================
    // COUNTER ANIMATION
    // ============================================
    function initCounters() {
        const counters = document.querySelectorAll('.stat-number');
        
        if (!counters.length) return;
        
        const counterObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const counter = entry.target;
                    const target = parseInt(counter.textContent.replace(/[^0-9]/g, ''), 10);
                    const duration = 2000;
                    const start = performance.now();
                    
                    function update(currentTime) {
                        const elapsed = currentTime - start;
                        const progress = Math.min(elapsed / duration, 1);
                        
                        const eased = 1 - Math.pow(1 - progress, 3);
                        const current = Math.floor(eased * target);
                        
                        counter.textContent = current + '+';
                        
                        if (progress < 1) {
                            requestAnimationFrame(update);
                        }
                    }
                    
                    requestAnimationFrame(update);
                    counterObserver.unobserve(counter);
                }
            });
        }, {
            threshold: 0.5
        });
        
        counters.forEach(counter => {
            counterObserver.observe(counter);
        });
    }
    
    // ============================================
    // ONLINE/OFFLINE DETECTION
    // ============================================
    function initOnlineStatus() {
        function updateOnlineStatus() {
            const isOnline = navigator.onLine;
            
            if (!isOnline) {
                showToast(I18n ? I18n.translate('offline_message', {
                    default: 'Vous êtes hors ligne. Certaines fonctionnalités peuvent être limitées.'
                }) : 'Vous êtes hors ligne.', 'warning');
            }
        }
        
        window.addEventListener('online', updateOnlineStatus);
        window.addEventListener('offline', updateOnlineStatus);
    }
    
    // ============================================
    // TOAST NOTIFICATIONS
    // ============================================
    function showToast(message, type = 'info', duration = 5000) {
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        toast.innerHTML = `
            <div class="toast-content">
                <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'warning' ? 'exclamation-triangle' : type === 'error' ? 'times-circle' : 'info-circle'}"></i>
                <span>${message}</span>
            </div>
            <button class="toast-close">&times;</button>
        `;
        
        document.body.appendChild(toast);
        
        // Animation d'entrée
        setTimeout(() => toast.classList.add('show'), 10);
        
        // Fermeture automatique
        const timer = setTimeout(() => {
            closeToast(toast);
        }, duration);
        
        // Bouton de fermeture
        toast.querySelector('.toast-close').addEventListener('click', () => {
            clearTimeout(timer);
            closeToast(toast);
        });
    }
    
    function closeToast(toast) {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    }
    
    // ============================================
    // COOKIE CONSENT
    // ============================================
    function initCookieConsent() {
        const consent = UTILS.getStorage('cookie_consent');
        if (consent) return;
        
        const banner = document.createElement('div');
        banner.className = 'cookie-banner';
        banner.innerHTML = `
            <div class="cookie-content">
                <p class="cookie-text">
                    Nous utilisons des cookies pour améliorer votre expérience. 
                    En continuant, vous acceptez notre utilisation des cookies.
                </p>
                <div class="cookie-buttons">
                    <button class="btn btn-primary btn-sm cookie-accept">Accepter</button>
                    <button class="btn btn-outline btn-sm cookie-decline">Refuser</button>
                </div>
            </div>
        `;
        
        document.body.appendChild(banner);
        
        setTimeout(() => banner.classList.add('visible'), 1000);
        
        banner.querySelector('.cookie-accept').addEventListener('click', () => {
            UTILS.setStorage('cookie_consent', 'accepted');
            banner.classList.remove('visible');
            setTimeout(() => banner.remove(), 300);
        });
        
        banner.querySelector('.cookie-decline').addEventListener('click', () => {
            UTILS.setStorage('cookie_consent', 'declined');
            banner.classList.remove('visible');
            setTimeout(() => banner.remove(), 300);
        });
    }
    
    // ============================================
    // KEYBOARD ACCESSIBILITY
    // ============================================
    function initKeyboardAccessibility() {
        // Fermer les menus avec Escape
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                if (elements.navMenu && elements.navMenu.classList.contains('active')) {
                    elements.hamburger.classList.remove('active');
                    elements.navMenu.classList.remove('active');
                    elements.hamburger.focus();
                }
                
                // Fermer les modales
                const activeModal = document.querySelector('.modal-overlay.active');
                if (activeModal) {
                    activeModal.classList.remove('active');
                }
            }
        });
        
        // Piéger le focus dans la navigation mobile
        if (elements.navMenu) {
            elements.navMenu.addEventListener('keydown', function(e) {
                if (e.key === 'Tab' && this.classList.contains('active')) {
                    const focusable = this.querySelectorAll('a, button');
                    const first = focusable[0];
                    const last = focusable[focusable.length - 1];
                    
                    if (e.shiftKey) {
                        if (document.activeElement === first) {
                            e.preventDefault();
                            last.focus();
                        }
                    } else {
                        if (document.activeElement === last) {
                            e.preventDefault();
                            first.focus();
                        }
                    }
                }
            });
        }
    }
    
    // ============================================
    // PERFORMANCE OPTIMIZATION
    // ============================================
    function initPerformanceOptimizations() {
        // Détecter le support WebP
        UTILS.supportsWebP().then(supports => {
            if (supports) {
                document.documentElement.classList.add('webp');
            }
        });
        
        // Réduire les animations si l'utilisateur préfère
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
        if (prefersReducedMotion.matches) {
            document.documentElement.classList.add('reduced-motion');
        }
        prefersReducedMotion.addEventListener('change', (e) => {
            if (e.matches) {
                document.documentElement.classList.add('reduced-motion');
            } else {
                document.documentElement.classList.remove('reduced-motion');
            }
        });
    }
    
    // ============================================
    // ERROR HANDLING
    // ============================================
    function initErrorHandling() {
        window.addEventListener('error', function(e) {
            // Loguer les erreurs silencieusement
            if (e.target.tagName === 'IMG') {
                // Erreur de chargement d'image déjà gérée
                return;
            }
            console.error('Global error:', e.message);
        });
        
        window.addEventListener('unhandledrejection', function(e) {
            console.error('Unhandled promise rejection:', e.reason);
        });
    }
    
    // ============================================
    // INITIALISATION PRINCIPALE
    // ============================================
    function init() {
        cacheElements();
        
        // Initialisations de base
        initPreloader();
        initHeaderScroll();
        initMobileMenu();
        initScrollToTop();
        initWhatsAppFloat();
        initSmoothScroll();
        
        // Animations et visuels
        initActiveNavOnScroll();
        initLazyLoading();
        initImageErrorHandling();
        initRevealAnimations();
        initCounters();
        
        // Bibliothèques externes
        initAOS();
        initSwiper();
        
        // Accessibilité et performance
        initKeyboardAccessibility();
        initPerformanceOptimizations();
        
        // Utilitaires
        initOnlineStatus();
        initCookieConsent();
        initErrorHandling();
        
        // Log
        if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
            console.log('App initialized successfully');
            console.log('Current language:', I18n ? I18n.getCurrentLanguage() : 'fr');
        }
    }
    
    // ============================================
    // API PUBLIQUE
    // ============================================
    return {
        init: init,
        showToast: showToast,
        
        // Re-initialiser après chargement dynamique
        refresh: function() {
            initSwiper();
            initRevealAnimations();
            initLazyLoading();
        }
    };
})();

// ============================================
// DÉMARRAGE DE L'APPLICATION
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    App.init();
});