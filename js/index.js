
var mouseDown = false,
	x = 0,
	y = 0,
	fillColor = "rgb(255,255,255)",

	px = 0,
	py = 0,
	easing = 0.4,

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

	console.log("a");

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

function initTools() {
	document.querySelectorAll(".select-tool").forEach((v) => {
		compListener(v, (e) => {
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
}

/**
 * Adds multiple listeners to multiple events.
 * @param {string} el 
 * @param {object} events 
 * @param {function} func 
 */
function multiListener(el, events, func) {
	if(!typeof events === "object") throw new Error("Invalid events");
	if(!typeof func === "function") throw new Error("Invalid function");

	events.forEach((v) => {
		el.addEventListener(v, func);
	})
}

/**
 * Function to fix compatibility on mobile.
 * Relies on multiListener().
 */
function compListener(el, func) {
	multiListener(el, ["click", "touchmove", "touchend"], func);
}

function downloadCanvas(type) {
	const allowedTypes = [
		"image/png",
		"image/jpeg",
	]

	if (!allowedTypes.includes(type)) {
		console.error("Invalid type");
		return;
	}

	var a = document.createElement("a");
	a.href = document.querySelector(".p5Canvas").toDataURL(type);
	a.download = "image.png";
	console.log(a);
	document.body.appendChild(a);
	a.click();
	document.body.removeChild(a);
}

// toolbar ugh

let selectedToolbar = "";

const toolbars = [
	{
		"name": "tool-selector",
		"content": `
			<li class="item select-tool select-brush-tool" data-tool="brush">
				<div class="select-icon">
					<?xml version="1.0" encoding="iso-8859-1"?>
					<svg fill="#ffffff" height="24px" width="24px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" 
						viewBox="0 0 511.862 511.862" xml:space="preserve">
						<g transform="translate(0 -1)">
							<g>
								<g>
									<path d="M127.412,316.657c-16.299,1.143-31.727,8.815-41.259,20.531c-7.62,9.361-10.829,20.352-9.276,31.795
										c1.451,10.675-2.082,21.154-9.685,28.757c-24.576,24.576-44.988,29.841-57.967,29.841c-0.247,0-0.512-0.034-0.691-0.009
										c-3.661,0-6.929,2.347-8.098,5.845c-1.169,3.516,0.068,7.398,3.063,9.583c3.422,2.492,61.798,44.416,119.159,44.416
										c23.262,0,46.353-6.895,65.553-26.095c32.606-32.606,34.782-84.506,4.949-118.161
										C175.685,323.45,154.087,314.831,127.412,316.657z"/>
									<path d="M496.237,42.658l-2.517-2.517c-18.185-18.202-47.667-18.278-67.14-0.137l-11.025,10.402l26.402,26.402
										c3.328,3.337,3.328,8.73,0,12.066c-1.673,1.664-3.849,2.5-6.033,2.5c-2.185,0-4.369-0.836-6.033-2.5l-26.76-26.761L390.705,73.83
										l27.11,27.11c3.328,3.336,3.328,8.738,0,12.066c-1.673,1.664-3.857,2.5-6.033,2.5c-2.185,0-4.369-0.836-6.033-2.5l-27.469-27.469
										L150.082,300.68c21.632,3.379,40.397,13.739,55.851,31.172c18.159,20.471,26.428,46.549,25.131,72.363L496.408,119.27
										C517.075,97.067,517.007,63.42,496.237,42.658z"/>
								</g>
							</g>
						</g>
					</svg>
				</div>
			</li>

			<li class="item select-tool select-text-tool" data-tool="text">
				<div class="select-icon">
					<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-cursor-text" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="#ffffff" fill="none" stroke-linecap="round" stroke-linejoin="round">
						<path stroke="none" d="M0 0h24v24H0z" fill="none"/>
						<path d="M10 12h4" />
						<path d="M9 4a3 3 0 0 1 3 3v10a3 3 0 0 1 -3 3" />
						<path d="M15 4a3 3 0 0 0 -3 3v10a3 3 0 0 0 3 3" />
					</svg>
				</div>
			</li>
		`,
	},
	{
		"name": "drawing-options",
		"content": `
			<li class="item select-color dropdown">
				<div class="dropdown-activator select-icon">
					<svg xmlns="http://www.w3.org/2000/svg" class="selected-color icon icon-tabler icon-tabler-palette" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="#ffffff" fill="none" stroke-linecap="round" stroke-linejoin="round">
						<path stroke="none" d="M0 0h24v24H0z" fill="none"/>
						<path d="M12 21a9 9 0 1 1 0 -18a9 8 0 0 1 9 8a4.5 4 0 0 1 -4.5 4h-2.5a2 2 0 0 0 -1 3.75a1.3 1.3 0 0 1 -1 2.25" />
						<circle cx="7.5" cy="10.5" r=".5" fill="currentColor" />
						<circle cx="12" cy="7.5" r=".5" fill="currentColor" />
						<circle cx="16.5" cy="10.5" r=".5" fill="currentColor" />
					</svg>
				</div>
				<div class="dropdown-content">
					<div class="sel-box color-selected large" style="background-color: rgb(255, 255, 255);" data-color="rgb(255, 255, 255)"></div>
					<div class="sel-box-grid">
						<div onclick="setColor(this.style.backgroundColor)" title="Red" class="color sel-box" style="background-color: rgb(255, 40, 37);" data-color="rgb(255, 40, 37)"></div>
						<div onclick="setColor(this.style.backgroundColor)" title="Pink" class="color sel-box" style="background-color: rgb(253, 0, 97);" data-color="rgb(253, 0, 97)"></div>
						<div onclick="setColor(this.style.backgroundColor)" title="Magenta" class="color sel-box" style="background-color: rgb(169, 5, 182);" data-color="rgb(169, 5, 182)"></div>
						<div onclick="setColor(this.style.backgroundColor)" title="Purple" class="color sel-box" style="background-color: rgb(111, 50, 190);" data-color="rgb(111, 50, 190)"></div>
						<div onclick="setColor(this.style.backgroundColor)" title="Cyan" class="color sel-box" style="background-color: rgb(0, 171, 251);" data-color="rgb(0, 171, 251)"></div>
						<div onclick="setColor(this.style.backgroundColor)" title="Turquoise" class="color sel-box" style="background-color: rgb(0, 191, 216);" data-color="rgb(0, 191, 216)"></div>
						<div onclick="setColor(this.style.backgroundColor)" title="Teal" class="color sel-box" style="background-color: rgb(0, 153, 136);" data-color="rgb(0, 153, 136)"></div>
						<div onclick="setColor(this.style.backgroundColor)" title="Green" class="color sel-box" style="background-color: rgb(0, 179, 65);" data-color="rgb(0, 179, 65)"></div>
						<div onclick="setColor(this.style.backgroundColor)" title="Apple Green" class="color sel-box" style="background-color: rgb(123, 198, 45);" data-color="rgb(123, 198, 45)"></div>
						<div onclick="setColor(this.style.backgroundColor)" title="Yellow" class="color sel-box" style="background-color: rgb(201, 222, 0);" data-color="rgb(201, 222, 0)"></div>
						<div onclick="setColor(this.style.backgroundColor)" title="Orange Yellow" class="color sel-box" style="background-color: rgb(255, 236, 0);" data-color="rgb(255, 236, 0)"></div>
						<div onclick="setColor(this.style.backgroundColor)" title="Gold Yellow" class="color sel-box" style="background-color: rgb(255, 191, 0);" data-color="rgb(255, 191, 0)"></div>
						<div onclick="setColor(this.style.backgroundColor)" title="Orange" class="color sel-box" style="background-color: rgb(255, 147, 0);" data-color="rgb(255, 147, 0)"></div>
						<div onclick="setColor(this.style.backgroundColor)" title="Warm Red" class="color sel-box" style="background-color: rgb(255, 69, 0);" data-color="rgb(255, 69, 0)"></div>
						<div onclick="setColor(this.style.backgroundColor)" title="Brown" class="color sel-box" style="background-color: rgb(127, 83, 69);" data-color="rgb(127, 83, 69)"></div>
						<div onclick="setColor(this.style.backgroundColor)" title="Grey" class="color sel-box" style="background-color: rgb(158, 158, 158);" data-color="rgb(158, 158, 158)"></div>
						<div onclick="setColor(this.style.backgroundColor)" title="Grey Turquoise" class="color sel-box" style="background-color: rgb(89, 126, 141);" data-color="rgb(89, 126, 141)"></div>
						<div onclick="setColor(this.style.backgroundColor)" title="Black" class="color sel-box" style="background-color: rgb(0, 0, 0);" data-color="rgb(0, 0, 0)"></div>
						<div onclick="setColor(this.style.backgroundColor)" title="White" class="color sel-box" style="background-color: rgb(255, 255, 255);" data-color="rgb(255, 255, 255)"></div>
					</div>
				</div>
			</li>
			<li class="item select-width dropdown">
				<div class="dropdown-activator select-icon">
					<svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-ruler-2" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="#ffffff" fill="none" stroke-linecap="round" stroke-linejoin="round">
						<path stroke="none" d="M0 0h24v24H0z" fill="none"/>
						<path d="M17 3l4 4l-14 14l-4 -4z" />
						<path d="M16 7l-1.5 -1.5" />
						<path d="M13 10l-1.5 -1.5" />
						<path d="M10 13l-1.5 -1.5" />
						<path d="M7 16l-1.5 -1.5" />
					</svg>
				</div>
				<div class="dropdown-content align-center">
					<div class="width-selected" data-width="5">5px</div>
					<div class="smaller sel-box-grid-small">
						<div onclick="setPenWidth(this.attributes['data-width'].value);" class="width-selector" data-width="1">1px</div>
						<div onclick="setPenWidth(this.attributes['data-width'].value);" class="width-selector" data-width="5">5px</div>
						<div onclick="setPenWidth(this.attributes['data-width'].value);" class="width-selector" data-width="10">10px</div>
						<div onclick="setPenWidth(this.attributes['data-width'].value);" class="width-selector" data-width="15">15px</div>
						<div onclick="setPenWidth(this.attributes['data-width'].value);" class="width-selector" data-width="20">20px</div>
					</div>
				</div>
			</li>
		`
	},
	{
		name: "export-options",
		content: `
			Export as... &nbsp;<a href="#" onclick="downloadCanvas('image/png')">PNG</a> ,&nbsp;<a href="#" onclick="downloadCanvas('image/jpeg')">JPEG</a>
		`
	}
]



toolbars.forEach(v => {
	compListener(document.querySelector(`.toolbar .items li.item.${v.name}`), () => {
		if (selectedToolbar !== v.name) {
			setToolbar(v.name);
		}
	})
})

window.onload = () => {
	setToolbar("tool-selector");
}

function setToolbar(type) {
	const el = document.querySelector(`.toolbar .items li.item.${type}`);
	console.log("Setting toolbar to " + type);

	if(selectedToolbar) {
		document.querySelector(`.toolbar .items li.item.${selectedToolbar}`).classList.remove("selected");
	}

	selectedToolbar = type;
	el.classList.add("selected");

	const toolContent = toolbars.find(v => v.name === type).content;

	document.querySelector(".navbar .items").innerHTML = toolContent;

	initTools();
	initDropdowns();
}