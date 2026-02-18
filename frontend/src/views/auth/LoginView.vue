<script setup>
import {inject} from "vue";
import {useRouter} from "vue-router";
import authAPI from "@/api/AuthAPI.js";

const router = useRouter();
const toast = inject('toast');

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
</script>

<template>
  <h1 class="text-6xl font-extrabold text-white text-center mt-10">
    Login
  </h1>
  <p class="text-2xl text-white text-center my-5">Log in if you already have an account</p>

  <FormKit
    id="loginForm"
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
