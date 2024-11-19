<script lang="ts" setup>
import {ref, computed} from 'vue';
import {ElLoading, ElMessage} from 'element-plus';
import {Check, Plus, Close, WarningFilled} from '@element-plus/icons-vue';
import axios from 'axios';
import type {UploadProps} from 'element-plus';
import type {FoodAnalysisResponse} from '~/interfaces/FoodAnalysisResponse';
import RadarChart from '~/components/detect/RadarChart.vue';
import {useNutrientStore} from '~/stores/useNutrientStore';
import CalculatedResultPanel from "~/components/detect/CalculatedResultPanel.vue";
import SearchMore from "~/components/detect/SearchMore.vue";

const imageUrl = ref<string>('');
const uploadedFile = ref<File | null>(null);
const analysisData = ref<FoodAnalysisResponse | null>(null);
const nutrientStore = useNutrientStore();

const isPopupVisible = ref(false);
const isDetectedNutrients = ref(false);
const results = ref<[]>([]);

const calories = ref<number>(0)
const proteins = ref<number>(0)
const fibers = ref<number>(0)
const carbs = ref<number>(0)
const fats = ref<number>(0)
const satFats = ref<number>(0)
const gram = ref<number>(100)

const isLoading = ref(false); // Reactive loading state
let loadingInstance: ReturnType<typeof ElLoading.service> | null = null;

