const phoneLoader = async (text) => {
    const url = `https://openapi.programming-hero.com/api/phones?search=${text}`
    const res = await fetch(url);
    const data = await res.json();
    phoneDisplay(data.data);
}
const phoneDisplay = phones => {
    const phoneContainer = document.getElementById('phone-container');
    phoneContainer.innerHTML = ``;
    phones = phones.slice(0, 10);
    const noFound = document.getElementById('no-found');
    if (phones.length === 0) {
        noFound.classList.remove('d-none');
    }
    else {
        noFound.classList.add('d-none');
        phones.forEach(phone => {
            const phoneDiv = document.createElement('div');
            phoneDiv.classList.add('col');
            phoneDiv.innerHTML = `
            <div class="card p-5">
                <img src="${phone.image}" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${phone.phone_name}</h5>
                     <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
            </div>
            `;
            phoneContainer.appendChild(phoneDiv);
        })
    }
    isSpining(false);
}
document.getElementById('btn-search').addEventListener('click', function () {
    const searchField = document.getElementById('search-field');
    const serachText = searchField.value;
    phoneLoader(serachText);
    searchField.value = '';
    isSpining(true);
})

const isSpining = spin =>{
    const spinField = document.getElementById('spin-field');
    if(spin)
    {
        spinField.classList.remove('d-none');
    }
    else{
        spinField.classList.add('d-none');
    }
}