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

const scriptURL = 'https://script.google.com/macros/s/AKfycbw2M-NV89YQpAlA1myLs2-BMYaEet_AJulxYWf2fKjqIof6xjLLyTvBn9HhkTo9IyuZeg/exec'

const form = document.forms['contact-form']

form.addEventListener('submit', e => {
  e.preventDefault()
  fetch(scriptURL, { method: 'POST', body: new FormData(form)})
  .then(response => alert("Thank you! your form is submitted successfully." ))
  .then(() => { window.location.reload(); })
  .catch(error => console.error('Error!', error.message))
})