async function getSaissieUtilisateur(montant=0, devise_originaire="", devise_souhaitee="") {
    if (devise_originaire ==="" && devise_souhaitee === "" && montant === 0) {
        var montant = parseFloat(document.getElementById('montant').value);
        var devise_originaire = document.getElementById('deviseOriginaire').value;
        var devise_souhaitee = document.getElementById('deviseSouhaitee').value;

        if (!montant || !devise_originaire || !devise_souhaitee) {
            alert("Veuillez remplir tous les champs.");
            return;
        } else if (montant < 0) {
            document.getElementById('resultat').innerHTML = "valeur non autorisée";
            return;
        }
    }
    
    fetch("https://openexchangerates.org/api/latest.json?app_id=439a0781a399452a865e2e4fcdcedd25")
        .then(response => response.json())
        .then(data => {
            const rates = data.rates;

    if (devise_originaire === 'USD') {
        let DS = rates[devise_souhaitee]
        let new_montant = montant*DS;
        new_montant = new_montant.toFixed(3) + ` ${devise_souhaitee}`;
        document.getElementById('resultat').innerHTML = new_montant;
    }

    else {
        var DO = rates[devise_originaire];
        var new_montant = montant/DO;
        document.getElementById('resultat').innerHTML = new_montant;
        return getSaissieUtilisateur(new_montant, 'USD', devise_souhaitee);
    }})
    .catch(error => {
            console.error("Erreur :", error);
        });
}