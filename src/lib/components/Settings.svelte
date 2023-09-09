<script lang="ts">
   import type {ViewSettings} from "$lib/Common.ts"
   import {fractal_settings} from "$lib/Common"
	import { complex } from "mathjs";

    export let DrawCanvas : () => void;
    export let SetScale: (scale : number) => void;
    export let view_settings: ViewSettings;
</script>

<section id="fractalSettings" class="flex flex-col space-y-2">
<p>Focal point: {-view_settings.trans_x}, {-view_settings.trans_y}</p>
<p>Scale: </p>
<input type="number" on:input={(e) => {if (e.target instanceof HTMLInputElement) SetScale(parseFloat(e.target.value))}} bind:value={view_settings.scale}/>

<div class="flex flex-row text-center">
    <section class="flex flex-col">
        <p class="">c re: </p>
        <input class=" w-10 border-2 border-gray-400 m-1" type="number" on:input={(e)=> {if (e.target instanceof HTMLInputElement) fractal_settings.c.re = parseFloat(e.target.value)}}/>
    </section>
    <section class="flex flex-col">
        <p>c im: </p>
    <input class=" w-10 border-2 border-gray-400 m-1" type="number" on:input={(e)=> {if (e.target instanceof HTMLInputElement) fractal_settings.c.im = parseFloat(e.target.value)}}/>
    </section>
</div>

<select on:change={(e) => {if (e.target instanceof HTMLSelectElement) fractal_settings.type = e.target.value}} name="Fractal" id="fract-selection">
    <option value="Mandelbrot">Mandelbrot</option>
    <option value="Julia">Julia</option>
</select>

<button on:click={DrawCanvas} class="rounded-sm bg-blue-400 hover:bg-blue-300">Generate</button>
</section>

<style>

#fractalSettings {
    padding: 10px;
    display: flex;
    flex-direction: column;
    border: 1px black solid;
    border-radius: 1%;
    min-width: 300px;
    max-height: 500px;
    margin: 0;
    background-color: #eeeeee;
}


</style>
