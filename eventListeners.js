function mouseDragged() {
	UI.mouseDragged();
	Drag.mouseDragged();
	plot.mouseDragged();
}

function mousePressed() {
	UI.mousePressed();
	Drag.mousePressed();
	plot.mousePressed();
}

function mouseClicked() {
    UI.mouseClicked();
	Drag.mouseClicked();
}

function mouseReleased() {
    UI.mouseReleased();
	Drag.mouseReleased();
}

function mouseWheel(event) {
	UI.mouseWheel(event);
	plot.mouseWheel(event);
}

// function keyPressed() {
//   if(keyCode === 83){
//
//   }
// }

