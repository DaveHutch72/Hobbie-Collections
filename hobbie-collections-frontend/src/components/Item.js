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
        <a href="#" data-id="${this.id}">${this.name}</a>      |       ${this.owned ? "Owned" : "Not purchased...yet"}
        </li>
        <br>
        `
    }
}