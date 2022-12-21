<script lang="ts">
  import { Plus, Check, XMark } from "svelte-heros-v2";

  import {
    climbLocations,
    addClimb,
    type Climb,
  } from "$lib/utilities/database";
  import { user } from "$lib/utilities/auth";

  const submitForm = () => {
    addClimb(
      {
        location: form.input.location,
        date: new Date(form.input.date + " " + form.input.time),
        // @ts-ignore
        organizer: $user?.uid,
        attendees: [],
        withClub: false,
      } as Climb,
      form.input.date
    );

    // wait for the modal to close before we clear the form
    new Promise((resolve) => setTimeout(resolve, 200)).then(
      () => (form = emptyForm())
    );
  };

  const formDefaults: { [key: string]: string } = {
    location: "Choose a Location",
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
      }
    }
  }
</script>

<label
  for="climb-adder-modal"
  class="btn btn-circle btn-success text-neutral border-0"
>
  <Plus />
</label>

<input type="checkbox" id="climb-adder-modal" class="modal-toggle" />
<div class="modal">
  <div class="modal-box">
    <h3 class="font-bold text-2xl">Add a Climb</h3>

    <form on:submit={submitForm}>
      <!-- Location field -->
      <div class="mt-2">
        <span class="label-text text-lg">Where are you climbing?</span>
        <select
          bind:value={form.input.location}
          class="select select-bordered w-full"
        >
          <option disabled selected>{formDefaults.location}</option>
          {#each climbLocations as location}
            <option>{location}</option>
          {/each}
        </select>
      </div>

      <!-- Date and Time field -->
      <div class="mt-2">
        <span class="label-text text-lg">When will you go?</span>
        <div class="flex flex-row">
          <input
            type="date"
            bind:value={form.input.date}
            class="input input-bordered mr-2 w-1/2"
          />
          <input
            type="time"
            step="60"
            bind:value={form.input.time}
            class="input input-bordered w-1/2"
          />
        </div>
        {#if form.errors.datetime}
          <span class="label-text-alt text-error">{form.errors.datetime}</span>
        {/if}

        <button
          type="submit"
          class={`w-full mt-4 ${form.valid ? "" : "pointer-events-none"}`}
          ><label
            for="climb-adder-modal"
            class={`btn btn-success w-full ${
              form.valid ? "" : "btn-disabled pointer-events-none"
            }`}><Check /> Submit</label
          ></button
        >
      </div>
    </form>

    <label
      for="climb-adder-modal"
      class="btn btn-md btn-circle btn-ghost absolute right-2 top-2"
      ><XMark /></label
    >
  </div>
</div>
