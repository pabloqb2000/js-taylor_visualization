class Plot {
    /**
     * @param fs Array of functions to plot
     * @param pos Initial position of the plot
     * @param scale Initial scale of the plot
     */
    constructor(fs=null, pos=null, scale=null, colors=[]) {
        this.functions = fs==null ? [] : fs;
        this.pos = pos==null ? new Vector([0,0]) : pos; 
        this.scale = scale==null ? new Vector([max(width,height)/25, max(width,height)/25]) : scale;

        this.cellL = 1; // Size of cells in plot units
        this.mouseSensitivity = 0.0005;
    }

    /**
     * Draw the plot
     */
    draw() {
        translate(-this.pos.getX(), this.pos.getY());

        // Draw the orthogonal grid
        this.drawCells();

        // Plot the functions
        for(let f of this.functions) {
            this.plot(f);
        }

        translate(this.pos.getX(), -this.pos.getY());
    }

    /**
     * Draw the orthogonal grid
     */
    drawCells() {
        // Recalculate size of cells
        if(width / (this.cellL * this.scale.getX()) > 100)
            this.cellL *= 10;
        if(width / (this.cellL * this.scale.getX()) < 10)
            this.cellL /= 10;

        // Plot cells
        strokeWeight(1);
        stroke(60);
            // x lines
        let s = this.cellL * this.scale.getY();
        for(let y = s; y < height/2 - this.pos.getY(); y += s)
            line(-width/2 + this.pos.getX(), y, width/2 + this.pos.getX(), y);
        for(let y = -s; y > -height/2 - this.pos.getY(); y -= s)
            line(-width/2 + this.pos.getX(), y, width/2 + this.pos.getX(), y);            
            // y lines
        s = this.cellL * this.scale.getX();
        for(let x = s; x < width/2 + this.pos.getX(); x += s)
            line(x, height/2 - this.pos.getY(), x, -height/2 - this.pos.getY());
        for(let x = -s; x > -width/2 + this.pos.getX(); x -= s)
            line(x, height/2 - this.pos.getY(), x, -height/2 - this.pos.getY());

        // Highlighted lines
        stroke(120);
            // x lines
        s = this.cellL* 10 * this.scale.getY();
        for(let y = s; y < height/2 - this.pos.getY(); y += s)
            line(-width/2 + this.pos.getX(), y, width/2 + this.pos.getX(), y);
        for(let y = -s; y > -height/2 - this.pos.getY(); y -= s)
            line(-width/2 + this.pos.getX(), y, width/2 + this.pos.getX(), y);            
            // y lines
        s = this.cellL* 10 * this.scale.getX();
        for(let x = s; x < width/2 + this.pos.getX(); x += s)
            line(x, height/2 - this.pos.getY(), x, -height/2 - this.pos.getY());
        for(let x = -s; x > -width/2 + this.pos.getX(); x -= s)
            line(x, height/2 - this.pos.getY(), x, -height/2 - this.pos.getY());

        // Plot axis
        stroke(230);
            // X axis
        if(this.pos.getY() > -height && this.pos.getY() < height) {
            line(-width/2 + this.pos.getX(), 0, width/2 + this.pos.getX(), 0);
        }
            // Y axis
        if(this.pos.getX() > -width && this.pos.getX() < width) {
            line(0, -height/2 - this.pos.getY(), 0, height/2 - this.pos.getY());
        }
    }

    /**
     * Plot the given function
     * 
     * @param f 
     */
    plot(f) {

    }

    /**
     * React to the mouse wheel event
     * scaling the plot
     */
    mouseWheel(event) {
        let t = 1 - event.delta * plot.mouseSensitivity;
        let v = new Vector([mouseX - width/2, mouseY - height/2]);
        v.mult(t-1);

        plot.scale.mult(t);
        plot.pos.mult(t).add(v);
    } 

    /**
     * React to the mousePressed event
     */
    mousePressed() {
        this.vMouse = new Vector([mouseX, mouseY]);
    }

    /**
     * React to the mouseDragged event
     */
    mouseDragged() {
        let nMouse = new Vector([mouseX, mouseY]);
        this.pos.add(Vector.sub(this.vMouse, nMouse));
        this.vMouse = nMouse;
    }
}