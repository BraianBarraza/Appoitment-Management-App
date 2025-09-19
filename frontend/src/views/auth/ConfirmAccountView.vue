<script setup>
import {useRoute} from "vue-router";
import {onMounted} from "vue";
import AuthAPI from "../../api/AuthAPI.js";

const route = useRoute();

const {token} = route.params;

onMounted( async ()=>{
  try {
    const {data} = await AuthAPI.confirmAccount(token)
    toast.open({
      message: data.msg,
      type: 'success',
    })
  }catch(error){
    console.log(error)
  }
})

</script>

<template>
  <div class="mb-12">
    <h1 class="text-white font-bold text-center text-2xl m-20">Account confirmation process succeed!</h1>
  </div>
</template>
