// const BASE_URL = 'http://localhost:3000'

// window.addEventListener("DOMContentLoaded",() => {
//     getHobbies()
// })

const apiService = new ApiService()
let main = document.getElementById('main')

const init = () => {
    addEventListeners()
}

function addEventListeners() {
    document.getElementById('hobbies').addEventListener('click', renderHobbies)
}

function renderHobbies() {
    let main = document.getElementById('main')
    fetch(BASE_URL + '/hobbies')
    .then(res => res.json)
    .then(hobbies => {
        console.log(hobbies)
    })
}