<script setup lang="ts">
import {
  ArrowRightBold,
  DataLine,
  Phone,
  Location,
  LocationFilled,
  Flag
} from "@element-plus/icons-vue";
import { ref } from 'vue';

const value = ref();
const colors = ref(['#99A9BF', '#F7BA2A', '#FF9900']);
const textarea = ref('');

function clickHandler() {
  console.log("Feedback submitted:", textarea.value);
}
</script>

<template>
  <el-row>
    <!-- Feedback Form Column -->
    <el-col :span="16">
      <h2>WE ARE VERY PLEASED TO HAVE YOUR FEEDBACK FOR OUR WEBSITE</h2>
      <p>Your rating helps us a lot to develop the website better:</p>
      <el-rate
          clearable
          size="large"
          v-model="value"
          :colors="colors"
      />
      <el-input
          v-model="textarea"
          style="width: 240px"
          autosize
          type="textarea"
          placeholder="Please give us some feedback"
      />
      <span class="clickable-icon" @click="clickHandler">
        <el-icon><ArrowRightBold /></el-icon>
        <el-icon><ArrowRightBold /></el-icon>
      </span>
    </el-col>

    <!-- Contact Information Column -->
    <el-col :span="8" class="contact-info">
      <h3>Contact Us</h3>
      <p><el-icon><Phone /></el-icon> +123 456 7890</p>
      <p><el-icon><LocationFilled /></el-icon> 1234 Elm Street, City, Country</p>
      <div class="social-icons">
        <a href="https://www.facebook.com" target="_blank" aria-label="Facebook">
          <el-icon><Flag /></el-icon> Facebook
        </a>
        <a href="https://www.tiktok.com" target="_blank" aria-label="TikTok">
          <el-icon><Flag /></el-icon> Tiktok
        </a>
      </div>
    </el-col>
  </el-row>
</template>

<style scoped>
/* Feedback Section */
.clickable-icon {
  display: inline-flex;
  cursor: pointer;
  align-items: center;
}

.clickable-icon:hover {
  color: #007bff; /* Adjust color for hover */
}

.clickable-icon > .el-icon {
  transition: transform 0.3s;
}

.clickable-icon:hover > .el-icon {
  transform: scale(1.1); /* Slightly enlarges icon on hover */
}

/* Contact Information Styles */
.contact-info {
  padding: 16px;
  border-left: 1px solid #ccc;
}

.contact-info h3 {
  margin-bottom: 8px;
}

.contact-info p {
  display: flex;
  align-items: center;
  font-size: 14px;
  margin-bottom: 8px;
}

.contact-info p .el-icon {
  margin-right: 8px;
}

.social-icons a {
  margin-right: 8px;
  color: #333;
  font-size: 24px;
}

.social-icons a:hover {
  color: #007bff; /* Change icon color on hover */
}
</style>
