// assets/js/catalog.js
import products from './data.js';

let currentPage = 1;
const itemsPerPage = 16;

document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const category = urlParams.get('category') || 'all';
    const searchQuery = urlParams.get('search');

    renderProducts(products, category, searchQuery);

    document.getElementById('apply-filters').addEventListener('click', applyFilters);
    document.getElementById('sort-select').addEventListener('change', () => renderProducts(products));
});

function applyFilters() {
    const minPrice = parseInt(document.getElementById('price-min').value) || 0;
    const maxPrice = parseInt(document.getElementById('price-max').value) || Infinity;
    
    // Получаем выбранные категории
    const selectedCategories = Array.from(document.querySelectorAll('.category-check:checked'))
                                   .map(el => el.value);
    
    // Получаем выбранные бренды
    const selectedBrands = Array.from(document.querySelectorAll('.brand-check:checked'))
                                .map(el => el.value);

    const stock = document.getElementById('stock-filter').value;

    let filtered = products.filter(product => {
        const matchPrice = product.price >= minPrice && product.price <= maxPrice;
        
        const matchCategory = selectedCategories.length === 0 || 
                             selectedCategories.includes(product.category);
        
        const matchBrand = selectedBrands.length === 0 || 
                          selectedBrands.includes(product.brand);
        
        const matchStock = stock === 'all' || (stock === 'in' && product.inStock);

        return matchPrice && matchCategory && matchBrand && matchStock;
    });

    renderProducts(filtered);
}

function renderProducts(filteredProducts = products, category = 'all', searchQuery = null) {
    let productsToShow = [...filteredProducts];

    if (category !== 'all') {
        productsToShow = productsToShow.filter(p => p.category === category);
    }

    if (searchQuery) {
        productsToShow = productsToShow.filter(p => 
            p.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }

    const sortSelect = document.getElementById('sort-select').value;
    if (sortSelect === 'price-asc') productsToShow.sort((a, b) => a.price - b.price);
    else if (sortSelect === 'price-desc') productsToShow.sort((a, b) => b.price - a.price);
    else if (sortSelect === 'rating') productsToShow.sort((a, b) => b.rating - a.rating);

    const totalPages = Math.ceil(productsToShow.length / itemsPerPage);
    currentPage = Math.min(currentPage, totalPages || 1);

    const start = (currentPage - 1) * itemsPerPage;
    const paginated = productsToShow.slice(start, start + itemsPerPage);

    const grid = document.getElementById('products-grid');
    grid.innerHTML = paginated.map(product => `
        <div class="product-card" onclick="window.location.href='product.html?id=${product.id}'">
            <img src="${product.image}" alt="${product.name}">
            <div class="product-info">
                <h3>${product.name}</h3>
                <div class="brand">${product.brand}</div>
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

    renderPagination(totalPages);
}

function renderPagination(totalPages) {
    const pagination = document.getElementById('pagination');
    let html = '';
    for (let i = 1; i <= totalPages; i++) {
        html += `<button ${i === currentPage ? 'class="active"' : ''} onclick="changePage(${i})">${i}</button>`;
    }
    pagination.innerHTML = html;
}

window.changePage = function(page) {
    currentPage = page;
    renderProducts(products);
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