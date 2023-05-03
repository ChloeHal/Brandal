<script lang="ts">
    import { onMount, createEventDispatcher } from "svelte";
    import logo from "../assets/logo.svg";
      import logout from "../assets/logoutb.svg"

    interface Row {
      id: number;
      photo: string;
      name: string;
      firstname:string,
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
  
    interface Column {
      title: string;
      visible: boolean;
    }
  
    const dispatch = createEventDispatcher();
  
    let columns: Column[] = [
      { title: "Photo", visible: true },
      { title: "Name", visible: true },
      { title: "FirstName", visible: true },
      { title: "Age", visible: true },
      { title: "Height", visible: true },
      { title: "Weight", visible: true },
      { title: "Hair", visible: true },
      { title: "Skin", visible: true },
      { title: "Gender", visible: true },
      { title: "Nationality", visible: true },
      { title: "Languages", visible: true },
      { title: "Category", visible: true }
    ];
  
    let data: Row[] = [];
    interface Project {
    id: number;
    name: string;
    client: string;
    email: string;
    briefing: string;
  }
  let selectedProject: string;

  let projects: Project[] = [];
  onMount(async () => {
    const response = await fetch('./src/assets/projects.json');
    projects = await response.json();
    let selectedProject: string = '';
  })
function validate(): void {
  // Do something with the selected project
  console.log(selectedProject);
}
 
  onMount(async () => {
    const res = await fetch('./src/assets/models.json');
    data = await res.json();
  });
  
  
    let filteredColumns = columns.filter(col => col.visible);
  
    onMount(() => {
      columns.forEach(col => col.visible = true);
    });
  
    function toggleColumn(index) {
      columns[index].visible = !columns[index].visible;
      filteredColumns = columns.filter(col => col.visible);
    }
    let hoveredRow;
  
    function handleRowHover(row) {
      hoveredRow = row;
      dispatch('hoveredRow', hoveredRow);
    }
  </script>
  <section class="h-screen ">
    <div class="flex justify-end">
      <a href="/#/login">
    <button class="btn btn-circle btn-outline mx-4 mt-4">
      <img src={logout} class="h-6 w-6" alt="">
    </button></a>
    </div>
    <div class="card place-items-center ">
      <img src={logo} class="w-1/6 mt-8 mb-2" alt="">
      <div class="text-sm breadcrumbs ">
        <ul class="font-cy text-md">
          <li><a href="/#/Dashboard">Dashboard</a></li>
          <li><a href="/#/projects">Projects</a></li>
          <li><a href="/#/admin">Admin</a></li>
        </ul>
      </div>
    </div>
    <!-- The button to open modal -->
    <div class="flex items-center">
      <div>
        <label for="my-modal-1" class="btn btn-outline rounded-none text-sm font-cy normal-case mx-4">Filter view</label>
        <label for="my-modal-2" class="btn btn-outline rounded-none text-sm font-cy normal-case mx-4">Filter models</label>
      </div>
      <div class="ml-auto flex items-center">
        <select placeholder="Project name" class="select select-bordered rounded-full" bind:value={selectedProject}>
          {#each projects as project (project.id)}
            <option value={project.name}>{project.name}</option>
          {/each}
        </select>
        <button class="btn rounded-none text-sm font-cy normal-case mx-4" on:click={validate}>Add selection</button>
      </div>
    </div>
    <!-- Modal 1 -->
    <input type="checkbox" id="my-modal-1" class="modal-toggle" />
    <div class="modal">
      <div class="modal-box relative  rounded-none">
        <label for="my-modal-1" class="btn btn-sm btn-circle btn-primary absolute right-4 top-4">✕</label>
      <div class="flex flex-wrap justify-start align-middle mx-4 mt-8 mb-4">
        {#each columns as col, index}
          <div class="w-auto">
            <button class={col.visible ? 'btn btn-sm rounded-none my-1 mx-2' : 'btn btn-ghost btn-sm mx-2 rounded-full font-cy normal-case my-1'} on:click={() => toggleColumn(index)}>
              <span class="text-sm font-cy normal-case">{col.title}</span>
            </button>
          </div>
        {/each}
      </div>
    </div>
  </div>
  <!-- Modal 2 -->
  <input type="checkbox" id="my-modal-2" class="modal-toggle" />
  <div class="modal">
    <div class="modal-box relative  rounded-none">
      <label for="my-modal-2" class="btn btn-sm btn-circle btn-primary absolute right-4 top-4">✕</label>
      hello
    </div>
  </div>
  
  <div class="divider"></div>
  
    <div class="flex w-full mt-6 pl-4 mr-4">
      <div class="grid w-1/5 h-96 flex-grow card place-items-center">
        {#if hoveredRow}
          <img src={hoveredRow.photo} alt={hoveredRow.name} class="w-full" />
        {:else}
          <p>Place the cursor on a line of the table to display a photo</p>
        {/if}
      </div> 
      <div class="divider divider-horizontal"></div>
  
      <div class="grid flex-grow card w-4/5 place-items-start ml-4 pb-24 h-[29rem] overflow-auto ">
        <div class="overflow-x-auto pr-4 w-full">
          <table class="table table-compact w-full">
            <thead>
              <tr>
                <th class="font-cy normal-case"></th>
          
                {#each filteredColumns as col}
                  {#if col.visible}
                    <th class="font-cy normal-case">{col.title}</th>
                  {/if}
                {/each}
          
                <th class="font-cy normal-case"></th>
              </tr>
            </thead>
          
            <tbody>
              {#if Array.isArray(data)}
                {#each data as row}
                <tr class="hover" on:mouseover={() => handleRowHover(row)} on:focus={() => handleRowHover(row)}>
                  <td><label>
                      <input type="checkbox" class="checkbox checkbox-primary rounded-none" />
                    </label></td>
                
                    {#each filteredColumns as col}
                      {#if col.visible}
                      <td>
                        {#if col.title === "Photo"}
                          <img src={row[col.title.toLowerCase().replace(/\s/g, "")]} alt="" class="w-12 mask mask-squircle"/>
                        {:else}
                          {row[col.title.toLowerCase().replace(/\s/g, "")]}
                        {/if}
                      </td>
                                            {/if}
                    {/each}
                    <td><label for="my-modal-4" class="btn btn-primary btn-xs">See more</label>
                                </tr>
                {/each}
              {/if}
            </tbody>
          </table>

          <input type="checkbox" id="my-modal-4" class="modal-toggle" />
          <label for="my-modal-4" class="modal cursor-pointer ">
            <label class="modal-box " for="">

                <div class="flex flex-col items-center">
                  <div class="avatar">
                    <div class="w-64">
                      <img src="../src/assets/models/model1.png" alt="Lena" class=""/>
                    </div>
                  </div>
                  <h4 class="font-cy text-4xl font-bold">Lena Gomez</h4>
                  <div class="grid grid-cols-2 gap-4">
                    <div>
                      <div class="mb-4">
                        <p>Age:28</p>
                      </div>
                      <div class="mb-4">
                        <p>Height: 170cm</p>
                      </div>
                      <div class="mb-4">
                        <p>Weight: 55kg</p>
                      </div>
                      <div class="mb-4">
                        <p>Hair: Black</p>
                      </div>
                      <div class="mb-4">
                        <p> Skin:Tan</p>
                      </div>
                    </div>
                    <div>
                      <div class="mb-4">
                        <p>Gender: Female</p>
                      </div>
                      <div class="mb-4">
                        <p>Nationality: Mexican</p>
                      </div>
                      <div class="mb-4">
                        <p>Languages: English, Spanish</p>
                      </div>
                      <div class="mb-4">
                      </div>
                      <div>
                        <p>Category: Runway, Fashion model</p>
                      </div>
                    </div>
                  </div>
                  
                  
            </label>
          </label>


        </div>
      </div>
    </div>
  </section>