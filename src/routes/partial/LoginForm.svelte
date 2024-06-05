<script>
  import axios from "axios";

  const form = {
    email: "",
    password: "",
  };

  async function handleKeydown(event) {
    if (event.key === "Enter") doLogin();
  }

  async function doLogin() {
    try {
      if (form.email && form.password) {
        const response = await axios.post("/middleware/auth", { ...form });
        window.location.href = "/";
      }
    } catch (e) {
      console.error(e);
    }
  }
</script>

<div
  class="card flex flex-col justify-center items-center mx-auto px-7 pt-7 pb-5 bg-slate-50"
>
  <div class="container">
    <h1 class="mb-3 text-3xl text-center">Login</h1>
    <label class="label mb-3">
      <span>Email</span>
      <input
        type="email"
        class="input"
        bind:value={form.email}
        on:keydown={handleKeydown}
      />
    </label>
    <label class="label mb-5">
      <span>Password</span>
      <input
        type="password"
        class="input"
        bind:value={form.password}
        on:keydown={handleKeydown}
      />
    </label>
    <button
      class="btn variant-filled-secondary mb-5 w-full"
      on:click={() => doLogin()}
    >
      <svg
        class="w-5 h-5 me-1"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        fill="none"
        viewBox="0 0 24 24"
      >
        <path
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M16 12H4m12 0-4 4m4-4-4-4m3-4h2a3 3 0 0 1 3 3v10a3 3 0 0 1-3 3h-2"
        />
      </svg> Login
    </button>
  </div>
  <div class="text-sm text-slate-500">
    <a href="https://mf-chan.com">Mfc</a> &copy; 2024
  </div>
</div>

<style>
  .card {
    max-width: 450px;
  }
</style>
