<script>
  import { wordData, definitions } from "../store.js";
  import { fade } from "svelte/transition";
</script>

{#if $wordData.word}
  <div id="definitions" transition:fade>
    <h2>{$wordData.word}</h2>

    {#each $definitions as d}
      <div class="definition">
        {#if d.image_url}
          <div class="wordImage">
            <img src={d.image_url} alt={$wordData.word} />
          </div>
        {/if}
        <span class="type">{d.type}:</span>
        <span class="definition">{d.definition}</span>
      </div>
    {/each}
  </div>
{/if}

<style>
  #definitions {
    margin: 0 auto;
    width: 40%;
    clear: both;
    text-align: left;
  }

  .definition {
    margin-bottom: 2rem;
  }

  #definitions .type {
    font-style: italic;
    font-weight: bold;
  }

  .wordImage {
    float: left;
    padding: 0 1rem;
  }

  .wordImage img {
    max-width: 150px;
  }
</style>
