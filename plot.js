class Plot {
    /**
     * @param fs Array of functions to plot
     * @param pos Initial position of the plot
     * @param scale Initial scale of the plot
     */
    constructor(fs=null, pos=null, scale=null) {
        this.functions = fs==null ? [] : fs;
        this.pos = pos==null ? new Vector([0,0]) : pos; 
        this.scale = scale==null ? new Vector([10/width, 10/height]) : scale;

        this.cellL = 10; // Size of cells in plot units
    }

    draw() {
        this.drawCells();
        for(let f of this.functions) {
            this.plot(f);
        }
    }

    drawCells() {
        // Plot cells
        strokeWeight(1);
        stroke(120);

        // Plot axis
        stroke(230);
            // X axis
        if(this.pos.getY() > -height && this.pos.getY() < height) {
            line(-width/2, -this.pos.getY(), width/2, -this.pos.getY());
        }
            // Y axis
        if(this.pos.getX() > -width && this.pos.getX() < width) {
            line(-this.pos.getX(), -height/2, -this.pos.getX(), height/2);
        }
    }

    plot(f) {

    }
}