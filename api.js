fetch('https://rickandmortyapi.com/api/character')
  .then(response => response.json())
  .then(response => {
    const characters = response.results

    function makeCharacter(character){
      const container = document.createElement("div")
      container.id = "container"
  
      const img = document.createElement("img")
      img.id = "img-container"
      img.src = character.image
      img.alt = character.name
  
      const name= document.createElement("h2")
      name.textContent = character.name
  
      const status = document.createElement("h3")
      status.textContent = `Status: ${character.status}`
  
      const specie = document.createElement("h4")
      specie.textContent = `Species: ${character.species}`
  
      container.appendChild(img)
      container.appendChild(name)
      container.appendChild(status)
      container.appendChild(specie)
  
      document.querySelector("main").appendChild(container)
    }
    function printCharacters() {
      characters.forEach(character => {
        makeCharacter(character)
      });
    }
    printCharacters()
  })
  .catch(err => console.error(err));