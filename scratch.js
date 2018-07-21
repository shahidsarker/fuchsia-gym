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
        this.pokemonArray = [];
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
            // axios.get(`https://pokeapi-nycda.firebaseio.com/pokemon/${id}.json`).then((response) => {
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

        })
        

    }
    display(){
        //shows trainer on page
    }
}

class Gym {
    constructor(name) {
        this.name = name;
        this.trainerContainer = {};
    }
    add(trainerObject) {
        return this.trainerContainer.trainer = trainerObject;
    }
    show(trainer){
        // function that takes the trainer and displays it on the page
        console.log(this.trainerContainer.trainer)
    }
}



let shahid = new Trainer("shahid")

let fuchsia = new Gym("fuchsia")
fuchsia.add(shahid)
