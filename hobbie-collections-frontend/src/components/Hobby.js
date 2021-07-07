
class Hobby {
    constructor(data) {
        if (data) {
            this.id = data.id
            this.name = data.name
            this.items = data.items.map(item => new Item(item));
        }
    }

    attachClicks(id) {
        const hobbyItems = document.querySelectorAll("li a.hobby-list-item")
        hobbyItems.forEach(h => {
            h.addEventListener('click', (e) => this.displayHobby(e, id))
        })
    }
    
    async createHobby(e) {
        e.preventDefault()
        let hobby = {
            name: e.target.querySelector("#name").value
        }
        let data = await apiService.fetchAddHobby(hobby)
        let newHobby = new Hobby(data)
        newHobby.renderHobby('main', true)
    }



    removeForm() {
        let formDivHobby = document.querySelector("#new-hobby-form")
        formDivHobby.innerHTML = ""
    }
    
    renderNewHobbyForm(id) {
        document.getElementById(id).innerHTML = `
        <form>
            <label>Create New Hobby Type:</label>
            <input type="text" id="name"><br><br>
            <input type="submit">
        </form
        `
        document.querySelector('form').addEventListener('submit', this.createHobby)
    }

    async displayHobby(e, elementId) {
        let id = e.target.dataset.id
        const data = await apiService.fetchHobby(id)
        const hob = new Hobby(data)
        hob.renderHobbyDetails('main')
        document.getElementById('add-item-form').addEventListener('click', () => new Item().renderAddItemToHobby(id))
        this.attachClicks()
    }

    renderHobby(id, clear = false) {
        const element = document.getElementById(id)
        this.removeForm()

        if (clear) {
            element.innerHTML = ''
        }
        element.innerHTML += `
        <li>
            <a href="#" class='hobby-list-item' data-id="${this.id}">${this.name}</a>
        </li>
        <br>
        `
        this.attachClicks(id)
    }

    renderHobbyDetails(id) {
        const element = document.getElementById(id)
        element.innerHTML = ''
        element.innerHTML = `
        <h4>${this.name}</h4>
        <br>
        <button type="button" id="add-item-form">Add Item</button>
        <div id="hobby-details-items"></div>
        <br><br>
        `;
        if (this.items) {
            this.items.forEach(item => {
                element.innerHTML += item.render()
            })
            this.items[0].attachHobbyItemClicks(id)
        }
    }
}

class Hobbies {
    constructor(data) {
        this.hobbiesArr = data.map(item => new Hobby(item));
    }

    renderHobbies(id, length = null) {
        const element = document.getElementById(id)
        element.innerHTML = ''
        if (length !== null) {
            const hobbShort = this.hobbiesArr.filter(h => h.name.length < length)
            hobbShort.map(h => {
                h.renderHobby(id)
            })
        } else {
            this.hobbiesArr.forEach(hobby => {
                hobby.renderHobby(id)
            })
        }
    }
    
}