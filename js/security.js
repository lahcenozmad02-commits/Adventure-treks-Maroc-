/**
 * ============================================
 * SÉCURITÉ - Adventure Treks avec Ali
 * ============================================
 * Validation, Sanitization, Rate Limiting
 * Protection XSS, CSRF, Injection
 */

const Security = (function() {
    'use strict';
    
    // ============================================
    // VALIDATION DES CHAMPS
    // ============================================
    const validators = {
        // Validation de nom
        name: function(value) {
            if (!value || typeof value !== 'string') return false;
            const trimmed = value.trim();
            if (trimmed.length < SECURITY_CONFIG.validation.nameMinLength) return false;
            if (trimmed.length > SECURITY_CONFIG.validation.nameMaxLength) return false;
            // Vérifier les motifs interdits
            for (const pattern of SECURITY_CONFIG.validation.forbiddenPatterns) {
                if (pattern.test(trimmed)) return false;
            }
            // N'autoriser que les lettres, espaces, tirets et apostrophes
            return /^[\p{L}\s'\-]+$/u.test(trimmed);
        },
        
        // Validation d'email
        email: function(value) {
            if (!value || typeof value !== 'string') return false;
            const trimmed = value.trim().toLowerCase();
            if (trimmed.length > 254) return false;
            for (const pattern of SECURITY_CONFIG.validation.forbiddenPatterns) {
                if (pattern.test(trimmed)) return false;
            }
            return SECURITY_CONFIG.validation.emailRegex.test(trimmed);
        },
        
        // Validation de téléphone
        phone: function(value) {
            if (!value || typeof value !== 'string') return false;
            const trimmed = value.trim();
            for (const pattern of SECURITY_CONFIG.validation.forbiddenPatterns) {
                if (pattern.test(trimmed)) return false;
            }
            return SECURITY_CONFIG.validation.phoneRegex.test(trimmed);
        },
        
        // Validation de message
        message: function(value) {
            if (!value || typeof value !== 'string') return false;
            const trimmed = value.trim();
            if (trimmed.length === 0) return false;
            if (trimmed.length > SECURITY_CONFIG.validation.maxMessageLength) return false;
            for (const pattern of SECURITY_CONFIG.validation.forbiddenPatterns) {
                if (pattern.test(trimmed)) return false;
            }
            return true;
        },
        
        // Validation du nombre de voyageurs
        travelers: function(value) {
            const num = parseInt(value, 10);
            if (isNaN(num)) return false;
            return num >= SECURITY_CONFIG.validation.minTravelers && 
                   num <= SECURITY_CONFIG.validation.maxTravelers;
        }
    };
    
    // ============================================
    // SANITIZATION
    // ============================================
    function sanitizeInput(input) {
        if (!input) return '';
        
        let sanitized = String(input);
        
        // Supprimer les balises HTML
        sanitized = sanitized.replace(/<[^>]*>/g, '');
        
        // Supprimer les scripts et événements
        sanitized = sanitized.replace(/javascript:/gi, '');
        sanitized = sanitized.replace(/on\w+\s*=/gi, '');
        sanitized = sanitized.replace(/&lt;script/i, '');
        
        // Échapper les caractères HTML restants
        sanitized = sanitized
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#039;');
        
        // Limiter la longueur
        if (sanitized.length > 5000) {
            sanitized = sanitized.substring(0, 5000);
        }
        
        return sanitized;
    }
    
    // Nettoyage avec DOMPurify si disponible
    function sanitizeHTML(html) {
        if (typeof DOMPurify !== 'undefined') {
            return DOMPurify.sanitize(html, {
                ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'p', 'br'],
                ALLOWED_ATTR: []
            });
        }
        return sanitizeInput(html);
    }
    
    // ============================================
    // VALIDATION DE FORMULAIRE
    // ============================================
    function validateForm(formElement) {
        const errors = {};
        const inputs = formElement.querySelectorAll('input, textarea, select');
        
        inputs.forEach(input => {
            const name = input.getAttribute('name') || input.id;
            const value = input.value;
            const type = input.type;
            const required = input.hasAttribute('required');
            
            // Réinitialiser l'erreur
            input.classList.remove('error');
            const errorEl = input.nextElementSibling;
            if (errorEl && errorEl.classList.contains('form-error-message')) {
                errorEl.remove();
            }
            
            // Vérifier si requis
            if (required && !value.trim()) {
                errors[name] = I18n.translate('error_required');
                showFieldError(input, errors[name]);
                return;
            }
            
            // Validation par type
            if (value.trim()) {
                let isValid = true;
                
                switch (type) {
                    case 'email':
                        isValid = validators.email(value);
                        if (!isValid) errors[name] = I18n.translate('error_email');
                        break;
                    case 'tel':
                        isValid = validators.phone(value);
                        if (!isValid) errors[name] = I18n.translate('error_phone');
                        break;
                }
                
                // Validation par attribut data
                const validationType = input.getAttribute('data-validate');
                if (validationType && validators[validationType]) {
                    isValid = validators[validationType](value);
                    if (!isValid) {
                        errors[name] = I18n.translate('error_' + validationType, {default: 'Champ invalide'});
                    }
                }
                
                // Vérifier les motifs interdits
                for (const pattern of SECURITY_CONFIG.validation.forbiddenPatterns) {
                    if (pattern.test(value)) {
                        errors[name] = I18n.translate('error_security');
                        isValid = false;
                        break;
                    }
                }
                
                if (!isValid) {
                    showFieldError(input, errors[name]);
                }
            }
        });
        
        return {
            isValid: Object.keys(errors).length === 0,
            errors: errors
        };
    }
    
    function showFieldError(input, message) {
        input.classList.add('error');
        
        const errorEl = document.createElement('span');
        errorEl.className = 'form-error-message';
        errorEl.textContent = message;
        
        input.parentNode.insertBefore(errorEl, input.nextSibling);
    }
    
    // ============================================
    // RATE LIMITING
    // ============================================
    const rateLimiter = {
        attempts: {},
        
        check: function(key) {
            const now = Date.now();
            const windowMs = SECURITY_CONFIG.rateLimit.timeWindow;
            const maxAttempts = SECURITY_CONFIG.rateLimit.maxRequests;
            const blockMs = SECURITY_CONFIG.rateLimit.blockDuration;
            
            // Nettoyer les anciennes entrées
            if (this.attempts[key]) {
                this.attempts[key] = this.attempts[key].filter(
                    timestamp => now - timestamp < windowMs
                );
            } else {
                this.attempts[key] = [];
            }
            
            // Vérifier si bloqué
            if (this.attempts[key].length >= maxAttempts) {
                const oldestAttempt = this.attempts[key][0];
                if (now - oldestAttempt < blockMs) {
                    return {
                        allowed: false,
                        waitTime: Math.ceil((blockMs - (now - oldestAttempt)) / 1000)
                    };
                }
                // Réinitialiser après la période de blocage
                this.attempts[key] = [];
            }
            
            // Ajouter la tentative
            this.attempts[key].push(now);
            
            // Sauvegarder
            this.save();
            
            return {
                allowed: true,
                remaining: maxAttempts - this.attempts[key].length
            };
        },
        
        save: function() {
            try {
                UTILS.setStorage(SECURITY_CONFIG.storage.rateLimitData, this.attempts);
            } catch (e) {
                // Ignorer les erreurs de stockage
            }
        },
        
        load: function() {
            try {
                const saved = UTILS.getStorage(SECURITY_CONFIG.storage.rateLimitData);
                if (saved) {
                    this.attempts = saved;
                }
            } catch (e) {
                this.attempts = {};
            }
        }
    };
    
    // Charger les données de rate limiting
    rateLimiter.load();
    
    // ============================================
    // PROTECTION CONTRE LE SPAM
    // ============================================
    function isSpam(formData) {
        // Vérifier les honeypots
        const honeypot = formData.get('website');
        if (honeypot && honeypot.length > 0) return true;
        
        // Vérifier le temps de remplissage
        const timestamp = formData.get('timestamp');
        if (timestamp) {
            const now = Date.now();
            const formTime = parseInt(timestamp, 10);
            // Si le formulaire a été rempli en moins de 3 secondes
            if (now - formTime < 3000) return true;
            // Si le formulaire a été rempli en plus de 2 heures
            if (now - formTime > 7200000) return true;
        }
        
        return false;
    }
    
    // ============================================
    // GESTION DES ERREURS
    // ============================================
    function handleError(error, context = '') {
        // Ne pas exposer les détails de l'erreur à l'utilisateur
        console.error(`[Security Error] ${context}:`, error.message);
        
        // Retourner un message générique
        return {
            message: I18n.translate('error_generic', {
                default: 'Une erreur est survenue. Veuillez réessayer.'
            }),
            code: 'SECURITY_ERROR'
        };
    }
    
    // ============================================
    // PROTECTION CSRF (simplifiée)
    // ============================================
    function generateCSRFToken() {
        const token = UTILS.generateId();
        UTILS.setStorage('csrf_token', token);
        return token;
    }
    
    function validateCSRFToken(token) {
        const stored = UTILS.getStorage('csrf_token');
        if (!stored || !token) return false;
        return stored === token;
    }
    
    // ============================================
    // CONTENT SECURITY
    // ============================================
    function secureURL(url) {
        // Vérifier que l'URL est autorisée
        const allowedDomains = [
            'adventure-treks.vercel.app',
            'drive.google.com',
            'wa.me',
            'instagram.com',
            'gstatic.com',
            'cdnjs.cloudflare.com',
            'cdn.jsdelivr.net',
            'fonts.googleapis.com',
            'fonts.gstatic.com'
        ];
        
        try {
            const urlObj = new URL(url);
            const domain = urlObj.hostname.replace('www.', '');
            
            for (const allowed of allowedDomains) {
                if (domain === allowed || domain.endsWith('.' + allowed)) {
                    return url;
                }
            }
        } catch (e) {
            // URL invalide
            return '#';
        }
        
        return '#';
    }
    
    // ============================================
    // SÉCURITÉ DU STOCKAGE LOCAL
    // ============================================
    function secureStorage() {
        // Vérifier l'intégrité des données stockées
        const keys = Object.keys(localStorage);
        const prefix = 'at_';
        
        keys.forEach(key => {
            if (key.startsWith(prefix)) {
                try {
                    const data = localStorage.getItem(key);
                    // Vérifier que les données sont valides
                    JSON.parse(data);
                } catch (e) {
                    // Supprimer les données corrompues
                    localStorage.removeItem(key);
                }
            }
        });
    }
    
    // ============================================
    // INITIALISATION
    // ============================================
    function init() {
        // Sécuriser le stockage
        secureStorage();
        
        // Ajouter la protection des formulaires
        document.querySelectorAll('form').forEach(form => {
            // Ajouter un timestamp caché
            const timestampInput = document.createElement('input');
            timestampInput.type = 'hidden';
            timestampInput.name = 'timestamp';
            timestampInput.value = Date.now().toString();
            form.appendChild(timestampInput);
            
            // Ajouter un honeypot
            const honeypotInput = document.createElement('input');
            honeypotInput.type = 'text';
            honeypotInput.name = 'website';
            honeypotInput.style.position = 'absolute';
            honeypotInput.style.left = '-9999px';
            honeypotInput.style.opacity = '0';
            honeypotInput.tabIndex = -1;
            honeypotInput.autocomplete = 'off';
            form.appendChild(honeypotInput);
            
            // Validation avant soumission
            form.addEventListener('submit', function(e) {
                const formData = new FormData(this);
                
                // Vérifier le spam
                if (isSpam(formData)) {
                    e.preventDefault();
                    console.warn('Spam detected');
                    return false;
                }
                
                // Rate limiting
                const formId = this.id || 'unknown_form';
                const rateCheck = rateLimiter.check(formId);
                if (!rateCheck.allowed) {
                    e.preventDefault();
                    alert(`Trop de tentatives. Veuillez attendre ${rateCheck.waitTime} secondes.`);
                    return false;
                }
                
                // Validation
                const validation = validateForm(this);
                if (!validation.isValid) {
                    e.preventDefault();
                    // Faire défiler jusqu'à la première erreur
                    const firstError = this.querySelector('.error');
                    if (firstError) {
                        firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
                        firstError.focus();
                    }
                    return false;
                }
                
                // Sanitization des données
                for (const [key, value] of formData.entries()) {
                    if (typeof value === 'string') {
                        formData.set(key, sanitizeInput(value));
                    }
                }
                
                return true;
            });
        });
        
        // Désactiver le clic droit sur les images (protection simple)
        document.addEventListener('contextmenu', function(e) {
            if (e.target.tagName === 'IMG') {
                // e.preventDefault(); // Décommenter pour activer
            }
        });
    }
    
    // ============================================
    // API PUBLIQUE
    // ============================================
    return {
        init: init,
        validateForm: validateForm,
        sanitizeInput: sanitizeInput,
        sanitizeHTML: sanitizeHTML,
        validators: validators,
        generateCSRFToken: generateCSRFToken,
        validateCSRFToken: validateCSRFToken,
        secureURL: secureURL,
        rateLimiter: rateLimiter
    };
})();

// Initialisation automatique
document.addEventListener('DOMContentLoaded', function() {
    Security.init();
});
