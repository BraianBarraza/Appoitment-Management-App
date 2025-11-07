<script setup>

</script>

<template>
    <h1 class="text-6xl font-extrabold text-white text-center mt-10">
      New Password
    </h1>
    <p class="text-2xl text-white text-center my-5">Write your new password</p>

    <FormKit
      id="newPasswordForm"
      type="form"
      :actions="false"
      @submit="handleSubmit"
    >
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

      <FormKit type="submit">Set new Password</FormKit>

    </FormKit>
  </template>
