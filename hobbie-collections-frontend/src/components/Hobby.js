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

}