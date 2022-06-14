import { writable, derived } from "svelte/store";

/** Store for your data. 
This assumes the data you're pulling back will be an array.
If it's going to be an object, default this to an empty object.
**/
export const wordData = writable({
  definitions: [],
  word: "",
  pronunciation: "",
});

/** Data transformation.
For our use case, we only care about the drink names, not the other information.
Here, we'll create a derived store to hold the drink names.
**/
export const definitions = derived(wordData, ($wordData) => {
  if ($wordData.definitions) {
    return $wordData.definitions.map((definition) => definition);
  }
  return [];
});
