// Show/Hide Forms
document.getElementById('register-link').addEventListener('click', () => {
  document.getElementById('login-section').style.display = 'none';
  document.getElementById('register-section').style.display = 'block';
});

document.getElementById('login-link').addEventListener('click', () => {
  document.getElementById('register-section').style.display = 'none';
  document.getElementById('login-section').style.display = 'block';
});

// User Registration
document.getElementById('register-form').addEventListener('submit', async (e) => {
  e.preventDefault();

  const username = document.getElementById('reg-username').value;
  const password = document.getElementById('reg-password').value;
  const role = document.getElementById('reg-role').value;

  try {
    const response = await fetch('http://localhost:5001/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password, role }),
    });

    if (response.ok) {
      alert('Registration successful! Please log in.');
      document.getElementById('register-section').style.display = 'none';
      document.getElementById('login-section').style.display = 'block';
    } else {
      const data = await response.json();
      alert(data.message);
    }
  } catch (error) {
    console.error('Error during registration:', error);
  }
});

// User Login
document.getElementById('login-form').addEventListener('submit', async (e) => {
  e.preventDefault();

  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  try {
    const response = await fetch('http://localhost:5001/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json();

    if (response.ok) {
      localStorage.setItem('token', data.token);
      localStorage.setItem('role', data.role);
      alert('Login successful');
      document.getElementById('login-section').style.display = 'none';
      document.getElementById('dashboard-section').style.display = 'block';
      loadFiles();
    } else {
      alert(data.message);
    }
  } catch (error) {
    console.error('Error during login:', error);
  }
});

// User Logout
document.getElementById('logout-button').addEventListener('click', () => {
  localStorage.removeItem('token');
  localStorage.removeItem('role');
  alert('Logged out');
  document.getElementById('dashboard-section').style.display = 'none';
  document.getElementById('login-section').style.display = 'block';
});
