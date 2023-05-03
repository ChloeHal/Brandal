<script>
        import logo from "../assets/logo.svg";
        import google from "../assets/google.svg"
</script>
<div class="hero min-h-screen bg-base-200">
    <div class="hero-content flex-col lg:flex-row-reverse">
      
      <div class="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
        <div class="card-body">
          <div class="form-control place-items-center">
            <img src={logo} class="w-2/3 mt-4 mb-2" alt="">
          </div>
          <div class="form-control mt-6">
            <a class="btn btn-primary" href="/#/Dashboard">
              <img src={google} class="h-4 w-4 mr-2" alt="">Login
            </a>
            
          </div>
        </div>
      </div>
    </div>
  </div>