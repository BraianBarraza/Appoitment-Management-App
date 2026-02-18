<script setup>
import {onMounted, inject, ref} from "vue";
import {useRoute, useRouter} from "vue-router";
import AuthAPI from "../../api/AuthAPI.js";

const router = useRouter()
const route = useRoute()
const toast = inject('toast')
const {token} = route.params;
const confirmed = ref(false);

onMounted( async ()=>{
  try {
    const {data} = await AuthAPI.confirmAccount(token)
    confirmed.value = true;
    toast.open({
      message: data.msg,
      type: 'success',
    })
    setTimeout(()=>{
      router.push({name: 'login'})
    }, 5000)
  }catch(error){
    toast.open({
      message: error.response?.data?.msg || 'An unexpected error occurred',
      type: 'error',
    })
  }
})

</script>

<template>
  <div class="mb-12">
    <h1 v-if="confirmed" class="text-6xl font-extrabold text-white text-center mt-10">
      Account confirmation Succeed!
    </h1>
    <h1 v-else class="text-6xl font-extrabold text-white text-center mt-10">
      Confirming your account...
    </h1>
  </div>
</template>
