<template>
  <!-- Use ClientOnly wrapper to ensure the chart renders only in the client-side -->
  <ClientOnly>
    <apexchart :options="chartOptions" :series="chartData" height="350"></apexchart>
  </ClientOnly>
</template>

<script setup lang="ts">
import { reactive, ref, computed, watch } from 'vue';
import ApexCharts from 'vue3-apexcharts';
import { defineProps } from 'vue';
import { useNutrientStore } from '~/stores/useNutrientStore';

// Define props for categories and dataSeries from the parent component
const props = defineProps<{
  categories: string[];
  dataSeries: number[];
}>();

// Create a ref for dataSeries that will reactively update
const dataSeries = ref<number[]>([]);

// Access the nutrient store (you should have this store properly defined in Nuxt)
const nutrientStore = useNutrientStore();

// Watch for changes in props.dataSeries and update dataSeries
watch(
    () => props.dataSeries,
    (newValue) => {
      dataSeries.value = [...newValue];
    },
    { immediate: true }
);

// Computed property for chartData to ensure it updates reactively
const chartData = computed(() => [
  {
    name: 'Food data',
    data: dataSeries.value,
  },
  {
    name: 'Your need',
    data: [
      Math.ceil(nutrientStore.getSumProteins),
      Math.ceil(nutrientStore.getSumCarbs),
      Math.ceil(nutrientStore.getSumFibers),
      Math.ceil(nutrientStore.getSumFats),
      Math.ceil(nutrientStore.getSumSatFats),
    ],
  },
]);

// Computed property for chartOptions to ensure it updates reactively
const chartOptions = computed(() => ({
  chart: {
    height: 350,
    type: 'radar',
    dropShadow: {
      enabled: true,
      blur: 1,
      left: 1,
      top: 1,
    },
  },
  title: {
    text: 'Radar Chart - Multi Series',
  },
  stroke: {
    width: 2,
  },
  fill: {
    opacity: 0.1,
  },
  markers: {
    size: 0,
  },
  yaxis: {
    tickAmount: 5, // Controls the steps
  },
  xaxis: {
    categories: props.categories,
  },
}));
</script>

<style scoped>
/* Add any chart-specific styles if needed */
</style>
