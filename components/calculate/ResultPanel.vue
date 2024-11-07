<script lang="ts" setup>
import {ref, defineModel, defineProps} from 'vue';
import {ElMessageBox} from 'element-plus';
import {useNutrientStore} from "~/stores/useNutrientStore";

// const nutritionStore = useNutrientStore();

const isPopupVisible = defineModel('modelValue'); // This will be bound to v-model
const props = defineProps({
  results: {
    type: Array,
    required: true
  }
});

const handleClose = (done: () => void) => {
  ElMessageBox.confirm('Are you sure to close this dialog?')
      .then(() => {
        done(); // Close the dialog
      })
      .catch(() => {
        // Handle the cancellation
      });
};

// const saveResults = () => {
//   // Assuming `results` is an array of nutrient data
//   props.results.forEach((result) => {
//     if (result && result.name) {
//       // Save each result as a nutrient into the Nutrition Store
//       nutritionStore.addNutrient({
//         id: Date.now(), // Use a unique ID (you might want to use a better strategy)
//         name: result.name,
//         nuGrams: result.nuGrams || 0,
//         nuCalories: result.nuCalories || 0,
//         nuProteins: result.nuProteins || 0,
//         nuCarbs: result.nuCarbs || 0,
//         nuFibers: result.nuFibers || 0,
//         nuFats: result.nuFats || 0,
//         nuSatFats: result.nuSatFats || 0,
//         nuPrice: result.nuPrice || 0,
//       });
//     }
//   });
//
//   isPopupVisible.value = false; // Close the popup after saving
// };
</script>

<template>

  <el-dialog
      v-model="isPopupVisible"
      title="Results"
      width="80%"
      :before-close="handleClose"
  >
    <div>
      <ul>
        <li v-for="(result, index) in props.results" :key="index">
          <div v-if="index != 'recipes'">
            {{index}} :{{ result }}
          </div>

        </li>
      </ul>
    </div>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="isPopupVisible = false">Cancel</el-button>
        <el-button type="primary" @click="isPopupVisible = false">
          Confirm
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<style scoped>
/* Add your styles here */
</style>
