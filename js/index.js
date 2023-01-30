
var mouseDown = false,
	x = 0,
	y = 0,
	fillColor = "rgb(255,255,255)",

	px = 0,
	py = 0,
	easing = 0.3,

	brushWidth = 5,

	currentTool

// stuff

function setPenWidth(int) {
	brushWidth = int;
	document.querySelectorAll(".width-selected").forEach((v) => {
		v.innerText = `${int}px`
	})
}
function setEasing(int) {
	easing = int;
}
function setColor(bg) {
	console.log(`Set pen color to ${bg}`);
	document.querySelectorAll(".color-selected").forEach((v) => {
		v.style.backgroundColor = bg;
	})
	document.querySelectorAll(".selected-color").forEach((v) => {
		v.parentElement.parentElement.style.backgroundColor = `transparent`;
		if (bg === `rgb(0, 0, 0)`) {
			v.parentElement.parentElement.style.backgroundColor = `rgb(255, 255, 255)`;
		}
		v.style.stroke = bg;
	})
	fillColor = bg;
}


// 

function setup() {
	createCanvas(windowWidth, windowHeight - 50);
}

function mousePressed() {
	x = mouseX;
	y = mouseY;
	px = mouseX;
	py = mouseY;

	return false;
}

function mouseDragged() {
	switch (currentTool) {
		case "brush":
			var targetX = mouseX,
			targetY = mouseY;
			x += (targetX - x) * easing;
			y += (targetY - y) * easing;

			stroke(fillColor);
			strokeWeight(brushWidth);
			line(x,y,px,py);
			px = x;
			py = y; 
			break;
	
		default:
			break;
	}

	return false;
}

/*======================================
	TOOLS
======================================*/

let toolSelected;

document.querySelectorAll(".select-tool").forEach((v) => {
	v.addEventListener("click", (e) => {
		if(!toolSelected || currentTool === "") {
			toolSelected = v;
			
			if(v.hasAttribute("data-tool")) {
				currentTool = v.attributes["data-tool"].value;
			}

			v.classList.add("selected");

			return;
		}

		toolSelected.classList.remove("selected");
		toolSelected = v;
		currentTool = "";
	})
})

// dropdowns

let currentDropdown = document.querySelector(".current-dropdown");

document.querySelectorAll(".dropdown").forEach((v) => {
	const activator = v.querySelector(".dropdown-activator");
	const content = v.querySelector(".dropdown-content");

	v.addEventListener("click", (e) => {
		currentDropdown.innerHTML = content.innerHTML;
		currentDropdown.style.display = "flex";
		currentDropdown.style.top = e.clientY + `px`;
		currentDropdown.style.left = e.clientX + `px`;
	})
});

function downloadCanvas() {
	var a = document.createElement("a");
	a.href = document.querySelector(".p5Canvas").toDataURL();
	a.download = "image.png";
	console.log(a);
	document.body.appendChild(a);
	a.click();
	document.body.removeChild(a);
};