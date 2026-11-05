<script setup>
import { watch } from 'vue'
import { useRouter, RouterLink } from 'vue-router'
import { useForm } from 'vee-validate'
import { useMutation } from '@tanstack/vue-query'
import { ListTodo, Loader2, ArrowRight } from 'lucide-vue-next'
import { toast } from 'vue-sonner'

import { postData } from '@/services/services'
import { useTokenStore } from '@/store/token-store'

import CustomInput from '@/components/customs/CustomInput.vue'
import CustomButton from '@/components/customs/CustomButton.vue'

const router = useRouter()
const { setToken } = useTokenStore()

const {
  handleSubmit,
  values,
  isSubmitting,
  validateField,
} = useForm({
  initialValues: {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  },
})

const validateName = (value) => {
  if (!value?.trim()) return 'Full name is required'

  if (value.trim().length < 2) {
    return 'Name must be at least 2 characters'
  }

  return true
}

const validateEmail = (value) => {
  if (!value) return 'Email is required'

  const emailRegex =
    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

  return emailRegex.test(value) || 'Please enter a valid email address'
}

const validatePassword = (value) => {
  if (!value) return 'Password is required'

  if (value.length < 6) {
    return 'Password must be at least 6 characters'
  }

  return true
}

const validateConfirmPassword = (value) => {
  if (!value) return 'Please confirm your password'

  return (
    value === values.password ||
    'Passwords do not match'
  )
}

watch(
  () => values.password,
  () => {
    validateField('confirmPassword')
  }
)

const { mutate, isPending } = useMutation({
  mutationFn: (data) => postData('/auth/register', data),

  onSuccess: (response) => {
    if (response?.token) {
      setToken(response.token)
      localStorage.setItem('token', response.token)

      toast.success('Account created successfully!')
      router.push('/tasks')
    } else {
      toast.success('Registration successful! Please log in.')
      router.push('/login')
    }
  },

  onError: (error) => {
    toast.error(
      error?.response?.data?.message ||
      error.message ||
      'Registration failed'
    )
  },
})

const onSubmit = handleSubmit((formData) => {
  mutate(formData)
})
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950 p-4 sm:p-6 lg:p-8">
    <div class="w-full max-w-md space-y-8">

      <div class="text-center space-y-2">
        <div class="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mx-auto shadow-sm">
          <ListTodo class="w-7 h-7" />
        </div>

        <h1 class="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-50">
          Create an account
        </h1>

        <p class="text-sm text-slate-500 dark:text-slate-400">
          Join us today and organize your tasks efficiently
        </p>
      </div>

      <div class="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-6">

        <form @submit.prevent="onSubmit" class="space-y-4">

          <CustomInput
            name="name"
            label="Full Name"
            placeholder="John Doe"
            :rules="validateName"
          />

          <CustomInput
            name="email"
            label="Email Address"
            placeholder="name@example.com"
            type="email"
            :rules="validateEmail"
          />

          <CustomInput
            name="password"
            label="Password"
            placeholder="••••••••"
            type="password"
            :rules="validatePassword"
          />

          <CustomInput
            name="confirmPassword"
            label="Confirm Password"
            placeholder="••••••••"
            type="password"
            :rules="validateConfirmPassword"
          />

          <CustomButton
            type="submit"
            :is-loading="isPending || isSubmitting"
            :disabled="isPending || isSubmitting"
            class="w-full py-2.5 bg-white hover:bg-primary/90 text-primary-foreground font-semibold flex items-center justify-center gap-2 mt-2"
          >
            <template v-if="isPending || isSubmitting">
              <Loader2 class="w-4 h-4 animate-spin" />
            </template>

            <template v-else>
              Sign Up
              <ArrowRight class="w-4 h-4 ml-1" />
            </template>
          </CustomButton>

        </form>

        <div class="pt-4 border-t border-slate-100 dark:border-slate-800 text-center">
          <p class="text-sm text-slate-600 dark:text-slate-400">
            Already have an account?

            <RouterLink
              to="/login"
              class="font-semibold text-primary hover:underline"
            >
              Sign In
            </RouterLink>
          </p>
        </div>

      </div>
    </div>
  </div>
</template>