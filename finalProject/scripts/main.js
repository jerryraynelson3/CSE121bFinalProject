var races = ["dragonborn", "dwarf", "elf", "gnome", "half-elf", "half-orc", "halfling", "human", "tiefling"];
var classes = ["barbarian", "bard", "cleric", "druid", "fighter", "monk", "paladin", "ranger", "rogue", "sorcerer", "warlock", "wizard"];
var display  = document.getElementById("display");

async function btnClick(btn){

    return new Promise(resolve => btn.onclick = () => resolve());

}

function raceSelection(){

    let dropdown = document.createElement("select");
    dropdown.name = "races";
    dropdown.id = "races";

    for(const race in races){

        let option = document.createElement("option");
        option.value = race;
        option.text = races[race];
        dropdown.appendChild(option);

    }

    let label = document.createElement("label");
    label.innerHTML = "Choose your Race:";
    label.htmlFor = "races";

    document.getElementById("display").appendChild(label).appendChild(dropdown);

}

async function retrieveRaceData(){

    let dropdown = document.getElementById('races');

    let race = dropdown.options[dropdown.selectedIndex].innerHTML;

    let raceData = await fetch(`https://www.dnd5eapi.co/api/races/${race}`);

    let raceDataJS =  await raceData.json();

    return raceDataJS;

}

async function raceCustomization(data){

    console.dir(data);

    // let abilityBonus = data.ability_bonuses[0].ability_score.index;

    // alert(abilityBonus);

}

function classSelection(){

    let dropdown = document.createElement("select");
    dropdown.name = "classes";
    dropdown.id = "classes";

    for(const klass in classes){

        let option = document.createElement("option");
        option.value = klass;
        option.text = classes[klass];
        dropdown.appendChild(option);

    }

    let label = document.createElement("label");
    label.innerHTML = "Choose your Class:";
    label.htmlFor = "classes";

    document.getElementById("display").appendChild(label).appendChild(dropdown);

}

async function retrieveClassData(){

    let dropdown = document.getElementById('classes');

    let klass = dropdown.options[dropdown.selectedIndex].innerHTML;

    let classData = await fetch(`https://www.dnd5eapi.co/api/classes/${klass}`);

    let classDataJS = await classData.json();

    return classDataJS;

}

async function director(){

    raceSelection();
    classSelection();

    let next = document.createElement("button");
    next.innerHTML = "next";
    display.appendChild(next);

    await btnClick(next);

    let raceData = retrieveRaceData();
    let classData = retrieveClassData();

    display.innerHTML = "";

    raceCustomization(raceData);

}

director();