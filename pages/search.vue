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
          <p>{{ clickedContent }}</p>
          <p>calo</p>
          <p>price</p>
          <p>protein</p>
          <p>fat</p>
          <p>satFat</p>
          <p>fiber</p>
          <p>carb</p>
        </div>
      </el-col>
    </el-row>
  </client-only>
</template>

<script setup>
import { ref } from 'vue'
import ScrollPanel from '~/components/search/ScrollPanel.vue'
import SearchBar from '~/components/search/SearchBar.vue'

const clickedContent = ref('Click an item to display content here.')
const query = ref('') // Store the current query value

const handleQuery = (newQuery) => {
  query.value = newQuery // Update query when received from SearchBar
}

const handleClick = (item) => {

  clickedContent.value = `name: ${item.name}`
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
