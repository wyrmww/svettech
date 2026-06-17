// assets/js/main.js
import products from './data.js';

// В самом начале DOMContentLoaded оставь только:
document.addEventListener('DOMContentLoaded', () => {
    updateHeaderCounters();
    renderPopularProducts();

    // Поиск
    const searchBtn = document.getElementById('search-btn');
    const searchInput = document.getElementById('search-input');

    searchBtn.addEventListener('click', () => {
        const query = searchInput.value.trim();
        if (query) {
            window.location.href = `catalog.html?search=${encodeURIComponent(query)}`;
        }
    });

    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') searchBtn.click();
    });
});

function renderPopularProducts() {
    const container = document.getElementById('popular-products');
    const popular = products.slice(0, 8); // первые 8 товаров

    container.innerHTML = popular.map(product => `
        <div class="product-card" onclick="window.location.href='product.html?id=${product.id}'">
            <img src="${product.image}" alt="${product.name}">
            <div class="product-info">
                <h3>${product.name}</h3>
                <div class="price">
                    ${product.price.toLocaleString('ru-RU')} ₽
                    ${product.oldPrice ? `<span class="old-price">${product.oldPrice.toLocaleString('ru-RU')} ₽</span>` : ''}
                </div>
                <div class="rating">⭐ ${product.rating} (${product.reviews})</div>
            </div>
            <button class="add-to-cart" onclick="event.stopImmediatePropagation(); addToCart(${product.id});">
                В корзину
            </button>
        </div>
    `).join('');
}

function updateHeaderCounters() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    
    const cartEl = document.getElementById('cart-count');
    const favEl = document.getElementById('fav-count');
    
    if (cartEl) cartEl.textContent = cart.length;
    if (favEl) favEl.textContent = favorites.length;
}

// Вызывать после любых изменений в корзине/избранном
window.updateHeaderCounters = updateHeaderCounters;

// Глобальная функция для добавления в корзину
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

// Слайдер
let currentSlide = 0;
const slides = document.querySelectorAll('.slide');

function showSlide(index) {
    slides.forEach(slide => slide.classList.remove('active'));
    slides[index].classList.add('active');
}

document.querySelector('.slider-btn.next').addEventListener('click', () => {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
});

document.querySelector('.slider-btn.prev').addEventListener('click', () => {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    showSlide(currentSlide);
});

// Автосмена слайдов каждые 6 секунд
setInterval(() => {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
}, 6000);

// Обновление счётчиков при загрузке
function updateAllCounters() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    
    const cartEl = document.getElementById('cart-count');
    const favEl = document.getElementById('fav-count');
    
    if (cartEl) cartEl.textContent = cart.length;
    if (favEl) favEl.textContent = favorites.length;
}

document.addEventListener('DOMContentLoaded', updateAllCounters);
document.addEventListener('DOMContentLoaded', updateHeaderCounters);