<script setup lang="ts">
import MainPanel from "~/components/main/MainPanel.vue";
import Background from "~/components/icons/Background.vue";
import AboutPanel from "~/components/main/AboutPanel.vue";
import ContactPanel from "~/components/main/ContactPanel.vue";
</script>

<template>
  <div style="position: relative; min-height: 100vh; overflow: hidden;">
    <!-- Background positioned absolutely under all other content -->
    <Background class="background" />

    <!-- Main Content Layers -->
    <div class="content-wrapper">
      <div class="main-element">
        <MainPanel></MainPanel>
      </div>

      <div style="margin-top: 500px"></div>

      <div class="about-element"
           style="background: linear-gradient(to right, #b1527a, #ffffff); border-radius: 15px; padding: 15px; margin: 20px;">
        <AboutPanel></AboutPanel>
      </div>

      <div style="margin-top: 250px"></div>

      <div class="contact-element"
           style="background: linear-gradient(to right, #ffffff, #c56e91); border-radius: 15px; padding: 15px; margin: 20px;">
        <ContactPanel></ContactPanel>
      </div>
    </div>
  </div>
</template>

<style scoped>
.background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1; /* Places background beneath other content */
}

.content-wrapper {
  position: relative;
  z-index: 1; /* Ensures content stays above the background */
}
</style>
