const poke_container = document.getElementById('poke-container');

// Generations
// const gen1 = document.querySelector('.gen1');
// const gen2 = document.querySelector('.gen2');
// const gen3 = document.querySelector('.gen3');
// const gen4 = document.querySelector('.gen4');
// const gen5 = document.querySelector('.gen5');
// const gen6 = document.querySelector('.gen6');
// const gen7 = document.querySelector('.gen7');
const genSelect = document.querySelectorAll('.gen');

const search = document.querySelector('.search');
const btn = document.querySelector('.btn');
const input = document.querySelector('.input');

let pokemon_count = 151;
let count_start = 1;
// const pokemon_count = 1;
const colors = {
	normal: 'rgba(168,168,120,0.8)',
	fire: 'rgba(240,128,48,0.8)',
	water: 'rgba(104,144,240,0.8)',
	grass: 'rgba(120,200,80,0.8)',
	electric: 'rgba(248,208,48,0.8)',
	ice: 'rgba(152, 216, 216, 0.8)',
	fighting: 'rgba(192,48,40,0.8)',
	poison: 'rgba(160,64,160,0.8)',
	ground: 'rgba(224,192,104,0.8)',
	flying: 'rgba(168,144,240,0.8)',
	psychic: 'rgba(248,88,136,0.8)',
	bug: 'rgba(168,184,32,0.8)',
	rock: 'rgba(184,160,56,0.8)',
	ghost: 'rgba(112, 88, 152, 0.8)',
	dark: 'rgba(112, 88, 72, 0.8)',
	dragon: 'rgba(112,56,248,0.8)',
	steel: 'rgba(184, 184, 208, 0.8)',
	fairy: 'rgba(240,182,188,0.8)',
};

const genNumbers = {
	1: 151,
	2: 251,
	3: 386,
	4: 493,
	5: 649,
	6: 721,
	7: 809,
};

function testFunction() {
	console.log('Hello I am test');
}

const main_types = Object.keys(colors);

const gen_number = Object.keys(genNumbers);

const fetchPokemons = async () => {
	for (let i = count_start; i <= pokemon_count; i++) {
		await getPokemon(i);
	}
};

const getPokemon = async (id) => {
	const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
	const res = await fetch(url);
	const data = await res.json();

	createPokemonCard(data);
};

const createPokemonCard = (pokemon) => {
	const pokemonEl = document.createElement('div');
	pokemonEl.classList.add('pokemon');

	const pokeName = pokemon.name[0].toUpperCase() + pokemon.name.slice(1);

	const pokeId = pokemon.id.toString().padStart(3, '0');

	const poke_types = pokemon.types.map((type) => type.type.name);
	const type = main_types.find((type) => poke_types.indexOf(type) > -1);

	let pokeType1 = '';
	let pokeType2 = '';
	let color1 = '';
	let color2 = '';

	if (poke_types.length > 1) {
		pokeType1 = poke_types[0];
		pokeType2 = poke_types[1];

		color1 = colors[pokeType1];
		color2 = colors[pokeType2];

		pokemonEl.style.background = `linear-gradient(50deg, ${color1} 50%, ${color2} 50%)`;
	} else {
		pokeType1 = poke_types[0];
		color1 = colors[type];
		pokemonEl.style.backgroundColor = color1;
	}

	const pokemonInnerHTML = `
                <div class="img-container">
					<img
						src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${
							pokemon.id
						}.png"
						alt="${pokeName}"
					/>
                </div>
				<div class="info">
					<span class="number">#${pokeId}</span>
					<h3 class="name">${pokeName}</h3>
                    ${
											poke_types.length > 1
												? `<small class="types">Types: <span>${pokeType1} ${pokeType2}</span></small>`
												: `<small class="type">Type: <span>${pokeType1}</span></small>`
										}
				</div>
    `;

	pokemonEl.innerHTML = pokemonInnerHTML;

	poke_container.appendChild(pokemonEl);
};

fetchPokemons();
// window.onload = fetchPokemons();

btn.addEventListener('click', () => {
	search.classList.toggle('active');
	input.focus();
});
