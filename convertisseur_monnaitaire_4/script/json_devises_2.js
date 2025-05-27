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

    // Utilisation d'un proxy CORS pour éviter les erreurs
    const proxyUrl = 'https://api.allorigins.win/get?url=';
    const targetUrl = encodeURIComponent('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1');
    
    fetch(proxyUrl + targetUrl)
        .then(response => response.json())
        .then(proxyData => {
            const data = JSON.parse(proxyData.contents);
            
            // data est un ARRAY, pas un objet - on utilise forEach directement
            data.forEach(crypto => {
                const option1 = document.createElement('option');
                option1.value = crypto.id;  // Pas currency[id] mais crypto.id
                option1.textContent = `${crypto.name} (${crypto.symbol.toUpperCase()}) - $${crypto.current_price}`;
                selectElement.appendChild(option1);

                const option2 = document.createElement('option');
                option2.value = crypto.id;  // Même valeur pour les deux selects
                option2.textContent = `${crypto.name} (${crypto.symbol.toUpperCase()}) - $${crypto.current_price}`;
                selectElement_deux.appendChild(option2);
            });
        })
        .catch(error => {
            console.error('Erreur:', error);
            
            const fallbackCryptos = [
                {id: 'bitcoin', name: 'Bitcoin', symbol: 'btc'},
                {id: 'ethereum', name: 'Ethereum', symbol: 'eth'},
                {id: 'binancecoin', name: 'BNB', symbol: 'bnb'},
                {id: 'solana', name: 'Solana', symbol: 'sol'},
                {id: 'cardano', name: 'Cardano', symbol: 'ada'}
            ];
            
            fallbackCryptos.forEach(crypto => {
                const option1 = document.createElement('option');
                option1.value = crypto.id;
                option1.textContent = `${crypto.name} (${crypto.symbol.toUpperCase()}) - $${crypto.current_price}`;
                selectElement.appendChild(option1);

                const option2 = document.createElement('option');
                option2.value = crypto.id;
                option2.textContent = `${crypto.name} (${crypto.symbol.toUpperCase()}) - $${crypto.current_price}`;
                selectElement_deux.appendChild(option2);
            });
        });
});