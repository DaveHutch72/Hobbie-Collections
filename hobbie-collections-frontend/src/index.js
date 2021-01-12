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
    attachClicksHobby()
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

function attachClicks() {
    const items = document.querySelectorAll("li a")
    items.forEach(item => {
        item.addEventListener('click', displayItem)
    })
}

function addItemToHobby(id) {
    main.innerHTML = ""
    document.getElementById("new-hobby-form").innerHTML = ''
    let formDiv = document.querySelector("#new-item-form")
    let html = `
    <form>
    <input type="hidden" id="hobby-id" value="${id}">
    <label>Name of Item: </label>
    <input type="text" id="name"><br><br>
    <label>Price: </label>
    <input type="integer" id="price"><br><br>
    <label>Do you own it? </label>
    <input type="checkbox" id="owned"><br><br>
    <input type="submit">
    </form>
    `
    form.innerHTML = html
    document.querySelector('form').addEventListener('submit', addItem)
}

async function displayHobby(e) {
    let id = e.target.dataset.id
    const data = await apiService.fetchHobby(id)
    const hob = new Hobby(data)
    main.innerHTML = hob.renderHobby()
    if (hob.items) {
        hob.items.forEach(item => {
        main.innerHTML += `
        <li><a href="#" data-id="${item.id}">${item.name}</a></li>
        <br>
        `
        })
    }
    document.getElementById('add-item-form').addEventListener('click', () => addItemToHobby(id))
}

init()