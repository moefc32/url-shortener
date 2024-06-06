<script>
  import { setContext } from "svelte";
  import {
    getModalStore,
    getToastStore,
    Paginator,
  } from "@skeletonlabs/skeleton";
  import datePrettier from "$lib/datePrettier";
  import axios from "axios";

  import DetailModal from "./ModalDetail.svelte";

  const modalStore = getModalStore();
  const toastStore = getToastStore();

  export let data;

  let { urls } = data;
  let paginationSettings = {
    page: 0,
    limit: 10,
    size: urls?.length,
    amounts: [5, 10, 20],
  };

  async function doLogout() {
    try {
      const response = await axios.delete("/middleware/auth");
      window.location.href = "/";
    } catch (e) {
      console.error(e);
    }
  }

  async function openCreateModal() {
    modalStore.trigger({
      title: "Create New Short URL",
      type: "component",
      component: {
        ref: DetailModal,
      },
      response: async (r) => {
        if (r?.type === "submit") {
          await axios.post("middleware", r.formData, { withCredentials: true });
          await loadData();

          modalStore.close();

          toastStore.trigger({
            message: "New short URL created successfully.",
            background: "variant-filled-success",
          });
        }
      },
    });
  }

  async function openEditModal(item) {
    modalStore.trigger({
      title: "Edit Short URL",
      type: "component",
      component: {
        ref: DetailModal,
      },
      meta: {
        ...item,
      },
      response: async (r) => {
        if (r?.type === "submit") {
          await axios.patch(`middleware/?id=${r.formData._id}`, r.formData, {
            withCredentials: true,
          });
          await loadData();

          modalStore.close();
        }

        if (r?.type === "delete") {
          openDeleteModal(r.formData._id);
          modalStore.close();
        }
      },
    });
  }

  async function openDeleteModal(id) {
    modalStore.trigger({
      title: "Delete short URL",
      type: "confirm",
      body: `Are you sure you want to delete <strong>main</strong>?`,
      response: async (rsp) => {
        if (rsp) {
          await axios.delete(`middleware/?id=${id}`, { withCredentials: true });
          await loadData();

          toastStore.trigger({
            message: "Short URL deleted successfully.",
            background: "variant-filled-error",
          });
        }
      },
    });
  }

  async function loadData() {
    const result = await axios.get("middleware", { withCredentials: true });
    urls = result.data.data;
  }

  setContext("loadData", loadData);
</script>

<header
  class="card flex flex-row items-center gap-3 mb-3 px-5 py-3 variant-filled-surface"
>
  <a href="/">
    <h1 class="text-lg font-bold">{data.appName}</h1>
  </a>
  <button
    class="btn btn-sm variant-filled-error ms-auto"
    on:click={() => doLogout()}
  >
    <svg
      class="w-3 h-3 me-1"
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
        d="M20 12H8m12 0-4 4m4-4-4-4M9 4H7a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h2"
      />
    </svg> Logout
  </button>
</header>
<div class="card flex-1 p-5 bg-slate-50">
  <div class="flex mb-3">
    <button
      class="btn btn-sm variant-filled-primary"
      on:click={() => openCreateModal()}
      ><svg
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
          d="M5 12h14m-7 7V5"
        />
      </svg> Create New Short Link</button
    >
  </div>
  <div class="table-container mb-3">
    <table class="table table-compact table-hover">
      <thead>
        <tr>
          <th>Title</th>
          <th>Short URL</th>
          <th>Original URL</th>
          <th>Created At</th>
          <th>Clicks</th>
          {#if urls?.length}
            <th>Actions</th>
          {/if}
        </tr>
      </thead>
      <tbody>
        {#if !urls?.length}
          <tr>
            <td class="text-center" colspan="5">- No data to show -</td>
          </tr>
        {/if}
        {#each urls as item, i}
          <tr>
            <td>
              <strong class="text-base">{item.title}</strong>
            </td>
            <td>
              <a href={item.short} target="_blank" class="anchor">
                {item.short}
              </a>
            </td>
            <td>
              <a href={item.long} target="_blank" class="anchor">
                {item.long}
              </a>
            </td>
            <td>{datePrettier(item.created_at)}</td>
            <td>{item.clicks.length}</td>
            <td>
              <button
                class="chip variant-filled-warning"
                on:click={() => openEditModal(item)}
                ><svg
                  class="w-3 h-3 me-1"
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
                    d="M10.779 17.779 4.36 19.918 6.5 13.5m4.279 4.279 8.364-8.643a3.027 3.027 0 0 0-2.14-5.165 3.03 3.03 0 0 0-2.14.886L6.5 13.5m4.279 4.279L6.499 13.5m2.14 2.14 6.213-6.504M12.75 7.04 17 11.28"
                  />
                </svg> Edit</button
              >
              <button
                class="chip variant-filled-error"
                on:click={() => openDeleteModal(item._id)}
                ><svg
                  class="w-3 h-3 me-1"
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
                    d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z"
                  />
                </svg> Delete</button
              >
            </td>
          </tr>
        {/each}
      </tbody>
    </table>
  </div>
  <Paginator bind:settings={paginationSettings} showNumerals maxNumerals={1} />
</div>

<style>
  tr td:last-child {
    width: 1%;
    white-space: nowrap;
  }
</style>
