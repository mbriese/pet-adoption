const template = document.querySelector('#pet-card-template')
const wrapper = document.createDocumentFragment()

async function start() {
    const weatherPromise = await fetch("https://api.weather.gov/gridpoints/MFL/110,50/forecast")
    const weatherData = await weatherPromise.json()
    ourTemperature = weatherData.properties.periods[0].temperature;
    document.querySelector("#temperature-output").textContent = ourTemperature
}

start().then()

async function  petsArea() {
const petsPromise = await fetch("https://learnwebcode.github.io/bootcamp-pet-data/pets.json")
    const petsData = await petsPromise.json()
    petsData.forEach(pet => {
        const petCardClone = template.content.cloneNode(true)
        petCardClone.querySelector("h3").textContent = pet.name

        wrapper.appendChild(petCardClone)
    })
    document.querySelector(".list-of-pets").appendChild(wrapper)
}

petsArea().then()