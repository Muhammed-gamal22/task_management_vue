
<script setup lang="ts">
import { Loader2 } from 'lucide-vue-next'
import { useRouter,RouterLink } from 'vue-router'
import { useForm } from 'vee-validate'
import {useTokenStore} from "../store/token-store.ts"
import CustomInput from "../components/customs/CustomInput.vue"
import { ArrowRight } from 'lucide-vue-next'
import CustomButton from '../components/customs/CustomButton.vue'
import { useMutation } from '@tanstack/vue-query'
import { postData } from '@/services/services.ts'
import { toast } from 'vue-sonner'
const router = useRouter()
    const { setToken } = useTokenStore();
    
    const { handleSubmit, isSubmitting } = useForm({
        initialValues: {
            email: '',
            password: '',
        },
        })

    const { mutate, isPending } = useMutation({
        mutationFn: async (data) => postData("/auth/login", data),
        onSuccess: (response) => {
            if (response?.token) {
                setToken(response.token);
                localStorage.setItem("token", response.token);
                 toast.success("Logged in successfully!");
                router.push("/tasks");
            } else {
                toast.error("Invalid server response. Token missing.");
            }
        },
        onError: (error) => {
             toast.error(error?.response?.data?.message || error.message || "Failed to log in");
        },
    });

   const onSubmit = handleSubmit(
  (data) => {
    console.log('VALIDATION SUCCESS:', data)
    mutate(data)
  },
  (errors) => {
    console.log('VALIDATION FAILED:', errors)
  }
)
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950 p-4 sm:p-6 lg:p-8">
      <div class="w-full max-w-md space-y-8">
    <div class="text-center space-y-2">
                    <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mx-auto shadow-sm">
                        <ListTodo className="w-7 h-7" />
                    </div>
                    <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-50">
                        Welcome back
                    </h1>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                        Enter your credentials to access your tasks dashboard
                    </p>
                </div>
                <div className="bg-white dark:bg-slate-900 p-6 sm:p-8 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-6">
  <form @submit="onSubmit" class="space-y-5">
    <CustomInput
        name="email"
        label="Email Address"
        placeholder="name@example.com"
        type="email"
        :rules="{
            required: 'Email is required',
            email: 'Please enter a valid email address',
        }"
        />

        <CustomInput
        name="password"
        label="Password"
        placeholder="••••••••"
        type="password"
        :rules="{
            required: 'Password is required',
            minLength: 6,
        }"
        />

    <CustomButton
      type="submit"
      :is-loading="isPending || isSubmitting"
      class="w-full py-2.5 bg-white hover:bg-primary/90 text-primary-foreground font-semibold flex items-center justify-center gap-2"
    >
      Sign In
      <ArrowRight class="w-4 h-4 ml-1" />
    </CustomButton>

  </form>
   <div class="pt-4 border-t border-slate-100 dark:border-slate-800 text-center">
  <p class="text-sm text-slate-600 dark:text-slate-400">
    Don't have an account?
    <RouterLink
      to="/register"
      class="font-semibold text-primary hover:underline"
    >
      Create an account
    </RouterLink>
  </p>
</div>
  </div>
</div>
</div>
  
</template>