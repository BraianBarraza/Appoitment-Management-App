<script setup>

</script>

<template>
    <h1 class="text-6xl font-extrabold text-white text-center mt-10">
      Forgot Your Password ?
    </h1>
    <p class="text-2xl text-white text-center my-5">Account access recovery</p>

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

    <FormKit type="submit">Send Recovery Email</FormKit>

  </FormKit>
</template>

