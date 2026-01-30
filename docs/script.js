/* ===================================
   Creator Platform - JavaScript
   =================================== */

// Page Router
function showPage(pageId) {
    const template = document.getElementById(`page-${pageId}`);
    const app = document.getElementById('app');

    if (!template || !app) return;

    // Clone template and insert
    app.innerHTML = '';
    app.appendChild(template.content.cloneNode(true));

    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Close mobile menu if open
    closeMobileMenu();
}

// Scroll to content section
function scrollToContent() {
    const postsSection = document.getElementById('posts');
    if (postsSection) {
        postsSection.scrollIntoView({ behavior: 'smooth' });
    }
}

// Mobile Menu
function toggleMobileMenu() {
    const mobileMenu = document.getElementById('mobileMenu');
    mobileMenu.classList.toggle('active');
}

function closeMobileMenu() {
    const mobileMenu = document.getElementById('mobileMenu');
    mobileMenu.classList.remove('active');
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    showPage('home');
});

// Close mobile menu on resize
window.addEventListener('resize', () => {
    if (window.innerWidth >= 768) {
        closeMobileMenu();
    }
});
