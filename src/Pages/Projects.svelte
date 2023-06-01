<script lang="ts">
  import logo from "../assets/logo.svg";
  import { onMount } from "svelte";
  import logout from "../assets/logoutb.svg";
  import projects from '../assets/projects.json';
  import models from '../assets/models.json';

  interface Model {
    id: number;
    photo: string;
    name: string;
    firstname: string;
    pseudo: string;
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

  interface Project {
    id: number;
    name: string;
    client: string;
    email: string;
    briefing: string;
    models: { id: number; status: string }[];
  }

  let data: Project[] = [];
  let currentProject: Project | null = null;
  let currentModels: Model[] = [];
  let isModalOpen: boolean = false;

  onMount(() => {
    data = projects;
  });

  function showDetails(project: Project) {
    currentProject = project;
    currentModels = project.models.map(model => {
      const { id, status } = model;
      return { ...models.find(m => m.id === id), status };
    });
    isModalOpen = true;
  }

  function getModelName(modelId: number): string {
    const model = currentModels.find(model => model.id === modelId);
    return model ? model.name : "";
  }
  function getModelStatusColor(status: string): string {
  switch (status) {
    case "closed":
      return "badge-outline badge-secondary badge-md";
    case "refuse":
      return "badge-outline badge-error badge-md";
    case "in casting":
      return "badge-outline badge-accent badge-md";
    case "accepted for casting":
      return "badge-outline badge-warning badge-md";
    case "accepted":
      return "badge-outline badge-success badge-md";
    default:
      return "badge-outline badge-gray-500 badge-md";
  }
}
  function closeModal() {
    isModalOpen = false;
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

 

  <div class="h-96 overflow-auto px-8">
    <table class="table table-zebra w-full">
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Client</th>
          <th>Email</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {#each data as project}
          <tr>
            <td>{project.id}</td>
            <td>{project.name}</td>
            <td>{project.client}</td>
            <td>{project.email}</td>
            <td>
              <button on:click={() => showDetails(project)}><label for="my-modal-4" class="btn btn-primary btn-xs">See more</label></button>

            </td>
          </tr>
        {/each}
      </tbody>
    </table>
  </div>
  <input type="checkbox" id="my-modal-4" class="modal-toggle" />
<label for="my-modal-4" class="modal cursor-pointer ">

      <div class="modal-box relative rounded-none w-10/12 h-3/4 max-w-5xl">
        <label for="my-modal-7" class="btn btn-sm btn-circle btn-primary absolute right-4 top-4">x</label>
        <div class="fixed inset-0 flex items-start justify-center z-50">
          <div class="modal-body m-10">
            {#if currentProject !== null}
              <h3 class=" font-cy text-4xl font-bold pt-4">{currentProject.name}</h3>
              <p class=" font-cy text-l py-2">{currentProject.client} - {currentProject.email}</p>
              
              <p class=" py-2">{currentProject.briefing}</p>
            {:else}
              <p>Select a project for more details.</p>
            {/if}
            <div class="overflow-x-auto">
              <table class="table table-compact mx-12 mt-8">
                <thead>
                  <tr>
                    <th class="w-1/4">Photo</th>
                    <th class="w-1/4">Name</th>
                    <th class="w-1/4">Firstname</th>
                    <th class="w-1/4">Age</th>
                    <th class="w-1/4">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {#each currentModels as model}
                    <tr>
                      <td class="px-4 py-2">
                        <img src={model.photo} class="w-12 mask mask-squircle" alt="">
                      </td>
                      <td class="px-4 py-2">{model.name}</td>
                      <td class="px-4 py-2">{model.firstname}</td>
                      <td class="px-4 py-2">{model.age}</td>
                      <td class="px-4 py-2"> 
                        <div class={"badge " + getModelStatusColor(model.status)}>{model.status}
                        </div>
                        
                      </td>
                    </tr>
                  {/each}
                </tbody>
              </table>
            </div>
          </div>
      </div>
    </div>
</label>



</section>
