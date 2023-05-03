<script lang="ts">
    import logo from "../assets/logo.svg";
    import logout from "../assets/logoutb.svg"
    let admins: any[] = [];
  
    fetch('./src/assets/admins.json')
      .then(response => response.json())
      .then(data => {
        admins = data;
      });
  </script>
  
  <section class="h-screen">
    <div class="flex justify-end">
      <a href="/#/login">
    <button class="btn btn-circle btn-outline mx-4 mt-4">
      <img src={logout} class="h-6 w-6" alt="">
    </button></a>
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
          <label class="input-group ">
            <input type="text" placeholder="Name" class="input input-bordered" />
            <input type="text" placeholder="Firstname" class="input input-bordered" />
            <input type="text" placeholder="Email" class="input input-bordered" />
            <span class="btn btn-primary rounded-none text-sm font-cy normal-case ">Add</span>
          </label>
        </div>
        </div>    
      </div>
    <div class="divider"></div>
    <div class="h-96 overflow-auto px-8">
      <table class="table table-zebra w-full">
        <!-- head -->
        <thead>
          <tr>
            <th>
            </th>
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
            <td><button class="btn btn-ghost btn-xs">Delete</button></td>
          </tr>
          {/each}
        </tbody>
       </table>
    </div>
    
  </section>
  