window.addEventListener('DOMContentLoaded', function () {
    const quantityInput = document.getElementById('quantity');
    const serviceTypeRadios = document.querySelectorAll('input[name="serviceType"]');
    const productSelect = document.getElementById('product');
    const propertyCheckbox = document.getElementById('property');
    const calculateButton = document.getElementById('calculate');
    const resultParagraph = document.getElementById('result');
    const productOptionsDiv = document.getElementById('productOptions');
    const propertyOptionsDiv = document.getElementById('propertyOptions');

    // Define prices for each service type
    const prices = {
        type1: 100, // Fixed price per unit for Type 1
        type2: {
            product1: 100, // Price for Product 1
            product2: 200  // Price for Product 2
        },
        type3: 250,  // Fixed price per unit for Type 3
        additionalCost: 50 // Additional cost for Type 3 if checkbox is checked
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
        let unitPrice = 0;
        let additionalCost = 0;

        // Determine unit price based on selected service type
        if (selectedServiceType === '1') {
            unitPrice = prices.type1; // Fixed price for Type 1
        } else if (selectedServiceType === '2') {
            const selectedProduct = productSelect.value;
            unitPrice = prices.type2[selectedProduct]; // Price based on selected product
        } else if (selectedServiceType === '3') {
            unitPrice = prices.type3; // Fixed price for Type 3
            if (propertyCheckbox.checked) {
                additionalCost = prices.additionalCost; // Additional cost if checkbox is checked
            }
        }

        if (isNaN(quantity) || quantity <= 0) {
            displayError('Введите корректное количество');
            return;
        }

        // Calculate total cost
        const totalCost = (quantity * unitPrice) + (propertyCheckbox.checked ? (quantity * prices.additionalCost) : 0);
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
