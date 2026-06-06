/**
 * ============================================
 * INTERNATIONALISATION (i18n) - VERSION UNIFIÉE
 * Trek Maroc avec Ali
 * ============================================
 * Système de traduction FR/EN - 100% fonctionnel
 */

// قاموس الترجمة الكامل
const TRANSLATIONS = {
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
    book_now: { fr: 'Réserver', en: 'Book Now' },
    
    // Top Bar
    certified_guide: { fr: 'Guide Certifié • +30 ans', en: 'Certified Guide • 30+ years' },
    
    // Hero
    hero_badge: { fr: 'Guide Expert Local', en: 'Local Expert Guide' },
    hero_title_1: { fr: 'Trekking & Hiking', en: 'Trekking & Hiking' },
    hero_title_2: { fr: 'au Maroc', en: 'in Morocco' },
    hero_desc: { fr: 'Votre guide personnel natif de la Vallée des Roses. Plus de 30 ans à vous faire découvrir les merveilles de l\'Atlas et du désert marocain.', en: 'Your personal guide, native of the Valley of Roses. Over 30 years showing you the wonders of the Atlas and the Moroccan desert.' },
    hero_cta_primary: { fr: 'Circuit Personnalisé', en: 'Custom Circuit' },
    hero_cta_secondary: { fr: 'Découvrir Ali', en: 'Discover Ali' },
    stat_years: { fr: 'Ans d\'expérience', en: 'Years experience' },
    stat_clients: { fr: 'Clients satisfaits', en: 'Satisfied clients' },
    stat_treks: { fr: 'Itinéraires uniques', en: 'Unique itineraries' },
    scroll_down: { fr: 'Défiler', en: 'Scroll down' },
    
    // Why Us
    why_badge: { fr: 'Pourquoi me choisir', en: 'Why choose me' },
    why_title: { fr: 'Votre guide, pas juste un guide', en: 'Your guide, not just a guide' },
    why_subtitle: { fr: 'Une expérience authentique avec un expert local qui connaît chaque sentier, chaque pierre et chaque histoire de ces montagnes', en: 'An authentic experience with a local expert who knows every trail, every stone and every story of these mountains' },
    feature_1_title: { fr: 'Guide natif de la région', en: 'Native guide of the region' },
    feature_1_desc: { fr: 'Né et grandi dans la Vallée des Roses, je connais les montagnes, les sentiers secrets et les changements météorologiques mieux que personne', en: 'Born and raised in the Valley of Roses, I know the mountains, secret trails and weather changes better than anyone' },
    feature_2_title: { fr: '30 ans d\'expertise', en: '30 years of expertise' },
    feature_2_desc: { fr: 'Trois décennies à guider des voyageurs du monde entier, à créer des souvenirs inoubliables et à garantir votre sécurité', en: 'Three decades guiding travelers from around the world, creating unforgettable memories and ensuring your safety' },
    feature_3_title: { fr: 'Expérience humaine', en: 'Human experience' },
    feature_3_desc: { fr: 'Je comprends vos attentes, respecte votre rythme et m\'adapte à vos envies. Plus qu\'un guide, je deviens votre ami au Maroc', en: 'I understand your expectations, respect your pace and adapt to your desires. More than a guide, I become your friend in Morocco' },
    feature_4_title: { fr: 'Sécurité et confiance', en: 'Safety and trust' },
    feature_4_desc: { fr: 'Votre sécurité est ma priorité absolue. Équipement professionnel, premiers soins et connaissance approfondie du terrain', en: 'Your safety is my absolute priority. Professional equipment, first aid and in-depth knowledge of the terrain' },
    feature_5_title: { fr: 'Culture authentique', en: 'Authentic culture' },
    feature_5_desc: { fr: 'Plongez dans la culture berbère authentique, rencontrez les populations locales et découvrez des traditions millénaires', en: 'Immerse yourself in authentic Berber culture, meet local people and discover ancient traditions' },
    feature_6_title: { fr: 'Respect de votre intimité', en: 'Respect for your privacy' },
    feature_6_desc: { fr: 'Je respecte votre espace personnel et votre vie privée. Votre confort et votre tranquillité sont essentiels', en: 'I respect your personal space and privacy. Your comfort and tranquility are essential' },
    
    // Treks
    treks_badge: { fr: 'Aventures', en: 'Adventures' },
    treks_title: { fr: 'Nos randonnées populaires', en: 'Our popular treks' },
    treks_subtitle: { fr: 'Des circuits pour tous les niveaux, de 4 à 15 jours, dans les plus beaux paysages du Maroc', en: 'Circuits for all levels, from 4 to 15 days, in the most beautiful landscapes of Morocco' },
    trek_popular: { fr: 'Populaire', en: 'Popular' },
    trek_new: { fr: 'Nouveau', en: 'New' },
    trek_book: { fr: 'Réserver', en: 'Book' },
    view_all_treks: { fr: 'Voir toutes les randonnées', en: 'View all treks' },
    trek_toubkal_f1: { fr: 'Ascension du plus haut sommet d\'Afrique du Nord', en: 'Climb North Africa\'s highest peak' },
    trek_toubkal_f2: { fr: 'Vallée d\'Ourika et villages berbères', en: 'Ourika Valley and Berber villages' },
    trek_toubkal_f3: { fr: '4-5h de marche par jour', en: '4-5h walking per day' },
    trek_roses_f1: { fr: 'Découverte de la vallée natale d\'Ali', en: 'Discover Ali\'s native valley' },
    trek_roses_f2: { fr: 'Coopératives de rose et traditions locales', en: 'Rose cooperatives and local traditions' },
    trek_roses_f3: { fr: 'Gorges de Dades et Todra', en: 'Dades and Todra gorges' },
    trek_mgoun_f1: { fr: 'Ascension du Jbel Mgoun (4068m)', en: 'Climb Jbel Mgoun (4068m)' },
    trek_mgoun_f2: { fr: 'Vallée d\'Aït Bougmez "Vallée Heureuse"', en: 'Aït Bougmez "Happy Valley"' },
    trek_mgoun_f3: { fr: 'Nuits en bivouac sous les étoiles', en: 'Bivouac nights under the stars' },
    trek_desert_f1: { fr: 'Montagne et désert en un seul voyage', en: 'Mountains and desert in one trip' },
    trek_desert_f2: { fr: 'Nuit dans les dunes de Merzouga', en: 'Night in Merzouga dunes' },
    trek_desert_f3: { fr: 'Oasis et kasbahs historiques', en: 'Oasis and historic kasbahs' },
    
    // Testimonials
    testimonials_badge: { fr: 'Témoignages', en: 'Testimonials' },
    testimonials_title: { fr: 'Ce que disent nos voyageurs', en: 'What our travelers say' },
    
    // CTA
    cta_title: { fr: 'Prêt pour l\'aventure ?', en: 'Ready for adventure?' },
    cta_desc: { fr: 'Contactez-moi directement sur WhatsApp pour créer votre voyage sur mesure. Je réponds personnellement en moins de 24h.', en: 'Contact me directly on WhatsApp to create your tailor-made trip. I respond personally within 24 hours.' },
    cta_whatsapp_fr: { fr: 'WhatsApp (FR)', en: 'WhatsApp (FR)' },
    cta_whatsapp_en: { fr: 'WhatsApp (EN)', en: 'WhatsApp (EN)' },
    cta_response: { fr: 'Réponse en moins de 24h', en: 'Response within 24 hours' },
    cta_payment: { fr: 'Paiement après accord', en: 'Payment after agreement' },
    
    // Footer
    footer_desc: { fr: 'Votre guide personnel pour trekking et hiking dans l\'Atlas et le désert marocain.', en: 'Your personal guide for trekking and hiking in the Atlas and the Moroccan desert.' },
    footer_quick_links: { fr: 'Liens rapides', en: 'Quick links' },
    footer_contact: { fr: 'Contact', en: 'Contact' },
    
    // Guide Page
    guide_page_title: { fr: 'Votre Guide Personnel', en: 'Your Personal Guide' },
    guide_page_subtitle: { fr: 'Découvrez l\'histoire d\'Ali, votre guide expert natif de la Vallée des Roses', en: 'Discover Ali\'s story, your expert guide native of the Valley of Roses' },
    my_story_title: { fr: 'Mon Histoire', en: 'My Story' },
    
    // Contact Page
    contact_title: { fr: 'Contactez-moi', en: 'Contact me' },
    contact_subtitle: { fr: 'Je réponds personnellement à chaque message en moins de 24 heures', en: 'I personally respond to every message within 24 hours' },
    
    // Reviews Page
    reviews_title: { fr: 'Avis des voyageurs', en: 'Traveler reviews' },
    reviews_subtitle: { fr: 'Découvrez les expériences vécues par nos voyageurs', en: 'Discover the experiences of our travelers' },
    leave_review: { fr: 'Laisser un avis', en: 'Leave a review' },
    your_rating: { fr: 'Votre note', en: 'Your rating' },
    your_experience: { fr: 'Votre expérience', en: 'Your experience' },
    publish_review: { fr: 'Publier votre avis', en: 'Publish your review' },
    no_reviews_yet: { fr: 'Soyez le premier à laisser un avis sur Ali!', en: 'Be the first to leave a review about Ali!' },
    load_more: { fr: 'Charger plus d\'avis', en: 'Load more reviews' },
    
    // Gallery Page
    gallery_title: { fr: 'Galerie photos', en: 'Photo gallery' },
    gallery_subtitle: { fr: 'Quelques moments capturés lors de nos aventures', en: 'Some moments captured during our adventures' },
    
    // Booking Page
    booking_title: { fr: 'Réservez votre aventure', en: 'Book your adventure' },
    booking_subtitle: { fr: 'Remplissez le formulaire et je vous contacterai personnellement', en: 'Fill out the form and I will contact you personally' },
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
    booking_form_submit: { fr: 'Envoyer la demande à Ali', en: 'Send request to Ali' }
};

