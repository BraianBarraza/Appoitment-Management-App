<script setup>
import {defineUserStore} from "@/stores/user.js";
import Appointment from "@/components/Appointment.vue";

const user = defineUserStore();
</script>

<template>
  <h2 class="text-4xl font-extrabold text-white mt-10">My Appointments</h2>
  <p class="text-white text-lg mt-5">Here can you manage your appointments</p>

  <p v-if="user.loading" class="text-white text-2xl text-center mt-5">Loading...</p>
  <div v-else>
    <p v-if="user.noAppointments" class="text-white text-2xl text-center mt-5">You have no
      appointments scheduled.</p>

    <div v-else class="grid gap-5 mt-10">
      <Appointment
        v-for="appointment in user.userAppointments"
        :key="appointment._id"
        :appointment="appointment"
      />
    </div>
  </div>

</template>

