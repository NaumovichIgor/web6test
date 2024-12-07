window.addEventListener('DOMContentLoaded', function () {
    const quantityInput = document.getElementById('quantity');
    const serviceTypeRadios = document.querySelectorAll('input[name="serviceType"]');
    const productSelect = document.getElementById('product');
    const propertyCheckbox = document.getElementById('property');
    const calculateButton = document.getElementById('calculate');
    const resultParagraph = document.getElementById('result');
    const productOptionsDiv = document.getElementById('productOptions');
    const propertyOptionsDiv = document.getElementById('propertyOptions');

    function updateOptions() {
        const selectedServiceType = document.querySelector('input[name="serviceType"]:checked').value;

        if (selectedServiceType === '1') {
            productOptionsDiv.classList.add('hidden');
            propertyOptionsDiv.classList.add('hidden');
        } else if (selectedServiceType === '2') {
            productOptionsDiv.classList.remove('hidden');
            propertyOptionsDiv.classList.add('hidden');
        } else if (selectedServiceType === '3') {
            productOptionsDiv.classList.add('hidden');
            propertyOptionsDiv.classList.remove('hidden');
        }
        
        calculateTotal(); // Recalculate on change
    }

    function calculateTotal() {
        const quantity = parseInt(quantityInput.value);
        const selectedServiceType = document.querySelector('input[name="serviceType"]:checked').value;
        let productPrice = 0;
        let additionalCost = 0;

        if (selectedServiceType === '2') {
            productPrice = parseFloat(productSelect.value);
        } else if (selectedServiceType === '3' && propertyCheckbox.checked) {
            additionalCost = 50; // Example additional cost for property
        }

        if (isNaN(quantity) || quantity <= 0) {
            displayError('Введите корректное количество');
            return;
        }

        const totalCost = (quantity * productPrice) + additionalCost;
        resultParagraph.textContent = `Цена заказа: ₽${totalCost.toFixed(2)}`;
    }

    function displayError(message) {
        resultParagraph.textContent = `Ошибка: ${message}`;
    }

    // Event listeners
    quantityInput.addEventListener('input', calculateTotal);
    serviceTypeRadios.forEach(radio => {
        radio.addEventListener('change', () => {
            updateOptions();
            calculateTotal();
        });
    });
    productSelect.addEventListener('change', calculateTotal);
    propertyCheckbox.addEventListener('change', calculateTotal);
    calculateButton.addEventListener('click', calculateTotal);

    // Initialize the options based on the default selected service type
    updateOptions();
});
