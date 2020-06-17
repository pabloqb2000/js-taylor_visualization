function mouseDragged() {
	let r = UI.mouseDragged() || Drag.mouseDragged();
	if(!r){
		let p = plot.pos.copy();
		let s = plot.scale.copy();
		plot.mouseDragged();
		node.updatePos(p, s);
	} 
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
	let p = plot.pos.copy();
	let s = plot.scale.copy();
	plot.mouseWheel(event);
	node.updatePos(p, s);
}

function keyPressed() {
  UI.keyPressed();
}

function keyTyped() {
	UI.keyTyped();
}

