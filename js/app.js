// call api for get searching data
const phoneLoader = async (text,dataLimit) => {
    const url = `https://openapi.programming-hero.com/api/phones?search=${text}`
    const res = await fetch(url);
    const data = await res.json();
    phoneDisplay(data.data,dataLimit);
}
// call api for get phone details data
const loadDetails = async id =>
{
    const url2 = ` https://openapi.programming-hero.com/api/phone/${id}`
    const res = await fetch(url2)
    const data = await res.json()
    displayPhoneDetails(data.data);
}
// this function display phone details 
const displayPhoneDetails = details =>{
    // console.log(details);
    const modalTitle = document.getElementById('staticBackdropLabel');
    modalTitle.innerText = details.name;
    const detailsDiv = document.getElementById('details-div');
    detailsDiv.innerHTML=`
    <p><b>Brand :</b>${details.brand} </p>
    <p><b>Release Date :</b>${details.releaseDate ? details.releaseDate : 'No release date'}</p>
    <p><b>Chipset :</b>${details.mainFeatures ? details.mainFeatures.chipSet : 'No chipset'}</p>
    <p><b>Display Size :</b>${details.mainFeatures ? details.mainFeatures.displaySize : 'No display size'}</p>
    <p><b>Memory :</b>${details.mainFeatures ? details.mainFeatures.memory : 'No memory'}</p>
    <p><b>Storage :</b>${details.mainFeatures ? details.mainFeatures.storage : 'No storage'}</p>
    `;
}
// this function display phone 
const phoneDisplay = (phones,dataLimit) => {
    const phoneContainer = document.getElementById('phone-container');
    const showField = document.getElementById('show-field');
    phoneContainer.innerHTML = ``;
    if (dataLimit && phones.length > 10) {
         phones = phones.slice(0,10);
        showField.classList.remove('d-none');
    }
    else {
        showField.classList.add('d-none');
    }
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
                     <button onclick="loadDetails('${phone.slug}')" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#staticBackdrop">Details</button>
            </div>
            `;
            phoneContainer.appendChild(phoneDiv);
        })
    }
    isSpining(false);
}
// this function get value from search field and sent to phone loader function to call api 
const process = (dataLimit) => {
    isSpining(true);
    const searchField = document.getElementById('search-field');
    const serachText = searchField.value;
    phoneLoader(serachText,dataLimit);
    // searchField.value = '';
}
// this dom work when we clicl serach button and then call the process function
document.getElementById('btn-search').addEventListener('click', function () {
    process(10);
})
//this dom work when we enter what we want search and then press enter button and then it call process function 
document.getElementById('search-field').addEventListener('keypress', function (event) {
    if(event.key==='Enter')
    {
        process(10);
    }
})

// this function work for loading spin
const isSpining = spin => {
    const spinField = document.getElementById('spin-field');
    if (spin) {
        spinField.classList.remove('d-none');
    }
    else {
        spinField.classList.add('d-none');
    }
}
// this function show us all data when we click on show all data
document.getElementById('btn-show-all').addEventListener('click', function(){
    process();
})