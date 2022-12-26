//import Fuse from "./fuse.js";
//const Fuse = require('fuse.js')

const token="pk.eyJ1IjoiaGprMTIzIiwiYSI6ImNrcGxjb3N3YjBubHMyb28xbWY5N3B0ZGQifQ.5YDVWFCJVeAbWXx6aEwKwg";
mapboxgl.accessToken = token;
var map = new mapboxgl.Map({
container: 'map',
style: 'mapbox://styles/mapbox/dark-v10',
center:[80,25],
zoom:3.3

});

const opnKey="7fe128bcbde1b7c6f0fb92dfc15a0271";


function navSlide() {
    const burger = document.querySelector(".burger");
    const nav = document.querySelector(".nav-links");
    const navLinks = document.querySelectorAll(".nav-links li");
    
    burger.addEventListener("click", () => {
        //Toggle Nav
        nav.classList.toggle("nav-active");
        
        //Animate Links
        navLinks.forEach((link, index) => {
            if (link.style.animation) {
                link.style.animation = ""
            } else {
                link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.5}s`;
            }
        });
        //Burger Animation
        burger.classList.toggle("toggle");
    });
    
}


navSlide();

function state_to_code(req){
  var stoc=new Map();
stoc.set("Andaman and Nicobar Islands","AN");
stoc.set("Andhra Pradesh","AP");
stoc.set("Arunachal Pradesh","AR");
stoc.set("Assam","AS");
stoc.set("Bihar","BR");
stoc.set("Chandigarh","CH");
stoc.set("Chhattisgarh","CT");
stoc.set("Dadra and Nagar Haveli","DN");
stoc.set("Daman and Diu","DD");
stoc.set("Delhi","DL");
stoc.set("Goa","GA");
stoc.set("Gujarat","GJ");
stoc.set("Haryana","HR");
stoc.set("Himachal Pradesh","HP");
stoc.set("Jammu and Kashmir","JK");
stoc.set("Jharkhand","JH");
stoc.set("Karnataka","KA");
stoc.set("Kerala","KL");
stoc.set("Lakshadweep","LD");
stoc.set("Madhya Pradesh","MP");
stoc.set("Maharashtra","MH");
stoc.set("Manipur","MN");
stoc.set("Meghalaya","ML");
stoc.set("Mizoram","MZ");
stoc.set("Nagaland","NL");
stoc.set("Odisha","OR");
stoc.set("Puducherry","PY");
stoc.set("Punjab","PB");
stoc.set("Rajasthan","RJ");
stoc.set("Sikkim","SK");
stoc.set("Tamil Nadu","TN");
stoc.set("Telangana","TG");
stoc.set("Tripura","TR");
stoc.set("Uttar Pradesh","UP");
stoc.set("Uttarakhand","UT");
stoc.set("West Bengal","WB");
  console.log(stoc.get(req))
  return stoc.get(req); 
  
}
function process(key,covidData){
 
function search(data,val){
  const options = {
    includeScore: true,
    threshold:0.5,  
    // Search in `state` and in `name` array
    keys:  ['name', 'state']
  }
  const fuse = new Fuse(data, options)
    // Search
    const result = fuse.search(val)
    console.log("fuse",result[0].item.state)
    return [result[0].item.state,result[0].item.lat,result[0].item.lon]//return lat,lon coordinates of state
  }   
  
  
    init()
    function init(){
          axios.get('lat_lon.json')
          .then(function(response){
// read from lat long file respose==data
  console.log("response",response.data)
/********************************************** */
             fuzzy_result=search(response.data,key)
             console.log(fuzzy_result)
/************************************************ */
var confremed_cases=document.getElementById("cc");
var recovered_cases=document.getElementById("rc");
var active_cases=document.getElementById("ac");
var dc_cases=document.getElementById("dc");
var conf_state;var last_updated=document.getElementById("lastupdated");
var state_code=state_to_code(fuzzy_result[0])
console.log(state_code)
Processed_covidData=covidData[state_code].total
console.log(Processed_covidData.confirmed)
        confremed_cases.innerHTML= "=> "+Processed_covidData.confirmed;
        recovered_cases.innerHTML="=> "+Processed_covidData.recovered;
        active_cases.innerHTML="=> "+Processed_covidData.tested;
        dc_cases.innerHTML="=> "+Processed_covidData.deceased;
        last_updated.innerHTML=covidData[state_code].meta.date;
      
        var marker=new mapboxgl.Marker({color:"red"})
        .setLngLat([fuzzy_result[2],fuzzy_result[1]])
  .setPopup(new mapboxgl.Popup({ offset: 25}) // add popups
    .setHTML('<h5>' +'Cases'+ '</h5><p style= "color:red">' + Processed_covidData.recovered + '</p>'+'<p >' + fuzzy_result[0]+ '</p>'))
  .addTo(map);
          }).catch(function(error){
            console.log(error)
          });

       

     
      }
      
}

function myFunction(){
  
    $(document).ready(function(){
      init()
       
      function init(){

        var url='https://data.covid19india.org/v4/min/data.min.json'
        
        
        $.get(url,function(data){
          console.log(data)
          
          var searchbar=document.getElementById("searchbar");
          //get value from search bar
          
         
          process(searchbar.value,data);
         

     });
    }
  })
  }