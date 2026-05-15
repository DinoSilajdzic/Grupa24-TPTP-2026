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