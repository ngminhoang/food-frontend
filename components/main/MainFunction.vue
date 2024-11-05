

<template>
  <div class="container">
    <div class="panel"  @click="goToSearch">

      <div class="icon-text-container">
        <span class="icon-text">
          <el-icon size="50">
                <Search/>
              </el-icon>
              <div><b>Searching nutrients</b></div>
           </span>

        <el-divider direction="vertical" class="vertical-divider"></el-divider>

        <span class="scale-text">
          <h1>Search Foods and Nutrients</h1>
        </span>
      </div>
      <iframe src="https://giphy.com/embed/RPh7XzttkQCJgBr9OP" width="480" height="480" style="pointer-events: none;"
              frameBorder="0" class="giphy-embed" allowFullScreen></iframe>
    </div>
    <div class="panel"  @click="goToCalculate">


      <div class="icon-text-container">
        <span class="icon-text">
          <el-icon size="50">
                <Coin/>
              </el-icon>
          <div><b>Calculate</b></div>
       </span>

        <el-divider direction="vertical" class="vertical-divider"></el-divider>

        <span class="scale-text">
          <h1>Optimize Your Diet</h1>
        </span>
      </div>
      <iframe src="https://giphy.com/embed/sLXLhWZDrAwqaCWLnS" width="400" height="480" style="pointer-events: none;"
              frameBorder="0" class="giphy-embed" allowFullScreen></iframe>
    </div>
    <div class="panel"  @click="goToDetect">

      <div class="icon-text-container">
        <span class="icon-text">
          <el-icon size="50">
            <DataAnalysis/>
          </el-icon>
          <div><b>Analyze Image</b></div>
        </span>

        <el-divider direction="vertical" class="vertical-divider"></el-divider>

        <span class="scale-text">
          <h1>AI For Detecting Nutrients</h1>
        </span>
      </div>

      <iframe src="https://giphy.com/embed/yZxSAwHGWHnULSUNNK" width="480" height="480" style="pointer-events: none;"
              frameBorder="0" class="giphy-embed" allowFullScreen></iframe>
    </div>
  </div>
</template>


<script setup lang="ts">
import { Coin, DataAnalysis, Search } from "@element-plus/icons-vue";

const router = useRouter();

const goToSearch = () => {
  router.push("/search")
};
const goToDetect = () => {
  router.push("/detect")
};
const goToCalculate = () => {
  router.push("/calculate")
};

</script>


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
  background-color: #ff9797; /* White background for each panel */
  border-radius: 8px; /* Rounded corners */
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Light shadow for the panel */
  transition: transform 0.3s, box-shadow 0.3s; /* Smooth transition on hover */
  cursor: pointer;
  overflow: hidden;
}

.panel:hover {
  background-color: #e8b9b9;
  transform: translateY(-5px); /* Lift the panel on hover */
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2); /* Deeper shadow on hover */
}

.panel:hover h1{
  color: #333333;
}


.panel iframe {
  width: 100%;
  max-width: 100%;
  height: 480px; /* Fixed height */
  border-radius: 8px;
  margin-top: 10px;
}

.icon-text-container {
  display: flex;
  align-items: center;
  gap: 10px; /* Space between items */
}

.icon-text {
  align-items: center;
  gap: 5px; /* Space between icon and text */
}

.vertical-divider {
  height: 50px; /* Adjust height as needed */
  background-color: #ffffff;
}

.scale-text h1 {
  color: #ffffff;
  font-size: 24px; /* Adjust font size as needed */
  margin: 0; /* Remove default margins for alignment */
}
.scale-text h1 {
  color: #ffffff;
  font-size: 32px; /* Increase text size */
  letter-spacing: -1px; /* Narrow space between letters */
  margin: 0; /* Remove default margin for better alignment */
}
</style>
