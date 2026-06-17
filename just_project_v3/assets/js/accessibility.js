// assets/js/accessibility.js
import products from './data.js';

document.addEventListener('DOMContentLoaded', () => {
    renderFilters();
    renderAccessibleProducts();
});

function renderFilters() {
    const container = document.getElementById('acc-filters');
    container.innerHTML = `
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 40px;">
            <div>
                <h3 style="margin-bottom:20px;">Категория</h3>
                <label><input type="checkbox" class="acc-category" value="smartphone"> Смартфоны</label>
                <label><input type="checkbox" class="acc-category" value="laptop"> Ноутбуки</label>
                <label><input type="checkbox" class="acc-category" value="headphones"> Наушники</label>
                <label><input type="checkbox" class="acc-category" value="watch"> Смарт-часы</label>
            </div>
            <div>
                <h3 style="margin-bottom:20px;">Бренд</h3>
                <label><input type="checkbox" class="acc-brand" value="Apple"> Apple</label>
                <label><input type="checkbox" class="acc-brand" value="Samsung"> Samsung</label>
                <label><input type="checkbox" class="acc-brand" value="Sony"> Sony</label>
                <label><input type="checkbox" class="acc-brand" value="Dell"> Dell</label>
                <label><input type="checkbox" class="acc-brand" value="Lenovo"> Lenovo</label>
            </div>
        </div>
        <button onclick="applyAccFilters()" style="margin-top:30px; width:100%; padding:20px; font-size:26px; background:#ff4500; color:white; border:none; border-radius:8px;">
            Применить фильтры
        </button>
    `;
}

window.applyAccFilters = function() {
    const selectedCategories = Array.from(document.querySelectorAll('.acc-category:checked')).map(el => el.value);
    const selectedBrands = Array.from(document.querySelectorAll('.acc-brand:checked')).map(el => el.value);

    let filtered = products;

    if (selectedCategories.length > 0) {
        filtered = filtered.filter(p => selectedCategories.includes(p.category));
    }
    if (selectedBrands.length > 0) {
        filtered = filtered.filter(p => selectedBrands.includes(p.brand));
    }

    renderAccessibleProducts(filtered);
};

function renderAccessibleProducts(filteredProducts = products) {
    const container = document.getElementById('accessible-products');
    
    container.innerHTML = filteredProducts.map(product => `
        <div class="accessible-product">
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p><strong>Бренд:</strong> ${product.brand}</p>
            <p class="price-accessible"><strong>Цена:</strong> ${product.price.toLocaleString('ru-RU')} ₽</p>
            ${product.oldPrice ? `<p><strong>Старая цена:</strong> ${product.oldPrice.toLocaleString('ru-RU')} ₽</p>` : ''}
            <p><strong>Рейтинг:</strong> ${product.rating} (${product.reviews} отзывов)</p>
            <p><strong>Наличие:</strong> ${product.inStock ? '✅ В наличии' : '❌ Нет в наличии'}</p>
            
            <button onclick="addToCart(${product.id})" style="margin-top:20px;">Добавить в корзину</button>
        </div>
    `).join('');
}

window.addToCart = function(productId) {
    alert("Товар добавлен в корзину (в обычной версии сайта)");
};