document.addEventListener("DOMContentLoaded", () => {

    const billInput = document.getElementById("bill-input");
    const peopleInput = document.getElementById("people-input");
    const tipButtons = document.querySelectorAll(".tip-option");
    const customTipInput = document.getElementById("custom-tip");
    const resetBtn = document.querySelector(".reset");

    const valores = document.querySelectorAll(".valor");
    const tipAmountText = valores[0];
    const totalAmountText = valores[1];

    let tipPercent = 0;
    let peopleInteracted = false;

    const peopleTitle = document.querySelector(".people h2");

    const errorText = document.createElement("span");
    errorText.textContent = "Can’t be zero";
    errorText.style.color = "red";
    errorText.style.fontSize = "12px";
    errorText.style.float = "right";
    errorText.style.display = "none";

    peopleTitle.appendChild(errorText);

    billInput.addEventListener("input", calcular);

    peopleInput.addEventListener("focus", () => {
        peopleInteracted = true;

        if (peopleInput.value === "" || Number(peopleInput.value) === 0) {
            mostrarError();
        }
    });

    peopleInput.addEventListener("input", calcular);

    customTipInput.addEventListener("input", usarCustomTip);

    tipButtons.forEach(boton => {
        boton.addEventListener("click", () => {
            tipButtons.forEach(b => b.classList.remove("activo"));
            boton.classList.add("activo");

            tipPercent = Number(boton.textContent.replace("%", "")) / 100;
            customTipInput.value = "";
            calcular();
        });
    });

    resetBtn.addEventListener("click", () => {
        billInput.value = "";
        peopleInput.value = "";
        customTipInput.value = "";
        tipPercent = 0;
        peopleInteracted = false;

        tipButtons.forEach(b => b.classList.remove("activo"));

        tipAmountText.textContent = "$0.00";
        totalAmountText.textContent = "$0.00";

        ocultarError();
    });

    function usarCustomTip() {
        tipButtons.forEach(b => b.classList.remove("activo"));
        tipPercent = Number(customTipInput.value) / 100;
        calcular();
    }

    function calcular() {
        const bill = Number(billInput.value);
        const people = Number(peopleInput.value);

        if (peopleInteracted && people === 0) {
            mostrarError();
            tipAmountText.textContent = "$0.00";
            totalAmountText.textContent = "$0.00";
            return;
        } else {
            ocultarError();
        }

        if (bill <= 0 || tipPercent === 0 || people <= 0) {
            tipAmountText.textContent = "$0.00";
            totalAmountText.textContent = "$0.00";
            return;
        }

        const tipTotal = bill * tipPercent;
        const tipPerPerson = tipTotal / people;
        const totalPerPerson = (bill + tipTotal) / people;

        tipAmountText.textContent = `$${tipPerPerson.toFixed(2)}`;
        totalAmountText.textContent = `$${totalPerPerson.toFixed(2)}`;
    }

    function mostrarError() {
        errorText.style.display = "inline";
        peopleInput.style.border = "2px solid red";
    }

    function ocultarError() {
        errorText.style.display = "none";
        peopleInput.style.border = "2px solid transparent";
    }

});