class TaylorInterp {
    /**
     * 
     * @param plot Plot containing the function to be interpolated
     * @param speed
     */
    constructor(plot, speed) {
        this.plot = plot;
        this.speed = speed*1000;
        this.plot.colors.push(colors[1]);
        this.plot.legends.push("Taylor");

        this.reset();
    }

    /**
     * Update the polynomial that is
     * used to interpolate the function
     */
    update() {
        let f = this.plot.functions[0];
        let t = (millis() - this.time) / this.speed;
        let n = ceil(t);
        if(n <= degreeSld.value) {
            let x0 = this.getX0();
            if(this.coefs.length < n){
                this.coefs.push(this.derivate(f, n-1, x0)); // Derivative allready comes divided by n!
            }
            let lastCoef = this.derivate(f, n, x0) * ((t-(n-1)) ** 2);
            let p = (x) => {
                return this.horner(this.coefs.concat([lastCoef]), x, x0);
            };

            if(this.plot.functions.length > 1) {
                this.plot.functions[1] = p;
            } else {
                this.plot.functions.push(p);
            }
        }
    }

    /**
     * Use horners algorithm to evaluate the polynomial
     * with the given coeficients for the given x value
     * The coeficients should be expressed for the base (x-x0)^i
     * 
     * @param coefs 
     * @param x
     * @param x0
     */
    horner(coefs, x, x0) {
        x = x - x0;
        let r = coefs[coefs.length - 1];
        for(let i = coefs.length - 1; i >= 1; i--) {
            r = r*x + coefs[i-1];
        }
        return r;
    }

    /**
     * Calculates the nth derivative of the f function
     * at the x0 value (divided by factorial(n))
     * because n! is cancelled out in the taylor formula
     */
    derivate(f, n, x0) {
        if(n==0) return f(x0);
        let h = 1e-3;
        let d = 0;
        for(let k = 0; k <= n; k++){
            d += (-1)**(k+n) / (this.factorial(k) * this.factorial(n - k)) * f(x0 + k*h);
        }
        return d/(h**n); // factorial(n) is cancelled out later
    }

    /**
     * Calculate the factorial of a number
     */
    factorial(n) {
        let r = 1;
        for(let k = n; k > 1; k--)
            r *= k;
        return r;
    }

    /**
     * Get the position of the node
     * in plot coordinates
     */
    getX0() {
        return (node.pos.x - width/2 + this.plot.pos.getX()) / this.plot.scale.getX();
    }

    /**
     * Reset interpolation
     */
    reset() {
        this.time = millis();
        let f = this.plot.functions[0];
        this.coefs = [f(this.getX0())]
    }
}