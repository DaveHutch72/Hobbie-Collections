const apiService = new ApiService()
let main = document.getElementById('main')

const init = () => {
    addEventListeners()
    renderHobbies()
}

function addEventListeners() {
    document.getElementById('hobbies').addEventListener('click', renderHobbies)
    document.getElementById('hobby-form').addEventListener('click', displayCreateHobbyForm)
}

async function renderHobbies() {
    main.innerHTML = ''
    const hobb = await apiService.fetchHobbies()
    hobb.map(h => {
        const newHobby = new Hobby(h) 
        main.innerHTML += newHobby.renderHobbies()
    })
}

function displayCreateHobbyForm() {
    main.innerHTML = ""
    let formDiv = document.querySelector("#new-hobby-form")
    let html = `
    <form>
        <label>Create New Hobby Type:</label>
        <input type="text" id="name"><br><br>
        <input type="submit">
    </form
    `
    formDiv.innerHTML = html
    document.querySelector('form').addEventListener('submit', createHobby)
}

async function createHobby(e) {
    e.preventDefault()
    let main = document.getElementById("main")
    let hobby = {
        name: e.target.querySelector("#name").value
    }
    let data = await apiService.fetchAddHobby(hobby)
    let newHobby = new Hobby(data)
    main.innerHTML += newHobby.renderHobbies()
    attachClicksHobby()
}

function attachClicksHobby() {
    const hobbies = document.querySelectorAll("li a")
    hobbies.forEach(h => {
        h.addEventListener('click', displayHobby)
    })
}

async function displayHobby(e) {
    let id = e.target.dataset.id
    const data = await apiService.fetchHobby(id)
    const hob = new Library(data)
    main.innerHTML = hob.renderHobby()
    if (hob.items) {
        hob.items.forEach(item => {
        main.innerHTML += `
        <li><a href="#" data-id="${item.id}">${item.title}</a></li>
        <br>
        `
        })
    }
    document.getElementById('add-item-form').addEventListener('click', () => displayCreateForm(id))
}

init()