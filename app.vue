<template>
  <div>
    <!-- Header -->
    <el-affix>
      <header>
        <Header/>
      </header>
    </el-affix>

    <!-- Main Content -->
    <main>
      <NuxtPage />
    </main>

    <!-- Footer -->
<!--    <footer class="footer">-->
<!--      <p>&copy; 2024 My Website. All rights reserved.</p>-->
<!--    </footer>-->
  </div>
</template>

<style scoped>

/* Footer styles */
.footer {

  color: #b6b6b6;
  text-align: center;
  padding: 10px;
  position: fixed;
  bottom: 0;
  width: 100%;
}
</style>
<script lang="ts" setup>
import { ElLoading } from 'element-plus';
import { useRouter } from 'vue-router';

let loadingInstance: ReturnType<typeof ElLoading.service> | null = null;

const router = useRouter();

router.beforeEach((to, from, next) => {
  // Start loading spinner before navigation
  loadingInstance = ElLoading.service({
    lock: true,
    text: 'Loading...',
    background: 'rgb(255,255,255)',
  });

  next(); // Allow navigation to proceed
});

router.afterEach(() => {
  // Stop loading spinner after navigation is complete
  setTimeout(() => {
    if (loadingInstance) {
      loadingInstance.close();
      loadingInstance = null;
    }
  }, 1000); // Ensures the loading lasts at least 2 seconds
});
</script>