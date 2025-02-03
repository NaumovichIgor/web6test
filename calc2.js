window.addEventListener('DOMContentLoaded', function () {
    const quantityInput = document.getElementById('quantity');
    const serviceTypeRadios = document.querySelectorAll('input[name="serviceType"]');
    const productSelect = document.getElementById('product');
    const propertyCheckbox = document.getElementById('property');
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
        
        calculateTotal();
    }

    function calculateTotal() {
        const quantity = parseInt(quantityInput.value);
        const selectedServiceType = document.querySelector('input[name="serviceType"]:checked').value;
        let productPrice = 0;

        if(selectedServiceType==='1'){
            productPrice=100;}
        else if(selectedServiceType === '2') {
            productPrice = parseInt(productSelect.value);
        } else if (selectedServiceType === '3' && propertyCheckbox.checked) {
            productPrice=350;
        }
        else if(selectedServiceType==='3'&&propertCheckbox.unchecked){
            productPrice=250;
        }

        if (isNaN(quantity) || quantity <= 0) {
            displayError('Введите корректное количество');
            return;
        }

        const totalCost = (quantity * productPrice);
        resultParagraph.textContent = `Цена заказа: ₽${totalCost.toFixed(2)}`;
    }

    function displayError(message) {
        resultParagraph.textContent = `Ошибка: ${message}`;
    }

    quantityInput.addEventListener('input', calculateTotal);
    serviceTypeRadios.forEach(radio => {
        radio.addEventListener('change', () => {
            updateOptions();
            calculateTotal();
        });
    });
    productSelect.addEventListener('change', calculateTotal);
    propertyCheckbox.addEventListener('change', calculateTotal);

    updateOptions();
});
