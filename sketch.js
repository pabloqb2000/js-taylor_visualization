let plot, taylor;
let fncInput, addBtn, degreeSld, resetBtn;
let colors = [[227, 103, 86], [86, 210, 227], [105, 227, 86], [227, 226, 86]];
let errorTxt = "";
let node;

function setup() {
	textFont("Orbitron");
	createCanvas(windowWidth, windowHeight);
	background(32);

	// Create plot
	plot = new Plot([sin], [color(colors[0])], ["sin(x)"]);
	taylor = new TaylorInterp(plot, 120);

	// Create UI elements
	fncInput = new TextInput(32, "x**2", 0,0, height/20, addFnc);
	addBtn = new Button(0,0, width/8, height/20, "Change", addFnc);
	degreeSld = new Slider(0, 5, 5, 0,0, width/12, height/60, 1, "Degree", true, 0, () => taylor.reset());
	resetBtn = new Button(0,0, width/12, height/30, "Reset", () => taylor.reset());

	// Create node
	node = new DragNode(createVector(width/2, height/2), 5, () => taylor.reset());

	// Start UI
	UI.tableWidth = 2;
	UI.tableHeight = 100;
	UI.distrubute();
}

function draw() {
	background(32);

	taylor.update();
	
	push();
	translate(width/2, height/2);
	scale(1,-1);

	// Draw plot
	plot.update();
	plot.draw();
	pop();

	
	// Draw UI
	UI.update();
	UI.draw();
	Drag.update();
	Drag.draw();

	textSize(height/40);
	textAlign(LEFT);	
	fill(color(colors[0]));
	noStroke();
	text(errorTxt, fncInput.x, fncInput.y + fncInput.height + height/40 + 10)
}

/**
 * Add the function on the text input
 */
function addFnc() {
	let ftxt = fncInput.text;
	if(ftxt.length != 0 && plot.functions.length < 4) {
		if(validateFnc(ftxt)) {
			plot.functions[0] = (x) => eval(ftxt);
			plot.colors[0] = color(colors[0]);
			plot.legends[0] = ftxt;
			fncInput.clear();
			errorTxt = "";
		} else {
			errorTxt = "Invalid function";
		}
	}
	taylor.reset();
}

/**
 * Verify that the given input is a valid function
 */
function validateFnc(ftxt) {
	for(let i = 0; i < 5; i++) {
		try {
			let x = random(-5, 5);
			let y = eval(ftxt);
			if(typeof(y) != "number") {
				return false;
			}
		} catch {
			return false;
		}
	}
	return true;
}