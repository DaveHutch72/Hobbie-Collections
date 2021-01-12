class ApiService {
    constructor(){
        this.baseURL = 'http://localhost:3000'
    }

    async fetchHobbies() {
        let response = await fetch(this.baseURL + '/hobbies')
        let data = await response.json()
        return data
    }


    // async fetchHobby() {
    //     let response = await fetch(this.baseURL + `/hobbies/${id}`)
    //     let data = await response.json()
    //     return data
    // }
}