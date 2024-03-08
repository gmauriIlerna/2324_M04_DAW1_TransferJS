function saveData() {
    var username = document.getElementById('username').value;
    var color = document.getElementById('color').value;

    sessionStorage.setItem('username', username);
    sessionStorage.setItem('color', color);

    window.location.href = 'second.html';
}

function loadData() {
    var username = sessionStorage.getItem('username');
    var color = sessionStorage.getItem('color');


    document.getElementById('usernameDisplay').textContent = username;


    document.body.style.backgroundColor = color;
}