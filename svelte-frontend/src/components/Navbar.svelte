<script>
  import { Link } from "svelte-routing";

  console.log("navbar rendered");
</script>

<style>
  .navbar {
    width: 100%;
    background-color: #ffd756;
  }
  .innernav {
    width: 100%;
    display: flex;
  }
  .logo {
    font-weight: bold;
    font-size: 37px;
  }
  .about {
    font-size: 27px;
    margin: auto 10px auto auto;
  }
</style>

<div class="navbar">
  <div class="innernav">
    <Link style={{ margin: 'auto auto auto 10px' }} to="/">
      <span class="logo">GoPoll.me</span>
    </Link>
    <Link style={{ margin: 'auto 10px auto auto' }} to="/about">
      <span class="about">Info</span>
    </Link>
  </div>
</div>
