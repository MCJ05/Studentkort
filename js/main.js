"use strict";
/*
 * Laboration 5 - Studentkortsgenerator
 * Namn: Moa Jönsson
 */

// Hämta element från DOM
const form = document.querySelector("#studentform");
const clearButton = document.querySelector("#clear");

const fullnameInputElement = document.querySelector("#fullname");
const emailInputElement = document.querySelector("#email");
const phoneInputElement = document.querySelector("#phone");
const fontSelectElement = document.querySelector("#font");

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
        fullname: fullnameInputElement.value.trim(),
        email: emailInputElement.value.trim(),
        phone: phoneInputElement.value.trim(),
        font: fontSelectElement.value
    };

    if(!validateForm(fullnameInputElement, emailInputElement, phoneInputElement)) {
        displayErrors();
        return;
    } 

    // Skapa studentkortet
    createStudentCard(user);
    
    // Historik
    saveHistory();
    renderHistory();
    deleteHistory();

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
function validateForm(fullnameInputElement, emailInputElement, phoneInputElement) {
    // Kontrollera formulärets obligatoriska fält

    // Visa eventuella felmeddelanden
    errors.length = 0;
    let validate = true;
    
    // Tömmer felmeddelanden som redan skrivits ut
    errors = [];
    errors.innerHTML = "";

    // Variabel som har koll på eventuella fel
    // Validera namn-input
    if(fullnameInputElement.value.trim() === "") {
        errors.push("Du måste ange ditt fullständiga namn");
        validate = false;
    }

    // Validera email-input
    if(emailInputElement.value.trim() === "") {
        errors.push("Du måste ange din e-postadress");
        validate = false;
    }

    // Validera phone-input
    if(phoneInputElement.value.trim() === "") {
        errors.push("Du måste ange ett telefonnummer");
        validate = false;
    }
    
    console.log(fullnameInputElement.value);
    console.log(emailInputElement.value);
    console.log(phoneInputElement.value);

    errorList.innerHTML = "";

    // Returnera resultatet (true eller false) av valideringen
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
        
    preview.style.fontFamily = user.font; // Välj vilket typsnitt
    // Skriva ut till elementet
    const output = document.querySelector("#preview");
    output.innerHTML =`${user.fullname} <br> ${user.email} <br> ${user.phone}`;
    
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

    saveHistory();
    renderHistory();
}


/**
 * Sparar historiken i localStorage.
 */
function saveHistory() {
    // Spara historiken i localStorage
    localStorage.setItem("history", JSON.stringify(history));
}

/**
 * Läser in tidigare historik från localStorage.
 */
function loadHistory() {
    // Hämta eventuell sparad historik
    const savedHistory = localStorage.getItem("history");

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

        p.innerHTML =
        "Namn: " + history[i].fullname +
        "<br> Email: " + history[i].email +
        "<br> Telefon: " + history[i].phone +
        "<br> Font: " + history[i].font;

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
    loacalStorage.removeItem("history");
    renderHistory();
    // Uppdatera history och visningen på sidan
}

// Eventlyssnare

// När formuläret skickas:
// - validera inmatningen
// - skapa studentkort om valideringen lyckas


// När användaren klickar på "Rensa"
function ClearForm() {
    fullnameInputElement.value ="";
    emailInputElement.value = "";
    phoneInputElement.value = "";

    errorList.innerHTML = "";
}

// När användaren klickar på "Radera historik"


// När sidan laddas:
// - läs in och visa eventuell tidigare historik