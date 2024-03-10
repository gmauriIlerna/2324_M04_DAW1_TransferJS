function saveToFile() {
    var name = document.getElementById('username').value;
    var color = document.getElementById('color').value;

    var data = {
        username: name,
        color: color
    };

    var jsonData = JSON.stringify(data);

    var blob = new Blob([jsonData], { type: 'application/json' });

    var a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'data.json';

    document.body.appendChild(a);
    a.click();

    document.body.removeChild(a);

    setTimeout(function(){
        window.location.href = 'second.html';
    }, 500);
}

function loadFromFile() {
    fetch('data.json')
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        var username = data.username;
        var color = data.color;

        console.log(username);
        console.log(color);

        document.getElementById('usernameDisplay').textContent = username;

        document.body.style.backgroundColor = color;
    })
    .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
    });
}