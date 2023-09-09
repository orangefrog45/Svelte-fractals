   import {complex} from "mathjs"
   

   	export let fractal_settings = {
		type: "Mandelbrot",
		c: complex(0, 0)
	}

    fractal_settings =  {
		type: "Mandelbrot",
		c: complex(0, 0)
	}


   export interface ViewSettings {
        scale: number,
        trans_x: number,
        trans_y: number
    }

    export interface FractalSettings {
        type : string;
        c :  any;
    }