document.addEventListener('DOMContentLoaded', function() {
    const selectElement = document.getElementById('deviseOriginaire');
    const selectElement_deux = document.getElementById('deviseSouhaitee');
    
    const defaultOption1 = document.createElement('option');
    defaultOption1.value = "";
    defaultOption1.textContent = "Sélectionnez une devise";
    selectElement.appendChild(defaultOption1);

    const defaultOption2 = document.createElement('option');
    defaultOption2.value = "";
    defaultOption2.textContent = "Sélectionnez une devise";
    selectElement_deux.appendChild(defaultOption2);

    fetch('../data/devises_pays.json')
        .then(response => response.json())
        .then(data => {
            Object.keys(data)
                .sort()
                .forEach(currency => {
                    data[currency].forEach(countryText => {
                        const option1 = document.createElement('option');
                        option1.value = currency;
                        option1.textContent = `${countryText} (${currency})`;
                        selectElement.appendChild(option1);

                        const option2 = document.createElement('option');
                        option2.value = currency;
                        option2.textContent = `${countryText} (${currency})`;
                        selectElement_deux.appendChild(option2);
                    });
                });
        })
        .catch(error => console.error('Erreur:', error));
});