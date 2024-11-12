<script setup lang="ts">
import { ref, defineEmits } from 'vue';
import axios from 'axios';

const weight = ref<number | null>(null);
const height = ref<number | null>(null);
const age = ref<number | null>(null);
const gender = ref<string | null>(null);
const activityLevel = ref<string | null>(null);
const errorMessage = ref<string | null>(null);

const emit = defineEmits(['showPopup']);

// API call function
const callApi = async () => {
  // Validate required fields
  if (weight.value === null || height.value === null || age.value === null || !gender.value || !activityLevel.value) {
    errorMessage.value = 'Please fill in all required fields.';
    return;
  }

  errorMessage.value = null; // Clear error before API call

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
    emit('showPopup', { response: response.data }); // Emit response data

  } catch (error) {
    console.error('API call error:', error);
    errorMessage.value = 'Error calling API. Please try again.';
  }
};
</script>

<template>
  <div class="form-container">
    <el-row :gutter="20">
      <!-- Cột Input -->
      <el-col :span="12">
        <table class="form-table">
          <tr>
            <td><label for="weight">Weight (kg):</label></td>
            <td>
              <el-input id="weight" size="large" v-model.number="weight" type="number" placeholder="Enter weight in kg" aria-required="true" />
            </td>
          </tr>
          <tr>
            <td><label for="height">Height (cm):</label></td>
            <td>
              <el-input id="height" size="large" v-model.number="height" type="number" placeholder="Enter height in cm" aria-required="true" />
            </td>
          </tr>
          <tr>
            <td><label for="age">Age:</label></td>
            <td>
              <el-input id="age" size="large" v-model.number="age" type="number" placeholder="Enter age" aria-required="true" />
            </td>
          </tr>
          <tr>
            <td><label for="gender">Gender:</label></td>
            <td>
              <el-select id="gender" size="large" v-model="gender" placeholder="Select gender" aria-required="true">
                <el-option label="Male" value="male" />
                <el-option label="Female" value="female" />
              </el-select>
            </td>
          </tr>
          <tr>
            <td><label for="activityLevel">Activity Level:</label></td>
            <td>
              <el-select id="activityLevel" size="large" v-model="activityLevel" placeholder="Select activity level" aria-required="true">
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

      <!-- Cột Carousel Iframe -->
      <el-col :span="12">
        <el-carousel indicator-position="outside" height="700px">
          <el-carousel-item>
            <div>
              <iframe src="https://giphy.com/embed/Ux85ug4OgULvsFBm0O" width="312" height="480" frameborder="0" class="giphy-embed" allowfullscreen></iframe>
            </div>
          </el-carousel-item>
          <el-carousel-item>
            <div>
              <iframe src="https://giphy.com/embed/9qadXtBaqSUUoo5wCW" width="480" height="271" frameborder="0" class="giphy-embed" allowfullscreen></iframe>
            </div>
          </el-carousel-item>
          <el-carousel-item>
            <div>
              <iframe src="https://giphy.com/embed/A8nBeY9Sod3823vUMq" width="480" height="480" frameborder="0" class="giphy-embed" allowfullscreen></iframe>
            </div>
          </el-carousel-item>
          <el-carousel-item>
            <div>
              <iframe src="https://giphy.com/embed/h1QthPTwAvtnnggCW6" width="402" height="480" frameborder="0" class="giphy-embed" allowfullscreen></iframe>
            </div>
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
</style>
