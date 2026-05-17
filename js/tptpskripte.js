// Tamni mod
let dugmadTema = document.querySelectorAll(".btn-tema");

function postaviTekstTeme(tekst) {
    for (let d of dugmadTema) {
        d.textContent = tekst;
    }
}

if (localStorage.getItem("tema") === "tamna") {
    document.body.classList.add("dark-mode");
    postaviTekstTeme("Svijetli mod");
}

for (let dugme of dugmadTema) {
    dugme.addEventListener("click", function() {
        document.body.classList.toggle("dark-mode");

        if (document.body.classList.contains("dark-mode")) {
            localStorage.setItem("tema", "tamna");
            postaviTekstTeme("Svijetli mod");
        }
        else {
            localStorage.setItem("tema", "svijetla");
            postaviTekstTeme("Tamni mod");
        }
    });
}

// Burger meni (mobil + tablet)
let burgerBtn = document.getElementById("burger-btn");
let menuOverlay = document.getElementById("menu-overlay");
let sideMenu = document.getElementById("side-menu");
let menuZatvori = document.getElementById("menu-zatvori");

function otvoriMeni() {
    document.body.classList.add("menu-otvoren");
    if (burgerBtn) burgerBtn.setAttribute("aria-expanded", "true");
    if (sideMenu) sideMenu.setAttribute("aria-hidden", "false");
    if (menuOverlay) menuOverlay.setAttribute("aria-hidden", "false");
}

function zatvoriMeni() {
    document.body.classList.remove("menu-otvoren");
    if (burgerBtn) burgerBtn.setAttribute("aria-expanded", "false");
    if (sideMenu) sideMenu.setAttribute("aria-hidden", "true");
    if (menuOverlay) menuOverlay.setAttribute("aria-hidden", "true");
}

if (burgerBtn && sideMenu) {
    burgerBtn.addEventListener("click", function() {
        if (document.body.classList.contains("menu-otvoren")) {
            zatvoriMeni();
        }
        else {
            otvoriMeni();
        }
    });

    if (menuOverlay) {
        menuOverlay.addEventListener("click", zatvoriMeni);
    }

    if (menuZatvori) {
        menuZatvori.addEventListener("click", zatvoriMeni);
    }

    let linkoviMeni = sideMenu.querySelectorAll("a");
    for (let link of linkoviMeni) {
        link.addEventListener("click", zatvoriMeni);
    }

    document.addEventListener("keydown", function(dogadjaj) {
        if (dogadjaj.key === "Escape") {
            zatvoriMeni();
        }
    });
}

// Smooth scroll (samo anchor linkovi na istoj stranici)
let linkovi = document.querySelectorAll('a[href^="#"]');

for (let link of linkovi) {
    link.addEventListener("click", function(dogadjaj) {
        let cilj = document.querySelector(this.getAttribute("href"));
        if (cilj) {
            dogadjaj.preventDefault();
            cilj.scrollIntoView({ behavior: "smooth" });
        }
    });
}

//Validacija kontakt forme
let forma = document.getElementById("kontakt-forma");

if (forma) {
    forma.addEventListener("submit", function(dogadjaj) {
        dogadjaj.preventDefault();
        
        let ime = document.getElementById("ime").value;
        let prezime = document.getElementById("prezime").value;
        let email = document.getElementById("email").value;
        let telefon = document.getElementById("telefon").value;
        let tema = document.getElementById("tema").value; 
        let poruka = document.getElementById("poruka").value.trim();
        
        let sveGreske = document.querySelectorAll(".greska");
        let greskaIme = sveGreske[0];
        let greskaPrezime = sveGreske[1];
        let greskaEmail = sveGreske[2];
        let greskaTelefon = sveGreske[3];
        let greskaTema = sveGreske[4];   
        let greskaPoruka = sveGreske[5]; 
        
        greskaIme.textContent = "";
        greskaPrezime.textContent = "";
        greskaEmail.textContent = "";
        greskaTelefon.textContent = "";
        greskaTema.textContent = "";
        greskaPoruka.textContent = "";
        
        let sveJeUredu = true;
        
        if (ime === "") {
            greskaIme.textContent = "Molimo unesite ime.";
            greskaIme.style.color = "red";
            sveJeUredu = false;
        }
        
        if (prezime === "") {
            greskaPrezime.textContent = "Molimo unesite prezime.";
            greskaPrezime.style.color = "red";
            sveJeUredu = false;
        }
        
        if (email === "") {
            greskaEmail.textContent = "Molimo unesite email.";
            greskaEmail.style.color = "red";
            sveJeUredu = false;
        } else if (email.includes("@") === false) {
            greskaEmail.textContent = "Email mora sadržavati znak @.";
            greskaEmail.style.color = "red";
            sveJeUredu = false;
        }

        if (telefon === "") {
            greskaTelefon.textContent = "Molimo unesite broj telefona.";
            greskaTelefon.style.color = "red";
            sveJeUredu = false;
        }

        if (tema === "") {
            greskaTema.textContent = "Molimo odaberite temu upita.";
            greskaTema.style.color = "red";
            sveJeUredu = false;
        }
        
        if (poruka === "") {
            greskaPoruka.textContent = "Molimo unesite poruku.";
            greskaPoruka.style.color = "red";
            sveJeUredu = false;
        }
        
        if (sveJeUredu === true) {
            let ispisPoruke = document.getElementById("uspjesna-poruka");
            ispisPoruke.textContent = "Uspješno poslano! Hvala Vam, " + ime + " " + prezime + ".";
            ispisPoruke.style.color = "green";
            forma.reset();
        }
    });
}

