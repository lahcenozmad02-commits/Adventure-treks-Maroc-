/**
 * i18n - Trek Maroc
 * Traduction complète FR/EN
 */
(function() {
    var currentLang = 'fr';
    
    var t = {
        // NAVIGATION
        nav_home: { fr: 'Accueil', en: 'Home' },
        nav_guide: { fr: 'Votre Guide', en: 'Your Guide' },
        nav_treks: { fr: 'Randonnées', en: 'Treks' },
        nav_gallery: { fr: 'Galerie', en: 'Gallery' },
        nav_reviews: { fr: 'Avis', en: 'Reviews' },
        nav_contact: { fr: 'Contact', en: 'Contact' },
        nav_short: { fr: '2-6 Jours', en: '2-6 Days' },
        nav_medium: { fr: '7-11 Jours', en: '7-11 Days' },
        nav_long: { fr: '12-15 Jours', en: '12-15 Days' },
        book_now: { fr: 'Réserver', en: 'Book' },
        certified_guide: { fr: 'Guide Certifié • +30 ans', en: 'Certified Guide • 30+ years' },
        
        // HERO
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
        
        // WHY US
        why_badge: { fr: 'Pourquoi me choisir', en: 'Why choose me' },
        why_title: { fr: 'Votre guide, pas juste un guide', en: 'Your guide, not just a guide' },
        why_subtitle: { fr: 'Une expérience authentique avec un expert local', en: 'An authentic experience with a local expert' },
        feature_1_title: { fr: 'Guide natif de la région', en: 'Native guide' },
        feature_1_desc: { fr: 'Né et grandi dans la Vallée des Roses.', en: 'Born and raised in the Valley of Roses.' },
        feature_2_title: { fr: '30 ans d\'expertise', en: '30 years of expertise' },
        feature_2_desc: { fr: 'Trois décennies à guider des voyageurs.', en: 'Three decades guiding travelers.' },
        feature_3_title: { fr: 'Expérience humaine', en: 'Human experience' },
        feature_3_desc: { fr: 'Plus qu\'un guide, un ami au Maroc.', en: 'More than a guide, a friend in Morocco.' },
        feature_4_title: { fr: 'Sécurité et confiance', en: 'Safety and trust' },
        feature_4_desc: { fr: 'Votre sécurité est ma priorité.', en: 'Your safety is my priority.' },
        feature_5_title: { fr: 'Culture authentique', en: 'Authentic culture' },
        feature_5_desc: { fr: 'Plongez dans la culture berbère.', en: 'Immerse in Berber culture.' },
        feature_6_title: { fr: 'Respect de votre intimité', en: 'Privacy respected' },
        feature_6_desc: { fr: 'Votre confort est essentiel.', en: 'Your comfort is essential.' },
        
        // TREKS
        treks_badge: { fr: 'Aventures', en: 'Adventures' },
        treks_title: { fr: 'Nos randonnées populaires', en: 'Our popular treks' },
        treks_subtitle: { fr: 'Des circuits pour tous les niveaux', en: 'Circuits for all levels' },
        trek_popular: { fr: 'Populaire', en: 'Popular' },
        trek_new: { fr: 'Nouveau', en: 'New' },
        trek_book: { fr: 'Réserver', en: 'Book' },
        view_all_treks: { fr: 'Voir toutes les randonnées', en: 'View all treks' },
        trek_toubkal_f1: { fr: 'Ascension du plus haut sommet d\'Afrique du Nord', en: 'Climb North Africa\'s highest peak' },
        trek_toubkal_f2: { fr: 'Vallée d\'Ourika et villages berbères', en: 'Ourika Valley and Berber villages' },
        trek_toubkal_f3: { fr: '4-5h de marche par jour', en: '4-5h walking per day' },
        trek_roses_f1: { fr: 'Découverte de la vallée natale d\'Ali', en: 'Discover Ali\'s native valley' },
        trek_roses_f2: { fr: 'Coopératives de rose et traditions', en: 'Rose cooperatives and traditions' },
        trek_roses_f3: { fr: 'Gorges de Dades et Todra', en: 'Dades and Todra gorges' },
        trek_mgoun_f1: { fr: 'Ascension du Jbel Mgoun (4068m)', en: 'Climb Jbel Mgoun (4068m)' },
        trek_mgoun_f2: { fr: 'Vallée d\'Aït Bougmez', en: 'Aït Bougmez Happy Valley' },
        trek_mgoun_f3: { fr: 'Nuits en bivouac sous les étoiles', en: 'Bivouac nights under stars' },
        trek_desert_f1: { fr: 'Montagne et désert en un seul voyage', en: 'Mountains and desert in one trip' },
        trek_desert_f2: { fr: 'Nuit dans les dunes de Merzouga', en: 'Night in Merzouga dunes' },
        trek_desert_f3: { fr: 'Oasis et kasbahs historiques', en: 'Oasis and historic kasbahs' },
        
        // TESTIMONIALS
        testimonials_badge: { fr: 'Témoignages', en: 'Testimonials' },
        testimonials_title: { fr: 'Ce que disent nos voyageurs', en: 'What our travelers say' },
        
        // CTA
        cta_title: { fr: 'Prêt pour l\'aventure ?', en: 'Ready for adventure?' },
        cta_desc: { fr: 'Contactez-moi sur WhatsApp pour créer votre voyage sur mesure.', en: 'Contact me on WhatsApp to create your tailor-made trip.' },
        cta_whatsapp_fr: { fr: 'WhatsApp (FR)', en: 'WhatsApp (FR)' },
        cta_whatsapp_en: { fr: 'WhatsApp (EN)', en: 'WhatsApp (EN)' },
        cta_response: { fr: 'Réponse en moins de 24h', en: 'Response within 24h' },
        cta_payment: { fr: 'Paiement après accord', en: 'Payment after agreement' },
        
        // FOOTER
        footer_desc: { fr: 'Votre guide personnel pour trekking et hiking.', en: 'Your personal guide for trekking and hiking.' },
        footer_quick_links: { fr: 'Liens rapides', en: 'Quick links' },
        footer_contact: { fr: 'Contact', en: 'Contact' },
        
        // GUIDE PAGE
        guide_page_title: { fr: 'Votre Guide Personnel', en: 'Your Personal Guide' },
        guide_page_subtitle: { fr: 'Découvrez l\'histoire d\'Ali', en: 'Discover Ali\'s story' },
        my_story_title: { fr: 'Mon Histoire', en: 'My Story' },
        
        // CONTACT PAGE
        contact_title: { fr: 'Contactez-moi', en: 'Contact me' },
        contact_subtitle: { fr: 'Je réponds en moins de 24h', en: 'I respond within 24h' },
        
        // GALLERY PAGE
        gallery_title: { fr: 'Galerie photos', en: 'Photo gallery' },
        gallery_subtitle: { fr: 'Quelques moments de nos aventures', en: 'Moments from our adventures' },
        
        // REVIEWS PAGE
        reviews_title: { fr: 'Avis des voyageurs', en: 'Traveler reviews' },
        reviews_subtitle: { fr: 'Découvrez les expériences vécues', en: 'Discover their experiences' },
        leave_review: { fr: 'Laisser un avis', en: 'Leave a review' },
        your_rating: { fr: 'Votre note', en: 'Your rating' },
        your_experience: { fr: 'Votre expérience', en: 'Your experience' },
        publish_review: { fr: 'Publier votre avis', en: 'Publish your review' },
        no_reviews_yet: { fr: 'Soyez le premier à laisser un avis!', en: 'Be the first to leave a review!' },
        load_more: { fr: 'Charger plus d\'avis', en: 'Load more reviews' },
        
        // BOOKING PAGE
        booking_title: { fr: 'Réservez votre aventure', en: 'Book your adventure' },
        booking_subtitle: { fr: 'Remplissez le formulaire', en: 'Fill out the form' },
        booking_form_trek: { fr: 'Choisir le circuit', en: 'Choose circuit' },
        booking_form_travelers: { fr: 'Nombre de voyageurs', en: 'Number of travelers' },
        booking_form_level: { fr: 'Niveau de forme physique', en: 'Fitness level' },
        booking_form_dates: { fr: 'Dates proposées', en: 'Proposed dates' },
        booking_form_name: { fr: 'Votre nom complet', en: 'Your full name' },
        booking_form_email: { fr: 'Email', en: 'Email' },
        booking_form_phone: { fr: 'Téléphone', en: 'Phone' },
        booking_form_country: { fr: 'Pays de résidence', en: 'Country' },
        booking_form_special: { fr: 'Demandes spéciales', en: 'Special requests' },
        booking_form_language: { fr: 'Langue préférée', en: 'Preferred language' },
        booking_form_submit: { fr: 'Envoyer la demande à Ali', en: 'Send request to Ali' }
    };
    
    function translate(lang) {
        if (!lang || (lang !== 'fr' && lang !== 'en')) return;
        currentLang = lang;
        localStorage.setItem('lang', lang);
        
        document.querySelectorAll('[data-i18n]').forEach(function(el) {
            var key = el.getAttribute('data-i18n');
            if (t[key] && t[key][lang]) {
                el.textContent = t[key][lang];
            }
            // إذا لم نجد المفتاح، نترك النص الأصلي ✅
        });
        
        document.querySelectorAll('.lang-btn').forEach(function(b) {
            b.classList.toggle('active', b.getAttribute('data-lang') === lang);
        });
    }
    
    // إعداد الأزرار
    document.querySelectorAll('.lang-btn').forEach(function(b) {
        b.addEventListener('click', function() {
            translate(this.getAttribute('data-lang'));
        });
    });
    
    // تطبيق اللغة المحفوظة
    var saved = localStorage.getItem('lang');
    if (saved === 'en') translate('en');
})();