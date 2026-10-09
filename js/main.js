"use strict";
/*
 * Laboration 5 - Studentkortsgenerator
 * Namn: DITT NAMN
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

form.addEventListener("submit", onSubmit)
clearButton.addEventListener("click", ClearForm)

function onSubmit(event) {
    event.preventDefault();
    
    const name = fullnameInput.value.trim();
    const email = emailInput.value.trim();
    const phone = phoneInput.value.trim();
    
    if(!validateForm(name, email, phone)) {
        writeErrors();
    }

    displayErrors();
    createStudentCard();
    ClearForm();
}

// Array som används för felmeddelanden
let errors = [];
let errorsList = [];

// Array som innehåller sparade studentkort
let history = [];

/**
 * Validerar formulärets inmatning.
 * @returns {boolean}
 * 
 */
function validateForm(name, email, phone) {
    // Kontrollera formulärets obligatoriska fält

    // Visa eventuella felmeddelanden
    // Tömmer felmeddelanden som redan skrivits ut
    errors = [];
    errors.innerHTML = "";

    // Variabel som har koll på eventuella fel
    let validate = true;

    // Validera namn-input
    if(name === "") {
        errors.push("Ange ditt namn");
        validate = false;
    }

    // Validera email-input
    if(email.length === 0) {
        errors.push("Ange din E-postadress")
        validate = false;
    }

    if(!email.includes("@")) {
        errors.push("Ange en giltig E-postadress");
        validate = false;
    }

    // Validera phone-input
    if(phone === "") {
        errors.push("Ange ett telefonnummer");
        validate = false;
    }
    
    return validate;

    // Returnera resultatet (true eller false) av valideringen
}

/**
 * Visar felmeddelanden på sidan.
*/
function displayErrors() {
    // Rensa tidigare felmeddelanden

    // Skriv ut aktuella felmeddelanden till DOM
    if(errorsList.length > 0) {
            console.log(errorsList);

        for(let i = 0; i < errorsList.length; i++) {
            const liEl = document.createElement("li");
            liEl.innerHTML = errorsList[i];

            errorsList.appendChild(liEl);
        }
    }
}
   
/**
 * Skapar ett studentkort och visar det på sidan.
 */
function createStudentCard() {
    // Hämta information från formuläret
    let name = fullnameInput.value;
    let email = emailInput.value;
    let phone = phoneInput.value;

    // Skriva ut till elementet
    const output = document.querySelector("#preview");
    output.innerHTML =`<strong>Namn:</strong> ${name} <br> <strong>E-postadress:</strong> ${email} <br> <strong>Telefon:</strong> ${phone}`;
    
    // Uppdatera studentkortet

    // Lägg till studentkortet i historiken

    // Spara och uppdatera historiken
}


/**
 * Sparar historiken i localStorage.
 */
function saveHistory() {
    // Spara history i localStorage
    const saveHistory = {
        name: name,
        email: email,
        phone: phone
    }

    const localStorageData = localStorage.getItem("SaveHistory");

    const SaveHistory = JSON.parse(StorageData);
    if(saveHistory === null) {
        SaveHistory = [];
    }
    SaveHistory.push(saveHistory);

    const SaveHistoryJson = JSON.stringify(SaveHistory);

    localStorage.setItem("SaveHistory", SaveHistoryJson);

}


/**
 * Läser in tidigare historik från localStorage.
 */
function loadHistory() {
    // Hämta eventuell sparad historik
   

    // Uppdatera history
}


/**
 * Visar historiken på sidan.
 */
function renderHistory() {
    // Rensa tidigare visad historik

    // Skriv ut innehållet i history till DOM
}


/**
 * Rensar formulär, aktuellt studentkort och felmeddelanden.
 */
function clearForm() {
    // Återställ formulär och studentkort
    

    // Rensa eventuella felmeddelanden
}


/**
 * Raderar hela historiken.
 */
function deleteHistory() {
    // Radera sparad historik

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
}

// När användaren klickar på "Radera historik"


// När sidan laddas:
// - läs in och visa eventuell tidigare historik