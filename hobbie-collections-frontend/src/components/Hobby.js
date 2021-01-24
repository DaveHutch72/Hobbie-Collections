
class Hobby {
    constructor(data) {
        this.id = data.id
        this.name = data.name
        this.items = data.items.map(item => new Item(item));
    }

    attachClicks(id) {
        const hobbyItems = document.querySelectorAll("li a.hobby-list-item")
        hobbyItems.forEach(h => {
            h.addEventListener('click', (e) => this.displayHobby(e, id))
        })
    }
    async displayHobby(e, elementId) {
        let id = e.target.dataset.id
        const data = await apiService.fetchHobby(id)
        const hob = new Hobby(data)
        hob.renderHobbyDetails('main')
        document.getElementById('add-item-form').addEventListener('click', () => addItemToHobby(elementId))
        this.attachClicks()
    }


    

    renderHobby(id, clear = false) {
        const element = document.getElementById(id)
        if (clear) {
            element.innerHTML = ''
        }
        element.innerHTML += `
        <li>
            <a href="#" class='hobby-list-item' data-id="${this.id}">${this.name}</a>
        </li>
        <br>
        `
        this.attachClicks(id)//transfer to Item in diff form
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