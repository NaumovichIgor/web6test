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
        
        calculateTotal();
    }

    function calculateTotal() {
        const quantity = parseInt(quantityInput.value);
        const selectedProductType = document.querySelector('input[name="productType"]:checked').value;
        let unitPrice = 0;

        if (selectedProductType === '1') {
            unitPrice = 100;
        } else if (selectedProductType === '2') {
            unitPrice = parseInt(productSelect.value); 
        } else if (selectedProductType === '3') {
            unitPrice = 250;
            if (propertyCheckbox.checked) {
                unitPrice += 100;
            }
        }

        if (isNaN(quantity) || quantity <= 0) {
            resultParagraph.textContent = 'Ошибка: Введите корректное количество';
            return;
        }

        const totalCost = quantity * unitPrice;
        resultParagraph.textContent = `Цена заказа: ₽${totalCost.toFixed(2)}`;
    }

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

    updateOptions();
});
