window.addEventListener('DOMContentLoaded', function () {
    const quantityInput = document.getElementById('quantity');
    const productTypeRadios = document.querySelectorAll('input[name="productType"]');
    const productSelect = document.getElementById('product');
    const propertyCheckbox = document.getElementById('property');
    const calculateButton = document.getElementById('calculate');
    const resultParagraph = document.getElementById('result');
    const productOptionsDiv = document.getElementById('productOptions');
    const propertyOptionsDiv = document.getElementById('propertyOptions');

    function updateOptions() {
        const selectedProductType = document.querySelector('input[name="productType"]:checked').value;

        if (selectedProductType === '1') {
            productOptionsDiv.classList.add('hidden');
            propertyOptionsDiv.classList.add('hidden');
        } else if (selectedProductType === '2') {
            productOptionsDiv.classList.remove('hidden');
            propertyOptionsDiv.classList.add('hidden');
        } else if (selectedProductType === '3') {
            productOptionsDiv.classList.add('hidden');
            propertyOptionsDiv.classList.remove('hidden');
        }
        
        calculateTotal(); // Recalculate on change
    }

    function calculateTotal() {
        const quantity = parseInt(quantityInput.value);
        const selectedProductType = document.querySelector('input[name="productType"]:checked').value;
        let unitPrice = 0;

        // Determine unit price based on selected product type
        if (selectedProductType === '1') {
            unitPrice = 100; // Fixed price for Type 1
        } else if (selectedProductType === '2') {
            unitPrice = parseInt(productSelect.value); // Price based on selected product
        } else if (selectedProductType === '3') {
            unitPrice = 250; // Base price for Type 3
            if (propertyCheckbox.checked) {
                unitPrice += 100; // Additional cost if checkbox is checked
            }
        }

        if (isNaN(quantity) || quantity <= 0) {
            resultParagraph.textContent = 'Ошибка: Введите корректное количество';
            return;
        }

        // Calculate total cost
        const totalCost = quantity * unitPrice;
        resultParagraph.textContent = `Цена заказа: ₽${totalCost.toFixed(2)}`;
    }

    // Event listeners
    quantityInput.addEventListener('input', calculateTotal);
    productTypeRadios.forEach(radio => {
        radio.addEventListener('change', () => {
            updateOptions();
            calculateTotal();
        });
    });
    productSelect.addEventListener('change', calculateTotal);
    propertyCheckbox.addEventListener('change', calculateTotal);
    calculateButton.addEventListener('click', calculateTotal);

    // Initialize the options based on the default selected product type
    updateOptions();
});
