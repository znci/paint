
let currentDropdown = null;
let dropdownHovered = false;
let dropdownGap = 20;

function initDropdowns() {
	document.querySelectorAll(".dropdown").forEach((v) => {
		const activator = v.querySelector(".dropdown-activator");
		const content = v.querySelector(".dropdown-content");
	
		activator.addEventListener("click", (e) => {
			const drop = v.querySelector(".dropdown-content");
	
			document.querySelectorAll(".dropdown").forEach((p) => {
				p.querySelector(".dropdown-content").style.display = "none"; 
			})
			drop.style.display = "block";
	
			currentDropdown = v;
		})
	
		v.addEventListener("mouseenter", (e) => {
			dropdownHovered = true;
		})
		v.addEventListener("mouseleave", (e) => {
			dropdownHovered = false;
		})
		document.addEventListener("click", (e) => {
			if (!dropdownHovered && currentDropdown) {
				currentDropdown.querySelector(".dropdown-content").style.display = "none";
			}
		})
	})
}