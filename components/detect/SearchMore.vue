<template>
  <p>Here are some advances for research:</p>
  <div class="search-more-container">
    <div v-if="ingredients.length" class="ingredient-grid">
      <div v-for="ingredient in ingredients" :key="ingredient.id" class="ingredient-card">
        <img
            :src="'http://localhost:8080'+ingredient.imgPaths[0]"
            :alt="ingredient.name"
            class="ingredient-image"
        />
        <div class="ingredient-name">{{ ingredient.name }}</div>
      </div>
    </div>

    <div v-else class="no-data">
      No ingredients found.
    </div>
    <button class="show-more-button" @click="navigateToSearch">
      Search More ...
    </button>
  </div>
</template>

<script>
import axios from 'axios';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

export default {
  name: 'SearchMore',
  setup() {
    const ingredients = ref([]);
    const query = ref(''); // Replace with the desired query or bind it dynamically.
    const sort = ref('name'); // Sorting criteria, can be dynamically updated.
    const order = ref('asc'); // Sorting order, can be dynamically updated.
    const router = useRouter();

    const fetchIngredients = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/ingredient/search', {
          params: {
            keyword: query.value,
            page: 1,
            size: 8,
            sort: sort.value,
            order: order.value,
          },
        });
        ingredients.value = response.data;
      } catch (error) {
        console.error('Error fetching ingredients:', error);
      }
    };

    const navigateToSearch = () => {
      router.push('/search');
    };

    // Fetch data when the component is mounted.
    fetchIngredients();

    return {
      ingredients,
      navigateToSearch,
    };
  },
};
</script>

<style scoped>
.search-more-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  padding: 20px;
}

.ingredient-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 20px;
  width: 100%;
}

.ingredient-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #f9f9f9;
  transition: transform 0.2s ease-in-out;
}

.ingredient-card:hover {
  transform: scale(1.05);
}

.ingredient-image {
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 50%;
  margin-bottom: 10px;
}

.ingredient-name {
  font-size: 14px;
  font-weight: bold;
}

.no-data {
  color: #8c939d;
  font-size: 18px;
}

.show-more-button {
  padding: 10px 20px;
  font-size: 16px;
  font-weight: bold;
  color: #fff;
  background-color: #dfa6a6;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease-in-out;
}

.show-more-button:hover {
  background-color: #0056b3;
}
</style>
