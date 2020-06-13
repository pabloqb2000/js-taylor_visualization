let plot, vMouse;

function setup() {
	textFont("Orbitron");
	createCanvas(windowWidth, windowHeight);
	background(32);

	// Create UI elements


	// Create plot
	plot = new Plot([sin, (x) => x**2]);

	// Start UI
	UI.tableWidth = 1;
	UI.tableHeight = 100;
	UI.distrubute();
}

function draw() {
	// Draw UI and draggable elements
	background(32);
	UI.update();
	UI.draw();
	Drag.update();
	Drag.draw();

	
	translate(width/2, height/2);
	scale(1,-1);

	// Draw plot
	plot.draw();

	scale(1,-1);
	text(frameRate().toFixed(2), 0, height/2);
}
