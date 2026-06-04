/**
 * ============================================
 * CONFIGURATION - Adventure Treks avec Ali
 * ============================================
 * Configuration globale du site
 * Dernière mise à jour: 2024
 */

// Protection immédiate contre les accès non autorisés
(function() {
    'use strict';
    
    // Empêcher les modifications de la console
    const noop = () => {};
    if (typeof console !== 'undefined') {
        const methods = ['log', 'debug', 'warn', 'info'];
        methods.forEach(method => {
            const original = console[method];
            console[method] = function(...args) {
                if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
                    original.apply(console, args);
                }
            };
        });
    }
})();

// ============================================
// CONFIGURATION FIREBASE
// ============================================
const FIREBASE_CONFIG = Object.freeze({
    apiKey: "AIzaSyCgfGwHACxx_SRsjo4qKoOJsUUXxc-b7eE",
    authDomain: "adventure-treks-comments.firebaseapp.com",
    projectId: "adventure-treks-comments",
    storageBucket: "adventure-treks-comments.firebasestorage.app",
    messagingSenderId: "792729535477",
    appId: "1:792729535477:web:17af8772f5da73ff4cd6bc"
});

// ============================================
// CONFIGURATION DU SITE
// ============================================
const SITE_CONFIG = Object.freeze({
    // Informations du guide
    guide: {
        name: "Ali Ouzemmad",
        nameShort: "Ali",
        title: {
            fr: "Guide Expert Local - 30+ ans d'expérience",
            en: "Local Expert Guide - 30+ years experience"
        },
        location: {
            fr: "Vallée des Roses - Ouarzazate, Maroc",
            en: "Valley of Roses - Ouarzazate, Morocco"
        },
        experience: "30+",
        languages: ["Français", "English", "العربية", "ⵜⴰⵎⴰⵣⵉⵖⵜ"]
    },
    
    // Coordonnées de contact
    contact: {
        phone: {
            fr: "+212661796117",
            en: "+212633652721"
        },
        email: "aventuretreksmaroc@gmail.com",
        instagram: "adventure.treks.maroc",
        instagramUrl: "https://instagram.com/adventure.treks.maroc",
        responseTime: {
            fr: "Réponse garantie en moins de 24h",
            en: "Response guaranteed within 24 hours"
        }
    },
    
    // URLs des réseaux sociaux
    social: {
        whatsappFR: "https://wa.me/212661796117",
        whatsappEN: "https://wa.me/212633652721",
        instagram: "https://instagram.com/adventure.treks.maroc",
        email: "mailto:aventuretreksmaroc@gmail.com"
    },
    
    // Images Google Drive
    images: {
        guide: "1Fw1BTZpMENtlt-RdZ6cAz24ncu1can4s",
        hero: "1LyV1EX4GYyTv0YGQOimZqNjNLcaUqNZF",
        gallery: [
            "17j0rL9qOahrMQ1sjIRD1P0mcy8Cgv3pU",
            "1mfvWu486bDY5Cl7dQIjY2GLL-ZiHT4rF",
            "1xRX5S_f4Hbg9snrmAoYIxqArNNrallQP",
            "1NMvh2owxnkTk00whGR7m1WYzWut65I3S",
            "1-B4bwqHUiutwq1RlpZFuVWS01MVnbeXP",
            "1Gzz6GCVzomb5EDBA4M-aFRqrfVr9rmAk",
            "1VwbEvHSQFA8L2yciQ6lN8zh3oaT6cHPh",
            "1PvG4Ewe9tJxiu0bEy5HbyfioWdgXiJhB",
            "1vQlBIsXR2jcqO2NV8fllG3JFzDExog8T",
            "19aQMiurnH7CIFpMWeGynaZIY6Rv6lXiq"
        ]
    },
    
    // URLs de l'API Google Drive pour les images
    getImageUrl: function(imageId, size = 'w1000') {
        if (!imageId) return 'assets/placeholder.jpg';
        return `https://drive.google.com/thumbnail?id=${imageId}&sz=${size}`;
    },
    
    getGalleryUrls: function(size = 'w800') {
        return this.images.gallery.map(id => this.getImageUrl(id, size));
    }
});

