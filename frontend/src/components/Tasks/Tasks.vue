<script setup>
import { useQuery, useMutation, useQueryClient } from '@tanstack/vue-query'
import { ref, computed } from 'vue'
import { toast } from 'vue-sonner'

import TaskHeader from './TaskHeader.vue'
import Task from './Task.vue'
import LoadingTasks from './LoadingTasks.vue'
import EmptyTasks from './EmptyTasks.vue'
import TaskModal from '@/modals/TaskModal.vue'
import TaskStatics from './TaskStatics.vue'
import FilterPriorityTask from './FilterPriorityTask.vue'
import FilterStatusTask from './FilterStatusTask.vue'
import SearchFilter from './SearchFilter.vue'
import ErrorTasks from './ErrorTasks.vue'

import { getData, patchData, deleteData } from '@/services/services'
import { useTaskStore } from '@/store/modals-store'

const searchQuery = ref('')
const statusFilter = ref('All')
const priorityFilter = ref('All')
const editingTask = ref(null)

const queryClient = useQueryClient()
const taskStore = useTaskStore()

const { data, isLoading, isError, error } = useQuery({
  queryKey: ['tasks'],
  queryFn: () => getData('/tasks'),
})

const tasksList = computed(() => data.value ?? [])

const filteredTasks = computed(() => {
  return tasksList.value.filter((t) => {
    const matchesSearch =
      t.title?.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      t.description?.toLowerCase().includes(searchQuery.value.toLowerCase())

    const matchesStatus =
      statusFilter.value === 'All' || t.status === statusFilter.value

    const matchesPriority =
      priorityFilter.value === 'All' || t.priority === priorityFilter.value

    return matchesSearch && matchesStatus && matchesPriority
  })
})

const deleteMutation = useMutation({
  mutationFn: (id) => deleteData(`/tasks/${id}`),

  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['tasks'] })
    toast.success('Task deleted successfully')
  },

  onError: (err) => {
    toast.error(err?.response?.data?.message || 'Failed to delete task')
  },
})

const statusUpdateMutation = useMutation({
  mutationFn: ({ id, status }) =>
    patchData(`/tasks/${id}`, { status }),

  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['tasks'] })
  },

  onError: (err) => {
    toast.error(
      err.response?.data?.message || 'Failed to update status'
    )
  },
})

const openCreateModal = () => {
  editingTask.value = null
  taskStore.setIsEdit(false)
  taskStore.setIsTaskModalOpen(true)
}

const handleStatusChange = (id, newStatus) => {
  statusUpdateMutation.mutate({
    id,
    status: newStatus,
  })
}

const openEditModal = (task) => {
  editingTask.value = task
  taskStore.setIsEdit(true)
  taskStore.setIsTaskModalOpen(true)
}

const handleDelete = (id) => {
  deleteMutation.mutate(id)
}
</script>

<template>
  <div class="min-h-screen bg-slate-50/50 dark:bg-slate-950 p-4 sm:p-6 lg:p-8">
    <div class="max-w-6xl mx-auto space-y-6">

      <TaskHeader @open-create-modal="openCreateModal" />

      <TaskStatics :tasksList="tasksList" />

      <div class="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
        <SearchFilter v-model:search-query="searchQuery" />

        <div class="flex flex-wrap items-center justify-between w-full md:w-auto gap-3">
          <FilterStatusTask v-model:status-filter="statusFilter" />
          <FilterPriorityTask v-model:priority-filter="priorityFilter" />
        </div>
      </div>

      <LoadingTasks v-if="isLoading" />

      <ErrorTasks v-else-if="isError" :error="error" />

      <EmptyTasks
        v-else-if="filteredTasks.length === 0"
        :search-query="searchQuery"
        :status-filter="statusFilter"
        :priority-filter="priorityFilter"
        @open-create-modal="openCreateModal"
      />

      <div v-else class="space-y-3">
        <Task
          v-for="task in filteredTasks"
          :key="task._id"
          :task="task"
          @edit="openEditModal"
          @delete="handleDelete"
          @status-change="handleStatusChange"
        />
      </div>

    </div>
  </div>

  <TaskModal
    v-if="taskStore.isOpenTaskModal"
    v-model:editing-task="editingTask"
  />
</template>