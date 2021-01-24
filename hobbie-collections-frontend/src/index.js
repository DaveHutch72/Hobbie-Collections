const apiService = new ApiService()
const mainDivId = 'main';
let main = document.getElementById(mainDivId)
let hobbies = null;
const init = () => {
    addEventListeners()
    renderHobbies()
}


function addEventListeners() {
    document.getElementById('hobbies').addEventListener('click', renderHobbies)
    document.getElementById('hobby-form').addEventListener('click', displayCreateHobbyForm)
    document.getElementById('shorten').addEventListener('click', renderHobbiesShort)
}

function resetInnerHtml(id) {
    document.getElementById(id).innerHTML = '';
}

async function getHobbies() {
    const hobb = await apiService.fetchHobbies()
    hobbies = new Hobbies(hobb)
}

async function renderHobbies() {
    if (hobbies === null) {
        await getHobbies()
    }
    hobbies.renderHobbies(mainDivId)
}

async function renderHobbiesShort() {
    resetInnerHtml(mainDivId)
    if (hobbies === null) {
        await getHobbies()
    }
    hobbies.renderHobbies(mainDivId, 5)
}

function displayCreateHobbyForm() {
    resetInnerHtml(mainDivId)
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
    newHobby.renderHobby(mainDivId, true)
    removeForm()
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
    formDiv.innerHTML = html
    document.querySelector('form').addEventListener('submit', addItem)
}

async function addItem(e) {
    e.preventDefault()
    let main = document.getElementById("main")
    let item = {
        hobby_id: e.target.querySelector("#hobby-id").value,
        name: e.target.querySelector("#name").value,
        price: e.target.querySelector("#price").value,
        owned: e.target.querySelector("#owned").checked
    }
    let data = await apiService.fetchAddItem(item)
    let newItem = new Item(data)
    main.innerHTML += newItem.render()
    attachClicks()
    removeForm()
}

function removeForm() {
    let formDiv = document.querySelector("#new-item-form")
    let formDivHobby = document.querySelector("#new-hobby-form")
    formDiv.innerHTML = ""
    formDivHobby.innerHTML = ""
}

init()