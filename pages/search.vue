<template>
  <client-only>
    <SearchBar @query="handleQuery"/>

    <el-row class="container">
      <!-- Cột trái (Filter) -->
      <el-col :span="3" class="left-column">
        <div class="filter">
          <h3>Filter Options</h3>
          <p>Sort By:</p>
          <el-radio-group v-model="sortOption" @change="handleSortChange">
            <el-radio label="calo">Calories</el-radio>
            <el-radio label="protein">Proteins</el-radio>
            <el-radio label="fat">Fats</el-radio>
            <el-radio label="satFat">Saturated Fats</el-radio>
            <el-radio label="fiber">Fibers</el-radio>
            <el-radio label="carb">Carbs</el-radio>
          </el-radio-group>
          <p>Order:</p>
          <el-radio-group v-model="orderOption" @change="handleOrderChange">
            <el-radio label="asc">Ascending</el-radio>
            <el-radio label="desc">Descending</el-radio>
          </el-radio-group>
        </div>
      </el-col>

      <!-- Cột giữa (Scroll Infinity Loading) -->
      <el-col :span="13" class="middle-column">
        <h3>Search Results</h3>
        <!-- Pass query, sort, and order as props to ScrollPanel -->
        <ScrollPanel :query="query" :sort="sortOption" :order="orderOption" @clickItem="handleClick"/>
      </el-col>

      <!-- Cột phải (Hiển thị nội dung khi click vào item) -->
      <el-col :span="8" class="right-column">
        <div style="display: flex">
          <div class="content-display">
            <h3>Detail Information</h3>
            <p>Name: {{ clickedContent.name }}</p>
            <p>Calories: {{ clickedContent.nuCalories }}</p>
            <p>Price: {{ clickedContent.nuPrice }}</p>
            <p>Proteins: {{ clickedContent.nuProteins }}</p>
            <p>Fats: {{ clickedContent.nuFats }}</p>
            <p>Saturated Fats: {{ clickedContent.nuSatFats }}</p>
            <p>Fibers: {{ clickedContent.nuFibers }}</p>
            <p>Carbs: {{ clickedContent.nuCarbs }}</p>
          </div>
          <div>
            <client-only>
              <NutrientPolarChart :clickedContent="clickedContent"/>
            </client-only>
          </div>
        </div>
        <div style="display: flex;">
          <div v-for="imgPath in clickedContent.imgPaths">
            <el-image
                :src="imgPath"
                style="width: 100%; height: 100px; object-fit: cover; border-radius: 8px; margin-bottom: 10px;"
                fit="cover"
                alt="Ingredient Image"
            ></el-image>
          </div>
        </div>


      </el-col>
    </el-row>
  </client-only>
</template>

<script setup>
import {ref} from 'vue'
import ScrollPanel from '~/components/search/ScrollPanel.vue'
import SearchBar from '~/components/search/SearchBar.vue'
import NutrientPolarChart from "~/components/search/NutrientPolarChart.vue";

// Initialize clickedContent as an object to store all properties
const clickedContent = ref({
  name: '',
  nuCalories: 0,
  nuPrice: 0,
  nuProteins: 0,
  nuFats: 0,
  nuSatFats: 0,
  nuFibers: 0,
  nuCarbs: 0,
  imgPaths: []
})

const query = ref('')           // Store the current query value
const sortOption = ref('calo') // Default sort option
const orderOption = ref('asc')   // Default order option

// Update query when received from SearchBar
const handleQuery = (newQuery) => {
  query.value = newQuery
}

// Update clickedContent with the properties of the clicked item
const handleClick = (item) => {
  clickedContent.value = {
    name: item.name || '',
    nuCalories: item.nuCalories || 0,
    nuPrice: item.nuPrice || 0,
    nuProteins: item.nuProteins || 0,
    nuFats: item.nuFats || 0,
    nuSatFats: item.nuSatFats || 0,
    nuFibers: item.nuFibers || 0,
    nuCarbs: item.nuCarbs || 0,
    imgPaths: item.imgPaths
  }
}

// Handle changes in sort and order options
const handleSortChange = () => {
  query.value = '' // Clear the query to refetch based on new sorting options
}
const handleOrderChange = () => {
  query.value = '' // Clear the query to refetch based on new ordering
}
</script>

<style scoped>
.container {
  height: 40vh;
}

.left-column {
  border-radius: 15px;
  background-color: #ffd3d3;
  padding: 20px;
  height: 40vh;
}

.middle-column {
  background-color: #ffffff;
  padding: 20px;
}

.right-column {
  border-radius: 15px;
  background-color: #ffd3d3;
  padding: 20px;
  height: 40vh;
}

.content-display {
  padding: 10px;
  font-style: italic;
}
</style>
