const loadPhones = () =>{
    const searchField = document.getElementById('input-field');
    const searchText = searchField.value;
    //console.log(searchText);
    searchField.value = '';
    if(searchText == 0){
        document.getElementById('empty-error').style.display = 'block';
    }
    else{
         fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`)
        .then(res => res.json())
        .then(data => displayPhone(data.data));
    }
}

const displayPhone = phones =>{
    //console.log(phones);
    const phoneContainer = document.getElementById('phone-container');
    phoneContainer.innerHTML = '';
    
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
                <button onclick="loadPhoneDetails(${phone.slug})" class="details-btn">Details</button>
                </div>
            </div>
        `
        phoneContainer.appendChild(div);
    }
}

const loadPhoneDetails = phoneId =>{
    console.log(phoneId.slug);
}