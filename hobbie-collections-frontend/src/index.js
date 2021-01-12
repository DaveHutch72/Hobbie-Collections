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
        name: e.target.querySelector("name").value
    }
    let data = await apiService.fetchAddHobby(hobby)
    let newHobby = new Hobby(data)
    main.innerHTML += newHobby.renderHobbies()
    attachClicksHobby()
}

init()