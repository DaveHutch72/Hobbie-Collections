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

async function renderHobbies() {
    const hob = await apiService.fetchHobbies()
    main.innerHTML = ""
    hobb.map(hob => {
        //add Hobbie class
    })
}