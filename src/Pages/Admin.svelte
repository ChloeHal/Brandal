<script lang="ts">
  import { onMount, createEventDispatcher } from "svelte";
  import logo from "../assets/logo.svg";
  import logout from "../assets/logoutb.svg";

  let admins = [];
  let name = "";
  let firstname = "";
  let email = "";

  const dispatch = createEventDispatcher();

  onMount(async () => {
    const response = await fetch('./src/assets/admins.json');
    admins = await response.json();
  });

  function addAdmin(event) {
    event.preventDefault();

    const newAdmin = {
      id: admins.length > 0 ? Math.max(...admins.map(admin => admin.id)) + 1 : 1,
      name: name,
      firstname: firstname,
      email: email
    };

    admins.push(newAdmin);

    // Reset form fields
    name = "";
    firstname = "";
    email = "";

    // Dispatch an event to notify the parent component
    dispatch("adminAdded", newAdmin);
  }

  function deleteAdmin(id) {
    admins = admins.filter(admin => admin.id !== id);
  }
</script>

<section class="h-screen">
  <div class="flex justify-end">
    <a href="/#/login">
      <button class="btn btn-circle btn-outline mx-4 mt-4">
        <img src={logout} class="h-6 w-6" alt="">
      </button>
    </a>
  </div>
  <div class="card flex place-items-center">
    <img src={logo} class="w-1/6 mt-8 mb-2" alt="">
    <div class="text-sm breadcrumbs">
      <ul class="font-cy text-md">
        <li><a href="/#/Dashboard">Dashboard</a></li>
        <li><a href="/#/projects">Projects</a></li>
        <li><a href="/#/admin">Admin</a></li>
      </ul>
    </div>
  </div>
  <div class="ml-auto flex flex-row-reverse">
    <div class="flex justify-end">
      <div class="form-control mt-4 mr-4">
        <form on:submit={addAdmin}>
          <label class="input-group">
            <input type="text" placeholder="Name" class="input input-bordered" bind:value={name} />
            <input type="text" placeholder="Firstname" class="input input-bordered" bind:value={firstname} />
            <input type="text" placeholder="Email" class="input input-bordered" bind:value={email} />
            <button class="btn btn-primary rounded-none text-sm font-cy normal-case" type="submit">Add</button>
          </label>
        </form>
      </div>
    </div>
  </div>
  <div class="divider"></div>
  <div class="h-96 overflow-auto px-8">
    <table class="table table-zebra w-full">
      <!-- head -->
      <thead>
        <tr>
          <th></th>
          <th>Name</th>
          <th>Firstname</th>
          <th>Email</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {#each admins as admin}
        <tr>
          <th>{admin.id}</th>
          <td>{admin.name}</td>
          <td>{admin.firstname}</td>
          <td>{admin.email}</td>
          <td><button class="btn btn-ghost btn-xs" on:click={() => deleteAdmin(admin.id)}>Delete</button></td>
        </tr>
        {/each}
      </tbody>
    </table>
  </div>
</section>
