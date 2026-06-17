// assets/js/cart.js
import products from './data.js';

document.addEventListener('DOMContentLoaded', () => {
    renderCart();
    updateHeaderCounters();
});

function renderCart() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const container = document.getElementById('cart-content');

    if (cart.length === 0) {
        container.innerHTML = `
            <h2>Корзина пуста</h2>
            <p>Добавьте товары из каталога</p>
            <a href="catalog.html" style="color:#ff4500; font-size:18px;">Перейти в каталог →</a>
        `;
        return;
    }

    let total = 0;
    let html = `<div class="cart-items">`;

    cart.forEach((item, index) => {
        const itemTotal = item.price * (item.quantity || 1);
        total += itemTotal;

        html += `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.name}">
                <div class="cart-item-info">
                    <h3>${item.name}</h3>
                    <p>${item.price.toLocaleString('ru-RU')} ₽ × ${item.quantity || 1}</p>
                </div>
                <div class="cart-item-actions">
                    <button onclick="changeQuantity(${index}, -1)">–</button>
                    <span>${item.quantity || 1}</span>
                    <button onclick="changeQuantity(${index}, 1)">+</button>
                    <button onclick="removeFromCart(${index})" class="remove-btn">Удалить</button>
                </div>
                <div class="item-total">${itemTotal.toLocaleString('ru-RU')} ₽</div>
            </div>
        `;
    });

    html += `</div>`;

    html += `
        <div class="cart-summary">
            <h2>Итого: ${total.toLocaleString('ru-RU')} ₽</h2>
            <button onclick="placeOrder()" class="order-btn">Оформить заказ</button>
        </div>
    `;

    container.innerHTML = html;
}

window.changeQuantity = function(index, change) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    if (!cart[index]) return;

    cart[index].quantity = (cart[index].quantity || 1) + change;
    if (cart[index].quantity < 1) cart[index].quantity = 1;

    localStorage.setItem('cart', JSON.stringify(cart));
    renderCart();
    updateHeaderCounters();
};

window.removeFromCart = function(index) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    renderCart();
    updateHeaderCounters();
};

window.placeOrder = function() {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    if (!user) {
        alert("Для оформления заказа нужно войти в аккаунт!");
        showAuthModal();
        return;
    }

    if (cart.length === 0) return;

    const total = cart.reduce((sum, item) => sum + item.price * (item.quantity || 1), 0);

    const order = {
        id: Date.now(),
        date: new Date().toLocaleDateString('ru-RU'),
        items: cart,
        total: total,
        status: "В обработке"
    };

    user.orders = user.orders || [];
    user.orders.push(order);
    user.bonuses = (user.bonuses || 0) + Math.floor(total * 0.05);

    localStorage.setItem('currentUser', JSON.stringify(user));
    localStorage.removeItem('cart');

    alert(`Заказ №${order.id} успешно оформлен! Бонусы начислены.`);
    renderCart();
    updateHeaderCounters();
};

function updateHeaderCounters() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const countEl = document.getElementById('cart-count');
    if (countEl) countEl.textContent = cart.length;
}

// Глобальная функция добавления в корзину (чтобы работала на всех страницах)
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
        updateHeaderCounters();
        alert(`${product.name} добавлен в корзину!`);
    }
};