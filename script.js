//seleccionamos los data del archivo html con querySelector
const pokeCard = document.querySelector('[data-poke-card]');
const pokeName = document.querySelector('[data-poke-name]');
const pokeImg  = document.querySelector('[data-poke-img]');
const pokeImgContainer = document.querySelector('[data-poke-img-container]');
const pokeId = document.querySelector('[data-poke-id]');
const pokeTypes = document.querySelector('[data-poke-types]');
const pokeStats = document.querySelector('[data-poke-stats]');

//funcion de busqueda, cuando el usuario coloque el nombre del pokemon en la barra de busqieda
const searchPokemon = event => {
    event.preventDefault(); // Evita el envío o "submit" del formulario si los datos no son válidos
    const { value } = event.target.pokemon; //obtenemos el valor del input name="pokemon"
    fetch(`https://pokeapi.co/api/v2/pokemon/${value.toLowerCase()}`) //api que vamos a usar + el nombre del pokemon, el tolowerCase se usa para tener en cuanta si estan ingresando letras en mayus o minus,
        //obtener la response
        .then(data => data.json())
        .then(response => renderPokemonData(response))
        .catch(err => renderNotFound()) //usamos una funcion renderNotFound para mostrar que hay error y no se encontró el  pokemon
     
}

const renderPokemonData = data => {
    const sprite = data.sprites.front_default;
    const {stats, types } = data;
    console.log(data)

    pokeName.textContent = data.name;
    pokeImg.setAttribute('src', sprite);
    pokeId.textContent = `N° ${data.id}`;
    renderPokemonTypes(types);
    renderPokemonStats(stats);
    
}


const renderPokemonTypes = types => {
    pokeTypes.innerHTML = '';
    types.forEach(type => {
        const typeTextElement = document.createElement("div");
        typeTextElement.style = type.type.name;
        typeTextElement.textContent = type.type.name;
        pokeTypes.appendChild(typeTextElement);
    });
}

const renderPokemonStats = stats => {
    pokeStats.innerHTML = '';// borramos la busqueda anterior
    stats.forEach(stat => {
        const statElement = document.createElement("div");
        const statElementName = document.createElement("div");
        const statElementAmount = document.createElement("div");
        statElementName.textContent = stat.stat.name;
        statElementAmount.textContent = stat.base_stat;
        statElement.appendChild(statElementName);
        statElement.appendChild(statElementAmount);
        pokeStats.appendChild(statElement);

    });
}

//funcion de error
const renderNotFound = () => {
    pokeName.textContent = 'No Encontrado';
    pokeImg.setAttribute('src', 'poke-shadow.png');
    pokeImg.style.background = '#fff';
    pokeTypes.innerHTML = '';
    pokeStats.innerHTML = '';
    pokeId.innerHTML = '';

}