/**
 * Cambridge Fresh Replica for SCT Portal
 * Handles Sidenav drawer, Search, and Interactive components
 */

// Font Resizer with localStorage persistence
window.setFontSize = function (size) {
    const root = document.documentElement;
    root.classList.remove('font-size-small', 'font-size-normal', 'font-size-large');
    root.classList.add('font-size-' + size);

    // Update active button state
    document.querySelectorAll('.btn-font-resize').forEach(function (btn) {
        btn.classList.remove('active');
    });
    const activeBtn = document.querySelector('.btn-font-resize[onclick*="' + size + '"]');
    if (activeBtn) activeBtn.classList.add('active');

    // Save preference
    try {
        localStorage.setItem('sct_font_size', size);
    } catch (e) {}
};

// Initialize saved font size immediately
(function () {
    try {
        const savedSize = localStorage.getItem('sct_font_size') || 'normal';
        window.setFontSize(savedSize);
    } catch (e) {}
})();

// Exact Cambridge functions matching inline onclick="openNavR()" and onclick="closeNavR()"
window.openNavR = function () {
    const nav = document.getElementById("mySidenavR");
    const overlay = document.getElementById("sidenavOverlay");
    if (!nav) return;

    nav.style.display = "block";
    if (overlay) overlay.style.display = "block";

    setTimeout(function () {
        // Expand drawer to 340px (or 85vw on small mobile screens)
        nav.style.width = window.innerWidth < 400 ? "85vw" : "340px";
    }, 50);
};

window.closeNavR = function () {
    const nav = document.getElementById("mySidenavR");
    const overlay = document.getElementById("sidenavOverlay");
    if (!nav) return;

    nav.style.width = "0";
    if (overlay) overlay.style.display = "none";

    setTimeout(function () {
        nav.style.display = "none";
    }, 400);
};

// Search Dropdown Toggle
window.toggleSearch = function () {
    const searchDropdown = document.getElementById('search-bar-dropdown');
    if (searchDropdown) {
        searchDropdown.classList.toggle('d-none');
        if (!searchDropdown.classList.contains('d-none')) {
            const input = document.getElementById('site-search-input');
            if (input) input.focus();
        }
    }
};

window.handleSearch = function () {
    const input = document.getElementById('site-search-input');
    if (input && input.value.trim()) {
        const query = encodeURIComponent(input.value.trim());
        window.open(`https://www.google.com/search?q=site:sct.ac.th+${query}`, '_blank');
    }
};

document.addEventListener('DOMContentLoaded', function () {
    // Search input 'Enter' key handler
    const searchInput = document.getElementById('site-search-input');
    if (searchInput) {
        searchInput.addEventListener('keypress', function (e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                handleSearch();
            }
        });
    }

    // Close search dropdown or drawer on Escape key
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') {
            closeNavR();
            const searchDropdown = document.getElementById('search-bar-dropdown');
            if (searchDropdown && !searchDropdown.classList.contains('d-none')) {
                searchDropdown.classList.add('d-none');
            }
        }
    });
});
