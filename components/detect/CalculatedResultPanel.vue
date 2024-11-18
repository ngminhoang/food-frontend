<script lang="ts" setup>
import {ref, defineModel, defineProps} from 'vue';
import {ElMessageBox} from 'element-plus';
import {useNutrientStore} from "~/stores/useNutrientStore";
import {Check, Close, WarnTriangleFilled} from "@element-plus/icons-vue";
import NutrientPolarChart from "~/components/search/NutrientPolarChart.vue";
import SearchMore from "~/components/detect/SearchMore.vue";

// const nutritionStore = useNutrientStore();
const props = defineProps<{ results: any, foodName: string }>();

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
      sumPrice.value = sumPrice.value / 100

    },
    {immediate: true}
);


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
  <div class="container">

    <el-row :gutter="20">
      <!-- Cột Input -->
      <el-col :span="8"
              style="background: linear-gradient(to right, #fb8d8d, #ffffff);border-radius: 15px;border: 1px solid #cacaca;">
        <h3>If you ate {{ props.foodName }}, the rest nutrients you have to consume:</h3>

        <div v-if="props.results.sumCalories===0 || props.results.sumCalories==null">
          <el-icon>
            <WarnTriangleFilled/>
          </el-icon>
          Sorry, your data you provided seem wrong
        </div>
        <div v-else style="display: flex">
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
        </div>
        <div style="font-size: 30px; margin-top: 24px">
          <p v-if="sumPrice!=0"> Total: For today, you only need <b>${{ sumPrice }}</b>
          </p>
          <p v-else><el-icon>
            <WarnTriangleFilled/>
          </el-icon> Cannot calculate price
          </p>
        </div>
      </el-col>

      <el-col :span="16">
        <div v-if="sumPrice!=0">
          <div style="background-color: #a4f8c9; padding: 5px">
            <el-icon>
              <Check/>
            </el-icon>
            recipe calculated
          </div>
        </div>
        <div v-else style="background-color: #ffac00; padding: 5px">
          <el-icon>
            <Close/>
          </el-icon>
          cannot calculate the recipe
        </div>
        <h3>Recipes</h3>
        <div v-if="sumPrice!=0">
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
                          :src="'http://localhost:8080'+ingredientPercent.ingredient.imgPaths[0]"
                          style=" object-fit: cover; border-radius: 8px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);"
                          fit="cover"
                          alt="Ingredient Image"
                      ></el-image>
                    </el-tooltip>
                  </el-row>
                </el-col>
              </el-row>
            </div>

          </div>

        </div>
        <div v-else>
          <div style="font-size: 30px; margin-top: 24px">
            <el-icon>
              <WarnTriangleFilled/>
            </el-icon>
            Sorry, with the results, I cannot calculate the optimal diet for you
          </div>
          <SearchMore/>
        </div>


      </el-col>

    </el-row>
  </div>
</template>

<style scoped>
/* Basic layout adjustments */

.el-row {
  margin-top: 20px;
}

.el-col {
  padding: 15px;
}

/* Card-like container for the left column */
.container {

}

/* Title Styling */
h3 {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 10px;
  color: #333;
}

/* Styling for table */
table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
}

td {
  padding: 8px 12px;
  border-bottom: 1px solid #ddd;
  font-size: 14px;
}

b {
  font-weight: bold;
}

/* Price information styling */
.el-col:first-child .total-price {
  font-size: 30px;
  margin-top: 24px;
  color: #ff6347; /* Tomato color */
  font-weight: bold;
}

/* Table headers styling */
th {
  text-align: left;
  padding: 8px;
  background-color: #f4f4f4;
  font-weight: 600;
}

/* Ingredient image styling */
.el-image {
  width: 100%;
  height: 150px;
  object-fit: cover;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
}

.el-tooltip {
  margin-bottom: 12px;
}

/* Warn message styling */


.el-icon + span {
  color: #e74c3c;
  font-size: 16px;
  margin-left: 10px;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .el-col {
    padding: 10px;
  }

  .el-col:first-child {
    margin-bottom: 20px;
  }

  table {
    font-size: 12px;
  }

  .el-row {
    flex-direction: column;
  }

  .el-col:first-child {
    background: linear-gradient(to right, #fb8d8d, #ffffff);
    padding: 15px;
  }

  .el-col:last-child {
    padding-left: 0;
    padding-right: 0;
  }

  .total-price {
    font-size: 24px;
  }
}
</style>
