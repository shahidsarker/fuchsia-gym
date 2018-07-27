class Gym {
    constructor(name) {
        this.name = name;
        this.trainerContainer = {};
    }
    add(trainerObject) {
        this.trainerContainer[trainerObject.trainerName] = trainerObject;
    }
    show(trainer) {
        // function that takes the trainer and displays it on the page
        console.log(this.trainerContainer)
        console.log(this.trainerContainer[`${trainer}`])
        let trainerPokemonArray = Object.values(this.trainerContainer[`${trainer}`].trainerPokemon)

        for (let i = 0; i < trainerPokemonArray.length; i++) {
            let trainerDiv = document.getElementById(`${trainer}-pokemon-${i}`)
            let pokemonName = document.createElement("h4")
            pokemonName.innerHTML = `${trainerPokemonArray[i].name}`
            pokemonName.classList.add("text-capitalize")
            trainerDiv.appendChild(pokemonName)
            let pokeImage = document.createElement("img")
            pokeImage.setAttribute("src", trainerPokemonArray[i].frontURL)
            trainerDiv.appendChild(pokeImage)
            let pokeStatList = document.createElement("ul")
            trainerDiv.appendChild(pokeStatList)
            pokeStatList.innerHTML = `<li>HP: ${trainerPokemonArray[i].hp}</li><li>Attack: ${trainerPokemonArray[i].attack}</li><li>Defense: ${trainerPokemonArray[i].defense}</li><li>Abilities: ${trainerPokemonArray[i].ability[0]}</li><li>Type: ${trainerPokemonArray[i].types}</li><br />`
        }
    }
}

let fuchsia = new Gym("fuchsia");

class Pokemon {
    constructor(name, pokeId, hp, attack, defense, frontURL) {
        this.name = name;
        this.pokeId = pokeId;
        this.hp = hp;
        this.attack = attack;
        this.defense = defense;
        this.frontURL = frontURL;
        this.ability = [];
        this.types = [];
    }
}

class Trainer {
    constructor(trainerName) {
        this.trainerName = trainerName;
        this.trainerPokemon = {};
        // this.pokemonArray = [];
    }
    all() {
        return Object.values(this.trainerPokemon)
    }
    get(name) {
        return this.trainerPokemon[name]
    }
    add(id) {
        // toggle between two APIs based on availability
        //      pokeapi request (works with name or id of pokemon)
        axios.get(`https://pokeapi.co/api/v2/pokemon/${id}/`).then((response) => {
        //      NYCDA-specific api (works with id only)
//         axios.get(`https://pokeapi-nycda.firebaseio.com/pokemon/${id}.json`).then((response) => {
            let pokedata = response.data
            let pokeName = pokedata.name;
            let pokeId = pokedata.id;
            let pokeHp = pokedata.stats[5].base_stat;
            let pokeAtt = pokedata.stats[4].base_stat;
            let pokeDef = pokedata.stats[3].base_stat;
            let pokeFrontURL = pokedata.sprites.front_default
            let pokeTypesArray = pokedata.types;

            let pokemonObject = new Pokemon(pokeName, pokeId, pokeHp, pokeAtt, pokeDef, pokeFrontURL)
            // pushes abilities to pokemonObject
            pokedata.abilities.forEach(element => {
                pokemonObject.ability.push((element.ability.name))
            });

            pokeTypesArray.forEach(element => {
                pokemonObject.types.push((element.type.name))
            });

            this.trainerPokemon[pokemonObject.name] = pokemonObject;

        }).then(() => {
            if (this.all().length === 3) {
                fuchsia.show(`${this.trainerName}`)

            }

        })


    }
}

let shahid = new Trainer("shahid")
shahid.add(150)
shahid.add(129)
shahid.add(126)

let mary = new Trainer("mary")
mary.add(415)
mary.add(82)
mary.add(103)

let sharna = new Trainer("sharna")
sharna.add(94)
sharna.add(151)
sharna.add(35)

let noly = new Trainer("noly")
noly.add(69)
noly.add(4)
noly.add(17)

fuchsia.add(shahid)
fuchsia.add(mary)
fuchsia.add(sharna)
fuchsia.add(noly)
