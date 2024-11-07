<template>
  <el-autocomplete
      v-model="state"
      :fetch-suggestions="querySearchAsync"
      placeholder="Please input"
      @select="handleSelect"
      @keyup.enter="emitQuery"
  />
</template>

<script lang="ts" setup>
import { ref, defineEmits, onMounted } from 'vue'
import axios from 'axios'

const emit = defineEmits(['query'])
const state = ref('')

interface LinkItem {
  value: string
}

const links = ref<LinkItem[]>([])

const querySearchAsync = async (queryString: string, cb: (arg: any) => void) => {
  if (!queryString) {
    cb([])  // If no input, return an empty list
    return
  }

  try {
    // Call the API to fetch suggestions based on the query
    const response = await axios.get(`http://localhost:8080/api/ingredient/suggest?keyword=${queryString}`)
    const results: string[] = response.data  // Assuming the API returns a list of strings

    // Convert the list of strings to the expected format for the autocomplete
    const formattedResults = results.map(item => ({ value: item }))
    cb(formattedResults)
  } catch (error) {
    console.error('Error fetching suggestions:', error)
    cb([])  // Return empty results in case of an error
  }
}

const handleSelect = (item: LinkItem) => {
  console.log(item)
}

const emitQuery = () => {
  emit('query', state.value)
}

</script>
