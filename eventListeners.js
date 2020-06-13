function mouseDragged() {
	UI.mouseDragged();
	Drag.mouseDragged();

	let nMouse = new Vector([mouseX, mouseY]);
	plot.pos.add(Vector.sub(vMouse, nMouse));
	vMouse = nMouse;
}

function mousePressed() {
	UI.mousePressed();
	Drag.mousePressed();
	vMouse = new Vector([mouseX, mouseY]);
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
	let t = 1 - event.delta * plot.mouseSensitivity;
	let v = new Vector([mouseX - width/2, mouseY - height/2]);
	v.mult(t-1);

	plot.scale.mult(t);
	plot.pos.add(v);
}

// function keyPressed() {
//   if(keyCode === 83){
//
//   }
// }