//Filtriranje tabele klikom na sliku

let slikeKategorija = document.querySelectorAll(".kategorija-slika");
let redoviTabele = document.querySelectorAll("#moja-tabela tr");

//Dodavanje funkcije za klik ako na stranici postoje slike
if (slikeKategorija.length > 0 && redoviTabele.length > 0) {
    
    //Prolazimo kroz svaku sliku pojedinačno
    slikeKategorija.forEach(function(slika) {
        
        slika.addEventListener("click", function() {
            let trazenaKategorija = this.getAttribute("data-kategorija");  
            //Prolazimo kroz sve redove u tabeli
            redoviTabele.forEach(function(red, index) {
                if (index === 0) return; 
                if (trazenaKategorija === "sve") {
                    red.style.display = ""; 
                }
                else if (red.classList.contains(trazenaKategorija)) {
                    red.style.display = ""; 
                } 
                else {
                    red.style.display = "none"; 
                }
            });
        });
    });
}

//Filtriranje klikom na kategoriju
//AI mi je preporučio da dodam ovo i pomogao oko čitanja URL-a
let parametriIzAdrese = new URLSearchParams(window.location.search);
let trazenaKategorijaIzUrl = parametriIzAdrese.get("kategorija");

if (trazenaKategorijaIzUrl !== null && redoviTabele.length > 0) {
    redoviTabele.forEach(function(red, index) {
        if (index === 0) return; 
        if (trazenaKategorijaIzUrl === "sve") {
            red.style.display = ""; 
        } 
        else if (red.classList.contains(trazenaKategorijaIzUrl)) {
            red.style.display = ""; 
        } 
        else {
            red.style.display = "none"; 
        }
    });
}


// INTERAKTIVNA KORPA

let dodajDugmad = document.querySelectorAll(".dugme-dodaj");
let korpaSekcija = document.getElementById("korpa-sekcija");
let tekstKorpe = document.getElementById("tekst-korpe");
let porukaNarudzbe = document.getElementById("poruka-narudzbe");
let dugmeNaruci = document.getElementById("dugme-naruci");
let dugmeOdustani = document.getElementById("dugme-odustani");

let brojProizvoda = 0;
let ukupnaCijena = 0;

if (dodajDugmad.length > 0) {
    dodajDugmad.forEach(function(dugme) {
        
        dugme.addEventListener("click", function() {
            let redTabele = this.parentElement.parentElement;
            let cijenaTekst = redTabele.cells[2].textContent;
            let stvarnaCijena = parseFloat(cijenaTekst);
            
            brojProizvoda = brojProizvoda + 1;
            ukupnaCijena = ukupnaCijena + stvarnaCijena;
            
            korpaSekcija.style.display = "block";
            korpaSekcija.classList.add("korpa-otvorena");
            porukaNarudzbe.textContent = ""; 
            tekstKorpe.textContent = "U korpi imate " + brojProizvoda + " proizvoda. Ukupna cijena: " + ukupnaCijena.toFixed(2) + " KM";
        });
        
    });
}

//Akcija za dugme "Naruči"
if (dugmeNaruci) {
    dugmeNaruci.addEventListener("click", function() {
        if (brojProizvoda > 0) {
            porukaNarudzbe.textContent = "Narudžba je poslana!";
            porukaNarudzbe.style.color = "green";
            porukaNarudzbe.classList.remove("anim-poruka");
            void porukaNarudzbe.offsetWidth;
            porukaNarudzbe.classList.add("anim-poruka");
            
            brojProizvoda = 0;
            ukupnaCijena = 0;
            tekstKorpe.textContent = "U korpi imate 0 proizvoda. Ukupna cijena: 0.00 KM";
        }
    });
}

//Akcija za dugme "Odustani"
if (dugmeOdustani) {
    dugmeOdustani.addEventListener("click", function() {
        porukaNarudzbe.textContent = "Odustali ste od kupovine.";
        porukaNarudzbe.style.color = "red";
        porukaNarudzbe.classList.remove("anim-poruka");
        void porukaNarudzbe.offsetWidth;
        porukaNarudzbe.classList.add("anim-poruka");
        brojProizvoda = 0;
        ukupnaCijena = 0;
        tekstKorpe.textContent = "U korpi imate 0 proizvoda. Ukupna cijena: 0.00 KM";
        setTimeout(function() {
            korpaSekcija.style.display = "none";
        }, 2000);
    });
}

//Sat koji pokazuje vrijeme i datum

function azurirajSat() {
    let sada = new Date(); 
    
    let dan = sada.getDate();
    let mjesec = sada.getMonth() + 1;
    let godina = sada.getFullYear();
    
    let sati = sada.getHours().toString().padStart(2, '0');
    let minute = sada.getMinutes().toString().padStart(2, '0');
    let sekunde = sada.getSeconds().toString().padStart(2, '0');
    
    let tekstSata =  + sati + ":" + minute + ":" + sekunde + " | " + dan + "." + mjesec + "." + godina + ".";
    
    let satElement = document.getElementById("dinamicki-sat");
    if (satElement) {
        satElement.textContent = tekstSata;
    }
}
azurirajSat();
setInterval(azurirajSat, 1000);
