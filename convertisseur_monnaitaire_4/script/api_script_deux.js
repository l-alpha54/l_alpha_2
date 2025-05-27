async function getSaissieUtilisateur() {
    const montant = parseFloat(document.getElementById('montant').value);
    const devise_originaire = document.getElementById('deviseOriginaire').value.toLowerCase();
    const devise_souhaitee = document.getElementById('deviseSouhaitee').value.toLowerCase();

    if (!montant || !devise_originaire || !devise_souhaitee) {
        alert("Veuillez remplir tous les champs.");
        return;
    }  else if (montant < 0) {
            document.getElementById('resultat').innerHTML = "valeur non autorisée";
            return;
        }

    try {
        const response = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${devise_originaire},${devise_souhaitee}&vs_currencies=usd`);
        const data = await response.json();
        
        const tauxOrigine = data[devise_originaire]?.usd;
        const tauxCible = data[devise_souhaitee]?.usd;

        if (!tauxOrigine || !tauxCible) {
            alert("Devise(s) non reconnue(s)");
            return;
        }

        const resultat = (montant * tauxOrigine) / tauxCible;
        document.getElementById('resultat').textContent = `${resultat.toFixed(3)} ${devise_souhaitee}`;
    } catch (error) {
        console.error("Erreur :", error);
        alert("Erreur de connexion à l'API");
    }
}