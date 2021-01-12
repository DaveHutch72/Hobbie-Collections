const BASE_URL = 'http://localhost:3000'

window.addEventListener("DOMContentLoaded",() => {
    getHobbies()
})

function getHobbies() {
    let main = document.getElementById('main')
    fetch(BASE_URL + '/hobbies')
    .then(res => res.json)
    .then(hobbies => {
        console.log(hobbies)
    })
}