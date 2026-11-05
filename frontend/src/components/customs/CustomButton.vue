```vue
<script setup lang="ts">
import { Loader2 } from 'lucide-vue-next'

interface Props {
  isLoading?: boolean
  disabled?: boolean
  class?: string
  icon?: any
}

const props = withDefaults(defineProps<Props>(), {
  isLoading: false,
  disabled: false,
  class: '',
})

defineSlots<{
  default(): any
}>()
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
      <slot />
    </template>

    <template v-else>
      <component
        :is="props.icon"
        v-if="props.icon"
        class="w-4 h-4"
      />
      <slot />
    </template>
  </button>
</template>
```