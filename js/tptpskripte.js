// Tamni mod
let dugme = document.getElementById("theme-toggle");

if (localStorage.getItem("tema") === "tamna") {
    document.body.classList.add("dark-mode");
    dugme.textContent = "Svijetli mod";
}

dugme.addEventListener("click", function() {
      
    document.body.classList.toggle("dark-mode");
	
    if (document.body.classList.contains("dark-mode")) {
        localStorage.setItem("tema", "tamna"); 
        dugme.textContent = "Svijetli mod";    
    } 
    else {
        localStorage.setItem("tema", "svijetla"); 
        dugme.textContent = "Tamni mod";          
    }
});

//Smooth scroll
let linkovi = document.querySelectorAll('a[href^="#"]');


for (let link of linkovi) {
    
    link.addEventListener("click", function(dogadjaj) {
        dogadjaj.preventDefault();
        let cilj = document.querySelector(this.getAttribute("href"));
        cilj.scrollIntoView({ behavior: "smooth" });
        
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