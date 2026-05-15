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
// --- 4. DYNAMICKÉ NAČÍTÁNÍ Z CSV (S DIAGNOSTIKOU) ---
    fetch('data.csv')
        .then(odpoved => {
            // Kontrola, jestli GitHub ten soubor vůbec našel
            if (!odpoved.ok) {
                throw new Error("Soubor data.csv nebyl nalezen (Chyba 404). Zkontroluj název a koncovku na GitHubu!");
            }
            return odpoved.text();
        })
        .then(data => {
            const radky = data.split(/\r?\n/); 
            const kontejner = document.getElementById('expozice-kontejner');
            
            if (!kontejner) return;
            kontejner.innerHTML = ''; 

            let nactenoKaret = 0;

            for (let i = 1; i < radky.length; i++) {
                if (radky[i].trim() === '') continue; 

                const sloupce = radky[i].split(';'); 
                
                if (sloupce.length >= 4) {
                    const nazev = sloupce[0].trim();
                    const popis = sloupce[1].trim();
                    const kategorie = sloupce[2].trim();
                    const obrazek = sloupce[3].trim();

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
                    kontejner.innerHTML += kartaHTML; 
                    nactenoKaret++;
                }
            }

            // Pokud se načetl soubor, ale nebyla v něm správná data
            if (nactenoKaret === 0) {
                kontejner.innerHTML = `<p style="color: #ff007f; text-align: center; width: 100%; font-size: 1.2rem;">Soubor se načetl, ale nenašly se v něm žádné správné řádky. Zkontroluj, jestli je v CSV jako oddělovač použit středník (;).</p>`;
            }
        })
        .catch(chyba => {
            // Vypíše chybu přímo na web místo prázdného místa!
            const kontejner = document.getElementById('expozice-kontejner');
            if (kontejner) {
                kontejner.innerHTML = `<p style="color: #00f2fe; text-align: center; width: 100%; font-size: 1.2rem; background: rgba(0,0,0,0.5); padding: 20px; border-radius: 10px;"><b>Kritická chyba:</b> ${chyba.message}</p>`;
            }
            console.error('Chyba při načítání CSV:', chyba);
        });čítání CSV:', chyba));
