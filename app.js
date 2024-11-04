// import { characters } from "./data"

// import { characters } from "./data.js"

// window.addEventListener("DOMContentLoaded", printCharacters(characters))
const name_input = document.getElementById("name_input")
const status_input = document.getElementById("status_input")
const species_input = document.getElementById("species_input")
const name_check = document.getElementById("name_check")
const species_check = document.getElementById("species_check")
const status_check = document.getElementById("status_check")
const btn_next  = document.getElementById("btn_next")
const btn_previous  = document.getElementById("btn_previous")
const url = "https://rickandmortyapi.com/api/character"

name_input.addEventListener("input", ()=> search())
species_input.addEventListener("input", ()=> search())
status_input.addEventListener("input", ()=> search())
name_check.addEventListener("change", search)
species_check.addEventListener("change", search)
status_check.addEventListener("change", search)

let currentPage = 1
let isFetching = false 

async function search(page = 1) {
    if (isFetching) return 
    isFetching = true 

    const main = document.querySelector("main")
    main.innerHTML = "" 
    let search = ""

    if (name_check.checked && name_input.value) {
        search += `name=${name_input.value}&`
    }
    if (species_check.checked && species_input.value) {
        search += `species=${species_input.value}&`
    }
    if (status_check.checked && status_input.value) {
        search += `status=${status_input.value}&`
    }

    search += `page=${page}&`
    const NewURL = `${url}/?${search.slice(0, -1)}`
    console.log(NewURL)

    await getCharacter(NewURL)  
    isFetching = false 
}

const makeCharacter = (character) => { 
    const container = document.createElement("div")
    container.id = "container"

    const imgCharacter = document.createElement("img")
    imgCharacter.id = "img-container"
    imgCharacter.src = character.image
    imgCharacter.alt = character.name

    const name= document.createElement("h2")
    name.textContent = character.name

    const status = document.createElement("h3")
    status.textContent = `Status: ${character.status}`

    const specie = document.createElement("h4")
    specie.textContent = `Species: ${character.species}`

    container.appendChild(imgCharacter)
    container.appendChild(name)
    container.appendChild(status)
    container.appendChild(specie)

    document.querySelector("main").appendChild(container)
}

const getCharacter = async (URL) => {
    try {
        const response = await fetch(URL)
        if (!response.ok) {
            throw new Error("error for get data from api")
        }
        const data = await response.json()
        if (data.results && data.results.length) {
            printCharacters(data.results)
            showPagination(data.info)
        } else {
            document.querySelector("main").innerHTML = "characters not found"
        }
    } catch (error) {
        console.error("error in search:", error)
        document.querySelector("main").innerHTML = "error for get data about characters"
    }
}

const printCharacters = (characters) => {
    characters.forEach(character => makeCharacter(character))
}

// function getCharacter (URL){
//     fetch(URL)
//     .then(Response => Response.json())
//     .then( data => console.log(data.results))
// }

function showPagination(info) {
    btn_previous.style.display = info.prev ? "inline-block" : "none"
    btn_next.style.display = info.next ? "inline-block" : "none"
}

btn_previous.addEventListener("click", () => {
    if (currentPage > 1) {
        currentPage--
        search(currentPage)
    }
})

btn_next.addEventListener("click", () => {
    currentPage++
    search(currentPage)
})

search(currentPage)