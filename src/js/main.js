document.addEventListener('DOMContentLoaded', function () {
    const cards = document.querySelectorAll('.movie-card');

    cards.forEach(function (card) {
        card.addEventListener('mouseenter', function () {
            card.style.cursor = 'pointer';
        });
    });

    console.log('Сайт RomanchenkoLab13 успішно завантажено!');
});
