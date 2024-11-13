<script setup lang="ts">

import MainPanel from "~/components/main/MainPanel.vue";
import Background from "~/components/icons/Background.vue";
</script>

<template>
<!--  <Background style="position: relative"/>-->
  <div>
    <div class="main-element">
      <MainPanel></MainPanel>
    </div>

    <div style="margin-top: 500px"></div>

    <div class="about-element">
      <h2>This is the target element</h2>
    </div>

    <div style="margin-top: 500px"></div>

    <div class="contact-element">
      <h2>This is the target element</h2>
    </div>
  </div>
</template>

<style scoped>

</style>
