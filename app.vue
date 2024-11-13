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
    <footer class="footer">
      <p>&copy; 2024 My Website. All rights reserved.</p>
    </footer>
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
<script setup lang="ts">
</script>