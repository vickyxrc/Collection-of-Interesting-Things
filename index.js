//BIRTHDAY PARADOX FUNCTIONS!!!

//create empty grid
function createEmptyGrid() {
  const screen = document.getElementById("screen");
  if (!screen) {
    return;
  }
  
  for (let i = 0; i < 100; i++) {
    screen.innerHTML += `<div class="cell"></div>`;
  }
}


//update slider value
function initSlider() {
  const slider = document.getElementById("slider");
  const sliderValue = document.getElementById("slider-value");
  const numPeople = document.getElementById("num-people");

  //hide slider value by default
  sliderValue.style.opacity = '0';
  sliderValue.style.transition = 'opacity 0.3s';

  //slider value only apear when cursor is on the thumb tack
  slider.addEventListener("mouseover", () => {
    sliderValue.style.opacity = '1';
  })

  //hide again when mouse gone
  slider.addEventListener("mouseleave", () => {
    sliderValue.style.opacity = '0';
  })

  //show when dragging
  slider.addEventListener("mousedown", () => {
    sliderValue.style.opacity = '1';
  })
  //updates values on input(user drag)
  slider.addEventListener("input", updateSliderValue);

  //first call to initialize position on page load
  updateSliderValue();
  function updateSliderValue() {
    //update values
    const val = slider.value;
    sliderValue.textContent = val;
    numPeople.textContent = val;

    //update slider val position
    const min = slider.min;
    const max = slider.max;
    const percent = ((val - min) / (max - min)) * 100;

    //position the value label above the thumb
    sliderValue.style.left = `calc(${percent}% + ${8 - percent * 0.16}px)`;
  }
}


//helper for createBirthdayGrid()
function getRandomBirthdate() {
    const months = [
        {name: "Jan", days: 31},
        {name: "Feb", days: 28},
        {name: "Mar", days: 31},
        {name: "Apr", days: 30},
        {name: "May", days: 31},
        {name: "Jun", days: 30},
        {name: "Jul", days: 31},
        {name: "Aug", days: 31},
        {name: "Sep", days: 30},
        {name: "Oct", days: 31},
        {name: "Nov", days: 30},
        {name: "Dec", days: 31},
    ]
    const monthIndex = Math.floor(Math.random() * months.length);
    const month = months[monthIndex];
    const day = Math.ceil(Math.random() * month.days);
    return `${month.name} ${day}`;
}

//helper for createBirthdayGrid()
function getRandomPerson() {
    const people = ["👩", "👨", "🧑", "👧", "👦", "🧒", "👶", "👵", "👴", "🧓", "👩‍🦰", 
                  "👨‍🦰", "🧑‍🦰", "👩‍🦱", "👨‍🦱", "🧑‍🦱", "👩‍🦲", "👨‍🦲", "🧑‍🦲", "👩‍🦳", "👨‍🦳", "🧑‍🦳", 
                  "👱‍♀️", "👱‍♂️", "👱", "🧔‍♂️", "🧔‍♀️", "🤶", "🎅", "🫃", "🫃", "🫃", "🙆‍♀️",
                  "🙆‍♂️", "🙆", "🙋‍♀️", "🙋‍♂️", "🙆", "🤦‍♀️", "🤦‍♂️", "🙇‍♀️", "🙇‍♂️", "🙇", "💁‍♀️",
                  "💁‍♂️", "💁", "🙍‍♀️", "🙍‍♂️", "🙍"];
    const randIndex = Math.floor(Math.random() * people.length)
    const person = people[randIndex];
    return person;
}


function createBirthdayGrid(numPeople) {
    const screen = document.getElementById("screen");
    //clear screen
    screen.innerHTML = "";
 
    const birthdayMap = {}; //store num of each birthdate (hashmap)
    const peopleData = []; //store people and their birthdate

    for (let i = 0; i < numPeople; i++) {
        const birthdate = getRandomBirthdate();
        const person = getRandomPerson();

        peopleData.push({person, birthdate});
        if (!birthdayMap[birthdate]) {
            birthdayMap[birthdate] = 1;
        }
        else {
            birthdayMap[birthdate]++;
        }
    }

    const duplicates = new Set(); //store all duplicate birthdates
    for (const [birthdate, count] of Object.entries(birthdayMap)) {
        if (count > 1) {
            duplicates.add(birthdate);
        }
    }

    let html = "";
    for (const {person, birthdate} of peopleData) {
        const isMatch = duplicates.has(birthdate) ? ` match` : ``;
        html += `
            <div class="cell${isMatch}">
                <span class="birthdate">${birthdate}</span>
                <div class="person">${person}</div>
            </div>
        `;
    }

    for (let i = peopleData.length; i < 100; i++) {
        html += `<div class="cell"></div>`;
    }

    screen.innerHTML = html;
    return duplicates.size > 0;

}

function calculateMatchProbability(numPeople) {
    //P(at least one match) = 1 - P(no matches)
    //P(no matches) = (365/365) × (364/365) × (363/365) × ... × ((365-n+1)/365)
    let pNoMatch = 1
    for (let i = 0; i < numPeople; i++) {
        pNoMatch *= (365 - i) / 365
    }
    return ((1 - pNoMatch) * 100).toFixed(1) + "%" //percent with 1 decimal
}

//function calls for bday paradox
initSlider();
//generate birthdays:
const generateButt = document.getElementById('generate-bttn');
generateButt.addEventListener("click", () => {
    const numPeople = parseInt(document.getElementById("slider").value);
    const hasMatch = createBirthdayGrid(numPeople);
    //displays sidebar info
    //display whether a match occured
    document.getElementById(`match-occured`).textContent = hasMatch ? "Yes" : "No"; 
    //display probability of match
    document.getElementById(`chance`).textContent = calculateMatchProbability(numPeople);
});



