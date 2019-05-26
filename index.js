const ul = document.getElementById('pokemons');
const url = 'https://pokeapi.co/api/v2/';
var num = 0;

function createPok(num){
	fetch(url+'pokemon?offset='+num+'&limit=12')
	.then((resp) => resp.json())
	.then(function(data) {	
		let pokemonsDetails = data.results.map(function(pokem){
	    return fetch(pokem.url).then((res) => res.json());
	    
	  })
	  return Promise.all(pokemonsDetails)
	})
	.then(data => {
	  // allPokemons = allPokemons.concat(pokemons);
	  // console.log(data);
	  const containerPoks = document.querySelector('.poks');	  
	  
	  data.forEach(item => {
	  	const container = document.createElement('div');
	  	container.classList.add('pokemonCard')
	  	const img = document.createElement('img');
	  	img.src = item.sprites.front_default;
	  	container.append(img);
	  	const elements = document.createElement('div');
		  elements.innerHTML = `
				<h3>${item.name}</h3>
				<h4>${item.types[0].type.name}</h4>			
		  `
		  container.append(elements)
		  containerPoks.append(container)
	  });
	});
};

createPok();

const loadPokems = () => {
	// num = num + 12;
	// return num;

	createPok(num+12);
}
console.log(num)


document.addEventListener('DOMContentLoaded', () => {
	const loadBtn = document.querySelector('.load');
	loadBtn.addEventListener('click',loadPokems);
})
