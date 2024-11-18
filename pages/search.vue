<template>
  <client-only>

    <el-row class="container">
      <!-- Cột trái (Filter) -->
      <el-col :span="3" class="left-column">
        <div class="filter">
          <h3>Filter Options</h3>
          <p>Sort By:</p>
          <el-radio-group v-model="sortOption" @change="handleSortChange">
            <el-radio class="radio" label="calo">Calories</el-radio>
            <el-radio class="radio" label="protein">Proteins</el-radio>
            <el-radio class="radio" label="fat">Fats</el-radio>
            <el-radio class="radio" label="satFat">Saturated Fats</el-radio>
            <el-radio class="radio" label="fiber">Fibers</el-radio>
            <el-radio class="radio" label="carb">Carbs</el-radio>
          </el-radio-group>
          <p>Order:</p>
          <el-radio-group v-model="orderOption" @change="handleOrderChange">
            <el-radio class="radio" label="asc">Ascending</el-radio>
            <el-radio class="radio" label="desc">Descending</el-radio>
          </el-radio-group>
        </div>
      </el-col>

      <!-- Cột giữa (Scroll Infinity Loading) -->
      <el-col :span="13" class="middle-column">
        <SearchBar @query="handleQuery"/>
        <h3>Search Results</h3>
        <!-- Pass query, sort, and order as props to ScrollPanel -->
        <ScrollPanel :query="query" :sort="sortOption" :order="orderOption" @clickItem="handleClick"/>
      </el-col>

      <!-- Cột phải (Hiển thị nội dung khi click vào item) -->
      <el-col :span="8" class="right-column">
        <div style="display: flex">
          <div class="content-display">
            <h3>Detail Information</h3>
            <table>
              <tr>
                <td><b>Name:</b></td>
                <td>{{ clickedContent.name }}</td>
              </tr>
              <tr>
                <td><b>Calories:</b></td>
                <td>{{ clickedContent.nuCalories }} (Kcal)</td>
              </tr>
              <tr>
                <td><b>Price:</b></td>
                <td :style="{ color: clickedContent.nuPrice === 0 ? 'red' : 'green' }">
                  $ {{ clickedContent.nuPrice }}
                </td>

              </tr>
              <tr>
                <td><b>Proteins:</b></td>
                <td>{{ clickedContent.nuProteins }} (Gram)</td>
              </tr>
              <tr>
                <td><b>Fats:</b></td>
                <td>{{ clickedContent.nuFats }} (Gram)</td>
              </tr>
              <tr>
                <td><b>Saturated Fats:</b></td>
                <td>{{ clickedContent.nuSatFats }} (Gram)</td>
              </tr>
              <tr>
                <td><b>Fibers:</b></td>
                <td>{{ clickedContent.nuFibers }} (Gram)</td>
              </tr>
              <tr>
                <td><b>Carbs:</b></td>
                <td>{{ clickedContent.nuCarbs }} (Gram)</td>
              </tr>
            </table>
          </div>

          <div>
            <client-only>
              <NutrientPolarChart :clickedContent="clickedContent"/>
            </client-only>
          </div>
        </div>
          <div style="display: flex; flex-wrap: wrap; gap: 10px;">
            <div
                v-for="imgPath in clickedContent.imgPaths"
                :key="imgPath"
                style="flex: 1 1 100px; max-width: calc(33.33% - 10px);"
            >
              <el-image
                  :src="'http://localhost:8080' + imgPath"
                  style=" object-fit: cover; border-radius: 8px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);"
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
  margin-top: 15px;
  border-radius: 15px;
  background-color: #e8b9b9;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
}

.middle-column {
  padding: 20px;
}

.right-column {
  margin-top: 15px;
  border-radius: 15px;
  background-color: #ffd0d0;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
}

.content-display {
  padding: 10px;
  font-style: italic;
}

.radio{
  color: #b1527a;
  font-weight: bold;
}

</style>
<style scoped>
.content-display {
  margin: 20px;
  font-family: Arial, sans-serif;
}

h3 {
  margin-bottom: 15px;
  color: #333;
}

table {
  width: 100%;
  border-collapse: collapse;
}

table td {
  padding: 8px 12px;
  border: 1px solid #ddd;
}

table td:first-child {
  font-weight: bold;
  color: #555;
  text-align: right;
  width: 30%; /* Adjust column width */
}

table td:last-child {
  text-align: left;
  width: 70%; /* Adjust column width */
}

table tr:nth-child(even) {
  background-color: rgba(249, 249, 249, 0.25);
}
</style>
