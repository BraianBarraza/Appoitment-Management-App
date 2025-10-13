<script setup>
import {inject} from 'vue'
import {reset} from "@formkit/vue";
import AuthAPI from "@/api/AuthAPI.js";

const toast = inject('toast')


const handleSubmit = async ({password_confirm, ...formData}) => {
  try {
    const {data} = await AuthAPI.signUp(formData)
    toast.open({
      message: data.msg,
      type: 'success',
    })
    reset('signUpForm')
  } catch (error) {
    toast.open({
      message: error.response?.data?.msg || 'An unexpected error occurred',
      type: 'error',
    })
  }
};
</script>

<template>
  <h1 class="text-6xl font-extrabold text-white text-center mt-10">
    Sing Up
  </h1>
  <p class="text-2xl text-white text-center my-5">Create a new account</p>

  <FormKit
    id="signUpForm"
    type="form"
    :actions="false"
    @submit="handleSubmit"
  >
    <FormKit
      type="text"
      label="Name"
      name="name"
      placeholder="Enter your name"
      validation="required|length:3"
      :validation-messages="{ length: 'Name must be at least 3 characters' }"
    />
    <FormKit
      type="email"
      label="Email"
      name="email"
      placeholder="Enter your E-mail"
      validation="required|email"
    />
    <FormKit
      type="password"
      label="Password"
      name="password"
      placeholder="User password - Min 8 characters"
      validation="required|length:8"
      :validation-messages="{ length: 'Password must be at least 8 characters' }"
    />
    <FormKit
      type="password"
      label="Confirm Password"
      name="password_confirm"
      placeholder="confirm your password"
      validation="required|confirm"
      :validation-messages="{
      confirm: 'Passwords do not match',
    }"
    />

    <FormKit type="submit">Sing Up</FormKit>

  </FormKit>
</template>
