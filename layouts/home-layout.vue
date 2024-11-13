<template>
  <div>
    <!-- Header -->
    <header class="header">
      <nav>
        <ul>
          <li><NuxtLink to="/">Home</NuxtLink></li>
          <li><NuxtLink to="/about">About</NuxtLink></li>
          <li><NuxtLink to="/contact">Contact</NuxtLink></li>
        </ul>
      </nav>
    </header>

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
/* Header styles */
.header {
  background-color: #b1527a;
  color: white;
  padding: 20px;
}

.header nav ul {
  list-style-type: none;
  display: flex;
  justify-content: space-around;
  padding: 0;
}

.header nav ul li {
  display: inline;
}

.header nav ul li a {
  color: white;
  text-decoration: none;
}

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