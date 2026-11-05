<script setup lang="ts">
import { Loader2 } from 'lucide-vue-next'
</script>

<template>
  <div
    class="bg-white dark:bg-slate-900 p-12 rounded-2xl border border-slate-200/80 dark:border-slate-800 flex flex-col items-center justify-center gap-3"
  >
    <Loader2 class="w-8 h-8 text-primary animate-spin" />

    <p class="text-sm font-medium text-slate-500">
      Loading tasks...
    </p>
  </div>
</template>