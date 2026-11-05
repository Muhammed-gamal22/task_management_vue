<script setup>
import { Filter } from 'lucide-vue-next'

defineProps({
  priorityFilter: {
    type: String,
    default: 'All',
  },
})

const emit = defineEmits(['update:priorityFilter'])

const priorities = [
  { value: 'All', label: 'All Priorities' },
  { value: 'High', label: 'High' },
  { value: 'Medium', label: 'Medium' },
  { value: 'Low', label: 'Low' },
]
</script>

<template>
  <div class="flex items-center gap-2">
    <Filter class="w-3.5 h-3.5 text-slate-400" />

    <select
      :value="priorityFilter"
      @change="emit('update:priorityFilter', $event.target.value)"
      class="bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-medium rounded-xl px-3 py-2 text-slate-700 dark:text-slate-200 focus:outline-none min-w-[120px]"
    >
      <option
        v-for="priority in priorities"
        :key="priority.value"
        :value="priority.value"
      >
        {{ priority.label }}
      </option>
    </select>
  </div>
</template>