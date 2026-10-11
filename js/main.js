"use strict";
/*
 * Laboration 5 - Studentkortsgenerator
 * Namn: Moa Jönsson
 */

// Hämta element från DOM
const form = document.querySelector("#studentform");
const clearButton = document.querySelector("#clear");

const fullnameInput = document.querySelector("#fullname");
const emailInput = document.querySelector("#email");
const phoneInput = document.querySelector("#phone");
const fontSelect = document.querySelector("#font");

const previewFullname = document.querySelector("#previewfullname");
const previewEmail = document.querySelector("#previewemail");
const previewPhone = document.querySelector("#previewphone");

const errorList = document.querySelector("#errorlist");
const historySection = document.querySelector("#history");
const deleteHistoryButton = document.querySelector("#delete");

const output = document.querySelector("#output");
const user = document.querySelector("#user");
const eventElement = document.querySelector("#event");
const previewCard = document.querySelector("#previewCard");

clearButton.addEventListener("click", ClearForm);
deleteHistoryButton.addEventListener("click", deleteHistoryButton);

console.log(user);
form.addEventListener ("submit", function(event) {
    event.preventDefault();

    const user = {
        fullname: fullnameInput.value.trim(),
        email: emailInput.value.trim(),
        phone: phoneInput.value.trim(),
        font: fontSelect.value
    };

    if(!validateForm(user.fullname, user.email, user.phone)) {
        displayErrors();
        return;
    } 

    // Skapa studentkortet
    createStudentCard(user);
    
    // Historik
    saveHistory();
    renderHistory();

    // Rensa formulär
    ClearForm();
    clearForm();
    
});


// Array som används för felmeddelanden
let errors = [];

// Array som innehåller sparade studentkort
let history = [];

/**
 * Validerar formulärets inmatning.
 * @returns {boolean}
 * 
 */
function validateForm(fullname, email, phone) {
    // Kontrollera formulärets obligatoriska fält

    // Visa eventuella felmeddelanden
    // Tömmer felmeddelanden som redan skrivits ut
    errors = [];
    errors.innerHTML = "";

    // Variabel som har koll på eventuella fel
    // Validera namn-input
    if(fullnameInput.value.trim() === "") {
        errors.push("Du måste ange ditt fullständiga namn");
    }

    // Validera email-input
    if(emailInput.value.trim() === "") {
        errors.push("Du måste ange din e-postadress");
    }

    // Validera phone-input
    if(phoneInput.value.trim() === "") {
        errors.push("Du måste ange ett telefonnummer");
    }
    
    console.log(fullname);
    console.log(email);
    console.log(phone);

    // Returnera resultatet (true eller false) av valideringen
    errorList.innerHTML = "";
    return errors.length === 0;
}

/**
 * Visar felmeddelanden på sidan.
*/
function displayErrors() {
    // Rensa tidigare felmeddelanden
    errorList.innerHTML = "";

    // Skriv ut aktuella felmeddelanden till DOM
    for(let i = 0; i < errors.length; i++) {
        const liElement = document.createElement("li");
        
        liElement.textContent = errors[i];

        errorList.appendChild(liElement);
    }
}
   
/**
 * Skapar ett studentkort och visar det på sidan.
 */
function createStudentCard(user) {
    // Hämta information från formuläret
    previewFullname.textContent = user.fullname;
    previewEmail.textContent =  user.email;
    previewPhone.textContent = user.phone;
        
    preview.style.fontFamily = user.font;
    // Skriva ut till elementet
    const output = document.querySelector("#preview");
    output.innerHTML =`${fullname} <br> ${email} <br> ${phone}`;
    
    // Uppdatera studentkortet

    // Lägg till studentkortet i historiken
    history.push( {
        fullname: user.fullname,
        email: user.email,
        phone: user.phone,
        font: user.font
    });

    // Spara och uppdatera historiken
    console.log(history);
}


/**
 * Sparar historiken i localStorage.
 */
function saveHistory() {
    // Spara historiken i localStorage
    localStorage.setItem("history", JSON.stringify(history));

/*
    const history = {
        fullname: fullname,
        email: email,
        phone: phone,
        font: font
    };
    console.log(history);

    const History = [];
    History.push(history);
    const localStorageData = localStorage.getItem("History");
    console.log(localStorageData);
    */
}

/**
 * Läser in tidigare historik från localStorage.
 */
function loadHistory() {
    // Hämta eventuell sparad historik
    const savedHistory = localStorage(getitem("history"));

    if(savedHistory !== null) {
        history = JSON.parse(savedHistory);
    } else {
        history = [];
    }

    renderHistory();
    /*
   let users = JSON.parse(localStorage.getItem("history"));
    console.log(history);

    if(users === null) {
        users = [];
    }

    if(users.length === 0) {
        console.log("Ingen sparad historik");
        return;
    }

    for(let i = 0; i < users.length; i++) {
        const section = document.createElement("section");

        console.log(section);

        const p = document.createElement("p");
        p.innerHTML = "Användare: " + users[i];
        
        console.log(p);

        section.appendChild(p);
        document.body.appendChild(section);
    }
    */
    // Uppdatera history
}


/**
 * Visar historiken på sidan.
 */
function renderHistory() {
    // Rensa tidigare visad historik
    historySection.innerHTML = "";

    for(let i = 0; i < history.length; i++) {
        const section = document.createElement("section");
        const p = document.createElement("p");

        p.textContent =
        "Namn: " + history[i].fullname +
        "E-post: " + history[i].email +
        "Telefon: " + history[i].pgone;

        section.style.fontFamily = history[i].font;

        section.appendChild(p);
        historySection.appendChild(section);
    }
    // Skriv ut innehållet i history till DOM
    
}


/**
 * Rensar formulär, aktuellt studentkort och felmeddelanden.
 */
function clearForm() {
    // Återställ formulär och studentkort
    form.reset();

    // Rensa eventuella felmeddelanden
    errorList.innerHTML = "";
    errors = [];
}


/**
 * Raderar hela historiken.
 */
function deleteHistory() {
    // Radera sparad historik
    history = [];
    loacalStorage.removeitem("history");
    renderHistory();
    // Uppdatera history och visningen på sidan
}

// Eventlyssnare

// När formuläret skickas:
// - validera inmatningen
// - skapa studentkort om valideringen lyckas


// När användaren klickar på "Rensa"
function ClearForm() {
    fullnameInput.value ="";
    emailInput.value = "";
    phoneInput.value = "";

    errorList.innerHTML = "";
}

// När användaren klickar på "Radera historik"


// När sidan laddas:
// - läs in och visa eventuell tidigare historik