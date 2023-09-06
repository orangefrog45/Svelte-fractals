<script>
    export let scale;
    export let DrawCanvas;
    export let SetScale;
    export let trans_x;
    export let trans_y;
</script>

<section id="fractalSettings">
<p>Focal point: {-trans_x}, {-trans_y}</p>
<p>Scale: </p>
<input on:input={(e) => SetScale(e.target.value)} bind:value={scale}/>
<button on:click={DrawCanvas}>Generate</button>
</section>

<style>

#fractalSettings {
    padding: 10px;
    display: flex;
    flex-direction: column;
    border: 1px black solid;
    border-radius: 1%;
    min-width: 300px;
    margin: 0;
}

button {
    max-width: 100px;
}
</style>