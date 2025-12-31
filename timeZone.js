const BASE_URL = "https://worldtimeapi.org/api/timezone";

const dropdown = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromDt = document.querySelector('select[name="from"]');
const toDt = document.querySelector('select[name="to"]');


// This is done to add all the countries to the dropdown list.
for (let select of dropdown) {
  for (zones in timeZoneList) {
    let newOption = document.createElement("option");
    newOption.innerText = zones;
    newOption.value = zones;

    if (select.name === "from" && zones === "America/Chicago") {
      newOption.selected = "selected";
    } else if (select.name === "to" && zones === "Asia/Kolkata") {
      newOption.selected = "selected";
    }

    select.append(newOption);
  }

  // ths is to change the flag image when the input changes
  select.addEventListener("change", (evt) => {
    updateFlag(evt.target);
  });
}

const updateFlag = (element) => {
  let zones = element.value; // this will gve the value which is being used
  let countryCode = timeZoneList[zones]; // by using zones we will get the value of countrycode
  let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
  let img = element.parentElement.querySelector("img"); // in html file we will go in the parent select tag where the img is presenet.
  img.src = newSrc;
};

// helper function to convert utc offset to minutes
const offsetToMinutes = (offset) => {
  const sign = offset[0] === "+" ? 1 : -1;
  const [h, m] = offset.slice(1).split(":");
  return sign * (parseInt(h) * 60 + parseInt(m));
};

btn.addEventListener("click", async (evt) => {
  evt.preventDefault(); // this will the automatic actions by the button

  let dateTime = document.querySelector(".date-time input");
  let dtVal = dateTime.value;

  if (dtVal === "") {
    alert("Please select a date and time");
    return;
  }

  // this is to make an url that will give both
  // console.log(fromDt.value, toDt.value);

  // fetch FROM timezone
  let fromResponse = await fetch(`${BASE_URL}/${fromDt.value}`);
  let fromData = await fromResponse.json();

  // fetch TO timezone
  let toResponse = await fetch(`${BASE_URL}/${toDt.value}`);
  let toData = await toResponse.json();

  // convert selected datetime to Date object
  let inputDate = new Date(dtVal);

  // convert offsets to minutes
  let fromOffset = offsetToMinutes(fromData.utc_offset);
  let toOffset = offsetToMinutes(toData.utc_offset);

  // convert input time to UTC
  let utcTime = inputDate.getTime() - fromOffset * 60 * 1000;

  // convert UTC to target timezone
  let finalTime = new Date(utcTime + toOffset * 60 * 1000);

  // display result
  document.querySelector(".msg").innerText =
    "Converted Time: " + finalTime.toLocaleString();
});
