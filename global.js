// load navbar
fetch('../navbar.html')
    .then(response => response.text())
    .then(data => {
        document.getElementById('navbar').innerHTML = data;
    });

// carousel
const carousels = document.querySelectorAll('.carousel-container');

carousels.forEach((container) => {
    const carousel = container.querySelector('.carousel');
    const leftButton = container.querySelector('.scroll-button.left');
    const rightButton = container.querySelector('.scroll-button.right');
    const markers = container.querySelectorAll('.marker');
    const cards = container.querySelectorAll('.card');

    leftButton.addEventListener('click', () => {
        carousel.scrollBy({ left: -300, behavior: 'smooth' });
    });

    rightButton.addEventListener('click', () => {
        carousel.scrollBy({ left: 300, behavior: 'smooth' });
    });

    // scroll markers
    markers.forEach((marker, index) => {
        marker.addEventListener('click', () => {
            const cardWidth = cards[0].offsetWidth + parseInt(getComputedStyle(carousel).gap);
            carousel.scrollTo({ left: index * cardWidth, behavior: 'smooth' });

            markers.forEach(m => m.classList.remove('active'));
            marker.classList.add('active');
        });
    });

    // active marker
    carousel.addEventListener('scroll', () => {
        const scrollLeft = carousel.scrollLeft;
        const cardWidth = cards[0].offsetWidth + parseInt(getComputedStyle(carousel).gap);
        const activeIndex = Math.round(scrollLeft / cardWidth);

        markers.forEach(m => m.classList.remove('active'));
        if (markers[activeIndex]) {
            markers[activeIndex].classList.add('active');
        }
    });
});

// Section navigation
const sections = document.querySelectorAll('.journal-entry');
const downButton = document.querySelector('.down-button');

downButton.addEventListener('click', () => {
    if (sections.length === 0) return;

    // Check if the button is in "back-to-top" mode
    if (downButton.classList.contains('back-to-top')) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        downButton.classList.remove('back-to-top');
        downButton.textContent = '↓';
        return;
    }

    // Get the current scroll position
    const currentScrollPosition = window.scrollY;

    // Find the next section based on the current scroll position
    let nextSection = null;
    for (const section of sections) {
        const sectionTop = section.offsetTop;
        if (sectionTop > currentScrollPosition) {
            nextSection = section;
            break;
        }
    }

    // If a next section is found, scroll to it
    if (nextSection) {
        nextSection.scrollIntoView({ behavior: 'smooth' });
    }

    // Check if the next section is the last one
    const lastSection = sections[sections.length - 1];
    if (nextSection === lastSection) {
        downButton.classList.add('back-to-top');
        downButton.textContent = '↑';
    }
});

window.addEventListener('scroll', () => {
    // Reset the button if the user manually scrolls to the top
    if (window.scrollY === 0) {
        downButton.classList.remove('back-to-top');
        downButton.textContent = '↓';
    }
});