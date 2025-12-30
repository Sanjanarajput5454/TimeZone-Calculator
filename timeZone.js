const BASE_URL= "https://worldtimeapi.org/api/timezone/Asia/Kolkata";

const dropdown = document.querySelectorAll(".dropdown select");

// This is done to add all the countries to the dropdown list.
for(let select of dropdown){
   for(zones in timeZoneList){
 let newOption = document.createElement("option");
 newOption.innerText = zones;
 newOption.value = zones;
 if(select.name === "from" && zones==="America/Chicago"){
  newOption.selected="selected";
 }else if(select.name === "from" && zones==="Asia/Kolkata"){
  newOption.selected = "selected"; 
 }
 select.append(newOption);
 }
  // ths is to change the flag iage when the input changes
 select.addEventListener("change", (evt) =>{
  updateFlag(evt.target);
 });
}

const updateFlag = (element) =>{
   
}