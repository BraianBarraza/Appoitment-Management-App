<script setup>
import {useRoute, useRouter} from "vue-router";
import {onMounted} from "vue";
import AppointmentAPI from "@/api/AppointmentAPI.js";
import router from "@/router/index.js";
import {useAppointmentsStore} from "@/stores/appointments.js";
const route = useRoute();

const appointments = useAppointmentsStore()
const {id} = route.params;

onMounted(async () => {
  try {
    const {data} = await AppointmentAPI.getById(id)
    appointments.setSelectedAppointment(data)
  }
  catch (error) {
    router.push({name: 'my-appointments'})
  }
})
</script>

<template>
  <nav class="my-5 flex gap-3">
    <RouterLink
      :to="{name: 'edit-appointment'}"
      class="flex-1 text-center p-3 uppercase font-extrabold hover:bg-blue-600 hover:text-white"
      :class="route.name === 'edit-appointment' ? 'bg-blue-500 text-white' : 'bg-white text-blue-500'">
      Services
    </RouterLink>
    <RouterLink
      :to="{name: 'edit-appointment-details'}"
      class="flex-1 text-center p-3 uppercase font-extrabold hover:bg-blue-600 hover:text-white"
      :class="route.name === 'edit-appointment-details' ? 'bg-blue-500 text-white' : 'bg-white text-blue-500'">
      Appointment Resume
    </RouterLink>
  </nav>
  <div class="space-y-5">
    <RouterView />
  </div>
</template>
