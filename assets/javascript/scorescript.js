/*
Pull list of high scores out of storage
parse lists back into objects
store scores as objects, containing a score variable and an initials variable
*/

const scoreTableEl = document.getElementById("scoreTableBody");
//parse score list back into an array of objects
let scoreList = JSON.parse(localStorage.getItem("scoreList"));
//iterate through score list, create a new table row for each and add the name and then score to it. Finally, append that table row to the table body on the page
for(const record of scoreList){
    let tableRow = document.createElement("tr");
    let nameEl = document.createElement("td");
    let scoreEl = document.createElement("td");
    nameEl.textContent=record.name;
    scoreEl.textContent=record.score;
    tableRow.appendChild(nameEl);
    tableRow.appendChild(scoreEl);
    scoreTableEl.appendChild(tableRow);
}