<script setup>
import {inject, onMounted, ref} from "vue";
import {useRoute, useRouter} from "vue-router";
import authAPI from "@/api/AuthAPI.js";

const toast = inject('toast');
const route = useRoute();
const router = useRouter();
const {token} = route.params;

const validToken = ref(false);
onMounted(async () => {
  try {
    const {data} = await authAPI.verifyPasswordResetToken(token);
    validToken.value = true;
  } catch (error) {
    toast.open({
      message: error.response.data.msg,
      type: 'error',
    });
  }
})

const handleSubmit = async ({password}) => {
  try {
    const {data} = await authAPI.updatePassword(token, {password});
    toast.open({
      message: data.msg,
      type: 'success',
    })
    setTimeout(()=>{
      router.push({name: 'login'});
    }, 3000)
  } catch (error) {
    toast.open({
      message: error.response.data.msg,
      type: 'error',
    });
  }
};

</script>

<template>
  <div v-if="validToken">

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
  </div>

  <p v-else class="text-center text text-2xl font-black text-white">Sorry, this token is no valid</p>
</template>
