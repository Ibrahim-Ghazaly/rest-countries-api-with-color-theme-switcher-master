const select = document.querySelector(".select");
const options_list = document.querySelector(".options-list");
const options = document.querySelectorAll(".option");
let countryContainer=document.querySelector(".country-container");
let serchInpt = document.querySelector("#search-input")
let darkmodebtn =document.querySelector(".dark-mood");




// toggle dark theme 

darkmodebtn.addEventListener("click",function(){
  document.body.classList.toggle("toggle-dark");
})


    //show & hide options list
    select.addEventListener("click", () => {
      options_list.classList.toggle("active");
      select.querySelector(".fa-angle-down").classList.toggle("fa-angle-up");
    });

    //select option
    options.forEach((option) => {
      option.addEventListener("click", () => {
        options.forEach((option) => {option.classList.remove('selected')});
        select.querySelector("span").innerHTML = option.innerHTML;
        option.classList.add("selected");
        options_list.classList.toggle("active");
        select.querySelector(".fa-angle-down").classList.toggle("fa-angle-up");
      });
    });


function fetchData(){
  fetch("data.json").then(res => res.json()).then((data)=>{
  console.log(data)
   showCountries(data)
   searchCountry(data)
   filterCountry(data)
  
  })
}
fetchData()

function  showCountries(data){
  
  for(let i =0;i<data.length;i++){
     
    countryContainer.innerHTML += `
 
    <div class="country">
    <a class="country-link" onclick="saveCountryInLocalStorage(${i})">
    <div class="country-img">
        <img src="${data[i].flags.png}" alt="country-img">
    </div>
    <div class="country-info">
        <h3 class="country-name">${data[i].name.official}</h3>
        <p class="population">population:<span>${data[i].population}</span></p>
        <p class="Region">Region:<span>${data[i].region}</span></p>
        <p class="Capital">Capital:<span>${data[i].capital[0]}</span></p>
    </div>
    </a>
   </div>
 
    `
  }
}


// search function 

function searchCountry(data){
  serchInpt.addEventListener("keyup",function(){
    let value = serchInpt.value;
    let countries='';
    for(let i =0;i<data.length;i++){
      if(data[i].name.official.toLowerCase().includes(value.toLowerCase())){

        countries +=
        `
        
        <div class="country">
        <a  class="country-link" onclick="saveCountryInLocalStorage(${i})">
        <div class="country-img">
            <img src="${data[i].flags.png}" alt="country-img">
        </div>
        <div class="country-info">
            <h3 class="country-name">${data[i].name.official}</h3>
            <p class="population">population:<span>${data[i].population}</span></p>
            <p class="Region">Region:<span>${data[i].region}</span></p>
            <p class="Capital">Capital:<span>${data[i].capital[0]}</span></p>
        </div>
        </a>
     </div>
    
        `
      }

    }
    countryContainer.innerHTML = countries;
  })
}


// filter countries 

function  filterCountry(data){

  options.forEach((option)=>{
    option.addEventListener(("click"),function(){

     let filterd = data.filter((country)=>{
       return country.region.toLowerCase() === option.innerHTML.toLowerCase();
     })
       
    if(countryContainer.innerHTML != ''){
        countryContainer.innerHTML = '';
        showCountries(filterd)
       }else{
        showCountries(filterd)
      }
    }) 
  })

}


function saveCountryInLocalStorage(id){
  window.localStorage.setItem("id",id);
  window.location="countrydetails.html";
}

