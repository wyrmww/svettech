// assets/js/auth.js
let currentUser = null;

document.addEventListener('DOMContentLoaded', () => {
    currentUser = JSON.parse(localStorage.getItem('currentUser'));
    updateAuthUI();
});

function registerUser(name, email, password) {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    
    if (users.find(u => u.email === email)) {
        alert("Пользователь с таким email уже существует!");
        return false;
    }

    const newUser = {
        id: Date.now(),
        name: name,
        email: email,
        password: password, // В реальном проекте нужно хэшировать!
        bonuses: 250,
        orders: [],
        favorites: [],
        reviews: []
    };

    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    
    alert("Регистрация прошла успешно! Теперь войдите в аккаунт.");
    return true;
}

function loginUser(email, password) {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(u => u.email === email && u.password === password);

    if (user) {
        localStorage.setItem('currentUser', JSON.stringify(user));
        currentUser = user;
        updateAuthUI();
        return true;
    } else {
        alert("Неверный email или пароль!");
        return false;
    }
}

function logout() {
    localStorage.removeItem('currentUser');
    currentUser = null;
    updateAuthUI();
    alert("Вы вышли из аккаунта");
    window.location.href = 'index.html';
}

function updateAuthUI() {
    const profileLink = document.getElementById('profile-link');
    if (!profileLink) return;

    if (currentUser) {
        profileLink.textContent = currentUser.name.split(' ')[0];
        profileLink.href = 'profile.html';
    } else {
        profileLink.textContent = 'Войти';
        profileLink.href = '#';
        profileLink.onclick = () => showAuthModal();
    }
}

function showAuthModal() {
    const modalHTML = `
    <div id="auth-modal" style="position:fixed; top:0; left:0; width:100%; height:100%; background:rgba(0,0,0,0.7); z-index:1000; display:flex; align-items:center; justify-content:center;">
        <div style="background:white; padding:30px; border-radius:12px; width:380px; max-width:90%;">
            <h2 style="text-align:center; margin-bottom:20px;">Вход / Регистрация</h2>
            
            <div id="auth-tabs" style="display:flex; margin-bottom:20px;">
                <button onclick="switchTab(0)" style="flex:1; padding:10px; background:#ff4500; color:white; border:none;">Вход</button>
                <button onclick="switchTab(1)" style="flex:1; padding:10px; background:#ddd; border:none;">Регистрация</button>
            </div>

            <div id="login-form">
                <input type="email" id="login-email" placeholder="Email" style="width:100%; padding:12px; margin:8px 0; border:1px solid #ddd; border-radius:8px;"><br>
                <input type="password" id="login-password" placeholder="Пароль" style="width:100%; padding:12px; margin:8px 0; border:1px solid #ddd; border-radius:8px;"><br>
                <button onclick="handleLogin()" style="width:100%; padding:12px; background:#ff4500; color:white; border:none; border-radius:8px; margin-top:10px;">Войти</button>
            </div>

            <div id="register-form" style="display:none;">
                <input type="text" id="reg-name" placeholder="Имя" style="width:100%; padding:12px; margin:8px 0; border:1px solid #ddd; border-radius:8px;"><br>
                <input type="email" id="reg-email" placeholder="Email" style="width:100%; padding:12px; margin:8px 0; border:1px solid #ddd; border-radius:8px;"><br>
                <input type="password" id="reg-password" placeholder="Пароль" style="width:100%; padding:12px; margin:8px 0; border:1px solid #ddd; border-radius:8px;"><br>
                <button onclick="handleRegister()" style="width:100%; padding:12px; background:#ff4500; color:white; border:none; border-radius:8px; margin-top:10px;">Зарегистрироваться</button>
            </div>

            <button onclick="closeAuthModal()" style="width:100%; margin-top:15px; padding:10px; background:#999; color:white; border:none; border-radius:8px;">Закрыть</button>
        </div>
    </div>`;

    document.body.insertAdjacentHTML('beforeend', modalHTML);
}

window.switchTab = function(tab) {
    document.getElementById('login-form').style.display = tab === 0 ? 'block' : 'none';
    document.getElementById('register-form').style.display = tab === 1 ? 'block' : 'none';
};

window.handleLogin = function() {
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    if (loginUser(email, password)) {
        closeAuthModal();
    }
};

window.handleRegister = function() {
    const name = document.getElementById('reg-name').value;
    const email = document.getElementById('reg-email').value;
    const password = document.getElementById('reg-password').value;
    
    if (name && email && password) {
        if (registerUser(name, email, password)) {
            closeAuthModal();
        }
    } else {
        alert("Заполните все поля!");
    }
};

window.closeAuthModal = function() {
    const modal = document.getElementById('auth-modal');
    if (modal) modal.remove();
};