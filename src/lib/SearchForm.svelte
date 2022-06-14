<script>
  import { variables } from "./variables.js";
  import { wordData } from "../store.js";

  let query = "";

  function wordSearch() {
    clearWordData();
    const requestMeta = {
      method: "GET",
      headers: {
        Authorization: "Token " + variables.OWLBOT_API_KEY,
      },
    };

    fetch("https://owlbot.info/api/v4/dictionary/" + query, requestMeta)
      .then((response) => response.json())
      .then((data) => {
        if (data.message || data[0]) {
          const message = data.message ? data.message : data[0].message;
          throw Error(message);
        } else {
          wordData.set(data);
        }
      })
      .catch((error) => {
        const errorBlob = {
          definitions: [],
          word: String(error),
          pronunciation: "",
        };
        wordData.set(errorBlob);
      });
  }

  function handleKeydown(event) {
    var key = event.key;
    var keyCode = event.keyCode;
    if (key === "Escape") {
      clearSearch();
    }
  }

  function clearSearch() {
    clearWordData();
    query = "";
  }

  function clearWordData() {
    const emptyBlob = {
      definitions: [],
      word: "",
      pronunciation: "",
    };
    wordData.set(emptyBlob);
  }
</script>

<svelte:window on:keydown={handleKeydown} />
<div id="instructions">
  <span class="keySymbol">&#9166;</span>
  to search.
  <span class="keySymbol">ESC</span>
  to clear.
</div>

<form on:submit|preventDefault={wordSearch}>
  <input bind:value={query} id="searchBox" />
  <button type="submit" id="searchButton">Search </button>

  <button type="button" on:click={clearSearch} id="clearButton">Clear </button>
</form>

<style>
  #instructions {
    margin-bottom: 2rem;
  }

  .keySymbol {
    background: #effec7;
    color: #85996a;
    border: 1px solid #85996a;
    border-radius: 3px;
    padding: 3px 5px;
    font-family: "Courier New", Courier, monospace;
  }

  #searchBox,
  #searchButton,
  #clearButton {
    font-size: 18px;
    border-radius: 5px;
  }

  #searchBox {
    border: 1px solid #ccc;
    padding: 0.5rem 1rem;
  }

  #searchButton,
  #clearButton {
    font-family: Arial, Helvetica, sans-serif;
    /* font-weight: bold; */
    border: none;
    padding: 0.5rem 1rem;
    cursor: pointer;
  }

  #searchButton {
    background: #60061e;
    color: white;
  }

  #clearButton {
    background: #d1e5e1;
    color: black;
  }
</style>
