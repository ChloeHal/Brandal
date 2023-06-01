<script lang="ts">
  import { onMount, createEventDispatcher } from "svelte";
  import logo from "../assets/logo.svg";
  import logout from "../assets/logoutb.svg";

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

  let unfilteredData: Row[] = [];
  let data: Row[] = [];

  interface Project {
      id: number;
      name: string;
      client: string;
      email: string;
      briefing: string;
  }

  let filters = {
      gender: '',
      language: '',
      hair: '',
      category: '',
      nationality: '',
      height: '',
      age: '',
      weight: ''
  };

  let selectedProject: string;
  let projects: Project[] = [];
  let showAlert: boolean = false;

  onMount(async () => {
      const response = await fetch('./src/assets/projects.json');
      projects = await response.json();
      let selectedProject: string = '';
  })

  onMount(async () => {
      const res = await fetch('./src/assets/models.json');
      const jsonData = await res.json();
      unfilteredData = [...jsonData];
      data = [...jsonData];
  });

  function filterData() {
      data = unfilteredData.filter((row: Row) =>
          (!filters.gender || row.gender === filters.gender) &&
          (!filters.language || row.languages.includes(filters.language)) &&
          (!filters.hair || row.hair === filters.hair) &&
          (!filters.category || row.category === filters.category) &&
          (!filters.nationality || row.nationality === filters.nationality) &&
          (!filters.height || row.height === filters.height) &&
          (!filters.age || row.age === filters.age) &&
          (!filters.weight || row.weight === filters.weight)
      );
  }
  function resetFilters() {
    filters = {
        gender: '',
        language: '',
        hair: '',
        category: '',
        nationality: '',
        height: '',
        age: '',
        weight: ''
    };
    data = [...unfilteredData];
}

function validate(): void {
    if (selectedProject && hoveredRow) {
      const message = `La sélection a bien été ajoutée au projet "${selectedProject}".`;
      showAlert = true;

      // Masquer l'alerte après 2 secondes
      setTimeout(() => {
        showAlert = false;
      }, 4000);

      console.log(message);
    }
  }

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
        {#if showAlert}
      <div class="bg-green-500 text-white px-4 py-2 rounded-md ml-4 fixed bottom-4 right-4 z-10">
        La sélection a bien été ajoutée au projet "{selectedProject}".
      </div>
      {/if}
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
    <form on:submit|preventDefault={filterData}>
      <div>
        <label for="filter-gender">Gender:</label>
        <select class="select select-bordered w-full max-w-xs mb-2" id="filter-gender" bind:value={filters.gender}>
          <option value="">All</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>

        </select>
      </div>
      <div>
        <label for="filter-language">Language:</label>
        <select class="select select-bordered w-full max-w-xs mb-2" id="filter-language" bind:value={filters.language}>
          <option value="">All</option>
          <option value="English">English</option>
          <option value="Spanish">Spanish</option>
          <option value="French">French</option>
          <option value="Japanese">Japanese</option>
          <option value="Mandarin">Mandarin</option>
          <option value="Portuguese">Portuguese</option>
          <option value="Punjabi">Punjabi</option>
          <option value="Korean">Korean</option>
          <option value="Hindi">Hindi</option>

          <!-- Add other options as needed -->
        </select>
      </div>
      <div>
        <label for="filter-hair">Hair:</label>
        <select class="select select-bordered w-full max-w-xs mb-2" id="filter-hair" bind:value={filters.hair}>
          <option value="">All</option>
          <option value="Black">Black</option>
          <option value="Brown">Brown</option>
          <option value="Blonde">Blonde</option>
          <option value="Red">Red</option>
          <option value="Gray">Gray</option>
          <option value="Other">Other</option>
        </select>
      </div>
      

      <!-- Add more fields as needed -->
      <div>
        <label for="filter-category">Category:</label>
        <select class="select select-bordered w-full max-w-xs mb-2" id="filter-category" bind:value={filters.category}>
          <option value="">All</option>
          <option value="Runway">Runway</option>
          <option value="Fashion model">Fashion model</option>
          <option value="Muscle">Muscle</option>
          <option value="Fitness model">Fitness model</option>
          <option value="Beauty">Beauty</option>
          <option value="Commercial">Commercial</option>
          <option value="Fashion">Fashion</option>
          <option value="Editorial">Editorial</option>
          <option value="Casual">Casual</option>
          <option value="Catalog">Catalog</option>
          <option value="High Fashion">High Fashion</option>
          <option value="Print">Print</option>
          <option value="Catalog">Catalog</option>
          <option value="TV">TV</option>
          <option value="Digital">Digital</option>

          <!-- Add other options as needed -->
        </select>
      </div>
     
    
      <button class="btn btn-primary" type="submit">Apply filter</button>
      <button class="btn btn-ghost" on:click={resetFilters}>Reset filter</button>


    </form>
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
  <label class="modal-box" for="">
    <div class="flex flex-col items-center">
      <div class="avatar">
        <div class="w-64">
          <img src={hoveredRow?.photo} alt={hoveredRow?.name} class="" />
        </div>
      </div>
      <h4 class="font-cy text-4xl font-bold">{hoveredRow?.name}</h4>
      <div class="grid grid-cols-2 gap-4">
        <div>
          <div class="mb-4">
            <p>Age: {hoveredRow?.age}</p>
          </div>
          <div class="mb-4">
            <p>Height: {hoveredRow?.height}</p>
          </div>
          <div class="mb-4">
            <p>Weight: {hoveredRow?.weight}</p>
          </div>
          <div class="mb-4">
            <p>Hair: {hoveredRow?.hair}</p>
          </div>
          <div class="mb-4">
            <p>Skin: {hoveredRow?.skin}</p>
          </div>
        </div>
        <div>
          <div class="mb-4">
            <p>Gender: {hoveredRow?.gender}</p>
          </div>
          <div class="mb-4">
            <p>Nationality: {hoveredRow?.nationality}</p>
          </div>
          <div class="mb-4">
            <p>Languages: {hoveredRow?.languages}</p>
          </div>
          <div class="mb-4">
            <!-- Add any additional fields as needed -->
          </div>
          <div>
            <p>Category: {hoveredRow?.category}</p>
          </div>
        </div>
      </div>
    </div>
  </label>
</label>

                  


        </div>
      </div>
    </div>
  </section>