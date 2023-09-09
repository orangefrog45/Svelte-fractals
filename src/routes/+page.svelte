<script lang="ts">
	import Settings from "$lib/components/Settings.svelte";
    import {fractal_settings} from "$lib/Common"
    import type {FractalSettings, ViewSettings} from "$lib/Common"
	import {abs, complex, freqzDependencies, log} from "mathjs";
	import {sqrt} from "mathjs";
	import {add} from "mathjs";
	import {multiply} from "mathjs";

	import {onMount} from "svelte"
	import type { HTMLCanvasAttributes } from "svelte/elements";


	const canv_height = 500;
	const canv_width = 500;

	const reg_scale = 3.0 / 500.0;

	let canvas : HTMLCanvasElement;
	let ctx : CanvasRenderingContext2D;


	let view_settings = {
		scale: 1,
		trans_x: 0.0,
		trans_y: 0
	};



	const Point = (x: number, y: number) => {
		return {
			x,
			y
		}
	}

	const Vec3 = (x: number, y: number, z: number) => {
		return {
			x,
			y,
			z,
		}
	}

	
	const SetScale = (s:number) => {
		view_settings.scale = s;
	}

	const MapPoint = (x:number, y:number) => {
		return Point( (x - 250) * reg_scale * view_settings.scale - view_settings.trans_x ,(y - 250) * reg_scale * view_settings.scale - view_settings.trans_y) ;
	}

	const ShadePixel = (x:number, y:number, center_x:number, center_y:number) => {
		const pallete = [Vec3(255, 0, 0), Vec3(0, 255, 0), Vec3(0, 0, 255)];
		let point = MapPoint(x, y);
		let iters = fractal_settings.type === "Mandelbrot" ? MandelbrotSet(complex(point.x, point.y)) : JuliaSet(complex(point.x, point.y), fractal_settings.c);
        
        let r, g, b;
        
        if (fractal_settings.type === "Julia") {
            let intensity = 1.0 /(Math.exp(iters));
            r = Math.abs(iters % 0.1) * intensity * 255 / 0.1;
            g = Math.abs(iters % 0.2) * intensity * 255 / 0.2;
            b = Math.abs(iters % 0.5) * intensity * 255 / 0.5;
        } else {
            r = g = b = iters;
        }



		return `rgb(${r}, ${g}, ${b})`;
	}

	const JuliaSet = (z: any, c: any) => {
		let i = 0;

		let x2 = z.re * z.re;
		let y2 = z.im * z.im;
		let x = z.re;
		let y = z.im;
		let z1 = z;
		let dist = 1e20;

		for (i; i < 200; i++) {
				 y = 2 * x * y + c.im;
                x = x2 - y2 + c.re;
                x2 = x*x;
                y2 = y*y;

			let length2 = x * x + y*y;
			dist = Math.min(length2, dist);
			if (length2 > 4) {
				break;
			}
		}
	
		return Math.sqrt(dist);
	}

	const MandelbrotSet = (c: any) => {
		let i = 0;

		let x2 = 0;
		let y2 = 0;
		let x = 0;
		let y = 0;

		for (i; i < 200; i++) {
			 y = 2 * x * y + c.im;
			 x = x2 - y2 + c.re;
			x2 = x*x;
			y2 = y*y;

			if ((x2 + y2) > Math.pow(2, 8)) {
				let log_zn = Math.log(x*x + y*y)/2;
				let nu = log(log_zn / log(2)) / log(2);
				i = i + 1 - nu;
				break;
			}
		}
	
		return i;
	}

	const Zoom = (e:WheelEvent) => {
		const rect = canvas.getBoundingClientRect();
		let x = e.clientX - rect.left;
		let y = e.clientY - rect.top;
		let point = MapPoint(x, y);

		view_settings.trans_x = -point.x;
		view_settings.trans_y = -point.y;
		view_settings.scale /= e.deltaY < 0 ?  2 : 0.5;
		
		DrawCanvas();
	}

	export const DrawCanvas = () => {
		for (let x = 0; x < canv_width; x++) {
			for (let y = 0; y < canv_height; y++) {
			ctx.fillStyle = ShadePixel(x, y, canv_width / 2, canv_height / 2);
			ctx.fillRect(x, y, 1, 1);
			}
		}
	}


	onMount(() => {
        const cnv = document.getElementById("graphics");
        if (cnv instanceof HTMLCanvasElement) {
            canvas = cnv;
        }
        const ctx_temp = canvas.getContext("2d");
        if (ctx_temp instanceof CanvasRenderingContext2D) {
            ctx = ctx_temp;
        }

		DrawCanvas();
	});


</script>

<main>
	<canvas id="graphics" on:wheel={Zoom} style="max-width: {canv_width}px; max-height: {canv_height}px;" width={canv_width} height={canv_height}></canvas>
	<Settings DrawCanvas={DrawCanvas} SetScale={SetScale} view_settings={view_settings}></Settings>
</main>

<style>
	main {
        background-color: #111122;
		padding: 1em;
		width: 100vw;
		height: 100vh;
		margin: 0 auto;
		display: flex;
		justify-content: center;
		align-content: center;
	}




	@media (min-width: 640px) {
		main {
			max-width: 100vw;
			max-height:100vh;
		}
	}
</style>

