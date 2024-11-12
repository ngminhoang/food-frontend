<template>
  <ul
      v-infinite-scroll="load"
      :infinite-scroll-disabled="loading"
      :infinite-scroll-distance="10"
      class="infinite-list"
      style="overflow: auto"
  >
    <li
        v-for="item in items"
        :key="item.id"
        class="infinite-list-item"
        @click="handleClick(item)"
    >
      {{ item.name }}
    </li>
  </ul>
</template>

<script lang="ts" setup>
import { ref, watch, defineEmits, onMounted } from 'vue'
import axios from 'axios'

const emit = defineEmits(['clickItem'])
const items = ref([])         // Store loaded items
const page = ref(1)            // Track current page
const totalPages = ref(null)   // Total number of pages from API
const loading = ref(false)     // Track loading status to avoid multiple calls

// Define props for query, sort, and order
const props = defineProps<{ query: string, sort: string, order: string }>()

const query = ref('')
const sort = ref(props.sort)
const order = ref(props.order)

// Watch for changes in query, sort, and order and reload data
watch(
    [() => props.query, () => props.sort, () => props.order],
    ([newQuery, newSort, newOrder]) => {
      query.value = newQuery
      sort.value = newSort
      order.value = newOrder
      items.value = []             // Clear current items
      page.value = 1               // Reset to the first page
      totalPages.value = null      // Reset totalPages
      load()                       // Load new data based on updated query, sort, or order
    }
)

const load = async () => {
  if (loading.value || (totalPages.value && page.value > totalPages.value)) return

  loading.value = true

  try {
    const response = await axios.get('http://localhost:8080/api/ingredient/search', {
      params: {
        keyword: query.value,
        page: page.value,
        size: 10,
        sort: sort.value,
        order: order.value
      },
    })
    const data = response.data

    // Check that the response has results in an array
    if (data && Array.isArray(data)) {
      items.value.push(...data)
    } else {
      console.warn('API response does not contain an array at data.results. Full response:', data)
    }

    // Update totalPages if it exists
    if (data.totalPages !== undefined) {
      totalPages.value = data.totalPages
    }
    page.value += 1
  } catch (error) {
    console.error('Error loading data:', error)
  } finally {
    loading.value = false
  }
}

const handleClick = (item) => {
  emit('clickItem', item)
}

// Initial load on component mount
onMounted(() => {
  load()
})
</script>

<style scoped>
.infinite-list {
  height: 70vh;
  padding: 0;
  margin: 0;
  list-style: none;
}
.infinite-list .infinite-list-item {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;
  background: var(--el-color-primary-light-9);
  margin: 10px;
  margin-bottom: 40px;
  cursor: pointer;
}

.infinite-list .infinite-list-item:hover {
  background-color: #ffbcbc;
}

.infinite-list .infinite-list-item + .list-item {
  margin-top: 10px;
}
</style>
