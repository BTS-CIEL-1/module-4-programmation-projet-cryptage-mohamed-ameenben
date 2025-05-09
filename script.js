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
