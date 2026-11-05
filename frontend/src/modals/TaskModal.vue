<script setup>
import { computed, watch } from 'vue'
import { useForm } from 'vee-validate'
import { useMutation, useQueryClient } from '@tanstack/vue-query'
import { Loader2, X } from 'lucide-vue-next'
import { toast } from 'vue-sonner'

import { useTaskStore } from '@/store/modals-store'
import { postData, patchData } from '@/services/services'

import CustomButton from '@/components/customs/CustomButton.vue'
import CustomInput from '@/components/customs/CustomInput.vue'
import SelectBox from '@/components/customs/SelectBox.vue'

const props = defineProps({
  editingTask: {
    type: Object,
    default: null,
  },
})

const emit = defineEmits(['update:editingTask'])

const taskStore = useTaskStore()
const queryClient = useQueryClient()

const { handleSubmit, resetForm } = useForm({
  initialValues: {
    title: '',
    description: '',
    status: 'To Do',
    priority: 'Medium',
    due_date: '',
  },
})

const validateDueDate = (value) => {
  if (!value) {
    return 'Due date is required'
  }

  const selectedDate = new Date(`${value}T00:00:00`)

  const today = new Date()
  today.setHours(0, 0, 0, 0)

  if (selectedDate < today) {
    return 'Due date cannot be in the past'
  }

  return true
}

watch(
  () => props.editingTask,
  (task) => {
    resetForm({
      values: {
        title: task?.title ?? '',
        description: task?.description ?? '',
        status: task?.status ?? 'To Do',
        priority: task?.priority ?? 'Medium',
        due_date: task?.due_date?.slice(0, 10) ?? '',
      },
    })
  },
  { immediate: true }
)

const closeModal = () => {
  taskStore.setIsTaskModalOpen(false)
  emit('update:editingTask', null)
  resetForm()
}

const createMutation = useMutation({
  mutationFn: (newTask) => postData('/tasks', newTask),

  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['tasks'] })
    toast.success('Task created successfully!')
    closeModal()
  },

  onError: (err) => {
    toast.error(
      err?.response?.data?.message || 'Failed to create task'
    )
  },
})

const updateMutation = useMutation({
  mutationFn: ({ id, updatedFields }) =>
    patchData(`/tasks/${id}`, updatedFields),

  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['tasks'] })
    toast.success('Task updated successfully!')
    closeModal()
  },

  onError: (err) => {
    toast.error(
      err?.response?.data?.message || 'Failed to update task'
    )
  },
})

const isPending = computed(
  () =>
    createMutation.isPending.value ||
    updateMutation.isPending.value
)

const onSubmit = handleSubmit((formData) => {
  if (props.editingTask) {
    updateMutation.mutate({
      id: props.editingTask._id,
      updatedFields: formData,
    })
  } else {
    createMutation.mutate(formData)
  }
})
</script>

<template>
  <div
    class="fixed inset-0 z-50 bg-slate-950/40 backdrop-blur-sm flex items-center justify-center p-4"
  >
    <div
      class="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in-95 duration-200"
    >

      <div
        class="flex items-center justify-between px-6 py-4 border-b border-slate-100 dark:border-slate-800"
      >
        <h3 class="text-lg font-bold text-slate-900 dark:text-slate-100">
          {{ editingTask ? 'Edit Task' : 'Create New Task' }}
        </h3>

        <button
          type="button"
          @click="closeModal"
          class="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
        >
          <X class="w-5 h-5" />
        </button>
      </div>

      <form @submit.prevent="onSubmit" class="p-6 space-y-4">

        <CustomInput
          name="title"
          label="Task Title"
          placeholder="Enter task title"
          :rules="{ required: 'Task title is required' }"
        />

        <CustomInput
          name="description"
          label="Description"
          placeholder="Provide detailed description for the task..."
          type="textarea"
          :rows="3"
          :rules="{ required: 'Task description is required' }"
        />

        <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">

          <SelectBox
            name="status"
            label="Status"
            placeholder="Select Status"
            :options="[
              { value: 'To Do', label: 'To Do' },
              { value: 'In Progress', label: 'In Progress' },
              { value: 'Done', label: 'Done' },
            ]"
            :rules="{ required: 'Status is required' }"
          />

          <SelectBox
            name="priority"
            label="Priority"
            placeholder="Select Priority"
            :options="[
              { value: 'Low', label: 'Low' },
              { value: 'Medium', label: 'Medium' },
              { value: 'High', label: 'High' },
            ]"
            :rules="{ required: 'Priority is required' }"
          />

          <CustomInput
            name="due_date"
            label="Due Date"
            placeholder="Select Due Date"
            type="date"
            :rules="validateDueDate"
          />

        </div>

        <div
          class="flex items-center justify-end gap-3 pt-4 border-t border-slate-100 dark:border-slate-800"
        >
          <CustomButton
            type="button"
            @click="closeModal"
            class="px-4 py-2 cursor-pointer text-xs font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors"
          >
            Cancel
          </CustomButton>

          <CustomButton
            type="submit"
            :disabled="isPending"
            class="inline-flex cursor-pointer items-center gap-2 bg-white text-black-foreground text-xs font-semibold px-4 py-2 rounded-xl shadow-sm transition-all active:scale-95 disabled:opacity-50"
          >
            <Loader2
              v-if="isPending"
              class="w-3.5 h-3.5 animate-spin"
            />

            {{ editingTask ? 'Save Changes' : 'Create Task' }}
          </CustomButton>
        </div>

      </form>
    </div>
  </div>
</template>