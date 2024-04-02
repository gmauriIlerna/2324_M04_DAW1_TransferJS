const url = 'https://gmauriilerna.pythonanywhere.com';

function saveToFile() {
    var name = document.getElementById('username').value;
    var color = document.getElementById('color').value;

    var data = {
        username: name,
        color: color
    };

    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('File-Name', name);

    const requestOptions = {
    method: 'POST',
    headers: headers,
    body: JSON.stringify(data)
    };

    // Making the POST request
    fetch(url, requestOptions)
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
        })
    .then(data => {
        console.log(data);
    })
    .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
    });

    sessionStorage.setItem('file-Name', name);

    setTimeout(function(){
        window.location.href = 'second.html';
    }, 500);
}

function loadFromFile() {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('File-Name', sessionStorage.getItem('file-Name'));
    
    const requestOptions = {
      method: 'GET',
      headers: headers
    };
    
    fetch(url, requestOptions)
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
