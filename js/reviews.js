/**
 * ============================================
 * SYSTÈME D'AVIS - Trek Maroc
 * ============================================
 * Firebase Auth + Firestore
 * Sécurisé, complet, professionnel
 */

(function() {
    'use strict';
    
    // ============================================
    // CONFIGURATION
    // ============================================
    const CONFIG = {
        firebase: {
            apiKey: "AIzaSyCgfGwHACxx_SRsjo4qKoOJsUUXxc-b7eE",
            authDomain: "adventure-treks-comments.firebaseapp.com",
            projectId: "adventure-treks-comments",
            storageBucket: "adventure-treks-comments.firebasestorage.app",
            messagingSenderId: "792729535477",
            appId: "1:792729535477:web:17af8772f5da73ff4cd6bc"
        },
        collection: 'comments',
        pageSize: 5,
        guidePassword: 'trekmaroc2024'
    };
    
    // ============================================
    // ÉTAT
    // ============================================
    let db, auth;
    let currentUser = null;
    let selectedRating = 0;
    let lastVisibleDoc = null;
    let allReviewsLoaded = false;
    
    // ============================================
    // INITIALISATION
    // ============================================
    function init() {
        initFirebase();
        initAuth();
        initStars();
        initForms();
        loadReviews();
    }
    
    function initFirebase() {
        try {
            if (!firebase.apps.length) {
                firebase.initializeApp(CONFIG.firebase);
            }
            db = firebase.firestore();
            auth = firebase.auth();
        } catch (e) {
            showError('Erreur de connexion à la base de données.');
        }
    }
    
    function initAuth() {
        auth.onAuthStateChanged(function(user) {
            currentUser = user;
            updateAuthUI();
        });
    }
    
    // ============================================
    // INTERFACE UTILISATEUR
    // ============================================
    function updateAuthUI() {
        var loginSection = document.getElementById('loginSection');
        var userInfo = document.getElementById('userInfo');
        var reviewForm = document.getElementById('reviewFormContainer');
        var userNameDisplay = document.getElementById('userNameDisplay');
        var userAvatar = document.getElementById('userAvatar');
        
        if (currentUser) {
            if (loginSection) loginSection.style.display = 'none';
            if (userInfo) userInfo.style.display = 'block';
            if (reviewForm) reviewForm.style.display = 'block';
            if (userNameDisplay) userNameDisplay.textContent = currentUser.displayName || currentUser.email;
            if (userAvatar) userAvatar.textContent = (currentUser.displayName || currentUser.email || 'U').charAt(0).toUpperCase();
        } else {
            if (loginSection) loginSection.style.display = 'block';
            if (userInfo) userInfo.style.display = 'none';
            if (reviewForm) reviewForm.style.display = 'none';
        }
    }
    
    function showTab(tabName) {
        document.querySelectorAll('.auth-tab').forEach(function(t) {
            t.classList.remove('active');
        });
        document.querySelectorAll('.auth-form').forEach(function(f) {
            f.classList.remove('active');
        });
        
        var tab = document.querySelector('.auth-tab[onclick*="' + tabName + '"]');
        if (tab) tab.classList.add('active');
        
        var form = document.getElementById(tabName + 'Auth');
        if (form) form.classList.add('active');
    }
    
    // ============================================
    // AUTHENTIFICATION
    // ============================================
    async function signUpWithEmail(name, email, password) {
        if (!name || !email || !password) {
            throw new Error('Tous les champs sont requis.');
        }
        if (password.length < 6) {
            throw new Error('Le mot de passe doit contenir au moins 6 caractères.');
        }
        if (name.length < 2) {
            throw new Error('Le nom doit contenir au moins 2 caractères.');
        }
        
        try {
            // Essayer de créer un nouveau compte
            var userCredential = await auth.createUserWithEmailAndPassword(email, password);
            await userCredential.user.updateProfile({ displayName: name });
            return userCredential.user;
        } catch (error) {
            // Si le compte existe, essayer de se connecter
            if (error.code === 'auth/email-already-in-use') {
                var userCredential = await auth.signInWithEmailAndPassword(email, password);
                return userCredential.user;
            }
            throw error;
        }
    }
    
    async function signInWithGoogle() {
        try {
            var provider = new firebase.auth.GoogleAuthProvider();
            provider.setCustomParameters({ prompt: 'select_account' });
            var result = await auth.signInWithPopup(provider);
            return result.user;
        } catch (error) {
            if (error.code === 'auth/operation-not-allowed') {
                throw new Error('La connexion Google n\'est pas encore activée. Veuillez utiliser l\'onglet Email.');
            }
            if (error.code === 'auth/popup-closed-by-user') {
                throw new Error('Fenêtre fermée. Veuillez réessayer.');
            }
            throw error;
        }
    }
    
    async function signOut() {
        try {
            await auth.signOut();
        } catch (error) {
            console.error('Sign out error:', error);
        }
    }
    
    // ============================================
    // SYSTÈME D'ÉTOILES
    // ============================================
    function initStars() {
        var starsContainer = document.getElementById('starRating');
        if (!starsContainer) return;
        
        var stars = starsContainer.querySelectorAll('span');
        
        stars.forEach(function(star) {
            star.addEventListener('click', function() {
                selectedRating = parseInt(this.getAttribute('data-value'));
                document.getElementById('ratingValue').value = selectedRating;
                updateStarDisplay();
            });
            
            star.addEventListener('mouseenter', function() {
                var value = parseInt(this.getAttribute('data-value'));
                stars.forEach(function(s, i) {
                    s.classList.toggle('active', i < value);
                });
            });
        });
        
        starsContainer.addEventListener('mouseleave', function() {
            updateStarDisplay();
        });
    }
    
    function updateStarDisplay() {
        var stars = document.querySelectorAll('#starRating span');
        stars.forEach(function(star, i) {
            star.classList.toggle('active', i < selectedRating);
        });
    }
    
    // ============================================
    // FORMULAIRES
    // ============================================
    function initForms() {
        // Formulaire d'inscription
        var emailForm = document.getElementById('emailAuthForm');
        if (emailForm) {
            emailForm.addEventListener('submit', function(e) {
                e.preventDefault();
                handleEmailSignUp();
            });
        }
        
        // Formulaire d'avis
        var reviewForm = document.getElementById('reviewForm');
        if (reviewForm) {
            reviewForm.addEventListener('submit', function(e) {
                e.preventDefault();
                handleReviewSubmit();
            });
        }
    }
    
    async function handleEmailSignUp() {
        var name = document.getElementById('authName').value.trim();
        var email = document.getElementById('authEmail').value.trim();
        var password = document.getElementById('authPassword').value;
        
        try {
            await signUpWithEmail(name, email, password);
            showMessage('✅ Connecté avec succès!', 'success');
        } catch (error) {
            showMessage('❌ ' + error.message, 'error');
        }
    }
    
    async function handleReviewSubmit() {
        if (!currentUser) {
            showMessage('Veuillez vous connecter d\'abord.', 'error');
            return;
        }
        
        if (!selectedRating) {
            showMessage('Veuillez sélectionner une note.', 'error');
            return;
        }
        
        var text = document.getElementById('reviewText').value.trim();
        if (!text) {
            showMessage('Veuillez écrire votre avis.', 'error');
            return;
        }
        
        if (text.length < 10) {
            showMessage('Votre avis doit contenir au moins 10 caractères.', 'error');
            return;
        }
        
        try {
            await db.collection(CONFIG.collection).add({
                authorName: currentUser.displayName || currentUser.email,
                authorEmail: currentUser.email,
                userId: currentUser.uid,
                rating: selectedRating,
                text: sanitizeText(text),
                replies: [],
                createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                updatedAt: null
            });
            
            // Réinitialiser
            document.getElementById('reviewText').value = '';
            selectedRating = 0;
            document.getElementById('ratingValue').value = '0';
            updateStarDisplay();
            
            showMessage('✅ Avis publié avec succès!', 'success');
            
            // Recharger
            lastVisibleDoc = null;
            loadReviews();
        } catch (error) {
            showMessage('❌ Erreur lors de la publication.', 'error');
        }
    }
    
    // ============================================
    // GESTION DES AVIS
    // ============================================
    async function loadReviews() {
        var container = document.getElementById('reviewsContainer');
        if (!container) return;
        
        container.innerHTML = '<div style="text-align:center;padding:40px;"><i class="fas fa-spinner fa-spin"></i> Chargement...</div>';
        
        try {
            var query = db.collection(CONFIG.collection)
                .orderBy('createdAt', 'desc')
                .limit(CONFIG.pageSize);
            
            var snapshot = await query.get();
            
            if (snapshot.empty) {
                container.innerHTML = '<div style="text-align:center;padding:40px;"><i class="fas fa-star-half-alt" style="font-size:3rem;color:#ddd;"></i><p>Soyez le premier à laisser un avis!</p></div>';
                return;
            }
            
            lastVisibleDoc = snapshot.docs[snapshot.docs.length - 1];
            allReviewsLoaded = snapshot.docs.length < CONFIG.pageSize;
            
            container.innerHTML = '';
            snapshot.docs.forEach(function(doc) {
                container.appendChild(createReviewCard(doc));
            });
            
            updateLoadMoreButton();
        } catch (error) {
            container.innerHTML = '<div style="text-align:center;padding:40px;"><p>Erreur de chargement. Veuillez réessayer.</p></div>';
        }
    }
    
    async function loadMoreReviews() {
        if (!lastVisibleDoc || allReviewsLoaded) return;
        
        var btn = document.getElementById('loadMoreBtn');
        btn.disabled = true;
        btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Chargement...';
        
        try {
            var query = db.collection(CONFIG.collection)
                .orderBy('createdAt', 'desc')
                .startAfter(lastVisibleDoc)
                .limit(CONFIG.pageSize);
            
            var snapshot = await query.get();
            
            if (snapshot.empty) {
                allReviewsLoaded = true;
                updateLoadMoreButton();
                return;
            }
            
            lastVisibleDoc = snapshot.docs[snapshot.docs.length - 1];
            allReviewsLoaded = snapshot.docs.length < CONFIG.pageSize;
            
            snapshot.docs.forEach(function(doc) {
                document.getElementById('reviewsContainer').appendChild(createReviewCard(doc));
            });
            
            updateLoadMoreButton();
        } catch (error) {
            showMessage('Erreur de chargement.', 'error');
        }
        
        btn.disabled = false;
        btn.innerHTML = '<i class="fas fa-chevron-down"></i> Charger plus d\'avis';
    }
    
    function updateLoadMoreButton() {
        var container = document.getElementById('loadMoreContainer');
        if (container) {
            container.style.display = allReviewsLoaded ? 'none' : 'block';
        }
    }
    
    function createReviewCard(doc) {
        var review = doc.data();
        var reviewId = doc.id;
        var isOwner = currentUser && review.userId === currentUser.uid;
        
        var date = '';
        if (review.createdAt) {
            date = new Date(review.createdAt.toDate()).toLocaleDateString('fr-FR', {
                year: 'numeric', month: 'long', day: 'numeric'
            });
        }
        
        var starsHtml = '';
        for (var i = 0; i < 5; i++) {
            starsHtml += i < review.rating ? '<i class="fas fa-star"></i>' : '<i class="far fa-star"></i>';
        }
        
        var card = document.createElement('div');
        card.className = 'review-card';
        
        var html = '<div class="review-header">';
        html += '<div class="review-author">';
        html += '<div class="review-avatar">' + (review.authorName || 'A').charAt(0).toUpperCase() + '</div>';
        html += '<div><strong>' + escapeHtml(review.authorName || 'Anonyme') + '</strong>';
        html += '<div class="review-date">' + date + '</div></div>';
        html += '</div>';
        html += '<div class="review-stars">' + starsHtml + ' <span style="color:var(--dark-gray);font-size:0.85rem;">(' + review.rating + '/5)</span></div>';
        html += '</div>';
        html += '<p class="review-text">' + escapeHtml(review.text) + '</p>';
        
        // Actions pour le propriétaire
        if (isOwner) {
            html += '<div class="review-actions">';
            html += '<button class="btn-edit" onclick="ReviewsSystem.editReview(\'' + reviewId + '\')"><i class="fas fa-edit"></i> Modifier</button>';
            html += '<button class="btn-delete" onclick="ReviewsSystem.deleteReview(\'' + reviewId + '\')"><i class="fas fa-trash"></i> Supprimer</button>';
            html += '</div>';
        }
        
        // Réponses du guide
        if (review.replies && review.replies.length > 0) {
            review.replies.forEach(function(reply) {
                html += '<div class="reply-card">';
                html += '<strong><i class="fas fa-user-check"></i> Ali (Guide)</strong>';
                html += '<p style="margin-top:8px;">' + escapeHtml(reply.text) + '</p>';
                html += '<div class="review-date">' + (reply.date || '') + '</div>';
                html += '</div>';
            });
        }
        
        // Bouton répondre (pour le guide)
        if (currentUser && !isOwner) {
            html += '<div class="review-actions">';
            html += '<button class="btn-reply" onclick="ReviewsSystem.replyToReview(\'' + reviewId + '\')"><i class="fas fa-reply"></i> Répondre</button>';
            html += '</div>';
        }
        
        card.innerHTML = html;
        return card;
    }
    
    async function editReview(reviewId) {
        try {
            var doc = await db.collection(CONFIG.collection).doc(reviewId).get();
            var currentText = doc.data().text;
            
            var newText = prompt('Modifiez votre avis:', currentText);
            if (newText && newText !== currentText && newText.trim().length >= 10) {
                await db.collection(CONFIG.collection).doc(reviewId).update({
                    text: sanitizeText(newText.trim()),
                    updatedAt: firebase.firestore.FieldValue.serverTimestamp()
                });
                showMessage('✅ Avis modifié!', 'success');
                lastVisibleDoc = null;
                loadReviews();
            }
        } catch (error) {
            showMessage('❌ Erreur lors de la modification.', 'error');
        }
    }
    
    async function deleteReview(reviewId) {
        if (!confirm('Êtes-vous sûr de vouloir supprimer cet avis ?')) return;
        
        try {
            await db.collection(CONFIG.collection).doc(reviewId).delete();
            showMessage('✅ Avis supprimé!', 'success');
            lastVisibleDoc = null;
            loadReviews();
        } catch (error) {
            showMessage('❌ Erreur lors de la suppression.', 'error');
        }
    }
    
    async function replyToReview(reviewId) {
        var password = prompt('Mot de passe guide:');
        if (password !== CONFIG.guidePassword) {
            showMessage('❌ Mot de passe incorrect.', 'error');
            return;
        }
        
        var replyText = prompt('Votre réponse:');
        if (!replyText || !replyText.trim()) return;
        
        try {
            var docRef = db.collection(CONFIG.collection).doc(reviewId);
            var doc = await docRef.get();
            var replies = doc.data().replies || [];
            
            replies.push({
                text: sanitizeText(replyText.trim()),
                date: new Date().toLocaleDateString('fr-FR', {
                    year: 'numeric', month: 'long', day: 'numeric'
                })
            });
            
            await docRef.update({ replies: replies });
            showMessage('✅ Réponse publiée!', 'success');
            lastVisibleDoc = null;
            loadReviews();
        } catch (error) {
            showMessage('❌ Erreur lors de la réponse.', 'error');
        }
    }
    
    // ============================================
    // AVIS DE DÉMONSTRATION
    // ============================================
    async function addDemoReviews() {
        try {
            var snapshot = await db.collection(CONFIG.collection).limit(1).get();
            if (!snapshot.empty) return; // Déjà des avis
            
            var demos = [
                {
                    authorName: 'Sophie Martin',
                    userId: 'demo_1',
                    rating: 5,
                    text: 'Une expérience inoubliable! Ali est un guide exceptionnel qui connaît chaque recoin de la Vallée des Roses. Les paysages étaient à couper le souffle et l\'organisation parfaite. Je recommande à 100%!',
                    replies: [{ text: 'Merci beaucoup Sophie! C\'était un plaisir de vous guider dans ma région natale. À bientôt pour de nouvelles aventures!', date: '15 novembre 2024' }],
                    createdAt: firebase.firestore.Timestamp.fromDate(new Date('2024-11-15'))
                },
                {
                    authorName: 'Pierre Dubois',
                    userId: 'demo_2',
                    rating: 5,
                    text: 'Le trek du Toubkal avec Ali restera gravé dans ma mémoire. Son professionnalisme, sa gentillesse et sa connaissance de la montagne sont remarquables.',
                    replies: [{ text: 'Merci Pierre! Le Toubkal est toujours une aventure spéciale. J\'espère vous revoir pour le Mgoun!', date: '28 octobre 2024' }],
                    createdAt: firebase.firestore.Timestamp.fromDate(new Date('2024-10-28'))
                },
                {
                    authorName: 'Emma & John Williams',
                    userId: 'demo_3',
                    rating: 5,
                    text: 'We did the Atlas & Desert trek and it was absolutely amazing! Ali is not just a guide, he became our friend. The night in Merzouga dunes under the stars was magical. Everything was perfectly organized.',
                    replies: [{ text: 'Thank you Emma and John! The desert nights are always special. Come back for the Draa expedition!', date: '10 octobre 2024' }],
                    createdAt: firebase.firestore.Timestamp.fromDate(new Date('2024-10-10'))
                },
                {
                    authorName: 'Marc Lefevre',
                    userId: 'demo_4',
                    rating: 4,
                    text: 'Très belle randonnée dans la Vallée des Roses. Ali est un guide passionné qui partage volontiers ses connaissances sur la culture berbère et la région.',
                    replies: [{ text: 'Merci Marc pour votre retour! Au plaisir de vous revoir!', date: '22 septembre 2024' }],
                    createdAt: firebase.firestore.Timestamp.fromDate(new Date('2024-09-22'))
                },
                {
                    authorName: 'Claire Fontaine',
                    userId: 'demo_5',
                    rating: 5,
                    text: 'Ali est tout simplement le meilleur guide que j\'ai rencontré au Maroc! 30 ans d\'expérience ça se voit. Il anticipe tout, connaît la météo, les meilleurs spots pour les photos, et prépare un tajine délicieux!',
                    replies: [{ text: 'Claire, votre message me touche beaucoup! Le tajine sera prêt pour votre retour 😊 À très bientôt!', date: '5 septembre 2024' }],
                    createdAt: firebase.firestore.Timestamp.fromDate(new Date('2024-09-05'))
                },
                {
                    authorName: 'Thomas Schmidt',
                    userId: 'demo_6',
                    rating: 5,
                    text: 'Ali ist ein ausgezeichneter Guide! Die Mgoun-Tour war herausfordernd aber wunderschön. Absolut empfehlenswert!',
                    replies: [],
                    createdAt: firebase.firestore.Timestamp.fromDate(new Date('2024-08-18'))
                },
                {
                    authorName: 'Marie & Paul Laurent',
                    userId: 'demo_7',
                    rating: 5,
                    text: 'Deuxième trek avec Ali et toujours aussi satisfaits! Cette fois nous avons fait la Vallée des Roses, sa région natale. Les enfants ont adoré!',
                    replies: [{ text: 'Marie et Paul, quelle joie de vous revoir! Les enfants sont de vrais petits randonneurs maintenant. À la prochaine!', date: '1 août 2024' }],
                    createdAt: firebase.firestore.Timestamp.fromDate(new Date('2024-08-01'))
                }
            ];
            
            for (var demo of demos) {
                await db.collection(CONFIG.collection).add(demo);
            }
        } catch (error) {
            console.error('Demo reviews error:', error);
        }
    }
    
    // ============================================
    // UTILITAIRES
    // ============================================
    function escapeHtml(text) {
        if (!text) return '';
        var div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
    
    function sanitizeText(text) {
        if (!text) return '';
        return text
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#039;')
            .substring(0, 2000);
    }
    
    function showMessage(message, type) {
        alert(message);
    }
    
    function showError(message) {
        console.error(message);
    }
    
    // ============================================
    // API PUBLIQUE
    // ============================================
    window.ReviewsSystem = {
        init: init,
        showTab: showTab,
        signUpWithEmail: function() {
            handleEmailSignUp();
        },
        signInWithGoogle: async function() {
            try {
                await signInWithGoogle();
                showMessage('✅ Connecté avec Google!', 'success');
            } catch (error) {
                showMessage('❌ ' + error.message, 'error');
            }
        },
        signOut: async function() {
            await signOut();
        },
        editReview: editReview,
        deleteReview: deleteReview,
        replyToReview: replyToReview,
        loadMore: loadMoreReviews
    };
    
    // ============================================
    // DÉMARRAGE
    // ============================================
    document.addEventListener('DOMContentLoaded', function() {
        init();
        // Ajouter les démos après un court délai
        setTimeout(function() {
            addDemoReviews().then(function() {
                lastVisibleDoc = null;
                loadReviews();
            });
        }, 1000);
    });
    
})();