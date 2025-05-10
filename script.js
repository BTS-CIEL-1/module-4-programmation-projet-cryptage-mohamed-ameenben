// Gère le changement d'onglet Crypter/Décrypter
document.addEventListener('DOMContentLoaded', function () {
    const tabs = document.querySelectorAll('.tabs .tab');
    const contents = document.querySelectorAll('.tab-content');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const target = tab.getAttribute('data-tab');

            // Désactiver tous les onglets
            tabs.forEach(t => t.classList.remove('active'));
            contents.forEach(c => c.classList.remove('active'));

            // Activer l'onglet cliqué
            tab.classList.add('active');
            document.getElementById(target).classList.add('active');
        });
    });
});


document.addEventListener("DOMContentLoaded", function() {
    const encryptSubmitButton = document.getElementById("encryptSubmit");
    const encryptTypeSelect = document.getElementById("encryptType");
    const encryptTextArea = document.getElementById("encryptText");
    const encryptFileInput = document.getElementById("encryptFile");
    const encryptKeyInput = document.getElementById("encryptKey");
    const encryptFileName = document.getElementById("encryptFileName");

    // Vérifie si CryptoJS est bien chargé
    if (typeof CryptoJS === 'undefined') {
        console.error("CryptoJS n'est pas défini !");
        return;
    } else {
        console.log("CryptoJS est défini !");
    }

    // Fonction pour crypter un texte
    function encryptText(text, key) {
        return CryptoJS.AES.encrypt(text, key).toString();
    }

    // Fonction pour télécharger un fichier crypté
    function downloadFile(filename, content) {
        console.log("Téléchargement : ", filename); // Juste pour tester
        const blob = new Blob([content], { type: 'application/octet-stream' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = filename;
        link.click(); // Cela déclenche le téléchargement
    }

    // Gérer l'événement sur le bouton "Crypter"
    encryptSubmitButton.addEventListener("click", function() {
        console.log("Bouton Crypter cliqué");
        const encryptKey = encryptKeyInput.value;

        // Vérifie si une clé a été fournie
        if (!encryptKey) {
            alert("Veuillez entrer une clé de cryptage.");
            return;
        }

        const encryptType = encryptTypeSelect.value;

        if (encryptType === "text") {
            // Crypter du texte
            const textToEncrypt = encryptTextArea.value;
            if (!textToEncrypt) {
                alert("Veuillez entrer du texte à crypter.");
                return;
            }
            const encryptedText = encryptText(textToEncrypt, encryptKey);
            downloadFile("encrypted_text.txt", encryptedText);
            alert("Texte crypté avec succès !");

        } else if (encryptType === "file") {
            // Crypter un fichier
            const file = encryptFileInput.files[0];
            if (!file) {
                alert("Veuillez sélectionner un fichier à crypter.");
                return;
            }

            const reader = new FileReader();

            reader.onload = function (e) {
                console.log("Fichier lu avec succès");
                const arrayBuffer = e.target.result;
                const wordArray = CryptoJS.lib.WordArray.create(arrayBuffer); // Convertir le buffer en WordArray
                const encrypted = CryptoJS.AES.encrypt(wordArray, encryptKey).toString();
                downloadFile(file.name + ".encrypted", encrypted);
                alert("Fichier crypté avec succès !");
            };

            reader.readAsArrayBuffer(file); // Lire le fichier comme ArrayBuffer pour le crypter
        }
    });

});

// Gérer le bouton "Parcourir" et afficher le nom du fichier sélectionné
document.addEventListener("DOMContentLoaded", function () {
    const encryptFileBrowse = document.getElementById("encryptFileBrowse");
    const encryptFileInput = document.getElementById("encryptFile");
    const encryptFileName = document.getElementById("encryptFileName");

    // Quand on clique sur "Parcourir", on déclenche le clic sur l'input caché
    encryptFileBrowse.addEventListener("click", function () {
        encryptFileInput.click();
    });

    // Afficher le nom du fichier sélectionné
    encryptFileInput.addEventListener("change", function () {
        if (encryptFileInput.files.length > 0) {
            encryptFileName.textContent = encryptFileInput.files[0].name;
        } else {
            encryptFileName.textContent = "";
        }
    });
});
