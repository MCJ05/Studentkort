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
const errorlist = document.querySelector("#errorlist")

clearButton.addEventListener("click", ClearForm);

console.log(user);
form.addEventListener ("submit", function(event) {
    event.preventDefault();
    //
    const user = {
        fullname: fullnameInput.value.trim(),
        email: emailInput.value.trim(),
        phone: phoneInput.value,
        font: fontSelect.value
    };

    /*
    console.log(fullname);
    console.log(email);
    console.log(phone);
    console.log(font);
    */

    if(!validateForm(user.fullname, user.email, user.phone)) {
        displayErrors();
        return;
    }

    createStudentCard(user);
    ClearForm();
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
function validateForm(name, email, phone) {
    // Kontrollera formulärets obligatoriska fält

    // Visa eventuella felmeddelanden
    // Tömmer felmeddelanden som redan skrivits ut
    errors.innerHTML = "";

    // Variabel som har koll på eventuella fel
    errors.length = 0;
    let validate = true;

    // Validera namn-input
    if(fullnameInput.value.trim() === "") {
        errors.push("Ange ditt namn");
        validate = false;
    }

    // Validera email-input
    if(emailInput.value.trim() === 0) {
        errors.push("Ange din e-postadress");
        validate = false;
    }

    if(!email.includes("@")) {
        errors.push("Ange en giltig e-postadress");
        validate = false;
    }

    // Validera phone-input
    if(phoneInput.value === "") {
        errors.push("Ange ett telefonnummer");
        validate = false;
    }
    
    console.log(name);
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
    if(errors.length > 0) {
        for(let i = 0; i < errors.length; i++) {
            const liElement = document.createElement("li");
            liElement.textContent = errors[i];

            errorList.appendChild(liElement);
        }
    }
    console.log(errors);
}
   
/**
 * Skapar ett studentkort och visar det på sidan.
 */
function createStudentCard(user) {
    // Hämta information från formuläret
    previewFullname.textContent = user.fullname;
    previewEmail.textContent =  user.email;
    previewPhone.textContent = user.phone;
    
    previewCard.style.fontFamily = font;

    // Skriva ut till elementet
    const output = document.querySelector("#preview");
    /*
    if(!output) {
        console.error("Hittar inte ele,emter #preview i HTML");
        return;
    }
    */
    output.innerHTML =`<strong>Namn:</strong> ${fullname} <br> <strong>E-postadress:</strong> ${email} <br> <strong>Telefon:</strong> ${phone}`;
    
    // Uppdatera studentkortet

    // Lägg till studentkortet i historiken

    // Spara och uppdatera historiken
}


/**
 * Sparar historiken i localStorage.
 */
function saveHistory() {
    // Spara history i localStorage
    const History = {
        name: fullname,
        email: email,
        phone: phone,
        font: font
    };

    conaole.log(History);

    const localStorageData = localStorage.getItem("Historys");
    console.log(localStorageData);

    const Historys = JSON.parse(StorageData);
    if(History === null) {
        Historys = [];
    }
    Historys.push(History);

    const HistorysJson = JSON.stringify(History);

    localStorage.setItem("Historys", HistorysJson);

}


/**
 * Läser in tidigare historik från localStorage.
 */
function loadHistory() {
    // Hämta eventuell sparad historik
    const History = JSON.parse(StorageData);
    if(History === null) {
        History = [];
    }

    if(History.length === 0) {
        return
    }

    for(let i = 0; i < History.length; i++) {
        const section = document.createChild("section");

        console.log(section);

        const p = document.createChild("pEl");
        pEl.innerHTML = `Användare`
        
        console.log(p);
    }

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

    errorList.innerHTML = "";
}

// När användaren klickar på "Radera historik"


// När sidan laddas:
// - läs in och visa eventuell tidigare historik