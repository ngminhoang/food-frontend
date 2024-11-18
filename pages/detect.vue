<script setup lang="ts">
import MainPanel from "~/components/main/MainPanel.vue";
import Background from "~/components/icons/Background.vue";
import {useNutrientStore} from '~/stores/useNutrientStore';
const nutrientStore = useNutrientStore()

onMounted(()=>{
  console.log('Nutrient Store Data:', {
    sumCalories: nutrientStore.getSumCalories,
    sumProteins: nutrientStore.getSumProteins,
    sumCarbs: nutrientStore.getSumCarbs,
    sumFibers: nutrientStore.getSumFibers,
    sumFats: nutrientStore.getSumFats,
    sumSatFats: nutrientStore.getSumSatFats,
  });
})


</script>

<template>
  <div style="position: relative; min-height: 100vh; overflow: hidden;">
    <!-- Background positioned absolutely under all other content -->
    <Background class="background" />

    <!-- Main Content Layers -->
    <div class="content-wrapper">
     <DetectMainPanel></DetectMainPanel>
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
