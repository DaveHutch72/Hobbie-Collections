const apiService = new ApiService()
let main = document.getElementById('main')

const init = () => {
    addEventListeners()
    renderHobbies()
}

function addEventListeners() {
    document.getElementById('hobbies').addEventListener('click', renderHobbies)
}

async function renderHobbies() {
    const hobb = await apiService.fetchHobbies()
    main.innerHTML = ''
    hobb.map(h => {
        const newHobby = new Hobby(h) 
        main.innerHTML += newHobby.renderHobbies()
    })
}

init()