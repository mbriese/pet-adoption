const template = document.querySelector('#pet-card-template')
const wrapper = document.createDocumentFragment()

async function start() {
    const weatherPromise = await fetch("https://api.weather.gov/gridpoints/MFL/110,50/forecast")
    const weatherData = await weatherPromise.json()
    ourTemperature = weatherData.properties.periods[0].temperature;
    document.querySelector("#temperature-output").textContent = ourTemperature
}

start().then()

async function petsArea() {
    const petsPromise = await fetch("https://learnwebcode.github.io/bootcamp-pet-data/pets.json")
    const petsData = await petsPromise.json()
    petsData.forEach(pet => {
        const petCardClone = template.content.cloneNode(true)

        petCardClone.querySelector(".pet-card").dataset.species = pet.species

        petCardClone.querySelector("h3").textContent = pet.name
        petCardClone.querySelector(".pet-description").textContent = pet.description
        petCardClone.querySelector(".pet-age").textContent = createAgeText(pet.birthYear)
        if (!pet.photo) pet.photo = "images/fallback.jpg"
        petCardClone.querySelector(".pet-card-photo img").src = pet.photo
        console.log(pet.name)
        petCardClone.querySelector(".pet-card-photo img").alt = `A ${pet.species} named ${pet.name}`
        wrapper.appendChild(petCardClone)
    })
    document.querySelector(".list-of-pets").appendChild(wrapper)
}

petsArea().then()

function createAgeText(birthYear) {
    const currentYear = new Date().getFullYear()
    const age = currentYear - birthYear

    if (age === 0)
        return "less than 1 year old"
    if (age === 1)
        return "1 year old"
    return `${age} years old`
}

// pet filter button code
const allButtons = document.querySelectorAll(".pet-filter button")
allButtons.forEach(el => {
    el.addEventListener("click", handleButtonClick)
})

function handleButtonClick(e) {
    // remove the active class from all the buttons
    allButtons.forEach(el => el.classList.remove("active"))
    // add the active class to the clicked button
    e.target.classList.add("active")
    // filter on the name pet species
    const currentFilter = e.target.dataset.filter
    document.querySelectorAll(".pet-card").forEach(el => {
        if (currentFilter == el.dataset.species || currentFilter == "all") {
            el.style.display = "grid"
        } else {
            el.style.display = "none"
        }
    })
}