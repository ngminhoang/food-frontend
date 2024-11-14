<script setup lang="ts">
import {useRoute} from 'vue-router'
import {computed} from 'vue'
import {DataLine, HomeFilled, PhoneFilled, ScaleToOriginal, View,Search} from "@element-plus/icons-vue";

const route = useRoute()

import { ref } from 'vue';

const target = ref(null);

const scrollToAbout = () => {
  const target = document.querySelector('.about-element');  // Use the class name to target the element
  if (target) {
    target.scrollIntoView({
      behavior: 'smooth',  // Smooth scrolling
      block: 'start',      // Align to the top of the viewport
    });
  }
};

const scrollToContact = () => {
  const target = document.querySelector('.contact-element');  // Use the class name to target the element
  if (target) {
    target.scrollIntoView({
      behavior: 'smooth',  // Smooth scrolling
      block: 'start',      // Align to the top of the viewport
    });
  }
};

const scrollToMain = () => {
  const target = document.querySelector('.main-element');  // Use the class name to target the element
  if (target) {
    target.scrollIntoView({
      behavior: 'smooth',  // Smooth scrolling
      block: 'end',      // Align to the top of the viewport
    });
  }
};

</script>

<template>
  <!-- Display navigation only on the homepage -->
  <div class="navbar">
    <div v-if="route.path === '/'" style="display: flex;">
      <NuxtLink @click="scrollToMain" class="nav-link"><el-icon><HomeFilled /></el-icon> Function</NuxtLink>
      <div style="display: flex;">
        <NuxtLink @click="scrollToAbout" class="nav-link"><el-icon><View /></el-icon>About</NuxtLink>
        <NuxtLink @click="scrollToContact" class="nav-link"><el-icon><PhoneFilled /></el-icon>Contact</NuxtLink>
      </div>
    </div>
    <div v-else style="display: flex;">
      <NuxtLink to="/" class="nav-link"><el-icon><HomeFilled /></el-icon> Home</NuxtLink>
      <div>
        <div  v-if="route.path === '/calculate'" style="display: flex;">
          <NuxtLink to="/detect" class="nav-link"><el-icon><DataLine /></el-icon> Detect</NuxtLink>
          <NuxtLink to="/search" class="nav-link"><el-icon><Search /></el-icon> Search</NuxtLink>
        </div>
        <div  v-if="route.path === '/detect'" style="display: flex;">
          <NuxtLink to="/search" class="nav-link"><el-icon><Search /></el-icon> Search</NuxtLink>
          <NuxtLink to="/calculate" class="nav-link"><el-icon><ScaleToOriginal /></el-icon> Calculate</NuxtLink>
        </div>
        <div  v-if="route.path === '/search'" style="display: flex;">
          <NuxtLink to="/detect" class="nav-link"><el-icon><DataLine /></el-icon> Detect</NuxtLink>
          <NuxtLink to="/calculate" class="nav-link"><el-icon><ScaleToOriginal /></el-icon> Calculate</NuxtLink>
        </div>
      </div>
    </div>
  </div>

</template>

<style scoped>
/* Navbar container */
.navbar {
  display: flex;
  justify-content: center;
  background-color: #333;
  padding: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  font-family: Arial, sans-serif;
}

/* Link styles */
.nav-link {
  color: white;
  font-size: 18px;
  font-weight: 500;
  text-decoration: none;
  padding: 10px 20px;
  position: relative;
  transition: color 0.3s ease;
}

/* Hover effect */
.nav-link:hover {
  cursor: pointer;
  color: #ff6347; /* Tomato color on hover */
}

/* Animated underline effect */
.nav-link::after {
  content: "";
  display: block;
  width: 0;
  height: 2px;
  background: #ff6347;
  transition: width 0.3s;
  position: absolute;
  bottom: 0;
  left: 0;
}

.nav-link:hover::after {
  width: 100%; /* Expands underline on hover */
}
</style>
