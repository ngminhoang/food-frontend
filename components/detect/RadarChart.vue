<!-- components/RadarChart.vue -->
<template>
  <client-only>
    <apexchart type="radar" :options="chartOptions" :series="chartData" height="300"></apexchart>
  </client-only>
</template>

<script setup lang="ts">
import {defineProps, computed} from 'vue';
import ApexCharts from 'vue3-apexcharts';

const props = defineProps<{
  categories: string[];
  dataSeries: { name: string; data: number[] }[];
}>();

const chartOptions = computed(() => ({
  chart: {
    toolbar: {show: false},
  },
  xaxis: {
    categories: props.categories,
  },
  stroke: {
    width: 2,
  },
  fill: {
    opacity: 0.2,
  },
  markers: {
    size: 4,
  },
}));

const chartData = computed(() => props.dataSeries);
</script>

<style scoped>
/* Add any styles for the radar chart here */
</style>
