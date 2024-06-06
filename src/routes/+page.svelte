<script>
  import MainContent from "./partial/MainContent.svelte";
  import LoginForm from "./partial/LoginForm.svelte";

  export let data;

  let isLoggedIn = data.isLoggedIn;
</script>

<main class="flex flex-col justify-center items-stretch flex-1 mb-auto p-5 w-full">
  {#if !isLoggedIn}
    <LoginForm {data} />
  {:else}
    <MainContent {data} />
  {/if}
</main>
