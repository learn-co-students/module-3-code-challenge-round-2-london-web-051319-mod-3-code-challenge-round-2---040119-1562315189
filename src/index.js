const baseURL = 'http://localhost:3000/beers';
const beerList = document.getElementById('list-group');
const displayContainer = document.getElementById('beer-detail');

const fetchBeers = () => { //gets all beers
    fetch(baseURL)
        .then(res => res.json())
        // .then(beers => console.table(beers))
        .then(beers => {
            for (let i = 0; i < beers.length; i++) {
                listBeers(beers[i]);
            }
        })
}

const listBeers = (beer) => { //list beer names
    const listItem = document.createElement('li');
    listItem.classList.add('list-group-item', 'text-center')
    const beerBtn = document.createElement('button');
    beerBtn.classList.add('btn', 'btn-link');
    beerBtn.style.width = 'auto'
    beerBtn.innerText = beer.name;
    listItem.append(beerBtn);
    beerList.append(listItem);

    beerBtnClick(beer, beerBtn);
}

const beerBtnClick = (beer, button) => { //display functionality for each beer
    button.addEventListener('click', () => {
        // console.log('showing beer...');
        showBeer(beer);
    })
}

const showBeer = (beer) => { //display the beer clicked
    displayContainer.innerHTML = " ";

    const img = document.createElement('img');
    img.src = beer.image_url;

    const h5 = document.createElement('h5');
    h5.classList.add('card-title');
    h5.innerText = beer.name;

    const input = document.createElement('div');
    input.classList.add('input-group');

    const inputDiv = document.createElement('div');
    inputDiv.classList.add('input-group-prepend');

    const span = document.createElement('span');
    span.classList.add('input-group-text');
    span.innerText = 'Edit Description: '

    const description = document.createElement('textarea');
    description.classList.add('form-control');
    description.style.margin = '10px';
    description.style.height = '10rem';
    description.innerHTML = beer.description;

    const editBtn = document.createElement('button');
    editBtn.classList.add('btn', 'btn-primary', 'edit-btn');
    editBtn.innerText = 'Save';
    editBtn.style.margin = '15px';

    inputDiv.append(span);

    input.append(inputDiv, description);
    input.style.margin = '10px';
    displayContainer.append(h5, img, input, editBtn);

    editBtnClick(beer, editBtn, description);
}

const editBtnClick = (beer, editButton, description) => { //event listener to begin editing beer description
    editButton.addEventListener('click', (event) => {
        event.preventDefault();
        // console.log(description.value);
        editBeer(beer.id, description.value)     
    })
}

const editBeer = (id, newDescription) => { //makes the patch request
    return fetch(`${baseURL}/${id}`, {
        method: 'PATCH', 
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            'description': newDescription
        })
    })
    .then(res => res.json())
}


window.addEventListener('DOMContentLoaded', () => { //calls fetchBeer function when dom loads
    fetchBeers();
})