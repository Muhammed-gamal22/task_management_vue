<script setup>
import { computed } from 'vue'
import {
  CheckCircle2,
  Clock,
  ListTodo,
  PlayCircle,
} from 'lucide-vue-next'

const props = defineProps({
  tasksList: {
    type: Array,
    default: () => [],
  },
})

const totalCount = computed(() => props.tasksList.length)

const todoCount = computed(
  () => props.tasksList.filter(task => task.status === 'To Do').length
)

const inProgressCount = computed(
  () => props.tasksList.filter(task => task.status === 'In Progress').length
)

const doneCount = computed(
  () => props.tasksList.filter(task => task.status === 'Done').length
)
</script>

<template>
  <div class="grid grid-cols-2 lg:grid-cols-4 gap-4">

    <div class="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200/80 dark:border-slate-800 shadow-sm">
      <div class="flex items-center justify-between">
        <span class="text-xs font-medium text-slate-500 dark:text-slate-400">
          Total Tasks
        </span>

        <div class="p-2 bg-slate-100 dark:bg-slate-800 rounded-lg text-slate-600 dark:text-slate-300">
          <ListTodo class="w-4 h-4" />
        </div>
      </div>

      <p class="text-2xl font-bold text-slate-900 dark:text-slate-100 mt-2">
        {{ totalCount }}
      </p>
    </div>

    <div class="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200/80 dark:border-slate-800 shadow-sm">
      <div class="flex items-center justify-between">
        <span class="text-xs font-medium text-slate-500 dark:text-slate-400">
          To Do
        </span>

        <div class="p-2 bg-slate-100 dark:bg-slate-800 rounded-lg text-slate-500">
          <Clock class="w-4 h-4" />
        </div>
      </div>

      <p class="text-2xl font-bold text-slate-900 dark:text-slate-100 mt-2">
        {{ todoCount }}
      </p>
    </div>

    <div class="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200/80 dark:border-slate-800 shadow-sm">
      <div class="flex items-center justify-between">
        <span class="text-xs font-medium text-slate-500 dark:text-slate-400">
          In Progress
        </span>

        <div class="p-2 bg-blue-50 dark:bg-blue-950/50 rounded-lg text-blue-600 dark:text-blue-400">
          <PlayCircle class="w-4 h-4" />
        </div>
      </div>

      <p class="text-2xl font-bold text-blue-600 dark:text-blue-400 mt-2">
        {{ inProgressCount }}
      </p>
    </div>

    <div class="bg-white dark:bg-slate-900 p-4 rounded-xl border border-slate-200/80 dark:border-slate-800 shadow-sm">
      <div class="flex items-center justify-between">
        <span class="text-xs font-medium text-slate-500 dark:text-slate-400">
          Completed
        </span>

        <div class="p-2 bg-emerald-50 dark:bg-emerald-950/50 rounded-lg text-emerald-600 dark:text-emerald-400">
          <CheckCircle2 class="w-4 h-4" />
        </div>
      </div>

      <p class="text-2xl font-bold text-emerald-600 dark:text-emerald-400 mt-2">
        {{ doneCount }}
      </p>
    </div>

  </div>
</template>