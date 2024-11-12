<script lang="ts" setup>
import {ref, defineModel, defineProps} from 'vue';
import {ElMessageBox} from 'element-plus';
import {useNutrientStore} from "~/stores/useNutrientStore";
import NutrientPolarChart from "~/components/search/NutrientPolarChart.vue";

// const nutritionStore = useNutrientStore();
const props = defineProps<{ results: Parameter }>();

const clickedContent = ref({
  name: '',
  nuCalories: 0,
  nuPrice: 0,
  nuProteins: 0,
  nuFats: 0,
  nuSatFats: 0,
  nuFibers: 0,
  nuCarbs: 0
})

const sumPrice = ref(0)

watch(
    () => props.results,
    (newValue) => {
      clickedContent.value = {
        ...clickedContent.value,
        nuProteins: newValue.sumProteins,
        nuFats: newValue.sumFats,
        nuSatFats: newValue.sumSatFats,
        nuFibers: newValue.sumFibers,
        nuCarbs: newValue.sumCarbs,
        nuCalories: newValue.sumCalories,
      };

      sumPrice.value = 0;

      // Calculate the new sumPrice
      if (Array.isArray(newValue.recipes)) {
        for (let recipe of newValue.recipes) {
          if (Array.isArray(recipe.ingradientPercents)) {
            for (let ingredientPercent of recipe.ingradientPercents) {
              sumPrice.value +=
                  Math.ceil(ingredientPercent.percent) *
                  Math.ceil(ingredientPercent.ingredient.nuPrice);
            }
          }
        }
      }
      sumPrice.value = sumPrice.value/100
    },
    { immediate: true }
);

const isPopupVisible = defineModel('modelValue'); // This will be bound to v-model


const handleClose = (done: () => void) => {
  ElMessageBox.confirm('Are you sure to close this dialog?')
      .then(() => {
        done(); // Close the dialog
      })
      .catch(() => {
        // Handle the cancellation
      });
};

</script>

<template>
  <el-dialog
      v-model="isPopupVisible"
      title="Results"
      width="80%"
      :before-close="handleClose"
  >
    <div>

      <el-row :gutter="20">
        <!-- Cột Input -->
        <el-col :span="12"  style="background: linear-gradient(to right, #fb8d8d, #ffffff);border-radius: 15px">
          <h3>Summary</h3>
          <div style="display: flex">
            <div>
              <table>
                <tbody>
                <tr>
                  <td>Total Calories:</td>
                  <td><b>{{ Math.ceil(props.results.sumCalories) }}</b> (Kcal)</td>
                </tr>
                <tr>
                  <td>Total Proteins:</td>
                  <td><b>{{ Math.ceil(props.results.sumProteins) }}</b> (Grams)</td>
                </tr>
                <tr>
                  <td>Total Carbohydrates:</td>
                  <td><b>{{ Math.ceil(props.results.sumCarbs) }}</b> (Grams)</td>
                </tr>
                <tr>
                  <td>Total Fibers:</td>
                  <td><b>{{ Math.ceil(props.results.sumFibers) }}</b> (Grams)</td>
                </tr>
                <tr>
                  <td>Total Fats:</td>
                  <td><b>{{ Math.ceil(props.results.sumFats) }}</b> (Grams)</td>
                </tr>
                <tr>
                  <td>Total Saturated Fats:</td>
                  <td><b>{{ Math.ceil(props.results.sumSatFats) }}</b> (Grams)</td>
                </tr>
                </tbody>
              </table>
            </div>

            <div>
              <client-only>
                <NutrientPolarChart :clickedContent="clickedContent" />
              </client-only>
            </div>

          </div>
        </el-col>

        <el-col :span="12">
          <h3>Recipes</h3>
          <div>
            <table>
              <thead>
              <tr>
                <th>Ingredient</th>
                <th>Grams</th>
                <th>Calories</th>
                <th>Proteins</th>
                <th>Carbohydrates</th>
                <th>Fibers</th>
                <th>Fats</th>
                <th>Saturated Fats</th>
                <th>Price</th>
                <th>Percent</th>

              </tr>
              </thead>
              <tbody>
              <tr v-for="recipe in props.results.recipes" :key="recipe.id">
                <template v-for="(ingredientPercent, index) in recipe.ingradientPercents" :key="ingredientPercent.id">
                  <tr v-if="index !== 0"></tr> <!-- Separate rows for each ingredient after the first one -->
                  <td>{{ ingredientPercent.ingredient.name }}</td>
                  <td>{{ ingredientPercent.ingredient.nuGrams }}</td>
                  <td>{{ ingredientPercent.ingredient.nuCalories }}</td>
                  <td>{{ ingredientPercent.ingredient.nuProteins }}</td>
                  <td>{{ ingredientPercent.ingredient.nuCarbs }}</td>
                  <td>{{ ingredientPercent.ingredient.nuFibers }}</td>
                  <td>{{ ingredientPercent.ingredient.nuFats }}</td>
                  <td>{{ ingredientPercent.ingredient.nuSatFats }}</td>
                  <td>${{ ingredientPercent.ingredient.nuPrice }}</td>
                  <td style="background-color: aquamarine">{{ Math.ceil(ingredientPercent.percent) }}%</td>
                </template>
              </tr>
              </tbody>
            </table>
          </div>
          <div>

            <div style="margin-top: 24px;">
              <el-row :gutter="10">
                <el-col v-for="recipe in props.results.recipes" :key="recipe.id" :span="6">
                  <el-row v-for="ingredientPercent in recipe.ingradientPercents" :key="ingredientPercent.id">
                    <el-tooltip :content="ingredientPercent.ingredient.name" placement="top">
                      <el-image
                          :src="ingredientPercent.ingredient.imgPaths[0]"
                          style="width: 100%; height: 100px; object-fit: cover; border-radius: 8px; margin-bottom: 10px;"
                          fit="cover"
                          alt="Ingredient Image"
                      ></el-image>
                    </el-tooltip>
                  </el-row>
                </el-col>
              </el-row>
            </div>

          </div>
          <div style="font-size: 30px; margin-top: 24px">
            Total: For earch meal, you only need <b>${{sumPrice}}</b>
          </div>

          </el-col>

      </el-row>
    </div>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="isPopupVisible = false">Cancel</el-button>
        <el-button type="primary" @click="isPopupVisible = false">Confirm</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<style scoped>
/* Add your styles here */
</style>
