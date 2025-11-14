<script setup>
import {defineUserStore} from "@/stores/user.js";
import AdminAppointment from "@/components/AdminAppointment.vue";
const userStore = defineUserStore();
defineProps({
  appointment: {
    type: Object,
  }
})
</script>

<template>
  <p class="text-white text-lg mt-5">
    Appointment Management.
  </p>
  <p v-if="userStore.loading" class="text-white text-2xl text-center mt-5">Loading...</p>
  <div v-else>
    <p v-if="userStore.noAppointments" class="text-white text-2xl text-center mt-5">
      You dont have any appointments yet.
    </p>
    <div v-else class="grid grid-cols-1 gap-5 mt-10">
      <AdminAppointment
        v-for="appointments in userStore.userAppointments"
        :key="appointments._id"
        :appointment="appointments"
      />

    </div>
  </div>
</template>
