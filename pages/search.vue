<template>
  <client-only>
    <SearchBar @query="handleQuery" />

    <el-row class="container">
      <!-- Cột trái (Filter) -->
      <el-col :span="5" class="left-column">
        <div class="filter">
          <h3>Filter Options</h3>
          <p>Filter content goes here</p>
        </div>
      </el-col>

      <!-- Cột giữa (Scroll Infinity Loading) -->
      <el-col :span="10" class="middle-column">
        <h3>Scrollable Content</h3>
        <!-- Pass query prop directly to ScrollPanel -->
        <ScrollPanel :query="query" @clickItem="handleClick" />
      </el-col>

      <!-- Cột phải (Hiển thị nội dung khi click vào item) -->
      <el-col :span="9" class="right-column">
        <div class="content-display">
          <h3>Clicked Content Display</h3>
          <p>Name: {{ clickedContent.name }}</p>
          <p>Calories: {{ clickedContent.nuCalories }}</p>
          <p>Price: {{ clickedContent.nuPrice }}</p>
          <p>Proteins: {{ clickedContent.nuProteins }}</p>
          <p>Fats: {{ clickedContent.nuFats }}</p>
          <p>Saturated Fats: {{ clickedContent.nuSatFats }}</p>
          <p>Fibers: {{ clickedContent.nuFibers }}</p>
          <p>Carbs: {{ clickedContent.nuCarbs }}</p>
        </div>
      </el-col>
    </el-row>
  </client-only>
</template>

<script setup>
import { ref } from 'vue'
import ScrollPanel from '~/components/search/ScrollPanel.vue'
import SearchBar from '~/components/search/SearchBar.vue'

// Initialize clickedContent as an object to store all properties
const clickedContent = ref({
  name: '',
  nuCalories: 0,
  nuPrice: 0,
  nuProteins: 0,
  nuFats: 0,
  nuSatFats: 0,
  nuFibers: 0,
  nuCarbs: 0
})

const query = ref('') // Store the current query value

const handleQuery = (newQuery) => {
  query.value = newQuery // Update query when received from SearchBar
}

const handleClick = (item) => {
  // Update clickedContent with the properties of the clicked item
  clickedContent.value = {
    name: item.name || '',
    nuCalories: item.nuCalories || 0,
    nuPrice: item.nuPrice || 0,
    nuProteins: item.nuProteins || 0,
    nuFats: item.nuFats || 0,
    nuSatFats: item.nuSatFats || 0,
    nuFibers: item.nuFibers || 0,
    nuCarbs: item.nuCarbs || 0
  }
}
</script>

<style scoped>
.container {
  height: 40vh;
}

.left-column {
  background-color: #f5f5f5;
  padding: 20px;
  height: 40vh;
}

.middle-column {
  background-color: #ffffff;
  padding: 20px;
}

.right-column {
  background-color: #f0f0f0;
  padding: 20px;
  height: 40vh;
}

.content-display {
  padding: 10px;
  font-style: italic;
}
</style>
