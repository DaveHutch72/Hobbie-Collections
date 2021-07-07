class Item {
    constructor(data) {
        if (data) {
            this.id = data.id
            this.name = data.name
            this.price = data.price
            this.owned = data.owned
            this.hobby = data.hobby
        }
    }

    render() {
        return `
        <li>
        <a href="#" class='hobby-item-item' data-id="${this.id}">${this.name}</a>      |       ${this.owned ? "Owned" : "Not purchased...yet"}
        </li>
        <br>
        `
    }

    renderItem() {
        return `
        <h4>${this.name}</h4>
        <p>Cost: $${this.price}</p><br>
        <p>${this.name} is in your ${this.hobby.name} category</p><br>
        <p>${this.owned ? "Owned" : "Not owned...yet"}<br>
        `
    }

    async displayItem(e, elementId) {
        let id = e.target.dataset.id
        const data = await apiService.fetchItem(id)
        const item = new Item(data)
        document.getElementById(elementId).innerHTML = item.renderItem()
    }

    attachHobbyItemClicks(id) {
        const hobbyItems = document.querySelectorAll("li a.hobby-item-item")
        hobbyItems.forEach(h => {
            h.addEventListener('click', (e) => this.displayItem(e, id))
        })
    }//
    
    renderAddItemToHobby(id) {
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
        document.querySelector('form').addEventListener('submit', this.addItem)
    }

    removeItemForm() {
        let formDiv = document.querySelector("#new-item-form")
        formDiv.innerHTML = ""
    }

    async addItem(e) {
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
        newItem.attachHobbyItemClicks('main')
        newItem.removeItemForm()
    }
}