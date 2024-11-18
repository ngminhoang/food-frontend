
<template>
  <client-only>
    <apexchart :options="chartOptions" :series="chartData" height="350"></apexchart>


<!--    <div v-for="(item, index) in props.dataSeries" :key="index">-->
<!--      //{{ item }}-->
<!--    </div>-->
  </client-only>
</template>

<script setup lang="ts">
import { reactive } from 'vue';
import ApexCharts from 'vue3-apexcharts';

import {defineProps, computed} from 'vue';
import {useNutrientStore} from "~/stores/useNutrientStore";

const props = defineProps<{
  categories:string[];
  dataSeries:number[];
}>();

const dataSeries= ref<number[]>([])

const nutrientStore = useNutrientStore();

watch(
    () => props.dataSeries, // Watch the props.dataSeries
    (newValue) => {
      dataSeries.value = [...newValue]; // Update the ref when props.dataSeries changes
    },
    { immediate: true } // Run the watch immediately on initialization
);
// Radar chart options
const chartOptions = reactive({
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
});

// Radar chart data
const chartData = reactive([
  {
    name: 'Food data',
    data: dataSeries.value,
  },
  {
    name: 'Your need',
    data: [Math.ceil(nutrientStore.getSumProteins), Math.ceil(nutrientStore.getSumCarbs), Math.ceil(nutrientStore.getSumFibers), Math.ceil(nutrientStore.getSumFats), Math.ceil(nutrientStore.getSumSatFats)],
  },
  // {
  //   name: 'Series 3',
  //   data: [44, 76, 78, 13, 43],
  // },
]);
</script>

<style scoped>
/* Add any chart-specific styles if needed */
</style>


<!--&lt;!&ndash; components/RadarChart.vue &ndash;&gt;-->
<!--<template>-->
<!--  <client-only>-->
<!--    <apexchart type="radar" :options="chartOptions" :series="chartData" height="300"></apexchart>-->
<!--  </client-only>-->
<!--</template>-->

<!--<script setup lang="ts">-->
<!--import {defineProps, computed} from 'vue';-->
<!--import ApexCharts from 'vue3-apexcharts';-->

<!--const props = defineProps<{-->
<!--  categories: string[];-->
<!--  dataSeries: { name: string; data: number[] }[];-->
<!--}>();-->

<!--const chartOptions = computed(() => ({-->
<!--  chart: {-->
<!--    toolbar: {show: false},-->
<!--  },-->
<!--  xaxis: {-->
<!--    categories: props.categories,-->
<!--  },-->
<!--  stroke: {-->
<!--    width: 2,-->
<!--  },-->
<!--  fill: {-->
<!--    opacity: 0.2,-->
<!--  },-->
<!--  markers: {-->
<!--    size: 4,-->
<!--  },-->
<!--}));-->

<!--const chartData = computed(() => props.dataSeries);-->
<!--</script>-->

<!--<style scoped>-->
<!--/* Add any styles for the radar chart here */-->
<!--</style>-->
