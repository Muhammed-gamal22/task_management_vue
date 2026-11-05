
<script setup lang="ts">
import { AlertCircle } from 'lucide-vue-next'

interface Props {
  error?: {
    response?: {
      data?: {
        message?: string
      }
    }
    message?: string
  } | null
}

const props = defineProps<Props>()
</script>

<template>
  <div class="bg-rose-50 dark:bg-rose-950/20 p-8 rounded-2xl border border-rose-200 dark:border-rose-800/40 text-center space-y-2">
    <AlertCircle class="w-8 h-8 text-rose-600 dark:text-rose-400 mx-auto" />

    <h3 class="text-base font-semibold text-rose-900 dark:text-rose-200">
      Error Loading Tasks
    </h3>

    <p class="text-sm text-rose-600 dark:text-rose-400">
      {{
        props.error?.response?.data?.message ||
        props.error?.message ||
        'Could not load tasks from server.'
      }}
    </p>
  </div>
</template>
