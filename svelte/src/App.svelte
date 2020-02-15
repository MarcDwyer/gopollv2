<script>
  import Navbar from "./components/Navbar.svelte";
</script>

<style>
  main {
    background-color: black;
    display: flex;
    height: 100vh;
    width: 100%;
  }

  @media (min-width: 640px) {
    main {
      max-width: none;
    }
  }
</style>

<main>
  <div class="hello">
    <Navbar />
  </div>
</main>
