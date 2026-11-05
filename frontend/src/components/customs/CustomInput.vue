<script setup>
import { ref, computed } from 'vue'
import { Eye, EyeOff, CalendarDays } from 'lucide-vue-next'
import { defineRule, useField } from 'vee-validate'
import { required, email, min } from '@vee-validate/rules'

const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  label: String,
  placeholder: String,
  type: {
    type: String,
    default: 'text',
  },
  rows: {
    type: Number,
    default: 3,
  },
  dir: {
    type: String,
    default: 'auto',
  },
  class: {
    type: String,
    default: '',
  },
  rules: {
    type: [Object, Function],
    default: () => ({}),
  },
})

const showPassword = ref(false)

defineRule('required', required)
defineRule('email', email)
defineRule('min', min)

const validationRules = computed(() => {
  if (typeof props.rules === 'function') {
    return props.rules
  }

  const rules = {}

  if (props.rules?.required) {
    rules.required = props.rules.required
  }

  if (props.rules?.email) {
    rules.email = props.rules.email
  }

  if (props.rules?.minLength) {
    rules.min = [
      props.rules.minLength,
      'Password must be at least 6 characters',
    ]
  }

  return rules
})

const {
  value,
  errorMessage,
  handleBlur,
  handleChange,
} = useField(
  () => props.name,
  validationRules
)

const hasError = computed(() => !!errorMessage.value)

const hasRequired = computed(() => {
  if (typeof props.rules === 'function') {
    return false
  }

  return !!props.rules?.required
})

const inputType = computed(() =>
  props.type === 'password' && showPassword.value
    ? 'text'
    : props.type
)
</script>

<template>
  <div class="flex flex-col gap-1.5 w-full">

    <label
      v-if="label || placeholder"
      class="text-xs font-semibold text-slate-700 dark:text-slate-300"
    >
      {{ label || placeholder }}
      <span
        v-if="hasRequired"
        class="text-rose-500"
      >
        *
      </span>
    </label>

    <textarea
      v-if="type === 'textarea'"
      :value="value ?? ''"
      :rows="rows"
      :placeholder="placeholder"
      :dir="dir"
      @input="handleChange"
      @blur="handleBlur"
      :class="[
        'w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800/50 border rounded-xl text-sm focus:outline-none focus:ring-2 text-slate-900 dark:text-slate-100 resize-none transition-all',
        hasError
          ? 'border-rose-500 focus:ring-rose-500/20'
          : 'border-slate-200 dark:border-slate-700 focus:ring-primary/20',
        props.class,
      ]"
    />

    <div
      v-else-if="type === 'password'"
      class="relative"
    >
      <input
        :value="value ?? ''"
        :type="inputType"
        :placeholder="placeholder"
        :dir="dir"
        @input="handleChange"
        @blur="handleBlur"
        :class="[
          'w-full pl-3.5 pr-10 py-2.5 bg-slate-50 dark:bg-slate-800/50 border rounded-xl text-sm focus:outline-none focus:ring-2 text-slate-900 dark:text-slate-100 transition-all',
          hasError
            ? 'border-rose-500 focus:ring-rose-500/20'
            : 'border-slate-200 dark:border-slate-700 focus:ring-primary/20',
          props.class,
        ]"
      />

      <button
        type="button"
        @click="showPassword = !showPassword"
        class="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
      >
        <EyeOff v-if="showPassword" class="w-4 h-4" />
        <Eye v-else class="w-4 h-4" />
      </button>
    </div>

    <div
      v-else-if="type === 'date'"
      class="relative"
    >
      <input
        :value="value ?? ''"
        type="date"
        :dir="dir"
        @input="handleChange"
        @blur="handleBlur"
        :class="[
          'w-full px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800 border rounded-xl text-sm text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2',
          hasError
            ? 'border-rose-500 focus:ring-rose-500/20'
            : 'border-slate-200 dark:border-slate-700 focus:ring-primary/20',
          props.class,
        ]"
      />
      <CalendarDays
        class="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none"
      />
    </div>

    <input
      v-else
      :value="value ?? ''"
      :type="type"
      :placeholder="placeholder"
      :dir="dir"
      @input="handleChange"
      @blur="handleBlur"
      :class="[
        'w-full relative px-3.5 py-2.5 bg-slate-50 dark:bg-slate-800/50 border rounded-xl text-sm focus:outline-none focus:ring-2 text-slate-900 dark:text-slate-100 transition-all',
        hasError
          ? 'border-rose-500 focus:ring-rose-500/20'
          : 'border-slate-200 dark:border-slate-700 focus:ring-primary/20',
        props.class,
      ]"
    />

    <p
      v-if="errorMessage"
      class="text-xs text-rose-500 mt-0.5"
    >
      {{ errorMessage }}
    </p>

  </div>
</template>