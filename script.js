document.addEventListener('DOMContentLoaded', function() {

    // --- 0. EFEKT PRO STICKY MENU PŘI SCROLLOVÁNÍ (Aktualizováno pro nové logo) ---
    const header = document.getElementById('main-header');
    const logoIcon = document.getElementById('main-logo');
    // Najdeme i h1 nápis CHROMA v záhlaví
    const logoText = document.querySelector('.logo-link h1');

    window.addEventListener('scroll', function() {
        // Kontrola, zda jsme na PC (šířka nad 576px), aby se nápis neměnil na mobilu
        const isDesktop = window.innerWidth >= 576;

        if (window.scrollY > 50) {
            header.style.padding = "5px 0";
            header.style.background = "rgba(10, 8, 30, 0.95)";
            
            if (isDesktop) {
                logoIcon.style.height = "35px"; // Zmenšení ikony na PC
                logoText.style.fontSize = "1.3rem"; // Zmenšení textu CHROMA na PC
            }
        } else {
            header.style.padding = "10px 0";
            header.style.background = "rgba(15, 12, 41, 0.85)";
            
            if (isDesktop) {
                logoIcon.style.height = "50px"; // Vrácení ikony na PC
                logoText.style.fontSize = "1.8rem"; // Vrácení textu CHROMA na PC
            } else {
                // Vrácení mobilních rozměrů (pro jistotu)
                logoIcon.style.height = "40px";
            }
        }
    });

    // --- 1. ODPOČET (COUNTDOWN) NA NOVOU VÝSTAVU ---
    // Datum otevíračky nastaveno na budoucnost
    const datumKonce = new Date("Sep 1, 2026 18:00:00").getTime();

    const timer = setInterval(function() {
        const nyni = new Date().getTime();
        const rozdil = datumKonce - nyni;

        const dny = Math.floor(rozdil / (1000 * 60 * 60 * 24));
        const hodiny = Math.floor((rozdil % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minuty = Math.floor((rozdil % (1000 * 60 * 60)) / (1000 * 60));
        const vteriny = Math.floor((rozdil % (1000 * 60)) / 1000);

        // Zápis do HTML s nulemi před jednocifernými čísly
        document.getElementById("days").innerText = dny < 10 ? "0" + dny : dny;
        document.getElementById("hours").innerText = hodiny < 10 ? "0" + hodiny : hodiny;
        document.getElementById("minutes").innerText = minuty < 10 ? "0" + minuty : minuty;
        document.getElementById("seconds").innerText = vteriny < 10 ? "0" + vteriny : vteriny;

        // Pokud odpočet skončí
        if (rozdil < 0) {
            clearInterval(timer);
            document.getElementById("countdown").innerHTML = "<h3 style='color:white;'>Výstava je nyní otevřena!</h3>";
        }
    }, 1000);

    // --- 2. FAQ (Akordion / Rozbalovací otázky) ---
    const otazky = document.querySelectorAll(".faq-question");

    otazky.forEach(function(otazka) {
        otazka.addEventListener("click", function() {
            // Zavře všechny ostatní otevřené odpovědi
            const aktivniOdpoved = document.querySelector(".faq-answer.active");
            if (aktivniOdpoved && aktivniOdpoved !== this.nextElementSibling) {
                aktivniOdpoved.classList.remove("active");
            }
            
            // Otevře / zavře kliknutou odpověď
            const odpoved = this.nextElementSibling;
            odpoved.classList.toggle("active");
        });
    });

    // --- 4. DYNAMICKÉ NAČÍTÁNÍ Z CSV (Kritérium zadání splněno!) ---
    // Na GitHub Pages musíme načítat CSV přes AJAX/Fetch
    fetch('data.csv')
        .then(odpoved => odpoved.text()) // Načte obsah jako text
        .then(data => {
            const radky = data.split('\n'); // Rozdělí text na řádky
            const kontejner = document.getElementById('expozice-kontejner');
            
            // Ujistíme se, že je kontejner prázdný před načtením
            kontejner.innerHTML = ''; 

            // Začínáme od indexu 1, abychom přeskočili hlavičku tabulky (Název;Popis...)
            for (let i = 1; i < radky.length; i++) {
                // Přeskočí prázdné řádky na konci souboru
                if (radky[i].trim() === '') continue; 

                const sloupce = radky[i].split(';'); // Rozdělí řádek podle středníku
                const nazev = sloupce[0];
                const popis = sloupce[1];
                const kategorie = sloupce[2];
                const obrazek = sloupce[3]; // Cesty jsou už v CSV nastaveny na images/..

                // Vytvoření HTML pro každou kartu expozice (opraveno pro tmavé pozadí karet)
                const kartaHTML = `
                    <div class="card">
                        <div class="card-img" style="background-image: url('${obrazek}'); background-size: cover; background-position: center;"></div>
                        <div class="card-body">
                            <span class="badge">${kategorie}</span>
                            <h3>${nazev}</h3>
                            <p>${popis}</p>
                        </div>
                    </div>
                `;
                kontejner.innerHTML += kartaHTML; // Přidá hotovou kartu na web
            }
        })
        // Ošetření chyby při načítání
        .catch(chyba => console.error('Chyba při načítání CSV:', chyba));

});

// --- 3. CAROUSEL (Posouvání prémiových výstav) ---
// Tato funkce musí být globální (mimo DOMContentLoaded), aby byla přístupná z HTML onclick atributu
function scrollCarousel(smer) {
    const posuvnik = document.getElementById("carousel");
    // Hodnota posunu o 350px (šátrná pro responzivitu)
    posuvnik.scrollBy({
        left: smer * 350, 
        behavior: 'smooth'
    });
}