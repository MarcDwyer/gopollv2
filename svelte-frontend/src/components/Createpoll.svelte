<script>
  export let options = Array(3)
    .join(".")
    .split(".");

  const handleChange = (index, value) => (options[index] = value);

  $: {
    const len = options.length;
    if (len && options[len - 1].length > 1) {
      options = [...options, ""];
    }
  }
</script>

<style>
  .options {
    margin: auto;
    width: 450px;
    display: flex;
    flex-direction: column;
  }
</style>

<div class="create-poll" />
