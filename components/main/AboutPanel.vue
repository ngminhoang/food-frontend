<script setup lang="ts">
import {DataLine} from "@element-plus/icons-vue";

const activeName = ref('1')
</script>

<template>
  <el-row>
    <el-col :span="16">
      <p STYLE="font-size: 64px;  color: #ffffff"><b>WHAT IS NUTRIBASE ?</b></p>
      <h2>THIS IS THE WEBSITE WHICH HELP PEOPLE TO IMPROVE THEIR BUDGET AND THEIR MEAL</h2>
      <iframe src="https://giphy.com/embed/l0Exh5setxQl10lUI" width="341" height="341"
              style="pointer-events: none;border-radius: 8px;margin-right: 5px"
              frameBorder="0"
              class="giphy-embed" allowFullScreen></iframe>
      <iframe src="https://giphy.com/embed/jPGYABvxXo7qeHYs3v" width="480" height="341"
              style="pointer-events: none;border-radius: 8px;margin-right: 5px"
              frameBorder="0"
              class="giphy-embed" allowFullScreen></iframe>
      <iframe src="https://giphy.com/embed/tolaGqMj46lwxzTurd" width="341" height="341"
              style="pointer-events: none;border-radius: 8px;margin-right: 5px"
              frameBorder="0"
              class="giphy-embed" allowFullScreen></iframe>
    </el-col>
    <el-col :span="8">
      <p STYLE="font-size: 32px; color: #ff6a4b"><b>WHAT DO WE PROVIDE ?</b></p>
      <h2>THERE ARE 3 MAIN FUNCTIONS WHICH HELP YOU A ALOT FOR YOUR DIET:</h2>
      <el-carousel
          height="400px"
          direction="vertical"
          type="card"
          :autoplay="false"
      >
        <el-carousel-item style="background-color: #b1527a;border-radius: 8px">
          <el-row>
            <el-col :span="12" style="padding: 64px; color: #ffffff">
              <div>
                Calculate the ingredients to make sure the potential nutrients and optimal
                cost
              </div>
              <div>
                <NuxtLink to="/calculate" style="margin-top: 5px"><el-button type="danger" plain>TRY IT NOW</el-button></NuxtLink>
              </div>
            </el-col>
            <el-col :span="12">
              <iframe src="https://giphy.com/embed/MB75OzWrpUMOWfBHg0" width="240" height="200"
                      style="pointer-events: none;" frameBorder="0"
                      class="giphy-embed" allowFullScreen></iframe>
            </el-col>
          </el-row>
        </el-carousel-item>
        <el-carousel-item style="background-color: #ff9797;border-radius: 8px">
          <el-row>
            <el-col :span="12" style="padding: 64px; color: #ffffff">
              <div>
                help you search ingredients conveniently and redirect to nutrients website
              </div>
              <div>
                  <NuxtLink to="/search" style="margin-top: 5px"><el-button type="primary" plain>TRY IT NOW</el-button></NuxtLink>
              </div>
            </el-col>
            <el-col :span="12">
              <iframe src="https://giphy.com/embed/M4VVhrbRI5vGsu4CGT" width="240" height="200"
                      style="pointer-events: none;" frameBorder="0"
                      class="giphy-embed" allowFullScreen></iframe>
            </el-col>
          </el-row>
        </el-carousel-item>
        <el-carousel-item style="background-color: #52b1a1;border-radius: 8px">
          <el-row>
            <el-col :span="12" style="padding: 64px; color: #ffffff">
              <div>
                Using AI to detect ingredients from your image and optimize them
              </div>
              <div>
                <NuxtLink to="/detect" style="margin-top: 5px"><el-button type="success" plain>TRY IT NOW</el-button></NuxtLink>
              </div>
            </el-col>
            <el-col :span="12">
              <iframe src="https://giphy.com/embed/VZV471U1wUShjcsMlE" width="240" height="180"
                      style="pointer-events: none;" frameBorder="0" class="giphy-embed" allowFullScreen></iframe>
            </el-col>
          </el-row>
        </el-carousel-item>
      </el-carousel>
    </el-col>
  </el-row>
</template>

<style scoped>
.el-carousel__item h3 {
  color: #475669;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
  text-align: center;
}


.el-carousel__item:hover {
  background-color: #f19fbf;
  transform: translateY(-5px); /* Lift the panel on hover */
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2); /* Deeper shadow on hover */
}
</style>