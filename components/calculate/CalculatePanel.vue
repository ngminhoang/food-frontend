<script setup lang="ts">
import { ref } from 'vue';
import axios from 'axios';

const weight = ref<number | null>(null);
const height = ref<number | null>(null);
const age = ref<number | null>(null);
const gender = ref<string | null>(null);
const activityLevel = ref<string | null>(null);
const errorMessage = ref<string | null>(null);

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
  } catch (error) {
    console.error('API call error:', error);
    errorMessage.value = 'Error calling API. Please try again.';
  }
};
</script>

<template>
  <div class="form-container">
    <el-input
        v-model.number="weight"
        type="number"
        placeholder="Enter weight in kg"
        aria-required="true"
    />
    <el-input
        v-model.number="height"
        type="number"
        placeholder="Enter height in cm"
        aria-required="true"
    />
    <el-input
        v-model.number="age"
        type="number"
        placeholder="Enter age"
        aria-required="true"
    />

    <el-select v-model="gender" placeholder="Select gender" aria-required="true">
      <el-option label="Male" value="male" />
      <el-option label="Female" value="female" />
    </el-select>

    <el-select v-model="activityLevel" placeholder="Select activity level" ria-required="true">
      <el-option label="Sedentary" value="sedentary" />
      <el-option label="Lightly Active" value="lightly_active" />
      <el-option label="Moderately Active" value="moderately_active" />
      <el-option label="Very Active" value="very_active" />
      <el-option label="Super Active" value="super_active" />
    </el-select>

    <el-button type="primary" @click="callApi">Submit</el-button>

    <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
  </div>
</template>

<style scoped>
.form-container {
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 20px;
}

.error-message {
  color: red;
  margin-top: 10px;
}
</style>
