<script setup>
import {inject, ref} from "vue";
import {useRouter} from "vue-router";
import authAPI from "@/api/AuthAPI.js";

const router = useRouter();
const toast = inject('toast');
const demoCredentials = {
  email: 'mail@mail.com',
  password: '1234456789',
}
const loginForm = ref({
  email: '',
  password: '',
})

const handleSubmit = async (formData) => {
  try {
    const {data} = await authAPI.login(formData);
    localStorage.setItem("AUTH_TOKEN", data.token);
    router.push({name: 'root'});
  }catch(error) {
    toast.open({
      message: error.response?.data?.msg || 'An unexpected error occurred',
      type: 'error',
    })
  }
};

const fillDemoCredentials = async () => {
  try {
    await authAPI.prepareDemoUser()

    loginForm.value = {...demoCredentials}

    toast.open({
      message: 'Demo account ready. You can log in with the test credentials.',
      type: 'success',
    })
  } catch (error) {
    toast.open({
      message: error.response?.data?.msg || 'Could not prepare the demo account',
      type: 'error',
    })
  }
}
</script>

<template>
  <h1 class="text-6xl font-extrabold text-white text-center mt-10">
    Login
  </h1>
  <p class="text-2xl text-white text-center my-5">Log in if you already have an account</p>

  <div class="mb-8 rounded-xl border border-blue-300/30 bg-blue-500/10 p-4 text-white shadow-lg">
    <div class="flex items-start gap-3">
      <span
        class="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-400 text-sm font-black text-white"
        aria-hidden="true"
      >i</span>
      <div class="space-y-2">
        <p class="font-bold">Portfolio demo account</p>
        <p class="text-sm text-blue-50">
          Use <span class="font-bold">mail@mail.com</span> with password
          <span class="font-bold">1234456789</span> to explore the app without creating a real account.
        </p>
        <button
          type="button"
          class="text-sm font-bold text-blue-200 underline-offset-4 hover:text-white hover:underline"
          @click="fillDemoCredentials"
        >
          Fill demo credentials
        </button>
      </div>
    </div>
  </div>

  <FormKit
    id="loginForm"
    v-model="loginForm"
    type="form"
    :actions="false"
    @submit="handleSubmit"
  >
    <FormKit
      type="email"
      label="Email"
      name="email"
      placeholder="User E-mail"
      validation="required|email"
    />
    <FormKit
      type="password"
      label="Password"
      name="password"
      placeholder="User password"
      validation="required|length:8"
      :validation-messages="{ length: 'Password must be at least 8 characters' }"
    />

    <FormKit type="submit">Login</FormKit>

  </FormKit>
</template>
