<script lang="ts" setup>
import {ref, defineModel, defineProps} from 'vue';
import {ElMessageBox} from 'element-plus';

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
          <div v-else>

            <el-table :data="tableData" style="width: 100%">
              <el-table-column prop="date" label="Date" width="180" />
              <el-table-column prop="name" label="Name" width="180" />
              <el-table-column prop="address" label="Address" />
            </el-table>

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
