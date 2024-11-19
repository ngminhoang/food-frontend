<script setup lang="ts">
import { ref, defineEmits } from 'vue';
import axios from 'axios';
import { ElLoading } from 'element-plus';

const weight = ref<number | null>(null);
const height = ref<number | null>(null);
const age = ref<number | null>(null);
const gender = ref<string | null>(null);
const activityLevel = ref<string | null>(null);
const errorMessage = ref<string | null>(null);

const emit = defineEmits(['showPopup']);

// API call function with loading spinner
const callApi = async () => {
  // Validate required fields
  if (weight.value === null || height.value === null || age.value === null || !gender.value || !activityLevel.value) {
    errorMessage.value = 'Please fill in all required fields.';
    return;
  }

  errorMessage.value = null; // Clear error before API call

  // Start the loading spinner
  const loadingInstance = ElLoading.service({
    lock: true,
    text: 'Loading...',
    background: 'rgba(0, 0, 0, 0.7)',
  });

  try {
    const response = await axios.get('http://localhost:8080/api/parameter/filter-by-body', {
      params: {
        weight: weight.value,
        height: height.value,
        age: age.value,
        gender: gender.value,
        activityLevel: activityLevel.value,
      },
    });
    console.log('API response:', response.data);

    // Simulate storing data in a Pinia store (example)
    // nutrientStore.setSumCalories(response.data.sumCalories);

    emit('showPopup', { response: response.data }); // Emit response data

  } catch (error) {
    console.error('API call error:', error);
    errorMessage.value = 'Error calling API. Please try again.';
  } finally {
    // Stop the loading spinner
    loadingInstance.close();
  }
};

const carousel = ref(null);
</script>

<template>
  <div class="form-container">
    <el-row :gutter="20">
      <!-- Input Column -->
      <el-col :span="12">
        <table class="form-table">
          <tr>
            <td><label for="weight">Weight (kg):</label></td>
            <td>
              <el-input @click="carousel.setActiveItem(0);" id="weight" size="large" v-model.number="weight" type="number" placeholder="Enter weight in kg" aria-required="true" />
            </td>
          </tr>
          <tr>
            <td><label for="height">Height (cm):</label></td>
            <td>
              <el-input @click="carousel.setActiveItem(1);" id="height" size="large" v-model.number="height" type="number" placeholder="Enter height in cm" aria-required="true" />
            </td>
          </tr>
          <tr>
            <td><label for="age">Age:</label></td>
            <td>
              <el-input @click="carousel.setActiveItem(2);" id="age" size="large" v-model.number="age" type="number" placeholder="Enter age" aria-required="true" />
            </td>
          </tr>
          <tr>
            <td><label for="gender">Gender:</label></td>
            <td>
              <el-select @click="carousel.setActiveItem(3);" id="gender" size="large" v-model="gender" placeholder="Select gender" aria-required="true">
                <el-option label="Male" value="male" />
                <el-option label="Female" value="female" />
              </el-select>
            </td>
          </tr>
          <tr>
            <td><label for="activityLevel">Activity Level:</label></td>
            <td>
              <el-select @click="carousel.setActiveItem(4);" id="activityLevel" size="large" v-model="activityLevel" placeholder="Select activity level" aria-required="true">
                <el-option label="Sedentary" value="sedentary" />
                <el-option label="Lightly Active" value="lightly_active" />
                <el-option label="Moderately Active" value="moderately_active" />
                <el-option label="Very Active" value="very_active" />
                <el-option label="Super Active" value="super_active" />
              </el-select>
            </td>
          </tr>
          <tr>
            <td colspan="2" style="text-align: center;">
              <el-button size="large" class="button" type="primary" @click="callApi">Submit</el-button>
            </td>
          </tr>
        </table>
        <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
      </el-col>
      <!-- Carousel Column -->
      <el-col :span="12" style="background: linear-gradient(to right, #ffffff, #fb8d8d); border-radius: 15px; padding: 20px;">
        <el-carousel ref="carousel" indicator-position="outside" height="700px">
          <el-carousel-item class="carousel-item">
            <div>
              <iframe src="https://giphy.com/embed/wq5bm6y4do9mbDF8zp" width="480" height="480" style="pointer-events: none;" frameBorder="0" class="giphy-embed" allowFullScreen></iframe>
            </div>
            <b>YOUR WEIGHT IS A POTENTIAL KEY FOR ME</b>
          </el-carousel-item>
          <el-carousel-item class="carousel-item">
            <div>
              <iframe src="https://giphy.com/embed/8lakloarUFVa9V4zOf" width="480" height="480" style="pointer-events: none;" frameBorder="0" class="giphy-embed" allowFullScreen></iframe>
            </div>
            <b>MAKE YOUR HEIGHT BE TRUE .....</b>
          </el-carousel-item>
          <el-carousel-item class="carousel-item">
            <div>
              <iframe src="https://giphy.com/embed/6MC7g5hFqQyqa337pU" width="480" height="480" style="pointer-events: none;" frameBorder="0" class="giphy-embed" allowFullScreen></iframe>
            </div>
            <b>YOUR AGE IS NECESSARY</b>
          </el-carousel-item>
          <el-carousel-item class="carousel-item">
            <div>
              <iframe src="https://giphy.com/embed/vykq7hCWyub8dU8UFg" width="417" height="480" style="pointer-events: none;" frameBorder="0" class="giphy-embed" allowFullScreen></iframe>
            </div>
            <b>AND YOUR GENDER...</b>
          </el-carousel-item>
          <el-carousel-item class="carousel-item">
            <div>
              <iframe src="https://giphy.com/embed/Vd2vmmSOEZzZQWXnxP" width="480" height="480" style="pointer-events: none;" frameBorder="0" class="giphy-embed" allowFullScreen></iframe>
            </div>
            <b>HOW OFTEN DO YOU DO EXERCISE?</b>
          </el-carousel-item>
        </el-carousel>
      </el-col>
    </el-row>
  </div>
</template>

<style scoped>
.form-container {
  padding: 20px;
}

.form-table {
  width: 100%;
  border-collapse: collapse;
}

.form-table td {
  padding: 10px;
  vertical-align: middle;
}

.form-table label {
  font-weight: bold;
  margin-right: 10px;
}

.error-message {
  color: red;
  margin-top: 10px;
}

.button {
  background-color: #b1527a;
}

.carousel-item {
  display: flex;
  font-family: "Gill Sans MT";
  font-size: 64px;
  color: #5a5a5a;
  margin-top: 200px;
}
</style>
