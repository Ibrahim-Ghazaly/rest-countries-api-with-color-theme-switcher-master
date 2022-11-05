let countrydetails = document.querySelector(".country-details");
let darkmodebtn =document.querySelector(".dark-mood");





// toggle dark theme 

darkmodebtn.addEventListener("click",function(){
    document.body.classList.toggle("toggle-dark");
  })

  
function fetchcountrydatails(){
    fetch("data.json").then(res => res.json()).then((data)=>{
    console.log(data)

     showCountryDetails(data)
    })
  }
  fetchcountrydatails()


  function showCountryDetails(data){
   
    let id = window.localStorage.id;
    console.log(id)

    let country = data.find((cnt,index)=>{
           return +id === index
    })

   console.log(country)
   
       
      countrydetails.innerHTML = `
   
                <div class="country-img">
                      <img src="${country.flags.svg}" alt="country-img">
                  </div>
                  <div class="country-info">
                     <div class="box">
                      <div class="first">
                          <h3 class="country-name">${country.name.official}</h3>
                          <p class="nativeName">Native name:<span>${Object.values(country.name.nativeName)[0].official}</span></p>
                          <p class="population">population:<span>${country.population}</span></p>
                          <p class="Region">Region:<span>${country.region}</span></p>
                          <p class="subregion">sub Region:<span>${country.subregion}</span></p>
                          <p class="Capital">Capital:<span>${country.capital[0]}</span></p>
                      </div>
                      <div class="second" >
                          <p class="toplevel">Top Level Domain: <span>${country.tld[0]}</span></p>
                          <p class="currency">Currencies:<span>${Object.keys(country.currencies)}</span></p>
                          <p class="language">Languages:<span>${Object.values(country.languages)}</span></p>
                      </div>
                     </div> 
                     
                      <div class="box">
                      ${
                        (() =>{
                          if(country.borders){
                            return ` 
                         
                            <p class="border-countries">Border Countries:
                       
                             ${country.borders.map((element)=>{
                               
                           return   ` <span>${element}</span>`
                             }).join(" ")}
                          
                           </p>  `
                         
                          }else{
                              return ""
                          }
                        })()  
                    } 
                      </div>
                     
                  </div>
      `

  }