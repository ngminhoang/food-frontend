<script lang="ts" setup>
import { ref } from 'vue';
import { ElMessage } from 'element-plus';
import { Plus } from '@element-plus/icons-vue';
import axios from 'axios';
import type { UploadProps } from 'element-plus';
import type {FoodAnalysisResponse} from "~/interfaces/FoodAnalysisResponse";

const imageUrl = ref('');
const uploadedFile = ref<File | null>(null);
const analysisData = ref<FoodAnalysisResponse | null>(null);

const handleAvatarSuccess: UploadProps['onSuccess'] = (
    response,
    uploadFile
) => {
  uploadedFile.value = uploadFile.raw!;
  imageUrl.value = URL.createObjectURL(uploadFile.raw!);

  // Call the analyze API after a successful upload
  analyzeImage();
};

const analyzeImage = async () => {
  if (!uploadedFile.value) return;

  const formData = new FormData();
  formData.append('image', uploadedFile.value);

  try {
    const response = await axios.post<FoodAnalysisResponse>('http://localhost:5000/api/analyze', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    analysisData.value = response.data;
    ElMessage.success('Image analyzed successfully!');
  } catch (error) {
    ElMessage.error('Failed to analyze image.');
    console.error(error);
  }
};
</script>

<template>
  <el-upload
      class="avatar-uploader"
      :show-file-list="false"
      :on-success="handleAvatarSuccess"
      :before-upload="beforeAvatarUpload"
  >
    <img v-if="imageUrl" :src="imageUrl" class="avatar" />
    <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
  </el-upload>

  <div v-if="analysisData" class="analysis-results">
    <h3>Analysis Results</h3>
    <p>Analysis ID: {{ analysisData.analysis_id }}</p>

    <div v-for="(item, index) in analysisData.items" :key="index">
      <h4>Food Item {{ index + 1 }}</h4>
      <ul>
        <li v-for="foodItem in item.food" :key="foodItem.food_info.food_id">
          <strong>{{ foodItem.food_info.display_name }}</strong> - Grade: {{ foodItem.food_info.fv_grade }}
          <div>Nutritional Info:</div>
          <ul>
            <li>Calories: {{ foodItem.food_info.nutrition.calories_100g }}</li>
            <li>Proteins: {{ foodItem.food_info.nutrition.proteins_100g }}</li>
            <!-- Add other nutrients as needed -->
          </ul>
        </li>
      </ul>
    </div>
  </div>
</template>


<style scoped>
.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}
.analysis-result {
  margin-top: 20px;
  font-size: 14px;
  color: #333;
}
</style>