// ============================================
// CONFIGURATION DES RANDONNÉES
// ============================================
const TREKS_CONFIG = Object.freeze({
    categories: {
        short: {
            id: 'short',
            duration: '2-6',
            label: {
                fr: 'Randonnées Courtes (2-6 Jours)',
                en: 'Short Treks (2-6 Days)'
            },
            icon: 'fa-clock'
        },
        medium: {
            id: 'medium',
            duration: '7-11',
            label: {
                fr: 'Randonnées Moyennes (7-11 Jours)',
                en: 'Medium Treks (7-11 Days)'
            },
            icon: 'fa-calendar-alt'
        },
        long: {
            id: 'long',
            duration: '12-15',
            label: {
                fr: 'Randonnées Longues (12-15 Jours)',
                en: 'Long Treks (12-15 Days)'
            },
            icon: 'fa-calendar-check'
        }
    },
    
    treks: [
        {
            id: 'toubkal',
            name: { fr: 'Toubkal Express', en: 'Toubkal Express' },
            category: 'short',
            duration: 4,
            altitude: '4167m',
            region: { fr: 'Haut Atlas', en: 'High Atlas' },
            difficulty: { fr: 'Modéré', en: 'Moderate' },
            walkingHours: { fr: '4-5h/jour', en: '4-5h/day' },
            image: '17j0rL9qOahrMQ1sjIRD1P0mcy8Cgv3pU',
            popular: true,
            features: {
                fr: [
                    'Ascension du plus haut sommet d\'Afrique du Nord',
                    'Vallée d\'Ourika et cascades de Setti Fatma',
                    'Villages traditionnels d\'Imlil et Armed',
                    'Col de Tizi n\'Ouagane'
                ],
                en: [
                    'Climb North Africa\'s highest peak',
                    'Ourika Valley and Setti Fatma waterfalls',
                    'Traditional villages of Imlil and Armed',
                    'Tizi n\'Ouagane pass'
                ]
            }
        },
        {
            id: 'vallee-roses',
            name: { fr: 'Vallée des Roses', en: 'Valley of Roses' },
            category: 'short',
            duration: 5,
            region: { fr: 'Drâa-Tafilalet', en: 'Drâa-Tafilalet' },
            difficulty: { fr: 'Facile à Modéré', en: 'Easy to Moderate' },
            walkingHours: { fr: '3-4h/jour', en: '3-4h/day' },
            image: '1xRX5S_f4Hbg9snrmAoYIxqArNNrallQP',
            features: {
                fr: [
                    'Découverte de la vallée natale d\'Ali',
                    'Visite des coopératives de roses',
                    'Gorges de Dades et Todra',
                    'Rencontre avec la population locale'
                ],
                en: [
                    'Discover Ali\'s native valley',
                    'Visit rose cooperatives',
                    'Dades and Todra gorges',
                    'Meet local communities'
                ]
            }
        },
        {
            id: 'mgoun',
            name: { fr: 'Grand Mgoun', en: 'Grand Mgoun' },
            category: 'medium',
            duration: 8,
            altitude: '4068m',
            region: { fr: 'Massif du Mgoun', en: 'Mgoun Massif' },
            difficulty: { fr: 'Difficile', en: 'Challenging' },
            walkingHours: { fr: '5-6h/jour', en: '5-6h/day' },
            image: '1NMvh2owxnkTk00whGR7m1WYzWut65I3S',
            features: {
                fr: [
                    'Ascension du Jbel Mgoun (4068m)',
                    'Vallée d\'Aït Bougmez "Vallée Heureuse"',
                    'Nuits en bivouac sous les étoiles',
                    'Villages berbères authentiques'
                ],
                en: [
                    'Climb Jbel Mgoun (4068m)',
                    'Aït Bougmez "Happy Valley"',
                    'Bivouac nights under the stars',
                    'Authentic Berber villages'
                ]
            }
        },
        {
            id: 'atlas-desert',
            name: { fr: 'Atlas & Désert', en: 'Atlas & Desert' },
            category: 'medium',
            duration: 10,
            region: { fr: 'Atlas • Merzouga', en: 'Atlas • Merzouga' },
            difficulty: { fr: 'Modéré', en: 'Moderate' },
            walkingHours: { fr: '4-6h/jour', en: '4-6h/day' },
            image: '1mfvWu486bDY5Cl7dQIjY2GLL-ZiHT4rF',
            features: {
                fr: [
                    'Montagne et désert en un seul voyage',
                    'Nuit dans les dunes de Merzouga',
                    'Oasis et palmeraies',
                    'Kasbahs historiques'
                ],
                en: [
                    'Mountains and desert in one trip',
                    'Night in Merzouga dunes',
                    'Oasis and palm groves',
                    'Historic kasbahs'
                ]
            }
        }
    ]
});

// ============================================
// CONFIGURATION DE SÉCURITÉ
// ============================================
const SECURITY_CONFIG = Object.freeze({
    // Validation des formulaires
    validation: {
        nameMinLength: 2,
        nameMaxLength: 50,
        emailRegex: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        phoneRegex: /^\+?[\d\s-]{8,20}$/,
        maxMessageLength: 1000,
        minTravelers: 2,
        maxTravelers: 12,
        forbiddenPatterns: [
            /<script/i,
            /javascript:/i,
            /on\w+=/i,
            /<iframe/i,
            /<embed/i,
            /<object/i
        ]
    },
    
    // Rate limiting (client-side)
    rateLimit: {
        maxRequests: 5,
        timeWindow: 60000, // 1 minute en ms
        blockDuration: 300000 // 5 minutes en ms
    },
    
    // Session storage keys
    storage: {
        langPreference: 'at_lang',
        userSession: 'at_session',
        rateLimitData: 'at_rate_limit'
    }
});

