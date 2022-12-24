<script lang="ts">
  import { Check, XMark } from "svelte-heros-v2";

  import {
    MeetLocation,
    ClimbLocation,
    type Climb,
  } from "$lib/utilities/types";
  import { addClimb } from "$lib/utilities/database";
  import { user } from "$lib/utilities/auth";
  import LocationSelector from "./LocationSelector.svelte";

  export let label: string;

  const submitForm = () => {
    addClimb(
      MeetLocation[form.input.meetLocation as keyof typeof MeetLocation],
      new Date(form.input.date + " " + form.input.time),
      ClimbLocation[form.input.climbLocation as keyof typeof ClimbLocation],
      false
    );

    // wait for the modal to close before we clear the form
    new Promise((resolve) => setTimeout(resolve, 200)).then(
      () => (form = emptyForm())
    );
  };

  const formDefaults: { [key: string]: string } = {
    meetLocation: "Choose a place to meet",
    climbLocation: "Choose a place to climb",
    date: "",
    time: "",
  };

  const emptyForm = () => ({
    input: { ...formDefaults },
    errors: { datetime: "" },
    valid: false,
  });

  let form = emptyForm();

  $: {
    form.valid = Object.keys(formDefaults)
      .map((k) => form.input[k] !== formDefaults[k])
      .every(Boolean);

    if (form.input.date && form.input.time) {
      const curDate = new Date();
      const monthLater = new Date();
      monthLater.setDate(monthLater.getDate() + 30);
      const inputDate = new Date(form.input.date + " " + form.input.time);

      if (inputDate <= curDate) {
        form.errors.datetime =
          "You can't schedule a climb in the past! (unless you're a time traveller!?)";
        form.valid = false;
      } else if (inputDate > monthLater) {
        form.errors.datetime =
          "You can't schedule a climb more than a month in advance!";
        form.valid = false;
      } else {
        form.errors.datetime = "";
      }
    }
  }
</script>

<input type="checkbox" id={label} class="modal-toggle" />
<div class="modal">
  <div class="modal-box bg-neutral shadow-2xl">
    <h3 class="font-bold text-2xl">Schedule a Climb</h3>

    <form on:submit={submitForm}>
      <LocationSelector
        bind:value={form.input.meetLocation}
        title={"When and where do you want to meet?"}
        placeholder={formDefaults.meetLocation}
        options={MeetLocation}
      />

      <!-- Date and Time field -->
      <label class="input-group input-group-horizontal mt-1">
        <input
          type="date"
          bind:value={form.input.date}
          class="input input-bordered bg-neutral w-1/2 mr-1"
        />
        <input
          type="time"
          step="60"
          bind:value={form.input.time}
          class="input input-bordered bg-neutral w-1/2"
        />
      </label>
      {#if form.errors.datetime}
        <span class="label-text-alt text-error">{form.errors.datetime}</span>
      {/if}

      <div class="mt-4">
        <LocationSelector
          bind:value={form.input.climbLocation}
          title={"Where are you climbing?"}
          placeholder={formDefaults.climbLocation}
          options={ClimbLocation}
        />
      </div>

      <button
        type="submit"
        class={`w-full mt-4 ${form.valid ? "" : "pointer-events-none"}`}
      >
        <label
          for={label}
          class={`btn btn-success w-full ${
            form.valid ? "" : "btn-disabled pointer-events-none"
          }`}
        >
          <Check /> Submit
        </label>
      </button>
    </form>

    <label
      for={label}
      class="btn btn-md btn-circle btn-ghost absolute right-2 top-2"
    >
      <XMark />
    </label>
  </div>
</div>
