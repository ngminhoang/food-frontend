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

const emit = defineEmits(['query'])
const state = ref('')

interface LinkItem {
  value: string
  link: string
}

const links = ref<LinkItem[]>([])

const loadAll = () => {
  return [
    { value: 'vue', link: 'https://github.com/vuejs/vue' },
    { value: 'element', link: 'https://github.com/ElemeFE/element' },
    { value: 'cooking', link: 'https://github.com/ElemeFE/cooking' },
    { value: 'mint-ui', link: 'https://github.com/ElemeFE/mint-ui' },
    { value: 'vuex', link: 'https://github.com/vuejs/vuex' },
    { value: 'vue-router', link: 'https://github.com/vuejs/vue-router' },
    { value: 'babel', link: 'https://github.com/babel/babel' },
  ]
}

const querySearchAsync = (queryString: string, cb: (arg: any) => void) => {
  const results = queryString
      ? links.value.filter(createFilter(queryString))
      : links.value

  setTimeout(() => {
    cb(results)
  }, 300)
}

const createFilter = (queryString: string) => {
  return (item: LinkItem) => item.value.toLowerCase().includes(queryString.toLowerCase())
}

const handleSelect = (item: LinkItem) => {
  console.log(item)
}

const emitQuery = () => {
  emit('query', state.value)
}

onMounted(() => {
  links.value = loadAll()
})
</script>
