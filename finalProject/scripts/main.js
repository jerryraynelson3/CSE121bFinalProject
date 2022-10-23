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

    let url = `https://www.dnd5eapi.co/api/races/${race}`;

    var raceDataTemp;

    try{

        raceDataTemp = await fetch(url).then((response) => response.json());

    }
    catch(err){

        alert("Error Message : " + err.message);

    }
    // let raceDataJS =  await raceDataTemp.json();

    return raceDataTemp;

}

function raceCustomization(data){

    let raceDetails = {};
    let abilityBonus = data.ability_bonuses[0].ability_score.index;
    let abilityBonusNo = data.ability_bonuses[0].bonus;
    let givenProficiencies = data.starting_proficiencies;
    let proficiencies = [];

    raceDetails['abilityBonus'] = abilityBonus;
    raceDetails['abilityBonusNo'] = abilityBonusNo;

    for(i = 0; i < givenProficiencies.length; i++){

        proficiencies[i] = givenProficiencies[i].index;

    }

    raceDetails['proficiencies'] = proficiencies;

    let givenLanguages = data.languages;
    let languages = [];

    for(i = 0; i < givenLanguages.length; i++){

        languages[i] = givenLanguages[i].index;

    }

    raceDetails['Languages'] = languages;

    let givenTraits = data.traits;
    let traits = [];

    for(i = 0; i < givenTraits.length; i++){

        traits[i] = givenTraits[i].index;

    }

    raceDetails['traits'] = traits;

    var subrace;
    let subraces = data.subraces;

    if(subraces.length != 0){
    subrace = subraces[0].index;
    }

    raceDetails['subrace'] = subrace;

    return raceDetails;

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

function classCustomization(data){

    let classDetails = {};

}

async function director(){

    raceSelection();
    classSelection();

    let next = document.createElement("button");
    next.innerHTML = "next";
    display.appendChild(next);

    await btnClick(next);

    let raceData = await retrieveRaceData();
    let classData = await retrieveClassData();

    display.innerHTML = "";

    let raceDetails = raceCustomization(raceData);
    let classDetails = classCustomization(classData);

}

director();