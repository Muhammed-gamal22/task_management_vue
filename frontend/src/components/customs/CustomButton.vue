
<script setup>
import { Loader2 } from 'lucide-vue-next'



const props = withDefaults(defineProps(), {
  isLoading: false,
  disabled: false,
  class: '',
})

defineSlots()
</script>

<template>
  <button
    :disabled="props.disabled || props.isLoading"
    :class="[
      'cursor-pointer font-semibold transition-all duration-200 active:scale-95 rounded-xl shadow-sm disabled:opacity-50',
      props.class,
    ]"
    v-bind="$attrs"
  >
    <template v-if="props.isLoading">
      <Loader2 class="w-4 h-4 animate-spin" />
      <slot/>
    </template>

    <template v-else>
      <component
        :is="props.icon"
        v-if="props.icon"
        class="w-4 h-4"
      />
      <slot/>
    </template>
  </button>
</template>