<script setup>
import {defineUserStore} from "@/stores/user.js";
const user = defineUserStore();

</script>

<template>
  <div class="flex justify-between">
    <h1 class="text-2xl lg:text-6xl font-black text-white">Barbershop App</h1>
    <div class="flex flex-col space-y-5">

      <div class="flex gap-2 items-center justify-end">
        <p class="text-white text-right">Hello: {{user.getUserName}}</p>
        <button
          type="button"
          class="bg-red-600 hover:bg-red-700 p-2 text-white uppercase text-xs- font-extrabold rounded-lg"
          @click="user.logout()">
          Logout
        </button>
      </div>

      <nav class="flex gap-2 items-center justify-end">
        <router-link
          :to="{name:'my-appointments'}"
          class="p-3 text-gray-200 uppercase text-xs font-black rounded-lg">
          My appointments
        </router-link>

        <RouterLink :to="{name:'new-appointment'}"
                    class="p-3 text-gray-200 uppercase text-xs font-black rounded-lg bg-blue-700">
          New appointment
        </RouterLink>

      </nav>
    </div>
  </div>
  <main>
    <RouterView/>
  </main>
</template>
