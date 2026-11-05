<script setup>
import { computed } from 'vue'
import {
  Calendar,
  Clock,
  CheckCircle2,
  AlertCircle,
  PlayCircle,
  Edit3,
  Trash2,
} from 'lucide-vue-next'

import { format, isBefore, startOfDay } from 'date-fns'

const props = defineProps({
  task: {
    type: Object,
    required: true,
  },
})

const emit = defineEmits([
  'edit',
  'delete',
  'statusChange',
])

const priorityConfig = {
  High: {
    bg: 'bg-red-500/10 text-red-600 dark:bg-red-500/20 dark:text-red-400 border-red-200 dark:border-red-800/40',
    dot: 'bg-red-500',
  },
  Medium: {
    bg: 'bg-amber-500/10 text-amber-600 dark:bg-amber-500/20 dark:text-amber-400 border-amber-200 dark:border-amber-800/40',
    dot: 'bg-amber-500',
  },
  Low: {
    bg: 'bg-emerald-500/10 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800/40',
    dot: 'bg-emerald-500',
  },
}

const statusConfig = {
  Done: {
    bg: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800',
    icon: CheckCircle2,
    iconColor: 'text-emerald-600 dark:text-emerald-400',
  },
  'In Progress': {
    bg: 'bg-blue-50 text-blue-700 dark:bg-blue-950/40 dark:text-blue-300 border-blue-200 dark:border-blue-800',
    icon: PlayCircle,
    iconColor: 'text-blue-600 dark:text-blue-400',
  },
  'To Do': {
    bg: 'bg-slate-100 text-slate-700 dark:bg-slate-800/50 dark:text-slate-300 border-slate-200 dark:border-slate-700',
    icon: Clock,
    iconColor: 'text-slate-500 dark:text-slate-400',
  },
}

const task = computed(() => props.task)

const status = computed(() => task.value.status || 'To Do')
const priority = computed(() => task.value.priority || 'Medium')

const priorityStyle = computed(
  () => priorityConfig[priority.value] || priorityConfig.Medium
)

const statusStyle = computed(
  () => statusConfig[status.value] || statusConfig['To Do']
)

const StatusIcon = computed(() => statusStyle.value.icon)

const formattedDate = computed(() => {
  if (!task.value.due_date) return 'No due date'

  return format(new Date(task.value.due_date), 'MMM d, yyyy')
})

const isOverdue = computed(() => {
  const dueDate = task.value.due_date

  if (!dueDate || status.value === 'Done') return false

  return isBefore(
    new Date(dueDate),
    startOfDay(new Date())
  )
})

const handleStatusChange = (event) => {
  emit('statusChange', task.value._id, event.target.value)
}

const handleEdit = () => {
  emit('edit', task.value)
}

const handleDelete = () => {
  emit('delete', task.value._id)
}
</script>

<template>
  <div
    class="group relative bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-xl p-5 shadow-sm hover:shadow-md transition-all duration-200 hover:border-slate-300 dark:hover:border-slate-700"
  >
    <div class="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
      <div class="flex-1 space-y-2">
        <div class="flex items-center gap-2.5 flex-wrap">
          <div class="relative inline-block">
            <select
              :value="status"
              @change="handleStatusChange"
              :class="[
                'appearance-none cursor-pointer text-xs font-semibold px-3 py-1 pr-7 rounded-full border transition-colors focus:outline-none focus:ring-2 focus:ring-primary/20',
                statusStyle.bg
              ]"
            >
              <option value="To Do">To Do</option>
              <option value="In Progress">In Progress</option>
              <option value="Done">Done</option>
            </select>

            <component
              :is="StatusIcon"
              :class="[
                'w-3.5 h-3.5 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none',
                statusStyle.iconColor
              ]"
            />
          </div>

          <span
            :class="[
              'inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-0.5 rounded-full border',
              priorityStyle.bg
            ]"
          >
            <span
              :class="[
                'w-1.5 h-1.5 rounded-full',
                priorityStyle.dot
              ]"
            />
            {{ priority }}
          </span>

          <span
            v-if="isOverdue"
            class="inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full bg-rose-50 text-rose-600 dark:bg-rose-950/40 dark:text-rose-400 border border-rose-200 dark:border-rose-800"
          >
            <AlertCircle class="w-3 h-3" />
            Overdue
          </span>
        </div>

        <h3
          :class="[
            'text-base font-semibold text-slate-800 dark:text-slate-100 group-hover:text-primary transition-colors',
            status === 'Done'
              ? 'line-through text-slate-400 dark:text-slate-500'
              : ''
          ]"
        >
          {{ task.title }}
        </h3>

        <p
          v-if="task.description"
          class="text-sm text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed"
        >
          {{ task.description }}
        </p>

        <div
          class="pt-2 flex items-center gap-4 text-xs text-slate-500 dark:text-slate-400"
        >
          <div class="flex items-center gap-1.5">
            <Calendar class="w-3.5 h-3.5" />

            <span
              :class="isOverdue
                ? 'font-semibold text-rose-600 dark:text-rose-400'
                : ''
              "
            >
              {{ formattedDate }}
            </span>
          </div>
        </div>
      </div>

      <div
        class="flex items-center gap-1 self-end sm:self-start pt-2 sm:pt-0"
      >
        <button
          @click="handleEdit"
          title="Edit Task"
          class="p-2 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
        >
          <Edit3 class="w-4 h-4" />
        </button>

        <button
          @click="handleDelete"
          title="Delete Task"
          class="p-2 text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 rounded-lg transition-colors"
        >
          <Trash2 class="w-4 h-4" />
        </button>
      </div>
    </div>
  </div>
</template>