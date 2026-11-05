
<script setup lang="ts">
const props = defineProps<{
  statusFilter: string
}>()

const emit = defineEmits<{
  'update:statusFilter': [value: string]
}>()

const statuses = ['All', 'To Do', 'In Progress', 'Done']
</script>

<template>
  <div class="flex items-center bg-slate-100 dark:bg-slate-800/80 p-1 rounded-xl">
    <button
      v-for="st in statuses"
      :key="st"
      @click="emit('update:statusFilter', st)"
      :class="[
        'px-3 text-white py-1.5 text-xs font-medium rounded-lg transition-all',
        props.statusFilter === st
          ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 shadow-sm'
          : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
      ]"
    >
      {{ st }}
    </button>
  </div>
</template>
