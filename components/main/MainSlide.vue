<template>
  <el-carousel :interval="4000" type="card" height="200px">
    <el-carousel-item>
      <div class="iframe-container">
        <iframe src="https://giphy.com/embed/Ux85ug4OgULvsFBm0O" width="312" height="480" frameborder="0" class="giphy-embed" allowfullscreen></iframe>
      </div>
    </el-carousel-item>
    <el-carousel-item>
      <div class="iframe-container">
        <iframe src="https://giphy.com/embed/9qadXtBaqSUUoo5wCW" width="480" height="271" frameborder="0" class="giphy-embed" allowfullscreen></iframe>
      </div>
    </el-carousel-item>
    <el-carousel-item>
      <div class="iframe-container">
        <iframe src="https://giphy.com/embed/A8nBeY9Sod3823vUMq" width="480" height="480" style="" frameBorder="0" class="giphy-embed" allowFullScreen></iframe>
      </div>
    </el-carousel-item>
    <el-carousel-item>
      <div class="iframe-container">
        <iframe src="https://giphy.com/embed/h1QthPTwAvtnnggCW6" width="402" height="480" style="" frameBorder="0" class="giphy-embed" allowFullScreen></iframe>
      </div>
    </el-carousel-item>
  </el-carousel>
</template>

<style scoped>
.el-carousel__item h3 {
  color: #475669;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
  text-align: center;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
.iframe-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}
</style>

<script setup lang="ts">
</script>