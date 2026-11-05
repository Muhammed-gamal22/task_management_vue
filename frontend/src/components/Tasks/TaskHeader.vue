<script setup>
import { Plus, ListTodo, LogOut } from 'lucide-vue-next'
import { useRouter } from 'vue-router'
import { toast } from 'vue-sonner'
import { useTaskStore } from '../../store/modals-store.js'

const router = useRouter()
const taskStore = useTaskStore()

const handleLogout = () => {
  localStorage.removeItem('token')
  toast.info('Logged out successfully')
  router.push('/login')
}

const emit = defineEmits(['openCreateModal'])
</script>

<template>
  <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm">
    <div>
      <h1 class="text-2xl font-bold text-slate-900 dark:text-slate-50 tracking-tight flex items-center gap-2.5">
        <ListTodo class="w-7 h-7 text-primary" />
        Task Management
      </h1>

      <p class="text-sm text-slate-500 dark:text-slate-400 mt-1">
        Organize, track, and manage your tasks efficiently.
      </p>
    </div>

    <div class="flex items-center gap-3">
      <CustomButton
        @click="emit('openCreateModal')"
        class="inline-flex text-slate-950 shadow cursor-pointer items-center justify-center gap-2 bg-white hover:bg-primary/90 text-primary-foreground text-sm font-semibold px-4 py-2.5 rounded-xl shadow-sm transition-all duration-200 active:scale-95"
      >
        <Plus class="w-4 h-4" />
        Create New Task
      </CustomButton>

      <button
        @click="handleLogout"
        title="Log Out"
        class="inline-flex items-center justify-center gap-2 bg-rose-50 text-rose-600 hover:bg-rose-100 dark:bg-rose-950/40 dark:text-rose-400 dark:hover:bg-rose-900/50 text-sm font-semibold px-3 py-2.5 rounded-xl transition-all duration-200 cursor-pointer"
      >
        <LogOut class="w-4 h-4" />
        <span class="hidden sm:inline">Logout</span>
      </button>
    </div>
  </div>
</template>