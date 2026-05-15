document.addEventListener('DOMContentLoaded', function() {

    // --- 0. EFEKT PRO STICKY MENU ---
    const header = document.getElementById('main-header');
    const logoIcon = document.getElementById('main-logo');
    const logoText = document.querySelector('.logo-link h1');

    window.addEventListener('scroll', function() {
        const isDesktop = window.innerWidth >= 576;

        if (window.scrollY > 50) {
            header.style.padding = "5px 0";
            header.style.background = "rgba(10, 8, 30, 0.95)";
            
            if (isDesktop && logoIcon && logoText) {
                logoIcon.style.height = "35px";
                logoText.style.fontSize = "1.3rem";
            }
        } else {
            header.style.padding = "10px 0";
            header.style.background = "rgba(15, 12, 41, 0.85)";
            
            if (isDesktop && logoIcon && logoText) {
                logoIcon.style.height = "50px";
                logoText.style.fontSize = "1.8rem";
            } else if (logoIcon) {
                logoIcon.style.height = "40px";
            }
        }
    });

    // --- 1. ODPOČET ---
    const datumKonce = new Date("Sep 1, 2026 18:00:00").getTime();

    const timer = setInterval(function() {
        const nyni = new Date().getTime();
        const rozdil = datumKonce - nyni;

        const dny = Math.floor(rozdil / (1000 * 60 * 60 * 24));
        const hodiny = Math.floor((rozdil % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minuty = Math.floor((rozdil % (1000 * 60 * 60)) / (1000 * 60));
        const vteriny = Math.floor((rozdil % (1000 * 60)) / 1000);

        const elDays = document.getElementById("days");
        const elHours = document.getElementById("hours");
        const elMinutes = document.getElementById("minutes");
        const elSeconds = document.getElementById("seconds");

        if (elDays && elHours && elMinutes && elSeconds) {
            elDays.innerText = dny < 10 ? "0" + dny : dny;
            elHours.innerText = hodiny < 10 ? "0" + hodiny : hodiny;
            elMinutes.innerText = minuty < 10 ? "0" + minuty : minuty;
            elSeconds.innerText = vteriny < 10 ? "0" + vteriny : vteriny;
        }

        if (rozdil < 0) {
            clearInterval(timer);
            const countdownEl = document.getElementById("countdown");
            if (countdownEl) countdownEl.innerHTML = "<h3 style='color:white;'>Výstava je nyní otevřena!</h3>";
        }
    }, 1000);

    // --- 2. FAQ ---
    const otazky = document.querySelectorAll(".faq-question");

    otazky.forEach(function(otazka) {
        otazka.addEventListener("click", function() {
            const aktivniOdpoved = document.querySelector(".faq-answer.active");
            if (aktivniOdpoved && aktivniOdpoved !== this.nextElementSibling) {
                aktivniOdpoved.classList.remove("active");
            }
            const odpoved = this.nextElementSibling;
            if (odpoved) odpoved.classList.toggle("active");
        });
    });

}); // Zde končí DOMContentLoaded

// --- 3. CAROUSEL ---
function scrollCarousel(smer) {
    const posuvnik = document.getElementById("carousel");
    if (posuvnik) {
        posuvnik.scrollBy({ left: smer * 350, behavior: 'smooth' });
    }
}
