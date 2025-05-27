function inverser_devises() {
    let deviseOriginaire = document.getElementById('deviseOriginaire');
    let deviseSouhaitee = document.getElementById('deviseSouhaitee');

    let deviseOriginaireIndex = deviseOriginaire.selectedIndex;
    let deviseSouhaiteeIndex = deviseSouhaitee.selectedIndex;

    deviseOriginaire.selectedIndex = deviseSouhaiteeIndex;
    deviseSouhaitee.selectedIndex = deviseOriginaireIndex;
}