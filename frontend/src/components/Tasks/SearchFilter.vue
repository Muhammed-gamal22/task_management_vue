<script setup>
import { Search } from 'lucide-vue-next'

defineProps({
  searchQuery: {
    type: String,
    default: '',
  },
})

const emit = defineEmits(['update:searchQuery'])
</script>

<template>
  <div class="relative w-full md:w-72">
    <Search class="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />

    <input
      type="text"
      placeholder="Search tasks..."
      :value="searchQuery"
      @input="emit('update:searchQuery', $event.target.value)"
      class="w-full pl-9 pr-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 text-slate-800 dark:text-slate-200"
    />
  </div>
</template>