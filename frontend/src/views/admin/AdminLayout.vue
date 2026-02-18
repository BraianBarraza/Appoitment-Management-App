<script setup>
import {onMounted, inject} from "vue";
import {useUserStore} from "@/stores/user.js";
import {useAppointmentsStore} from "@/stores/appointments.js";

const user = useUserStore();
const appointmentsStore = useAppointmentsStore();
const toast = inject('toast');

appointmentsStore.setToast(toast);

onMounted(() => {
  user.fetchUser();
})
</script>

<template>
  <div class="flex justify-between">
    <div>
      <h1 class="text-2xl lg:text-6xl font-black text-white">Barbershop App</h1>
      <h2 class="text-xl lg:text-2xl font-black text-white">Administration Panel</h2>
    </div>

    <div class="flex flex-col space-y-5">
      <div class="flex gap-2 items-center">
        <p class="text-white text-right">Hello: Admin {{ user.getUserName }}</p>
        <button
          type="button"
          class="bg-red-600 hover:bg-red-700 p-2 text-white uppercase text-xs font-extrabold rounded-lg"
          @click="user.logout"
        >
          Logout
        </button>
      </div>

    </div>
  </div>
  <main class="space-y-6">
    <RouterView/>
  </main>
</template>
