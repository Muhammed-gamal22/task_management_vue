<script setup>
import { computed } from 'vue'
import { useField } from 'vee-validate'

const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  label: String,
  placeholder: {
    type: String,
    default: 'Select an option',
  },
  options: {
    type: Array,
    default: () => [],
  },
  rules: {
    type: Object,
    default: () => ({}),
  },
  dir: {
    type: String,
    default: 'auto',
  },
  class: {
    type: String,
    default: '',
  },
})

const validationRules = computed(() => props.rules)

const {
  value,
  errorMessage,
  handleChange,
  handleBlur,
} = useField(
  () => props.name,
  validationRules
)

const hasRequired = computed(() => !!props.rules.required)
</script>

<template>
  <div class="flex flex-col gap-1.5 w-full">
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