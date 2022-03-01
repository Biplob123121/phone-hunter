// spinner function
const toggleSpinner = displaySpinner =>{
    document.getElementById('spinner').style.display = displaySpinner;
}

// first twenty phone load
const loadPhones = () =>{
    toggleSpinner('block');
    const searchField = document.getElementById('input-field');
    const searchText = searchField.value;
    //console.log(searchText);
    searchField.value = '';
    if(searchText == 0){
        document.getElementById('empty-error').style.display = 'block';
        toggleSpinner('none');
    }
    else{
        document.getElementById('empty-error').style.display = 'none';
         fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`)
        .then(res => res.json())
        .then(data => displayPhone(data.data));
    }
}

const displayPhone = allPhones =>{
    
    const phones = allPhones.slice(0, 20);
    //console.log(phones);
    const phoneContainer = document.getElementById('phone-container');
    phoneContainer.innerHTML = '';
    document.getElementById('phone-details').innerHTML = '';
    if(phones.length == 0){
        document.getElementById('matching-error').style.display = 'block';
        toggleSpinner('none');
    }
    else{
        document.getElementById('matching-error').style.display = 'none';
        
    }
    for(const phone of phones){
        //console.log(phone);
        
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
             <div class="card h-100">
             <img src="${phone.image}" class="card-img-top" alt="...">
                 <div class="card-body">
                 <h5 class="card-title">${phone.phone_name}</h5>
                <p class="card-text">Brand: ${phone.brand}</p>
                <button onclick="loadPhoneDetails('${phone.slug}')" class="details-btn">Details</button>
                </div>
            </div>
        `
        phoneContainer.appendChild(div);
        toggleSpinner('none');
        document.getElementById('more-btn').style.display = 'block';
    }
// all phones displaying
document.getElementById('more-btn').addEventListener('click', function(){
    //console.log(allPhones);
    for(const phone of allPhones){
        //console.log(phone);
        
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
             <div class="card h-100">
             <img src="${phone.image}" class="card-img-top" alt="...">
                 <div class="card-body">
                 <h5 class="card-title">${phone.phone_name}</h5>
                <p class="card-text">Brand: ${phone.brand}</p>
                <button onclick="loadPhoneDetails('${phone.slug}')" class="details-btn">Details</button>
                </div>
            </div>
        `
        phoneContainer.appendChild(div);
        toggleSpinner('none');
        document.getElementById('more-btn').style.display = 'none';
    }
})
}


//  single phone details load

const loadPhoneDetails = phoneId =>{
    //console.log(phoneId);
    fetch(`https://openapi.programming-hero.com/api/phone/${phoneId}`)
    .then(res => res.json())
    .then(data => displayPhoneDetails(data.data));
    //.catch(error => console.log(error));
    
}

const displayPhoneDetails = phone =>{
    //console.log(phone);
    const phoneDetailsContainer = document.getElementById('phone-details');
    phoneDetailsContainer.innerHTML = '';
    const div = document.createElement('div');

    div.innerHTML =`
        <div class="card h-100">
            <img src="${phone.image}" class="card-img-top" alt="...">
             <div class="card-body">
                <h5 class="card-title"><span>Release Date:</span> ${phone.releaseDate ? phone.releaseDate : 'Unknown Release Date'}</h5>
                <h5 class="card-title"><span>Display:</span> ${phone.mainFeatures.displaySize}</h5>
                <h5 class="card-title"><span>Memory:</span> ${phone.mainFeatures.memory}</h5>
                <h5 class="card-title"><span>Chip Set:</span> ${phone.mainFeatures.chipSet}</h5>
                <h5 class="card-title"><span>Sensors:</span> ${phone.mainFeatures.sensors}</h5>
                <h5 class="card-title"><span>WLAN:</span> ${phone.others?.WLAN ? phone.others.WLAN : 'Updated'}</h5>
                <h5 class="card-title"><span>Bluetooth:</span> ${phone.others?.Bluetooth? phone.others.Bluetooth : 'Updated'}</h5>
                <h5 class="card-title"><span>GPS:</span> ${phone.others?.GPS? phone.others.GPS : 'Updated'}</h5>
             </div>
        </div>
    `
    phoneDetailsContainer.appendChild(div);
}
// displaying all phones
// const loadAllPhones = () =>{
//     const searchField = document.getElementById('input-field');
//     const searchText = searchField.value;
//     document.getElementById('empty-error').style.display = 'none';
//     fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`)
//    .then(res => res.json())
//    .then(data => console.log(data.data));
// }