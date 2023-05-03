<script lang="ts">
  import { onMount } from 'svelte';
	import Router from 'svelte-spa-router';

  interface Model {
    id: number;
    photo: string;
    name: string;
    age: number;
    height: string;
    weight: string;
    hair: string;
    skin: string;
    gender: string;
    nationality: string;
    languages: string;
    category: string;
  }

  import models from '../assets/models.json';

  let model: Model;
  let loading = true;

  onMount(() => {
    const { name } = (Router as any).params;
    const index = models.findIndex(m => m.name.toLowerCase() === name.toLowerCase());
  model = models[index];});

</script>

{#if loading}
  <p>Loading...</p>
{:else}
  <h1>{model.name}</h1>
  <p>Age: {model.age}</p>
  <p>Height: {model.height}</p>
  <p>Weight: {model.weight}</p>
  <!-- afficher les autres données ici -->
{/if}
