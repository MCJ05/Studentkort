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


clearButton.addEventListener("click", clearForm);
deleteHistoryButton.addEventListener("click", deleteHistory);

form.addEventListener ("submit", function(event) {
    event.preventDefault();

    const user = {
        fullname: fullnameInput.value.trim(),
        email: emailInput.value.trim(),
        phone: phoneInput.value.trim(),
        font: fontSelect.value
    };
    console.log(user);

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
    let validate = true;
    // Visa eventuella felmeddelanden
    console.log(validate);
    
    // Tömmer felmeddelanden som redan skrivits ut
    errors = [];
    errorList.innerHTML = "";

    // Variabel som har koll på eventuella fel
    // Validera namn-input
    if(fullname === "") {
        errors.push("Du måste ange ditt fullständiga namn");
        validate = false;
    }

    // Validera email-input
    if(email === "") {
        errors.push("Du måste ange din e-postadress");
        validate = false;
    }

    // Validera phone-input
    if(phone === "") {
        errors.push("Du måste ange ett telefonnummer");
        validate = false;
    }
    
    console.log(fullname);
    console.log(email);
    console.log(phone);

    // Returnera resultatet (true eller false) av valideringen
    return validate;
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
    // Skriva ut till elementet
    previewFullname.textContent = `Namn: ${user.fullname}`;
    previewEmail.textContent = `E-post: ${user.email}`;
    previewPhone.textContent = `Telefon: ${user.phone}`;
         
    // Välj vilket typsnitt
    previewFullname.style.fontFamily = user.font;
    previewEmail.style.fontFamily = user.font;
    previewPhone.style.fontFamily = user.font;
    
    console.log(user);
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
}

/**
 * Läser in tidigare historik från localStorage.
 */
function loadHistory() {
    // Hämta eventuell sparad historik
    const savedHistory = localStorage.getItem("history");
    console.log("Hämtad historik:", savedHistory);

    if(savedHistory !== null) {
        history = JSON.parse(savedHistory);
    } else {
        history = [];
    }

    renderHistory();
   
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
    console.log(renderHistory);
}


/**
 * Rensar formulär, aktuellt studentkort och felmeddelanden.
 */
function clearForm() {
    // Återställ formulär och studentkort
    form.reset();
    /*
    previewFullname.textContent = "";
    previewEmail.textContent = "";
    previewPhone.textContent = "";
    */
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
    localStorage.removeItem("history");
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
loadHistory();