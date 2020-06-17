class TaylorInterp {
    /**
     * 
     * @param plot Plot containing the function to be interpolated
     * @param speed
     */
    constructor(plot, speed) {
        this.plot = plot;
        this.speed = speed;
        this.plot.colors.push(colors[1]);
        this.plot.legends.push("Taylor");

        this.time = 0;
    }

    update() {
        let f = this.plot.functions[0];

        let n = floor((frameCount - this.time) / this.speed);
        if(n <= degreeSld.value) {
            let x0 = (node.pos.x - width/2 + this.plot.pos.getX()) / this.plot.scale.getX();
            let p = (x) => {
                let r = 0;
                for(let k = 0; k <= n; k++) {
                    r += this.derivate(f, k, x0) * (x - x0) ** k;
                }
                return r;
            };

            if(this.plot.functions.length > 1) {
                this.plot.functions[1] = p;
            } else {
                this.plot.functions.push(p);
            }
        }
    }

    /**
     * Calculates the nth derivative of the f function
     * at the x0 value
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
     * Reset interpolation
     */
    reset() {
        this.time = frameCount;
    }
}