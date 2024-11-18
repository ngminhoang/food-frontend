<script lang="ts" setup>
import {ref, computed} from 'vue';
import {ElMessage} from 'element-plus';
import {Plus, ScaleToOriginal, WarningFilled} from '@element-plus/icons-vue';
import axios from 'axios';
import type {UploadProps} from 'element-plus';
import type {FoodAnalysisResponse} from '~/interfaces/FoodAnalysisResponse';
import RadarChart from '~/components/detect/RadarChart.vue';
import {useNutrientStore} from '~/stores/useNutrientStore';
import CalculatedResultPanel from "~/components/detect/CalculatedResultPanel.vue";
import {c} from "unplugin-vue-router/types-DBiN4-4c";

const imageUrl = ref<string>('');
const uploadedFile = ref<File | null>(null);
const analysisData = ref<FoodAnalysisResponse | null>(null);
const nutrientStore = useNutrientStore();

const isPopupVisible = ref(false);
const results = ref<[]>([]);

const calories = ref<number>(0)
const proteins = ref<number>(0)
const fibers = ref<number>(0)
const carbs = ref<number>(0)
const fats = ref<number>(0)
const satFats = ref<number>(0)
const gram = ref<number>(100)
const callApi = async (calories: number, proteins: number, carbs: number, fibers: number, fats: number, satFats: number) => {
  try {
    const response = await axios.get('http://localhost:8080/api/parameter/filter', {
      params: {
        calories: calories,
        proteins: proteins,
        carbs: carbs,
        fibers: fibers,
        fats: fats,
        satFats: satFats,
      },
    });
    console.log('API response:', response.data);
    results.value = response.data;
    isPopupVisible.value = true;
  } catch (error) {
    console.error('API call error:', error);
  }
};
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
      headers: {'Content-Type': 'multipart/form-data'},
    });

    analysisData.value = response.data;
    ElMessage.success('Image analyzed successfully!');

    // Extract nutrition data from the API response
    const nutrition = analysisData.value.items[0].food[0].food_info.nutrition;
    gram.value =analysisData.value.items[0].food[0].food_info.g_per_serving;
    calories.value = nutrition.calories_100g/100*gram.value??0;
    proteins.value = nutrition.proteins_100g/100*gram.value??0;
    fibers.value = nutrition.fibers_100g/100*gram.value??0;
    carbs.value = nutrition.carbs_100g/100*gram.value??0;
    fats.value = nutrition.fat_100g/100*gram.value??0;
    satFats.value = 0;


    // Check if the API and store data are consistent
    if (calories.value !== 0 && nutrientStore.getSumCalories !== 0) {
      // console.log('Valid data in nutrient store:', nutrientStore.getSumCalories);

      console.log('Nutrient Store Data:', {
        sumCalories: nutrientStore.getSumCalories,
        sumProteins: nutrientStore.getSumProteins,
        sumCarbs: nutrientStore.getSumCarbs,
        sumFibers: nutrientStore.getSumFibers,
        sumFats: nutrientStore.getSumFats,
        sumSatFats: nutrientStore.getSumSatFats,
      });

      // Log all properties from the nutrition object
      console.log('Nutrition Data from API:', {
        calories_100g: nutrition.calories_100g,
        proteins_100g: nutrition.proteins_100g,
        carbs_100g: nutrition.carbs_100g,
        fibers_100g: nutrition.fibers_100g,
        fat_100g: nutrition.fat_100g,
        sat_fat_100g: nutrition.sat_fat_100g,
      });

      const differences = {
        caloriesDiff: (nutrientStore.getSumCalories ?? 0) - (calories.value ?? 0),
        proteinsDiff: (nutrientStore.getSumProteins ?? 0) - (proteins.value ?? 0),
        carbsDiff: (nutrientStore.getSumCarbs ?? 0) - (carbs.value ?? 0),
        fibersDiff: (nutrientStore.getSumFibers ?? 0) - (fibers.value ?? 0),
        fatsDiff: (nutrientStore.getSumFats ?? 0) - (fats.value ?? 0),
        satFatsDiff: (nutrientStore.getSumSatFats ?? 0) - (satFats.value ?? 0),
      };

      console.log('Differences between Nutrient Store and Nutrition:', differences);

      await callApi(
          differences.caloriesDiff,
          differences.proteinsDiff,
          differences.carbsDiff,
          differences.fibersDiff,
          differences.fatsDiff,
          differences.satFatsDiff
      );
    }
  } catch (error) {
    ElMessage.error('Failed to analyze image.');
    console.error('Error during image analysis:', error);
  }
};

const radarChartData = computed(() => {
  if (!analysisData.value) return [];

  return [
    Math.ceil(proteins.value) ?? 0,
    Math.ceil(carbs.value) ?? 0,
    Math.ceil(fibers.value) ?? 0,
    Math.ceil(fats.value) ?? 0,
    Math.ceil(satFats.value) ?? 0,
  ]
});

</script>

<template>

  <el-row class="main-container">
    <!-- Left Column -->
    <el-col :span="6" class="left-column">
      <div class="image-upload">
        <el-upload
            class="avatar-uploader"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
        >
          <img v-if="imageUrl" :src="imageUrl" class="avatar"/>
          <el-icon v-else class="avatar-uploader-icon">
            <Plus/>
          </el-icon>
        </el-upload>
      </div>

      <div v-if="!imageUrl" style="font-size: 50px; color: #8c939d">
        <b>UPLOAD YOUR IMAGE HERE</b>
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
          <div>Nutritional Info For Per {{gram}} grams:</div>
          <ul>
            <li>Calories: {{ calories }}</li>
            <li>Proteins: {{ proteins }}</li>
            <li>Carbs: {{ carbs }}</li>
            <li>Fibers: {{ fibers }}</li>
            <li>Fats: {{ fats }}</li>
            <li>SatFats: {{ satFats }}</li>
          </ul>
        </div>
      </div>
    </el-col>

    <!-- Right Column -->
    <el-col :span="18" class="right-column">
      <div class="table-display">
        <el-table :data="analysisData?.items[0].food[0].ingredients || []" style="width: 100%">
          <el-table-column prop="food_info.display_name" label="Food Item"/>
          <el-table-column prop="food_info.nutrition.calories_100g" label="Calories (per 100g)"/>
          <el-table-column prop="food_info.nutrition.proteins_100g" label="Proteins (per 100g)"/>
          <el-table-column prop="food_info.nutrition.carbs_100g" label="Carbs (per 100g)"/>
          <el-table-column prop="food_info.nutrition.fibers_100g" label="Fibers (per 100g)"/>
          <el-table-column prop="food_info.nutrition.fat_100g" label="Fats (per 100g)"/>
          <el-table-column prop="food_info.nutrition.sat_fat_100g" label="Sat Fats (per 100g)"/>
        </el-table>
      </div>
      <div v-if="isPopupVisible && !nutrientStore.areAllValuesZero()">
        <CalculatedResultPanel :results="results"
                               :food-name="analysisData.items[0].food[0].food_info.display_name"></CalculatedResultPanel>
      </div>
      <div v-else-if="nutrientStore.areAllValuesZero()" style="background-color: #ffefca; padding: 5px; margin:5px">
        <el-icon>
          <WarningFilled/>
        </el-icon>
        Try Calculate your ingredients need to get more information from image
        <NuxtLink to="/calculate" class="nav-link">Calculate</NuxtLink>

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
  border-radius: 8px;
  flex: 40%; /* 40% width for the left column */
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 20px;
  padding: 20px;
}

.right-column {
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

