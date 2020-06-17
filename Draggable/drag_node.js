class DragNode extends DragCircle {
    /**
     * If the mouse is over the element
     * dragg it to the mouse position
     * and perform the on drag action
     */
    dragged() {
        this.pos = createVector(mouseX, -plot.pos.getY() + height/2);
        if(this.onDrag != null) this.onDrag();
    }

    updatePos(p, s) {
        let relX = (this.pos.x - width/2 + p.getX()) / s.getX();
        this.pos = createVector(
            relX*plot.scale.getX() - plot.pos.getX() + width/2,
            -plot.pos.getY() + height/2
        );
    }
}