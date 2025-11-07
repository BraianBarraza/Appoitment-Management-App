<script setup>
import authAPI from "@/api/AuthAPI.js";
import {inject} from "vue";
import {reset} from "@formkit/vue";

const toast = inject('toast');

const handleSubmit = async ({email}) => {
  try {
    const {data} = await authAPI.forgotPassword({email});
    toast.open({
      message: data.msg,
      type: 'success',
    })
    reset('forgotPassword');
  } catch (error) {
    toast.open({
      message: error.response.data.msg,
      type: 'error',
    })
  }
}
</script>

<template>
  <h1 class="text-6xl font-extrabold text-white text-center mt-10">
    Forgot Your Password ?
  </h1>
  <p class="text-2xl text-white text-center my-5">Account access recovery</p>

  <FormKit
    id="forgotPassword"
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

    <FormKit type="submit">Send Recovery Email</FormKit>

  </FormKit>
</template>

