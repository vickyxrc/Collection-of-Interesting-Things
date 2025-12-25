//BIRTHDAY PARADOX FUNCTIONS!!!
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


function createBirthdayGrid() {
  const screen = document.getElementById("screen");
  if (!screen) {
    return;
  }
  //clear screen
  screen.innerHTML = "";
  
  for (let i = 0; i < 100; i++) {
    const birthdate = getRandomBirthdate();
    const person = getRandomPerson();
    screen.innerHTML += `
          <div class="cell">
            <span class="birthdate">${birthdate}</span>
            <div class="person">${person}</div>
          </div>
          `;
  }
}
createBirthdayGrid();
