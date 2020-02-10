<script>
  import { Router } from "svelte-routing";
  import Navbar from "./components/Navbar.svelte";

  export let url = "";
  let name = "marc";
</script>

<style>
  main {
    width: 100%;
    height: 100vh;
    text-align: center;
    display: flex;
    flex-direction: column;
    background-color: black;
  }

  @media (min-width: 640px) {
    main {
      width: 100%;
    }
  }
</style>

<main>
  <Router {url}>
    <Navbar />
  </Router>
</main>
