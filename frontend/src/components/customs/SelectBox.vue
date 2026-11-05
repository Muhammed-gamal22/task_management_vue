
<script setup lang="ts">
import { computed } from 'vue'
import { useField } from 'vee-validate'

interface Option {
  value: string
  label: string
}

interface Props {
  name: string
  label?: string
  placeholder?: string
  options?: Option[]
  rules?: Record<string, any>
  dir?: 'ltr' | 'rtl' | 'auto'
  class?: string
}

const props = withDefaults(defineProps<Props>(), {
  placeholder: 'Select an option',
  options: () => [],
  rules: () => ({}),
  class: '',
})

const validationRules = computed(() => props.rules)

const {
  value,
  errorMessage,
  handleChange,
  handleBlur,
} = useField<string>(
  () => props.name,
  validationRules
)

const hasRequired = computed(() => !!props.rules.required)
</script>

<template>
  <div class="flex flex-col gap-1.5 w-full">

    <!-- Label -->
    <label
      v-if="label || placeholder"
      class="text-xs font-semibold text-slate-700 dark:text-slate-300"
    >
      {{ label || placeholder }}

      <span v-if="hasRequired" class="text-rose-500">
        *
      </span>
    </label>
    <select
      :value="value || ''"
      @change="handleChange"
      @blur="handleBlur"
      :dir="dir"
      :class="[
        'w-full justify-between py-2.5 px-3.5 bg-slate-50 dark:bg-slate-800 border rounded-xl text-xs font-medium text-slate-900 dark:text-slate-100',
        errorMessage
          ? 'border-rose-500'
          : 'border-slate-200 dark:border-slate-700',
        props.class
      ]"
    >
      <option value="" disabled>
        {{ placeholder }}
      </option>

      <option
        v-for="option in options"
        :key="option.value"
        :value="option.value"
      >
        {{ option.label }}
      </option>
    </select>

    <p
      v-if="errorMessage"
      class="text-xs text-rose-500 mt-0.5"
    >
      {{ errorMessage }}
    </p>

  </div>
</template>
