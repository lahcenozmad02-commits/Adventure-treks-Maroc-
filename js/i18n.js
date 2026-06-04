/**
 * ============================================
 * INTERNATIONALISATION (i18n)
 * Adventure Treks avec Ali
 * ============================================
 * Système de traduction FR/EN complet
 */

const I18n = (function() {
    'use strict';
    
    // ============================================
    // DICTIONNAIRE DE TRADUCTION
    // ============================================
    const translations = {
        // Navigation
        nav_home: { fr: 'Accueil', en: 'Home' },
        nav_guide: { fr: 'Votre Guide', en: 'Your Guide' },
        nav_treks: { fr: 'Randonnées', en: 'Treks' },
        nav_short: { fr: '2-6 Jours', en: '2-6 Days' },
        nav_medium: { fr: '7-11 Jours', en: '7-11 Days' },
        nav_long: { fr: '12-15 Jours', en: '12-15 Days' },
        nav_gallery: { fr: 'Galerie', en: 'Gallery' },
        nav_reviews: { fr: 'Avis', en: 'Reviews' },
        nav_contact: { fr: 'Contact', en: 'Contact' },
        nav_booking: { fr: 'Réserver', en: 'Book Now' },
        book_now: { fr: 'Réserver', en: 'Book Now' },
        
        // Top Bar
        certified_guide: { fr: 'Guide Certifié • 30+ ans', en: 'Certified Guide • 30+ years' },
        
        // Hero Section
        hero_badge: { fr: 'Guide Expert Local', en: 'Local Expert Guide' },
        hero_title_1: { fr: 'Adventure Treks', en: 'Adventure Treks' },
        hero_title_2: { fr: 'avec Ali', en: 'with Ali' },
        hero_desc: {
            fr: 'Votre guide personnel natif de la Vallée des Roses. Plus de 30 ans à vous faire découvrir les merveilles de l\'Atlas et du désert marocain.',
            en: 'Your personal guide, native of the Valley of Roses. Over 30 years showing you the wonders of the Atlas and the Moroccan desert.'
        },
        hero_cta_primary: { fr: 'Circuit Personnalisé', en: 'Custom Circuit' },
        hero_cta_secondary: { fr: 'Découvrir Ali', en: 'Discover Ali' },
        stat_years: { fr: 'Ans d\'expérience', en: 'Years experience' },
        stat_clients: { fr: 'Clients satisfaits', en: 'Satisfied clients' },
        stat_treks: { fr: 'Itinéraires uniques', en: 'Unique itineraries' },
        scroll_down: { fr: 'Défiler', en: 'Scroll down' },
        
        // Why Choose Us
        why_badge: { fr: 'Pourquoi me choisir', en: 'Why choose me' },
        why_title: { fr: 'Votre guide, pas juste un guide', en: 'Your guide, not just a guide' },
        why_subtitle: {
            fr: 'Une expérience authentique avec un expert local qui connaît chaque sentier, chaque pierre et chaque histoire de ces montagnes',
            en: 'An authentic experience with a local expert who knows every trail, every stone and every story of these mountains'
        },
        feature_1_title: { fr: 'Guide natif de la région', en: 'Native guide of the region' },
        feature_1_desc: {
            fr: 'Né et grandi dans la Vallée des Roses, je connais les montagnes, les sentiers secrets et les changements météorologiques mieux que personne',
            en: 'Born and raised in the Valley of Roses, I know the mountains, secret trails and weather changes better than anyone'
        },
        feature_2_title: { fr: '30 ans d\'expertise', en: '30 years of expertise' },
        feature_2_desc: {
            fr: 'Trois décennies à guider des voyageurs du monde entier, à créer des souvenirs inoubliables et à garantir votre sécurité',
            en: 'Three decades guiding travelers from around the world, creating unforgettable memories and ensuring your safety'
        },
        feature_3_title: { fr: 'Expérience humaine', en: 'Human experience' },
        feature_3_desc: {
            fr: 'Je comprends vos attentes, respecte votre rythme et m\'adapte à vos envies. Plus qu\'un guide, je deviens votre ami au Maroc',
            en: 'I understand your expectations, respect your pace and adapt to your desires. More than a guide, I become your friend in Morocco'
        },
        feature_4_title: { fr: 'Sécurité et confiance', en: 'Safety and trust' },
        feature_4_desc: {
            fr: 'Votre sécurité est ma priorité absolue. Équipement professionnel, premiers soins et connaissance approfondie du terrain',
            en: 'Your safety is my absolute priority. Professional equipment, first aid and in-depth knowledge of the terrain'
        },
        feature_5_title: { fr: 'Culture authentique', en: 'Authentic culture' },
        feature_5_desc: {
            fr: 'Plongez dans la culture berbère authentique, rencontrez les populations locales et découvrez des traditions millénaires',
            en: 'Immerse yourself in authentic Berber culture, meet local people and discover ancient traditions'
        },
        feature_6_title: { fr: 'Respect de votre intimité', en: 'Respect for your privacy' },
        feature_6_desc: {
            fr: 'Je respecte votre espace personnel et votre vie privée. Votre confort et votre tranquillité sont essentiels',
            en: 'I respect your personal space and privacy. Your comfort and tranquility are essential'
        },
        
        // Treks Section
        treks_badge: { fr: 'Aventures', en: 'Adventures' },
        treks_title: { fr: 'Nos randonnées populaires', en: 'Our popular treks' },
        treks_subtitle: {
            fr: 'Des circuits pour tous les niveaux, de 4 à 15 jours, dans les plus beaux paysages du Maroc',
            en: 'Circuits for all levels, from 4 to 15 days, in the most beautiful landscapes of Morocco'
        },
        trek_popular: { fr: 'Populaire', en: 'Popular' },
        trek_new: { fr: 'Nouveau', en: 'New' },
        trek_book: { fr: 'Réserver', en: 'Book' },
        view_all_treks: { fr: 'Voir toutes les randonnées', en: 'View all treks' },
        
        // Treks Features
        trek_toubkal_f1: {
            fr: 'Ascension du plus haut sommet d\'Afrique du Nord',
            en: 'Climb North Africa\'s highest peak'
        },
        trek_toubkal_f2: {
            fr: 'Vallée d\'Ourika et villages berbères',
            en: 'Ourika Valley and Berber villages'
        },
        trek_toubkal_f3: { fr: '4-5h de marche par jour', en: '4-5h walking per day' },
        trek_roses_f1: {
            fr: 'Découverte de la vallée natale d\'Ali',
            en: 'Discover Ali\'s native valley'
        },
        trek_roses_f2: {
            fr: 'Coopératives de rose et traditions locales',
            en: 'Rose cooperatives and local traditions'
        },
        trek_roses_f3: { fr: 'Gorges de Dades et Todra', en: 'Dades and Todra gorges' },
        trek_mgoun_f1: {
            fr: 'Ascension du Jbel Mgoun (4068m)',
            en: 'Climb Jbel Mgoun (4068m)'
        },
        trek_mgoun_f2: {
            fr: 'Vallée d\'Aït Bougmez "Vallée Heureuse"',
            en: 'Aït Bougmez "Happy Valley"'
        },
        trek_mgoun_f3: {
            fr: 'Nuits en bivouac sous les étoiles',
            en: 'Bivouac nights under the stars'
        },
        trek_desert_f1: {
            fr: 'Montagne et désert en un seul voyage',
            en: 'Mountains and desert in one trip'
        },
        trek_desert_f2: {
            fr: 'Nuit dans les dunes de Merzouga',
            en: 'Night in Merzouga dunes'
        },
        trek_desert_f3: { fr: 'Oasis et kasbahs historiques', en: 'Oasis and historic kasbahs' },
        
        // Testimonials
        testimonials_badge: { fr: 'Témoignages', en: 'Testimonials' },
        testimonials_title: {
            fr: 'Ce que disent nos voyageurs',
            en: 'What our travelers say'
        },
        
        // CTA Section
        cta_title: { fr: 'Prêt pour l\'aventure ?', en: 'Ready for adventure?' },
        cta_desc: {
            fr: 'Contactez-moi directement sur WhatsApp pour créer votre voyage sur mesure. Je réponds personnellement en moins de 24h.',
            en: 'Contact me directly on WhatsApp to create your tailor-made trip. I respond personally within 24 hours.'
        },
        cta_whatsapp_fr: { fr: 'WhatsApp (FR)', en: 'WhatsApp (FR)' },
        cta_whatsapp_en: { fr: 'WhatsApp (EN)', en: 'WhatsApp (EN)' },
        cta_response: { fr: 'Réponse en moins de 24h', en: 'Response within 24 hours' },
        cta_payment: { fr: 'Paiement après accord', en: 'Payment after agreement' },
        
        // Footer
        footer_desc: {
            fr: 'Votre guide personnel pour des aventures inoubliables dans l\'Atlas et le désert marocain.',
            en: 'Your personal guide for unforgettable adventures in the Atlas and the Moroccan desert.'
        },
        footer_quick_links: { fr: 'Liens rapides', en: 'Quick links' },
        footer_contact: { fr: 'Contact', en: 'Contact' },
        footer_rights: { fr: 'Tous droits réservés.', en: 'All rights reserved.' },
        
        // Guide Page
        guide_page_title: { fr: 'Votre Guide Personnel', en: 'Your Personal Guide' },
        guide_page_subtitle: {
            fr: 'Découvrez l\'histoire d\'Ali, votre guide expert natif de la Vallée des Roses',
            en: 'Discover Ali\'s story, your expert guide native of the Valley of Roses'
        },
        my_story_title: { fr: 'Mon Histoire', en: 'My Story' },
        my_story_text: {
            fr: 'Je suis né et j\'ai grandi dans la Vallée des Roses, au pied des majestueuses montagnes du Mgoun. Depuis mon plus jeune âge, j\'ai parcouru chaque sentier, chaque vallée et chaque sommet de cette région magnifique. La montagne est mon chez-moi, le désert est mon jardin.',
            en: 'I was born and raised in the Valley of Roses, at the foot of the majestic Mgoun mountains. From my earliest age, I have traveled every trail, every valley and every summit of this magnificent region. The mountain is my home, the desert is my garden.'
        },
        my_story_text_2: {
            fr: 'Ma passion pour la nature et les rencontres humaines m\'a naturellement conduit vers le métier de guide. Depuis plus de 30 ans, j\'accompagne des voyageurs du monde entier, partageant avec eux non seulement les paysages époustouflants du Maroc, mais aussi la richesse de notre culture berbère.',
            en: 'My passion for nature and human encounters naturally led me to the profession of guide. For over 30 years, I have accompanied travelers from around the world, sharing with them not only the breathtaking landscapes of Morocco, but also the richness of our Berber culture.'
        },
        my_story_text_3: {
            fr: 'Chaque voyageur est unique, et c\'est pourquoi je personnalise chaque expérience. Mon plus grand bonheur est de voir mes clients revenir, non plus comme des clients, mais comme des amis. Je ne suis pas seulement votre guide, je suis votre hôte, votre confident et votre garant d\'une aventure inoubliable.',
            en: 'Every traveler is unique, which is why I personalize each experience. My greatest joy is seeing my clients return, not as clients, but as friends. I am not just your guide, I am your host, your confidant and your guarantee of an unforgettable adventure.'
        },
        
        // Contact Page
        contact_title: { fr: 'Contactez-moi', en: 'Contact me' },
        contact_subtitle: {
            fr: 'Je réponds personnellement à chaque message en moins de 24 heures',
            en: 'I personally respond to every message within 24 hours'
        },
        contact_whatsapp_fr_label: { fr: 'WhatsApp Français', en: 'WhatsApp French' },
        contact_whatsapp_en_label: { fr: 'WhatsApp English', en: 'WhatsApp English' },
        contact_email_label: { fr: 'Email', en: 'Email' },
        contact_instagram_label: { fr: 'Instagram', en: 'Instagram' },
        contact_form_name: { fr: 'Votre nom', en: 'Your name' },
        contact_form_email: { fr: 'Votre email', en: 'Your email' },
        contact_form_phone: { fr: 'Votre téléphone', en: 'Your phone' },
        contact_form_message: { fr: 'Votre message', en: 'Your message' },
        contact_form_submit: { fr: 'Envoyer le message', en: 'Send message' },
        
        // Reviews Page
        reviews_title: { fr: 'Avis des voyageurs', en: 'Traveler reviews' },
        reviews_subtitle: {
            fr: 'Découvrez les expériences vécues par nos voyageurs',
            en: 'Discover the experiences of our travelers'
        },
        leave_review: { fr: 'Laisser un avis', en: 'Leave a review' },
        your_rating: { fr: 'Votre note', en: 'Your rating' },
        your_experience: { fr: 'Votre expérience', en: 'Your experience' },
        publish_review: { fr: 'Publier votre avis', en: 'Publish your review' },
        login_to_review: { fr: 'Connectez-vous pour laisser un avis', en: 'Log in to leave a review' },
        no_reviews_yet: {
            fr: 'Soyez le premier à laisser un avis sur Ali!',
            en: 'Be the first to leave a review about Ali!'
        },
        
        // Gallery Page
        gallery_title: { fr: 'Galerie photos', en: 'Photo gallery' },
        gallery_subtitle: {
            fr: 'Quelques moments capturés lors de nos aventures',
            en: 'Some moments captured during our adventures'
        },
        
        // Booking Page
        booking_title: { fr: 'Réservez votre aventure', en: 'Book your adventure' },
        booking_subtitle: {
            fr: 'Remplissez le formulaire et je vous contacterai personnellement',
            en: 'Fill out the form and I will contact you personally'
        },
        booking_form_trek: { fr: 'Choisir le circuit', en: 'Choose circuit' },
        booking_form_travelers: { fr: 'Nombre de voyageurs', en: 'Number of travelers' },
        booking_form_level: { fr: 'Niveau de forme physique', en: 'Fitness level' },
        booking_form_dates: { fr: 'Dates proposées', en: 'Proposed dates' },
        booking_form_name: { fr: 'Votre nom complet', en: 'Your full name' },
        booking_form_email: { fr: 'Email', en: 'Email' },
        booking_form_phone: { fr: 'Téléphone', en: 'Phone' },
        booking_form_country: { fr: 'Pays de résidence', en: 'Country of residence' },
        booking_form_special: { fr: 'Demandes spéciales', en: 'Special requests' },
        booking_form_language: { fr: 'Langue de communication préférée', en: 'Preferred language' },
        booking_form_submit: { fr: 'Envoyer la demande à Ali', en: 'Send request to Ali' },
        
        // Errors and Messages
        error_required: { fr: 'Ce champ est requis', en: 'This field is required' },
        error_email: { fr: 'Email invalide', en: 'Invalid email' },
        error_phone: { fr: 'Téléphone invalide', en: 'Invalid phone' },
        error_message_length: { fr: 'Message trop long', en: 'Message too long' },
        error_security: { fr: 'Contenu non autorisé détecté', en: 'Unauthorized content detected' },
        success_message: {
            fr: 'Votre message a été envoyé avec succès! Ali vous contactera dans les 24h.',
            en: 'Your message has been sent successfully! Ali will contact you within 24h.'
        },
        loading: { fr: 'Chargement...', en: 'Loading...' },
        load_more: { fr: 'Charger plus d\'avis', en: 'Load more reviews' },
        no_more: { fr: 'Pas plus d\'avis', en: 'No more reviews' },
        
        // Accessibility
        skip_to_content: { fr: 'Passer au contenu', en: 'Skip to content' },
        open_menu: { fr: 'Ouvrir le menu', en: 'Open menu' },
        close_menu: { fr: 'Fermer le menu', en: 'Close menu' },
        back_to_top: { fr: 'Retour en haut', en: 'Back to top' }
    };
    
    // ============================================
    // ÉTAT ACTUEL
    // ============================================
    let currentLang = 'fr';
    let changeCallbacks = [];
    
    // ============================================
    // INITIALISATION
    // ============================================
    function init() {
        // Récupérer la langue sauvegardée ou détecter
        const saved = UTILS.getStorage(SECURITY_CONFIG.storage.langPreference);
        if (saved && (saved === 'fr' || saved === 'en')) {
            currentLang = saved;
        } else {
            currentLang = navigator.language.startsWith('fr') ? 'fr' : 'en';
        }
        
        // Appliquer la langue
        applyLanguage();
        
        // Configurer les boutons de langue
        setupLanguageButtons();
        
        // Observer les changements du DOM pour les nouveaux éléments
        observeDOMChanges();
    }
    
    // ============================================
    // CHANGEMENT DE LANGUE
    // ============================================
    function setLanguage(lang) {
        if (lang !== 'fr' && lang !== 'en') return;
        if (lang === currentLang) return;
        
        currentLang = lang;
        
        // Sauvegarder la préférence
        UTILS.setStorage(SECURITY_CONFIG.storage.langPreference, lang);
        
        // Appliquer la langue
        applyLanguage();
        
        // Mettre à jour les boutons
        updateLanguageButtons();
        
        // Mettre à jour l'attribut HTML lang
        document.documentElement.lang = lang;
        document.documentElement.dir = 'ltr';
        
        // Notifier les callbacks
        changeCallbacks.forEach(callback => {
            try {
                callback(lang);
            } catch (e) {
                console.error('Language callback error:', e);
            }
        });
        
        // Mettre à jour le titre de la page
        updatePageTitle();
    }
    
    function getCurrentLanguage() {
        return currentLang;
    }
    
    // ============================================
    // APPLICATION DE LA TRADUCTION
    // ============================================
    function applyLanguage() {
        const elements = document.querySelectorAll('[data-i18n]');
        
        elements.forEach(element => {
            const key = element.getAttribute('data-i18n');
            if (translations[key] && translations[key][currentLang]) {
                // Vérifier si l'élément a des enfants (pour les placeholders, etc.)
                if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                    element.placeholder = translations[key][currentLang];
                } else if (element.tagName === 'SELECT') {
                    // Pour les selects avec options
                    element.querySelectorAll('option').forEach(option => {
                        const optionKey = option.getAttribute('data-i18n');
                        if (optionKey && translations[optionKey]) {
                            option.textContent = translations[optionKey][currentLang];
                        }
                    });
                } else {
                    element.textContent = translations[key][currentLang];
                }
            }
        });
        
        // Mettre à jour les titres et aria-labels
        document.querySelectorAll('[data-i18n-title]').forEach(element => {
            const key = element.getAttribute('data-i18n-title');
            if (translations[key] && translations[key][currentLang]) {
                element.title = translations[key][currentLang];
            }
        });
        
        document.querySelectorAll('[data-i18n-aria]').forEach(element => {
            const key = element.getAttribute('data-i18n-aria');
            if (translations[key] && translations[key][currentLang]) {
                element.setAttribute('aria-label', translations[key][currentLang]);
            }
        });
    }
    
    // ============================================
    // BOUTONS DE LANGUE
    // ============================================
    function setupLanguageButtons() {
        document.querySelectorAll('.lang-btn').forEach(button => {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                const lang = this.getAttribute('data-lang');
                if (lang) {
                    setLanguage(lang);
                }
            });
        });
        
        updateLanguageButtons();
    }
    
    function updateLanguageButtons() {
        document.querySelectorAll('.lang-btn').forEach(button => {
            const lang = button.getAttribute('data-lang');
            if (lang === currentLang) {
                button.classList.add('active');
            } else {
                button.classList.remove('active');
            }
        });
    }
    
    // ============================================
    // TITRE DE LA PAGE
    // ============================================
    function updatePageTitle() {
        const defaultTitle = {
            fr: 'Adventure Treks avec Ali | Guide Expert Maroc',
            en: 'Adventure Treks with Ali | Expert Guide Morocco'
        };
        
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        const titles = {
            'index.html': defaultTitle,
            'guide.html': {
                fr: 'Votre Guide Personnel | Adventure Treks avec Ali',
                en: 'Your Personal Guide | Adventure Treks with Ali'
            },
            'treks.html': {
                fr: 'Randonnées | Adventure Treks avec Ali',
                en: 'Treks | Adventure Treks with Ali'
            },
            'gallery.html': {
                fr: 'Galerie Photos | Adventure Treks avec Ali',
                en: 'Photo Gallery | Adventure Treks with Ali'
            },
            'reviews.html': {
                fr: 'Avis Clients | Adventure Treks avec Ali',
                en: 'Client Reviews | Adventure Treks with Ali'
            },
            'contact.html': {
                fr: 'Contact | Adventure Treks avec Ali',
                en: 'Contact | Adventure Treks with Ali'
            },
            'booking.html': {
                fr: 'Réserver | Adventure Treks avec Ali',
                en: 'Book | Adventure Treks with Ali'
            }
        };
        
        const title = titles[currentPage]?.[currentLang] || defaultTitle[currentLang];
        if (title) {
            document.title = title;
        }
    }
    
    // ============================================
    // TRADUCTION PAR CLÉ (pour JS)
    // ============================================
    function translate(key, params = {}) {
        if (!translations[key]) {
            console.warn(`Translation key not found: ${key}`);
            return key;
        }
        
        let text = translations[key][currentLang] || translations[key]['fr'] || key;
        
        // Remplacer les paramètres {param}
        Object.keys(params).forEach(param => {
            text = text.replace(`{${param}}`, params[param]);
        });
        
        return text;
    }
    
    // ============================================
    // OBSERVER LES CHANGEMENTS DU DOM
    // ============================================
    function observeDOMChanges() {
        const observer = new MutationObserver(function(mutations) {
            let needsUpdate = false;
            
            mutations.forEach(mutation => {
                if (mutation.type === 'childList') {
                    mutation.addedNodes.forEach(node => {
                        if (node.nodeType === Node.ELEMENT_NODE) {
                            if (node.hasAttribute('data-i18n') || node.querySelector('[data-i18n]')) {
                                needsUpdate = true;
                            }
                        }
                    });
                }
            });
            
            if (needsUpdate) {
                applyLanguage();
            }
        });
        
        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    }
    
    // ============================================
    // CALLBACKS POUR CHANGEMENT DE LANGUE
    // ============================================
    function onChange(callback) {
        if (typeof callback === 'function') {
            changeCallbacks.push(callback);
        }
    }
    
    // ============================================
    // API PUBLIQUE
    // ============================================
    return {
        init: init,
        setLanguage: setLanguage,
        getCurrentLanguage: getCurrentLanguage,
        translate: translate,
        onChange: onChange,
        applyLanguage: applyLanguage,
        
        // Exposer les traductions (lecture seule)
        get translations() {
            return Object.freeze({ ...translations });
        },
        
        // Obtenir toutes les langues disponibles
        getAvailableLanguages: function() {
            return ['fr', 'en'];
        }
    };
})();

// Initialisation automatique
document.addEventListener('DOMContentLoaded', function() {
    I18n.init();
});