// ============================================
// FONCTIONS PRINCIPALES
// ============================================

// تغيير اللغة
function changeLanguage(lang) {
    if (lang !== 'fr' && lang !== 'en') return;
    
    // حفظ اللغة
    localStorage.setItem('at_lang', lang);
    
    // تطبيق الترجمة
    applyTranslations(lang);
    
    // تحديث الأزرار
    updateLanguageButtons(lang);
}

// تطبيق الترجمات
function applyTranslations(lang) {
    document.querySelectorAll('[data-i18n]').forEach(function(el) {
        var key = el.getAttribute('data-i18n');
        if (TRANSLATIONS[key] && TRANSLATIONS[key][lang]) {
            if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
                el.placeholder = TRANSLATIONS[key][lang];
            } else {
                el.textContent = TRANSLATIONS[key][lang];
            }
        }
    });
}

// تحديث أزرار اللغة
function updateLanguageButtons(lang) {
    document.querySelectorAll('.lang-btn').forEach(function(btn) {
        var btnLang = btn.getAttribute('data-lang');
        if (btnLang === lang) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
}

// إعداد الأزرار
function setupLanguageButtons() {
    document.querySelectorAll('.lang-btn').forEach(function(btn) {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            var lang = this.getAttribute('data-lang');
            changeLanguage(lang);
        });
    });
}

// ============================================
// INITIALISATION
// ============================================
(function() {
    // انتظر تحميل الصفحة
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
    
    function init() {
        // قراءة اللغة المحفوظة أو الافتراضية
        var savedLang = localStorage.getItem('at_lang');
        var defaultLang = (navigator.language || 'fr').startsWith('fr') ? 'fr' : 'en';
        var lang = (savedLang === 'fr' || savedLang === 'en') ? savedLang : defaultLang;
        
        // تطبيق الترجمة
        applyTranslations(lang);
        
        // تحديث الأزرار
        updateLanguageButtons(lang);
        
        // إعداد الأزرار
        setupLanguageButtons();
    }
})();