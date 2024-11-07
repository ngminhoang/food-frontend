<template>
  <client-only>
    <apexchart type="polarArea" :options="chartOptions" :series="chartSeries" />
  </client-only>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  clickedContent: {
    type: Object,
    required: true,
    default: () => ({
      name: '',
      nuCalories: 0,
      nuPrice: 0,
      nuProteins: 0,
      nuFats: 0,
      nuSatFats: 0,
      nuFibers: 0,
      nuCarbs: 0
    })
  }
})

// Set up reactive series data to display nutrient values
const chartSeries = ref([ 0, 0, 0, 0, 0])

// Define chart options
const chartOptions = ref({
  labels: [ 'Proteins', 'Fats', 'Saturated Fats', 'Fibers', 'Carbs'],
  fill: {
    opacity: 0.85
  },
  chart: {
    width: 380,
    type: 'polarArea'
  },
  stroke: {
    width: 1,
    colors: undefined
  },
  legend: {
    position: 'top'
  },
  responsive: [
    {
      breakpoint: 480,
      options: {
        chart: {
          width: 300
        },
        legend: {
          position: 'bottom'
        }
      }
    }
  ]
})

// Watch for changes in `clickedContent` to update `chartSeries`
watch(
    () => props.clickedContent,
    (newContent) => {
      chartSeries.value = [
        newContent.nuProteins,
        newContent.nuFats,
        newContent.nuSatFats,
        newContent.nuFibers,
        newContent.nuCarbs
      ]
    },
    {immediate: true}
)
</script>

<style scoped>
/* Customize the appearance of the chart if necessary */
</style>
