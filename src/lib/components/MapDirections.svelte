<script lang="ts">
  import { ClimbLocation, MeetLocation } from "$lib/utilities/types";

  export let origin: MeetLocation;
  export let destination: ClimbLocation;

  const meetLocStr = [
    "Northwestern+University+Technical+Institute",
    "Davis+Station+Evanston",
    "Foster+Station+Evanston",
    "Noyes+Station+Evanston",
  ];

  const climbLocStr = [
    "Movement+Lincoln+Park+Chicago",
    "Movement+Wrigleyville+Chicago",
    "First+Ascent+Uptown",
    "Brooklyn+Boulders+Chicago",
  ];

  const mapsDirectionsURL = `https://www.google.com/maps/embed/v1/directions?key=AIzaSyDH7A02njgMyBAyzwWogZuq7NNcuqwEGG0&origin=${
    meetLocStr[Number(MeetLocation[origin])]
  }&destination=${
    climbLocStr[Number(ClimbLocation[destination])]
  }&mode=transit`;
</script>

<div class="relative pb-[450px] h-0 rounded-xl">
  <iframe
    width="600"
    height="450"
    frameborder="0"
    style="border:0"
    referrerpolicy="no-referrer-when-downgrade"
    src={mapsDirectionsURL}
    allowfullscreen
    class="absolute w-full h-full rounded-xl"
  />
</div>
