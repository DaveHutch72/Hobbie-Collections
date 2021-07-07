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
    let tempHobby = new Hobby()
    tempHobby.renderNewHobbyForm('new-hobby-form')
}

init()