// ============================================
// CONFIGURATION SEO
// ============================================
const SEO_CONFIG = Object.freeze({
    siteName: "Adventure Treks avec Ali",
    baseUrl: "https://adventure-treks.vercel.app",
    defaultImage: "https://drive.google.com/thumbnail?id=1LyV1EX4GYyTv0YGQOimZqNjNLcaUqNZF&sz=w1200",
    locale: "fr_FR",
    alternateLocale: "en_US",
    twitterHandle: "@adventuretreks",
    googleAnalyticsId: "" // À remplir si nécessaire
});

// ============================================
// DÉTECTION DU NAVIGATEUR ET APPAREIL
// ============================================
const DEVICE_INFO = Object.freeze({
    isMobile: /Android|iPhone|iPad|iPod|webOS/i.test(navigator.userAgent),
    isIOS: /iPhone|iPad|iPod/i.test(navigator.userAgent),
    isAndroid: /Android/i.test(navigator.userAgent),
    isTouch: ('ontouchstart' in window) || (navigator.maxTouchPoints > 0),
    isOnline: navigator.onLine,
    language: navigator.language || navigator.userLanguage || 'fr',
    viewport: {
        width: window.innerWidth,
        height: window.innerHeight
    }
});

// ============================================
// UTILITAIRES
// ============================================
const UTILS = {
    // Debounce pour les événements
    debounce: function(func, wait = 300) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },
    
    // Throttle pour les événements fréquents
    throttle: function(func, limit = 300) {
        let inThrottle;
        return function(...args) {
            if (!inThrottle) {
                func.apply(this, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    },
    
    // Générer un ID unique
    generateId: function() {
        return 'at_' + Date.now().toString(36) + '_' + Math.random().toString(36).substr(2, 9);
    },
    
    // Formater une date
    formatDate: function(date, locale = 'fr-FR') {
        try {
            return new Date(date).toLocaleDateString(locale, {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });
        } catch (e) {
            return date;
        }
    },
    
    // Sauvegarder dans le stockage local
    setStorage: function(key, value) {
        try {
            const data = typeof value === 'object' ? JSON.stringify(value) : value;
            localStorage.setItem(key, data);
            return true;
        } catch (e) {
            console.error('Storage error:', e);
            return false;
        }
    },
    
    // Récupérer du stockage local
    getStorage: function(key, defaultValue = null) {
        try {
            const data = localStorage.getItem(key);
            if (!data) return defaultValue;
            try {
                return JSON.parse(data);
            } catch {
                return data;
            }
        } catch (e) {
            return defaultValue;
        }
    },
    
    // Supprimer du stockage local
    removeStorage: function(key) {
        try {
            localStorage.removeItem(key);
            return true;
        } catch (e) {
            return false;
        }
    },
    
    // Vérifier si une valeur est vide
    isEmpty: function(value) {
        if (value === null || value === undefined) return true;
        if (typeof value === 'string') return value.trim().length === 0;
        if (Array.isArray(value)) return value.length === 0;
        if (typeof value === 'object') return Object.keys(value).length === 0;
        return false;
    },
    
    // Échapper les caractères HTML
    escapeHtml: function(text) {
        const map = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#039;'
        };
        return String(text).replace(/[&<>"']/g, m => map[m]);
    },
    
    // Tronquer un texte
    truncate: function(text, maxLength = 100) {
        if (text.length <= maxLength) return text;
        return text.substr(0, maxLength) + '...';
    },
    
    // Obtenir la langue actuelle
    getCurrentLang: function() {
        const saved = this.getStorage(SECURITY_CONFIG.storage.langPreference);
        if (saved && (saved === 'fr' || saved === 'en')) return saved;
        return DEVICE_INFO.language.startsWith('fr') ? 'fr' : 'en';
    },
    
    // Détecter le support WebP
    supportsWebP: function() {
        return new Promise(resolve => {
            const webP = new Image();
            webP.onload = webP.onerror = () => {
                resolve(webP.height === 2);
            };
            webP.src = 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
        });
    }
};

// ============================================
// INITIALISATION
// ============================================
console.log('%c Adventure Treks avec Ali %c v1.0 ',
    'background: #2E7D32; color: white; padding: 5px 10px; border-radius: 5px 0 0 5px;',
    'background: #FF8F00; color: white; padding: 5px 10px; border-radius: 0 5px 5px 0;'
);

// Geler tous les objets de configuration pour empêcher les modifications
Object.freeze(UTILS);