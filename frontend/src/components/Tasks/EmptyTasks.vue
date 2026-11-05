
<script setup lang="ts">
import { ListTodo, Plus } from 'lucide-vue-next'

defineProps<{
  searchQuery: string
  statusFilter: string
  priorityFilter: string
}>()

const emit = defineEmits<{
  openCreateModal: []
}>()
</script>

<template>
  <div class="bg-white dark:bg-slate-900 p-12 rounded-2xl border border-slate-200/80 dark:border-slate-800 text-center space-y-3">

    <div class="w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center mx-auto text-slate-400">
      <ListTodo class="w-6 h-6" />
    </div>

    <h3 class="text-base font-semibold text-slate-800 dark:text-slate-200">
      No tasks found
    </h3>

    <p class="text-sm text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
      {{
        searchQuery || statusFilter !== 'All' || priorityFilter !== 'All'
          ? 'No tasks match your current filters. Try resetting search or filters.'
          : "Get started by creating your first task above!"
      }}
    </p>

    <button
      v-if="!searchQuery && statusFilter === 'All' && priorityFilter === 'All'"
      @click="emit('openCreateModal')"
      class="inline-flex items-center gap-2 bg-white text-black hover:bg-primary/20 text-xs font-semibold px-4 py-2 rounded-lg transition-colors mt-2"
    >
      <Plus class="w-3.5 h-3.5" />
      Create Task
    </button>

  </div>
</template>
