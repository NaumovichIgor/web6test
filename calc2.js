window.addEventListener('DOMContentLoaded', function () {
    const quantityInput = document.getElementById('quantity');
    const serviceTypeRadios = document.querySelectorAll('input[name="serviceType"]');
    const productSelect = document.getElementById('product');
    const propertyCheckbox = document.getElementById('property');
    const calculateButton = document.getElementById('calculate');
    const resultParagraph = document.getElementById('result');
    const productOptionsDiv = document.getElementById('productOptions');
    const propertyOptionsDiv = document.getElementById('propertyOptions');

    // Define base costs for each service type
    const baseCosts = {
        type1: 100, // Base cost for Type 1
        type2: 0,   // No base cost for Type 2, only product price
        type3: 150  // Base cost for Type 3
    };

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
        let baseCost = 0;

        // Determine base cost based on selected service type
        if (selectedServiceType === '1') {
            baseCost = baseCosts.type1;
        } else if (selectedServiceType === '2') {
            productPrice = parseFloat(productSelect.value);
        } else if (selectedServiceType === '3') {
            baseCost = baseCosts.type3;
            if (propertyCheckbox.checked) {
                additionalCost = 50; // Example additional cost for property
            }
        }

        if (isNaN(quantity) || quantity <= 0) {
            displayError('Введите корректное количество');
            return;
        }

        // Calculate total cost
        const totalCost = (quantity * baseCost) + (selectedServiceType === '2' ? (quantity * productPrice) : 0) + additionalCost;
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
