// assets/js/favorites.js
import products from './data.js';

document.addEventListener('DOMContentLoaded', () => {
    renderFavorites();
    updateFavCount();
});

function renderFavorites() {
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    const container = document.getElementById('favorites-content');

    if (favorites.length === 0) {
        container.innerHTML = `
            <h2>Избранное пустое</h2>
            <p>Добавляйте товары в избранное, чтобы они отображались здесь.</p>
            <a href="catalog.html" style="color:#ff4500; font-size:18px;">Перейти в каталог →</a>
        `;
        return;
    }

    let html = '<div class="products-grid">';

    favorites.forEach((product, index) => {
        html += `
            <div class="product-card">
                <img src="${product.image}" alt="${product.name}" onclick="viewProduct(${product.id})">
                <div class="product-info">
                    <h3>${product.name}</h3>
                    <div class="price">${product.price.toLocaleString('ru-RU')} ₽</div>
                    <div class="rating">⭐ ${product.rating}</div>
                </div>
                <div class="fav-actions">
                    <button onclick="addToCart(${product.id}); event.stopImmediatePropagation()">В корзину</button>
                    <button onclick="removeFromFavorites(${index}); event.stopImmediatePropagation()" class="remove-fav">Удалить</button>
                </div>
            </div>
        `;
    });

    html += '</div>';
    container.innerHTML = html;
}

window.viewProduct = function(id) {
    window.location.href = `product.html?id=${id}`;
};

window.removeFromFavorites = function(index) {
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    favorites.splice(index, 1);
    localStorage.setItem('favorites', JSON.stringify(favorites));
    renderFavorites();
    updateFavCount();
};

window.addToCart = function(productId) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const product = products.find(p => p.id === productId);
    
    if (product) {
        const existing = cart.find(item => item.id === productId);
        if (existing) {
            existing.quantity = (existing.quantity || 1) + 1;
        } else {
            cart.push({...product, quantity: 1});
        }
        localStorage.setItem('cart', JSON.stringify(cart));
        alert(`${product.name} добавлен в корзину!`);
    }
};

function updateFavCount() {
    const fav = JSON.parse(localStorage.getItem('favorites')) || [];
    const el = document.getElementById('fav-count');
    if (el) el.textContent = fav.length;
}