// Menu Mobile
document.querySelector('.mobile-menu-button').addEventListener('click', function() {
    const nav = document.querySelector('.main-nav');
    nav.style.display = nav.style.display === 'flex' ? 'none' : 'flex';
});

// Ajustar menu em redimensionamento
window.addEventListener('resize', function() {
    if (window.innerWidth > 768) {
        document.querySelector('.main-nav').style.display = 'flex';
    } else {
        document.querySelector('.main-nav').style.display = 'none';
    }
});