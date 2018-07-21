
// Constructer for class Pokemon.
class Pokemon {
    constructor(name, image, hp, attack, defense, abilities, type) {
        this.name = name;
        this.image = image;
        this.hp = hp;
        this.attack = attack;
        this.defense = defense;
        this.abilities = abilities;
        this.type = type;
    }
}

// Find value from search to pass into api.
document.getElementById("trainer-shahid").addEventListener("click", function(event) {
    let pokemons_shahid = ['combee', 'exeggutor', 'magneton'];
    for (let i = 0; i < 3; i++) {
        let search_value = pokemons_shahid[i];
         search(search_value);
    }
})
    

const search = (search_value) => {

    // Search value is the input which is name of pokemon.
    const search_by_name_link = 'https://pokeapi.co/api/v2/pokemon/' + search_value + '/';
    

    axios.get(search_by_name_link).then((pokemonReponse) => {

    //Axios request and assigning results.
        const data = pokemonReponse.data;
        // console.log(data);

        const name = data.name;
        const hp = data.stats[5].base_stat;
        const attack = data.stats[4].base_stat;
        const defense = data.stats[3].base_stat;

        const abilities_array = [];
        for (let i = 0; i < data.abilities.length; i++) {
          abilities_array.push(data.abilities[i].ability.name);
        }
        console.log(abilities_array);

        const types_array = [];
        for (let j = 0; j < data.types.length; j++) {
            types_array.push(data.types[j].type.name);
        }
        // Axios request for image
        const image_api = data.forms[0].url;
        axios.get(image_api).then((imageResponse) => {

            const data_img = imageResponse.data;
            image_link = data_img.sprites.front_default;


            // Creating instance of pokemon.
            const myPokemon = new Pokemon(
                name,
                image_link,
                hp,
                attack,
                defense,
                abilities_array,
                types_array,
            );

            displayPokemon(myPokemon);
        })     
    })
}



// Function to display a pokemon.
const displayPokemon = (pokemonToDisplay) => {
   
    let mainDiv = document.getElementById('information');
    let column = document.createElement("div");
    column.setAttribute('class', 'column');
    mainDiv.appendChild(column);


    let name_section = document.createElement('div');
    name_section.setAttribute('class', 'name');
    column.appendChild(name_section);
    name_section.innerHTML = pokemonToDisplay.name;
    console.log(name_section.innerHTML);

     let image_section = document.createElement('div');
    image_section.setAttribute('class', 'image');
    let pokeImage = document.createElement("img");
    pokeImage.setAttribute("src", pokemonToDisplay.image);
    // console.log(pokemonToDisplay.image)
    image_section.appendChild(pokeImage);
    column.appendChild(image_section);

    let hp_section = document.createElement('div');
    hp_section.setAttribute('class', 'hp');
    column.appendChild(hp_section);
    hp_section.innerHTML = pokemonToDisplay.hp;
    console.log(hp_section.innerHTML);

    let attack_section = document.createElement('div');
    attack_section.setAttribute('class', 'attack');
    column.appendChild(attack_section);
    attack_section.innerHTML = pokemonToDisplay.attack;
    console.log(attack_section.innerHTML);

    let defense_section = document.createElement('div');
    defense_section.setAttribute('class', 'defense');
    column.appendChild(defense_section);
    defense_section.innerHTML = pokemonToDisplay.defense;
    console.log(defense_section.innerHTML);


    let abilities_section = document.createElement('div');
    abilities_section.setAttribute('class', 'abilities');
    column.appendChild(abilities_section);
    abilities_section.innerHTML = pokemonToDisplay.abilities;


    let types_section = document.createElement('div');
    types_section.setAttribute('class', 'types');
    column.appendChild(types_section);
    types_section.innerHTML = pokemonToDisplay.type;
 


}

// Function to update pokemonc haracteristic.
const updateCharacteristic = (characteristicId, value) => {
    document.getElementById(characteristicId).getElementsByTagName('span')[0].innerText = value;
}



