import { createClient } from 'pexels';

const client = createClient('W51detNdues2RsdrwvjZRLsnk7xdAwp7zmwRnM4u9ORQHqi4s8VxuBmX');

let query = document.getElementById('firstname').value;

let button = document.getElementById('button2');
let result = document.getElementById('result');

button.onclick = function() {
    query = document.getElementById('firstname').value;
    client.photos.search({ query, per_page: 8 }).then(photos => {
        result.innerHTML = photos.photos.map(photo => `<img src="${photo.src.medium}">`).join('');
    });
};