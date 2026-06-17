// assets/js/counter.js
function updateAllCounters() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    
    const cartEl = document.getElementById('cart-count');
    const favEl = document.getElementById('fav-count');
    
    if (cartEl) cartEl.textContent = cart.length;
    if (favEl) favEl.textContent = favorites.length;
}

window.updateAllCounters = updateAllCounters;

// Автообновление при загрузке
document.addEventListener('DOMContentLoaded', updateAllCounters);