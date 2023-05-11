<script lang="ts">
  import logo from "../assets/logo.svg";
  import { onMount } from "svelte";
  import logout from "../assets/logoutb.svg";
  import type { Project, Model } from './types';
  import projects from '../assets/projects.json';
  import models from '../assets/models.json';
  import { createEventDispatcher } from "svelte";

  let data: Project[] = [];
  let currentProject: Project | null = null;
  let currentModels: Model[] = [];
  const dispatch = createEventDispatcher();

  onMount(() => {
    data = projects;
  });

  function showDetails(project: Project) {
    currentProject = project;
    currentModels = models.filter((model) => project.models.includes(model.id));
    dispatch("show-modal");
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

  <div class="card place-items-center">
    <img src={logo} class="w-1/6 mt-8 mb-2" alt="">
    <div class="text-sm breadcrumbs">
      <ul class="font-cy text-md">
        <li><a href="/#/Dashboard">Dashboard</a></li>
        <li><a href="/#/projects">Projects</a></li>
        <li><a href="/#/admin">Admin</a></li>
      </ul>
    </div>
  </div>

  <div class="flex justify-end">
    <div class="form-control mt-4 mr-4">
      <label class="input-group ">
        <input type="text" placeholder="Name" class="input input-bordered" />
        <input type="text" placeholder="Client" class="input input-bordered" />
        <input type="text" placeholder="Email" class="input input-bordered" />
        <input type="text" placeholder="Briefing" class="input input-bordered" />
        <span class="btn btn-primary rounded-none text-sm font-cy normal-case ">Add</span>
      </label>
    </div>
  </div>
  <div class="divider"></div>

  <div class="flex w-full mt-6 pl-4 mr-4">
    <div class="grid w-2/5 h-96 flex-grow card place-items-center">
      {#if currentProject !== null}
        
        <p>{currentProject.briefing}</p>
        {:else}
        <p>Please select a project to view its details.</p>
      {/if}
    </div> 
    <div class="divider divider-horizontal"></div>

    <div class="grid flex-grow card w-3/5 place-items-start ml-4 pb-24 h-[29rem] overflow-auto ">

      <div class="overflow-x-auto w-full">
        <table class="table w-full">    
          <thead>
            <tr>
              <th>Name</th>
              <th>Client</th>
              <th>Email</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {#each data as project}
              <tr on:mouseover={() => showDetails(project)}>
                <td>{project.name}</td>
                <td>{project.client}</td>
                <td>{project.email}</td>
                <td><label for="my-modal-4" class="btn btn-primary btn-xs">See more</label></td>
              </tr>
            {/each}
          </tbody>
        </table>
        <input type="checkbox" id="my-modal-4" class="modal-toggle" />
<label for="my-modal-4" class="modal cursor-pointer">
  <label class="modal-box relative" for="">
    <h3 class="text-lg font-bold">Congratulations random Internet user!</h3>
    <p class="py-4">You've been selected for a chance to get one year of subscription to use Wikipedia for free!</p>
  </label>
</label>
      </div>
    </div>
  </div>
</section>