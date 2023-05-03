<script>
	import Router, {location, link} from 'svelte-spa-router';
	import Dashboard from '../src/Pages/Dashboard.svelte'
  import Login from './Pages/Login.svelte';
  import Projects from './Pages/Projects.svelte';
  import Admin from './Pages/Admin.svelte';
  import Models from './Pages/models.svelte';
</script>

<nav>

  
  
</nav>

<Router routes={{
	'/Dashboard': Dashboard,
  '/login': Login,
  '/projects': Projects,
  '/admin': Admin,
  '/models': Models,


}} />
