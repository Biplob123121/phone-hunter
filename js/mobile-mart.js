const loadPhones = () =>{
    const searchField = document.getElementById('input-field');
    const searchText = searchField.value;
    //console.log(searchText);
    searchField.value = '';
    if(searchText == 0){
        document.getElementById('empty-error').style.display = 'block';
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
    if(phones.length == 0){
        document.getElementById('matching-error').style.display = 'block';
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
    }
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
    console.log(phone);
    const phoneDetailsContainer = document.getElementById('phone-details');
    phoneDetailsContainer.innerHTML = '';
    const div = document.createElement('div');

    div.innerHTML =`
        <div class="card">
            <img src="${phone.image}" class="card-img-top" alt="...">
             <div class="card-body">
                <h5 class="card-title">Release Date: ${phone.releaseDate ? phone.releaseDate : 'Unknown Release Date'}</h5>
                <h5 class="card-title">Memory: ${phone.mainFeatures.memory}</h5>
                <h5 class="card-title">Chip Set: ${phone.mainFeatures.chipSet}</h5>
                <h5 class="card-title">Sensors: ${phone.mainFeatures.sensors}</h5>
                <h5 class="card-title">WLAN: ${phone.others?.WLAN ? phone.others.WLAN : 'None'}</h5>
                <h5 class="card-title">Bluetooth: ${phone.others?.Bluetooth? phone.others.Bluetooth : 'None'}</h5>
                <h5 class="card-title">GPS: ${phone.others?.GPS? phone.others.GPS : 'None'}</h5>
                 <a href="#" class="btn btn-primary">Go somewhere</a>
             </div>
        </div>
    `
    //phoneDetailsContainer.appendChild(h5);
    phoneDetailsContainer.appendChild(div);
}