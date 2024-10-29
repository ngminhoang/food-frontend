<script setup lang="ts">
import { ref } from 'vue';
import CalculatePanel from "~/components/calculate/CalculatePanel.vue";
import ResultPanel from "~/components/calculate/ResultPanel.vue";

// Reactive properties
const isPopupVisible = ref(false);
const results = ref<[]>([]);

// Event handler for showing the popup and updating results
function showPopup(payload) {
  results.value = payload.response;
  isPopupVisible.value = true;
}

function closePopup() {
  isPopupVisible.value = false;
}
</script>

<template>
  <div>
    <CalculatePanel v-model="isPopupVisible" @show-popup="showPopup"></CalculatePanel>
    <ResultPanel v-model="isPopupVisible" :results="results"></ResultPanel>
  </div>
</template>
