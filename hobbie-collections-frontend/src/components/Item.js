class Item {
    constructor(data) {
        this.id = data.id
        this.name = data.name
        this.price = data.price
        this.owned = data.owned
        this.hobby = data.hobby
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
}