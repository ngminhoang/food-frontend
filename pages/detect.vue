<script lang="ts" setup>
import { ref, computed } from 'vue';
import { ElMessage } from 'element-plus';
import { Plus } from '@element-plus/icons-vue';
import axios from 'axios';
import type { UploadProps } from 'element-plus';
import type { FoodAnalysisResponse } from '~/interfaces/FoodAnalysisResponse';
import RadarChart from '~/components/detect/RadarChart.vue';

const imageUrl = ref('');
const uploadedFile = ref<File | null>(null);
const analysisData = ref<FoodAnalysisResponse | null>(null);

const handleAvatarSuccess: UploadProps['onSuccess'] = (response, uploadFile) => {
  uploadedFile.value = uploadFile.raw!;
  imageUrl.value = URL.createObjectURL(uploadFile.raw!);
  analyzeImage();
};

const analyzeImage = async () => {
  if (!uploadedFile.value) return;

  const formData = new FormData();
  formData.append('image', uploadedFile.value);

  try {
    const response = await axios.post<FoodAnalysisResponse>('http://localhost:5000/api/analyze', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    analysisData.value = response.data;
    ElMessage.success('Image analyzed successfully!');
  } catch (error) {
    ElMessage.error('Failed to analyze image.');
    console.error(error);
  }
};

const radarChartData = computed(() => {
  if (!analysisData.value) return [];

  const nutrition = analysisData.value.items[0].food[0].food_info.nutrition;
  return [
    {
      name: 'Nutrition per 100g',
      data: [
        nutrition.proteins_100g,
        nutrition.carbs_100g,
        nutrition.fibers_100g,
        nutrition.fat_100g,
        nutrition.sat_fat_100g,
      ],
    },
  ];
});
</script>

<template>
  <vue-typer text='Hello World! I was registered globally!'></vue-typer>
  <vue-typer
      :text='["Arya Stark","Jon Snow","Daenerys Targaryen","Melisandre","Tyrion Lannister"]'
      :repeat='Infinity'
      :shuffle='false'
      initial-action='typing'
      :pre-type-delay='70'
      :type-delay='70'
      :pre-erase-delay='2000'
      :erase-delay='250'
      erase-style='select-all'
      :erase-on-complete='false'
      caret-animation='blink'
  ></vue-typer>
  <el-row class="main-container">
    <!-- Left Column -->
    <el-col :span="9" class="left-column">
      <div class="image-upload">
        <el-upload
            class="avatar-uploader"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
        >
          <img v-if="imageUrl" :src="imageUrl" class="avatar" />
          <el-icon v-else class="avatar-uploader-icon">
            <Plus />
          </el-icon>
        </el-upload>
      </div>

      <div class="polar-chart">
        <RadarChart
            :categories="['Proteins', 'Carbs', 'Fibers', 'Fats', 'SatFats']"
            :data-series="radarChartData"
        />
      </div>

      <div class="data-display">
        <div v-if="analysisData" class="analysis-results">
          <strong>{{ analysisData.items[0].food[0].food_info.display_name }}</strong>
          <div>Nutritional Info For Per 100grams:</div>
          <ul>
            <li>Calories: {{ analysisData.items[0].food[0].food_info.nutrition.calories_100g }}</li>
            <li>Proteins: {{ analysisData.items[0].food[0].food_info.nutrition.proteins_100g }}</li>
            <li>Carbs: {{ analysisData.items[0].food[0].food_info.nutrition.carbs_100g }}</li>
            <li>Fibers: {{ analysisData.items[0].food[0].food_info.nutrition.fibers_100g }}</li>
            <li>Fats: {{ analysisData.items[0].food[0].food_info.nutrition.fat_100g }}</li>
            <li>SatFats: {{ analysisData.items[0].food[0].food_info.nutrition.sat_fat_100g }}</li>
          </ul>
        </div>
      </div>
    </el-col>

    <!-- Right Column -->
    <el-col :span="15" class="right-column">
      <div class="table-display">
        <el-table :data="analysisData?.items[0].food[0].ingredients || []" style="width: 100%">
          <el-table-column prop="food_info.display_name" label="Food Item" />
          <el-table-column prop="food_info.nutrition.calories_100g" label="Calories (per 100g)" />
          <el-table-column prop="food_info.nutrition.proteins_100g" label="Proteins (per 100g)" />
          <el-table-column prop="food_info.nutrition.carbs_100g" label="Carbs (per 100g)" />
          <el-table-column prop="food_info.nutrition.fibers_100g" label="Fibers (per 100g)" />
          <el-table-column prop="food_info.nutrition.fat_100g" label="Fats (per 100g)" />
          <el-table-column prop="food_info.nutrition.sat_fat_100g" label="Sat Fats (per 100g)" />
        </el-table>
      </div>

      <div>

      </div>

    </el-col>
  </el-row>
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

<style scoped>
.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>

<style scoped>
.main-container {
  display: flex;
  width: 100%;
  height: 100%;
}

.left-column {
  background-color: #e1e1e1;
  flex: 40%; /* 40% width for the left column */
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 20px;
  padding: 20px;
}

.right-column {
  background-color: #ffffff;
  flex: 60%; /* 60% width for the right column */
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px;
}

.image-upload {
  flex: 1; /* Takes the top space */
  display: flex;
  justify-content: center;
  align-items: center;
}

.polar-chart {
  flex: 1; /* Takes the middle space */
  display: flex;
  justify-content: center;
  align-items: center;
}

.data-display {
  flex: 1; /* Takes the bottom space */
}

.chart-placeholder {
  width: 100%;
  height: 300px;
  background-color: #f0f0f0;
  text-align: center;
  line-height: 300px;
  color: #aaa;
}

.message-display {
  flex: 1; /* Takes the top space */
}

.table-display {
  flex: 2; /* Takes the bottom space, larger than the message display */
}

.avatar-uploader .avatar {
  width: 178px;
  height: 178px;
  display: block;
}

.analysis-results {
  margin-top: 20px;
}

.el-table {
  width: 100%;
}

.el-table-column {
  width: 25%;
}

.el-message {
  margin-bottom: 20px;
}
</style>

