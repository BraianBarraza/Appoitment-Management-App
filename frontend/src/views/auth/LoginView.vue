<script setup>
import {inject} from "vue";
import authAPI from "@/api/AuthAPI.js";

const toast = inject('toast');

const handleSubmit = async (formData) => {
  try {
    const {data} = await authAPI.login(formData);
    localStorage.setItem("AUTH_TOKEN", data);
  }catch(error) {
    toast.open({
      message: error.response.data.msg,
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
      validation="required"
    />

    <FormKit type="submit">Login</FormKit>

  </FormKit>
</template>