// Watch for changes to isLoading
watch(isLoading, (newVal) => {
  if (newVal) {
    loadingInstance = ElLoading.service({
      lock: true,
      text: 'Loading',
      background: 'rgba(0, 0, 0, 0.7)',
    });
  } else if (loadingInstance) {
    loadingInstance.close();
    loadingInstance = null;
  }
});

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
    isLoading.value = true; // Start loading

    const response = await axios.post<FoodAnalysisResponse>('http://localhost:5000/api/analyze', formData, {
      headers: {'Content-Type': 'multipart/form-data'},
    });

    analysisData.value = response.data;
    ElMessage.success('Image analyzed successfully!');

    // Extract nutrition data from the API response
    const nutrition = analysisData.value.items[0].food[0].food_info.nutrition;
    gram.value = analysisData.value.items[0].food[0].food_info.g_per_serving;
    calories.value = nutrition.calories_100g / 100 * gram.value ?? 0;
    proteins.value = nutrition.proteins_100g / 100 * gram.value ?? 0;
    fibers.value = nutrition.fibers_100g / 100 * gram.value ?? 0;
    carbs.value = nutrition.carbs_100g / 100 * gram.value ?? 0;
    fats.value = nutrition.fat_100g / 100 * gram.value ?? 0;
    satFats.value = 0;

    // Check if the API and store data are consistent
    if (calories.value !== 0 && nutrientStore.getSumCalories !== 0) {
      isDetectedNutrients.value = false;

      const differences = {
        caloriesDiff: (nutrientStore.getSumCalories ?? 0) - (calories.value ?? 0),
        proteinsDiff: (nutrientStore.getSumProteins ?? 0) - (proteins.value ?? 0),
        carbsDiff: (nutrientStore.getSumCarbs ?? 0) - (carbs.value ?? 0),
        fibersDiff: (nutrientStore.getSumFibers ?? 0) - (fibers.value ?? 0),
        fatsDiff: (nutrientStore.getSumFats ?? 0) - (fats.value ?? 0),
        satFatsDiff: (nutrientStore.getSumSatFats ?? 0) - (satFats.value ?? 0),
      };

      await callApi(
          differences.caloriesDiff,
          differences.proteinsDiff,
          differences.carbsDiff,
          differences.fibersDiff,
          differences.fatsDiff,
          differences.satFatsDiff
      );
    } else {
      isPopupVisible.value = false;
      isDetectedNutrients.value = true;
    }
  } catch (error) {
    ElMessage.error('Failed to analyze image.');
    console.error('Error during image analysis:', error);
  } finally {
    isLoading.value = false; // Stop loading
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

      <div class="data-display">

        <div v-if="analysisData" class="analysis-results">
          <div style="background-color: #cdfde2; padding: 5px" v-if="calories!=0">
            <el-icon>
              <Check/>
            </el-icon>
            image clear enough to detect nutrients
          </div>
          <div style="background-color: #ffac00; padding: 5px" v-else>
            <el-icon>
              <Close/>
            </el-icon>
            cannot find out the nutrients
          </div>
          <strong style="font-size: 32px">{{ analysisData.items[0].food[0].food_info.display_name }}</strong>
          <br>
          <div>Nutritional Info For Per {{ gram }} grams:</div>
          <br>
          <!-- Nutritional Information Table -->

          <table>
            <tbody>
            <tr>
              <td>Calories:</td>
              <td><b>{{ Math.ceil(calories) }}</b> (Kcal)</td>
            </tr>
            <tr>
              <td>Proteins:</td>
              <td><b>{{ Math.ceil(proteins) }}</b> (Grams)</td>
            </tr>
            <tr>
              <td>Carbohydrates:</td>
              <td><b>{{ Math.ceil(carbs) }}</b> (Grams)</td>
            </tr>
            <tr>
              <td>Fibers:</td>
              <td><b>{{ Math.ceil(fibers) }}</b> (Grams)</td>
            </tr>
            <tr>
              <td>Fats:</td>
              <td><b>{{ Math.ceil(fats) }}</b> (Grams)</td>
            </tr>
            <tr>
              <td>Saturated Fats:</td>
              <td><b>{{ Math.ceil(satFats) }}</b> (Grams)</td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div class="polar-chart">
        <RadarChart
            :categories="['Proteins', 'Carbs', 'Fibers', 'Fats', 'SatFats']"
            :data-series="radarChartData"
        />

      </div>


    </el-col>

    <!-- Right Column -->
    <el-col :span="18" class="right-column">
      <div class="table-display" v-if="analysisData">
        <div v-if="analysisData?.items[0].food[0].ingredients.length>0">
          <div style="background-color: #a4f8c9; padding: 5px">
            <el-icon>
              <Check/>
            </el-icon>
            image clear enough to detect ingredients
          </div>
          <h1>{{ analysisData.items[0].food[0].food_info.display_name }}'s Ingredients :</h1>
          <table class="custom-table">
            <thead>
            <tr>
              <th>Food Item</th>
              <th>Calories (per 100g)</th>
              <th>Proteins (per 100g)</th>
              <th>Carbs (per 100g)</th>
              <th>Fibers (per 100g)</th>
              <th>Fats (per 100g)</th>
              <th>Sat Fats (per 100g)</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="item in analysisData?.items[0].food[0].ingredients || []" :key="item.food_info.display_name">
              <td>{{ item.food_info.display_name }}</td>
              <td>{{ Math.ceil(item.food_info.nutrition.calories_100g) }}</td>
              <td>{{ Math.ceil(item.food_info.nutrition.proteins_100g) }}</td>
              <td>{{ Math.ceil(item.food_info.nutrition.carbs_100g) }}</td>
              <td>{{ Math.ceil(item.food_info.nutrition.fibers_100g) }}</td>
              <td>{{ Math.ceil(item.food_info.nutrition.fat_100g) }}</td>
              <td>{{ Math.ceil(item.food_info.nutrition.sat_fat_100g) }}</td>
            </tr>
            </tbody>
          </table>
        </div>
        <div v-else>
          <div style="background-color: #ffac00; padding: 5px">
            <el-icon>
              <Close/>
            </el-icon>
            cannot find out the ingredients of {{analysisData.items[0].food[0].food_info.display_name}}
          </div>
        </div>
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
      <div v-else-if="isDetectedNutrients">
        <div style="background-color: #ffac00; padding: 5px">
          <el-icon>
            <Close/>
          </el-icon>
          cannot calculate because cannot detect the nutrients of {{analysisData.items[0].food[0].food_info.display_name}}
        </div>
        <SearchMore/>
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

table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
}

.left-column {

  margin-top: 15px;
  background-color: #eab6b6;
  border-radius: 16px;
  flex: 40%; /* 40% width for the left column */
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 20px;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0.5, 0, 0.5);
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

.custom-table {
  width: 100%;
  border-collapse: collapse; /* Removes spacing between cells */
  border-radius: 8px;
  overflow: hidden; /* Ensures the border-radius applies to the table edges */
  opacity: 0.95;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Optional shadow for depth */
}

.custom-table th,
.custom-table td {
  border: 1px solid #ddd; /* Light border around cells */
  padding: 12px 15px;
  text-align: left;
}

.custom-table th {
  background-color: #f4f4f4;
  font-weight: bold;
}

.custom-table tbody tr:nth-child(even) {
  background-color: rgba(249, 249, 249, 0.38); /* Light gray for alternating rows */
}

.custom-table tbody tr:nth-child(odd) {
  background-color: rgba(232, 185, 185, 0.37); /* White for odd rows */
}

</style>

