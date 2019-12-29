const nameInput = document.querySelector("#nameInput");
const surnameInput = document.querySelector("#surnameInput");
const form = document.querySelector("form");
const a = document.querySelector("a");

const name = "Jakaś Osoba";
const surname = "Testowa";

form.addEventListener("submit", event => {
    event.preventDefault();

    const name = nameInput.value;
    const surname = surnameInput.value;

    const params = new URLSearchParams({
        name,
        surname,
    });
    const url = `http;//localhost:3000/?` + params;
    a.setAttribute('href', url);
});