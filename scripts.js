const url = 'http://192.168.1.69:5000';

function saveToFile() {
    var name = document.getElementById('username').value;
    var color = document.getElementById('color').value;

    var data = {
        username: name,
        color: color
    };

    // Headers to be sent with the request
    const headers = new Headers();
    headers.append('Content-Type', 'application/json'); // Example header
    headers.append('File-Name', name); // Another example header

    // Configuration for the fetch request
    const requestOptions = {
    method: 'POST',
    headers: headers,
    body: JSON.stringify(data) // Convert data to JSON string
    };

    // Making the POST request
    fetch(url, requestOptions)
    .then(response => {
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json(); // Assuming response is JSON
    })
    .then(data => {
    // Handle the response data
    console.log(data);
    })
    .catch(error => {
    // Handle errors
    console.error('There was a problem with the fetch operation:', error);
    });

    sessionStorage.setItem('file-Name', name);

    setTimeout(function(){
        window.location.href = 'second.html';
    }, 200);
}

function loadFromFile() {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('File-Name', sessionStorage.getItem('file-Name')); // Adding custom header
    
    // Configuration for the fetch request
    const requestOptions = {
      method: 'GET',
      headers: headers
    };
    
    // Making the GET request
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
