<script>
  import { getModalStore, getToastStore } from "@skeletonlabs/skeleton";
  import Joi from "joi";

  export let parent;

  const modalStore = getModalStore();
  const toastStore = getToastStore();

  let formData = {
    _id: "",
    title: "",
    short: "",
    long: "",
  };

  async function deleteBacklog() {
    if ($modalStore[0].response) {
      $modalStore[0].response({
        type: "delete",
        formData,
      });
    }
  }

  async function onFormSubmit() {
    if (!formData.title || !formData.short || !formData.long) {
      return toastStore.trigger({
        message: "All fields should be filled!",
        background: "variant-filled-error",
      });
    }

    const schema = Joi.object({
      _id: Joi.string().allow(""),
      title: Joi.string().pattern(/^[a-zA-Z0-9-]+$/),
      short: Joi.string().pattern(/^[a-zA-Z0-9-]+$/),
      long: Joi.string().uri(),
    });
    const { error } = schema.validate(formData);

    if (error) {
      return toastStore.trigger({
        message: "Error, the provided data is not valid!",
        background: "variant-filled-error",
      });
    }

    if ($modalStore[0].response) {
      $modalStore[0].response({
        type: "submit",
        formData,
      });
    }
  }

  $: {
    if ($modalStore[0]?.meta && $modalStore[0]?.meta?._id !== formData._id) {
      formData = {
        _id: $modalStore[0].meta._id,
        title: $modalStore[0].meta.title,
        long: $modalStore[0].meta.long,
        short: $modalStore[0].meta.short,
      };
    }
  }
</script>

{#if $modalStore[0]}
  <div class="card p-4 w-modal shadow-xl space-y-4">
    <header class="my-2 text-2xl font-bold">
      {$modalStore[0].title}
    </header>
    <label class="label">
      <span>Title</span>
      <input type="text" class="input" bind:value={formData.title} />
    </label>
    <label class="label">
      <span>Short URL</span>
      <input type="text" class="input" bind:value={formData.short} />
    </label>
    <label class="label">
      <span>Original URL</span>
      <input
        type="url"
        class="input"
        placeholder="https://example.com"
        bind:value={formData.long}
      />
    </label>
    <footer class="modal-footer {parent.regionFooter}">
      {#if $modalStore[0]?.meta?._id}
        <button
          class="btn bg-rose-900 text-white me-auto"
          on:click={() => deleteBacklog(formData._id)}
        >
          Delete
        </button>
      {/if}
      <button class="btn {parent.buttonNeutral}" on:click={parent.onClose}>
        {parent.buttonTextCancel}
      </button>
      <button class="btn {parent.buttonPositive}" on:click={onFormSubmit}>
        {formData._id ? "Update" : "Create"}
      </button>
    </footer>
  </div>
{/if}
