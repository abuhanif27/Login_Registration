document.getElementById('showRegister').addEventListener('click', () => {
    document.getElementById('registrationForm').style.display = 'block';
    document.getElementById('loginForm').style.display = 'none';
});

document.getElementById('showLogin').addEventListener('click', () => {
    document.getElementById('loginForm').style.display = 'block';
    document.getElementById('registrationForm').style.display = 'none';
});

document.getElementById('registerForm').addEventListener('submit', (e) => {
    e.preventDefault();

    const users = JSON.parse(localStorage.getItem('users')) || [];
    const name = document.getElementById('regName').value.trim();
    const email = document.getElementById('regEmail').value.trim();
    const password = document.getElementById('regPassword').value;
    const confirmPassword = document.getElementById('regConfirmPassword').value;

    if (!name || !email || !password || !confirmPassword) {
        alert('Please fill in all fields.');
        return;
    }

    if (password !== confirmPassword) {
        alert('Passwords do not match!');
        return;
    }

    if (users.some((user) => user.email === email)) {
        alert('Email already registered!');
        return;
    }

    const newUser = { fullName: name, email, password };
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));

    alert('Registration successful! Please login.');
    document.getElementById('registerForm').reset();
    document.getElementById('showLogin').click();
});

document.getElementById('loginFormElement').addEventListener('submit', (e) => {
    e.preventDefault();

    const users = JSON.parse(localStorage.getItem('users')) || [];
    const email = document.getElementById('loginEmail').value.trim();
    const password = document.getElementById('loginPassword').value;

    const user = users.find((user) => user.email === email);

    if (!user) {
        alert('Email not found. Please register.');
        return;
    }

    if (user.password !== password) {
        alert('Incorrect password!');
        return;
    }

    sessionStorage.setItem('loggedInUser', JSON.stringify(user));

    window.location.href = 'welcome.html';
});
