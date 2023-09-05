
<script>
	import {abs, complex, log} from "mathjs";
	import {sqrt} from "mathjs";
	import {add} from "mathjs";
	import {multiply} from "mathjs";

	import {onMount} from "svelte"


	const canv_height = 500;
	const canv_width = 500;

	const reg_scale = 3.0 / 500.0;
	let scale = 1.0;
	let trans_x = 0;
	let trans_y = 0;

	let canvas;
	let ctx;

	
	const Point = (x, y) => {
		return {
			x,
			y
		}
	}
	

	const MapPoint = (x, y) => {
		return Point( (x - 250) * reg_scale * scale - trans_x ,(y - 250) * reg_scale * scale - trans_y) ;
	}
	const ShadePixel = (x, y, center_x, center_y) => {
		let point = MapPoint(x, y);
		let mdb = MandelbrotSet(complex(point.x, point.y));
		let color = mdb * 255 / 50.0;

		return `rgb(${color}, ${color}, ${color})`;
	}

	const MandelbrotSet = (c) => {
		let z = c;
		let i = 0;

		let x2 = 0;
		let y2 = 0;
		let x = 0;
		let y = 0;
		let x0 = c.re;
		let y0 = c.im;
		let log_zn;
		let nu;

		for (i; i < 50; i++) {
			 y = 2 * x * y + y0;
			 x = x2 - y2 + x0;
			x2 = x*x;
			y2 = y*y;

			if ((x2 + y2) > Math.pow(2, 8)) {
				log_zn = Math.log(x*x + y*y)/2;
				nu = log(log_zn / log(2)) / log(2);
				i = i + 1 - nu;
				break;
			}
		}
	
		return i;
	}

	const Zoom = (e) => {
		console.log("wheel");
		const rect = canvas.getBoundingClientRect();
		let x = e.clientX - rect.left;
		let y = e.clientY - rect.top;
		let point = MapPoint(x, y);

		trans_x = -point.x;
		trans_y = -point.y;
		scale/=2;
		console.log(scale);
		console.log(trans_x);
		console.log(trans_y);
		
		DrawCanvas();
	}

	const DrawCanvas = () => {
				for (let x = 0; x < canv_width; x++) {
			for (let y = 0; y < canv_height; y++) {
			ctx.fillStyle = ShadePixel(x, y, canv_width / 2, canv_height / 2);
			ctx.fillRect(x, y, 1, 1);
			}
		}
	}


	onMount(() => {
		canvas = document.getElementById("graphics");
		ctx = canvas.getContext("2d");
		DrawCanvas();
	});


</script>

<main>
	<canvas id="graphics" on:wheel={Zoom} width={canv_width} height={canv_height}></canvas>
</main>

<style>
	main {
		padding: 1em;
		max-width: 100vw;
		max-height:100vh;
		margin: 0 auto;
	}

	#graphics {
		border: 1px solid #d3d3d3;
	}


	@media (min-width: 640px) {
		main {
			max-width: 100vw;
			max-height:100vh;
		}
	}
</style>

