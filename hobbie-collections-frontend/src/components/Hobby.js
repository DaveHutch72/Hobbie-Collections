class Hobby {
    constructor(data) {
        this.id = data.id
        this.name = data.name
        this.items = data.items
    }

    renderHobbies() {
        return `
        <li>
            <a href="#" data-id="${this.id}">${this.name}</a>
        </li>
        <br>
        `
    }
    renderHobby() {
        return `
        <h4>${this.name}</h4>
        <br>
        <button type="button" id="add-item-form">Add Item</button>
        <br><br>
        `
        }
}