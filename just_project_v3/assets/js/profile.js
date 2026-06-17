// assets/js/profile.js
import products from './data.js';

document.addEventListener('DOMContentLoaded', () => {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    
    if (!user) {
        document.getElementById('profile-content').innerHTML = `
            <h2>Вы не авторизованы</h2>
            <button onclick="showAuthModal()" class="auth-btn">Войти / Зарегистрироваться</button>
        `;
        return;
    }

    renderProfile(user);
});

function renderProfile(user) {
    const container = document.getElementById('profile-content');
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    const orders = user.orders || [];

    container.innerHTML = `
        <div class="profile-page">

            <!-- Большая шапка профиля -->
            <div class="profile-header">
                <div class="user-main">
                    <div class="avatar-big">👤</div>
                    <div class="user-text">
                        <h1>${user.name}</h1>
                        <p class="email">${user.email}</p>
                    </div>
                </div>
                
                <div class="bonus-block">
                    <div class="bonus-title">Ваши бонусы</div>
                    <div class="bonus-value">${user.bonuses || 0} ₽</div>
                    <button onclick="window.location.href='game.html'" class="bonus-game-btn">
                        🎮 Играть за бонусы
                    </button>
                </div>
            </div>

            <!-- Заказы -->
            <div class="section">
                <h2>📦 Мои заказы (${orders.length})</h2>
                ${orders.length > 0 ? orders.map(order => `
                    <div class="order-card">
                        Заказ №${order.id} — <strong>${order.total.toLocaleString('ru-RU')} ₽</strong>
                        <span class="status">(${order.status})</span>
                    </div>`).join('') : 
                    '<p class="empty">Заказов пока нет. Сделайте первую покупку!</p>'}
            </div>

            <!-- Избранное -->
            <div class="section">
                <h2>❤️ Избранное (${favorites.length})</h2>
                <div id="fav-grid" class="fav-grid"></div>
            </div>

        </div>
    `;

    renderFavorites(favorites);
}

function renderFavorites(favorites) {
    const grid = document.getElementById('fav-grid');
    if (favorites.length === 0) {
        grid.innerHTML = '<p class="empty">Избранное пустое</p>';
        return;
    }

    grid.innerHTML = favorites.map(product => `
        <div class="fav-item">
            <img src="${product.image}" alt="${product.name}">
            <div class="fav-details">
                <h3>${product.name}</h3>
                <p class="price">${product.price.toLocaleString('ru-RU')} ₽</p>
                <button onclick="addToCart(${product.id}); event.stopImmediatePropagation()" class="add-to-cart-small">В корзину</button>
            </div>
        </div>
    `).join('');
}

window.addToCart = function(productId) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const product = products.find(p => p.id === productId);
    if (product) {
        const existing = cart.find(item => item.id === productId);
        if (existing) existing.quantity = (existing.quantity || 1) + 1;
        else cart.push({...product, quantity: 1});

        localStorage.setItem('cart', JSON.stringify(cart));
        alert(`${product.name} добавлен в корзину!`);
        updateAllCounters();
    }
};