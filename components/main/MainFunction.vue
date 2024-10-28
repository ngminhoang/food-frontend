<script setup lang="ts">
</script>

<template>
  <div class="container">
    <div class="panel">
      Searching nutrients
    </div>
    <div class="panel">
      Calculate
      <el-button>

      </el-button>
    </div>
    <div class="panel">
      Analyze Image
    </div>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  justify-content: space-between; /* Distributes the panels evenly */
  gap: 20px; /* Space between the panels */
  padding: 20px;
  height: 40vh;
}

.panel {
  flex: 1; /* Each panel takes equal space */
  background-color: #cefff6; /* White background for each panel */
  border-radius: 8px; /* Rounded corners */
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Light shadow for the panel */
  text-align: center; /* Center the text */
  transition: transform 0.3s, box-shadow 0.3s; /* Smooth transition on hover */
  cursor: pointer;
}

.panel:hover {
  transform: translateY(-5px); /* Lift the panel on hover */
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2); /* Deeper shadow on hover */
}
</style>
