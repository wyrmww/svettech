// assets/js/product.js
import products from './data.js';

document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = parseInt(urlParams.get('id'));
    
    if (!productId) {
        document.getElementById('product-content').innerHTML = `<h2>Товар не найден</h2>`;
        return;
    }

    const product = products.find(p => p.id === productId);
    
    if (!product) {
        document.getElementById('product-content').innerHTML = `<h2>Товар не найден</h2>`;
        return;
    }

    renderProduct(product);
});

function renderProduct(product) {
    const container = document.getElementById('product-content');
    
    container.innerHTML = `
        <div class="product-detail">
            <div class="product-left">
                <img src="${product.image}" alt="${product.name}" class="big-image">
            </div>
            
            <div class="product-right">
                <h1>${product.name}</h1>
                <div class="rating-big">⭐ ${product.rating} (${product.reviews} отзывов)</div>
                
                <div class="price-big">
                    ${product.price.toLocaleString('ru-RU')} ₽
                    ${product.oldPrice ? `<span class="old-price-big">${product.oldPrice.toLocaleString('ru-RU')} ₽</span>` : ''}
                </div>

                <div class="stock ${product.inStock ? 'in-stock' : 'out-stock'}">
                    ${product.inStock ? '✅ В наличии' : '❌ Нет в наличии'}
                </div>
                <div class="specs-section">
    <h3>Характеристики</h3>
    <ul class="specs-list">
        ${Object.entries(product.specs).map(([key, value]) => `
            <li><strong>${key.charAt(0).toUpperCase() + key.slice(1)}:</strong> ${value}</li>
        `).join('')}
    </ul>
</div>

                <div class="actions">
                    <button onclick="addToCart(${product.id})" class="add-to-cart-big">В корзину</button>
                    <button onclick="toggleFavorite(${product.id})" class="fav-btn">❤️ В избранное</button>
                </div>
            </div>
        </div>

        <!-- Отзывы -->
        <div class="reviews-section">
            <h2>Отзывы</h2>
            <div id="reviews-list"></div>
            
            <div class="add-review">
    <h3>Написать отзыв</h3>
    <select id="review-rating">
        <option value="5">5 — Отлично</option>
        <option value="4">4 — Хорошо</option>
        <option value="3">3 — Нормально</option>
        <option value="2">2 — Плохо</option>
        <option value="1">1 — Ужасно</option>
    </select>
    <textarea id="review-text" placeholder="Напишите ваш отзыв здесь..."></textarea>
    <button onclick="addReview(${product.id})" class="review-submit-btn">Опубликовать отзыв</button>
</div>
        </div>
    `;

    loadReviews(product.id);
}

function loadReviews(productId) {
    const reviews = JSON.parse(localStorage.getItem(`reviews_${productId}`)) || [];
    const container = document.getElementById('reviews-list');

    if (reviews.length === 0) {
        container.innerHTML = `<p>Отзывов пока нет. Будьте первым!</p>`;
        return;
    }

    container.innerHTML = reviews.map(review => `
        <div class="review">
            <div class="review-header">
                <strong>${review.author}</strong>
                <span>${'⭐'.repeat(review.rating)}</span>
            </div>
            <p>${review.text}</p>
            <small>${review.date}</small>
        </div>
    `).join('');
}

window.addReview = function(productId) {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    if (!user) {
        alert("Чтобы оставить отзыв, нужно войти в аккаунт!");
        showAuthModal();
        return;
    }

    const text = document.getElementById('review-text').value.trim();
    const rating = parseInt(document.getElementById('review-rating').value);

    if (!text) {
        alert("Напишите текст отзыва!");
        return;
    }

    let reviews = JSON.parse(localStorage.getItem(`reviews_${productId}`)) || [];

    reviews.unshift({
        author: user.name,
        rating: rating,
        text: text,
        date: new Date().toLocaleDateString('ru-RU')
    });

    localStorage.setItem(`reviews_${productId}`, JSON.stringify(reviews));
    loadReviews(productId);

    document.getElementById('review-text').value = '';
    alert("Отзыв добавлен!");
};

window.addToCart = function(productId) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const product = products.find(p => p.id === productId);
    
    if (product) {
        const existing = cart.find(item => item.id === productId);
        if (existing) existing.quantity = (existing.quantity || 1) + 1;
        else cart.push({...product, quantity: 1});

        localStorage.setItem('cart', JSON.stringify(cart));
        alert(`${product.name} добавлен в корзину!`);
    }
};

window.toggleFavorite = function(productId) {
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    const product = products.find(p => p.id === productId);
    
    if (!product) return;

    const index = favorites.findIndex(item => item.id === productId);
    
    if (index === -1) {
        favorites.push(product);
        alert("✅ Товар добавлен в избранное!");
    } else {
        favorites.splice(index, 1);
        alert("❌ Товар удалён из избранного");
    }
    
    localStorage.setItem('favorites', JSON.stringify(favorites));
    
    // Обновляем счётчик
    const favCount = document.getElementById('fav-count');
    if (favCount) favCount.textContent = favorites.length;
};