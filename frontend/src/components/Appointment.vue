<script setup>
import {displayDate} from "@/helpers/date.js";
import {formatCurrency} from "@/helpers/index.js";
import App from "@/App.vue";

defineProps({
  appointment: {
    type: Object,
    required: true
  }
})

</script>

<template>
  <div class="bg-white p-5 space-y-3 rounded-lg">
    <p class="text-gray-500 font-black">
      Date: <span class="font-light">{{ displayDate(appointment.date) }}</span>
      Time: <span class="font-light">{{ appointment.time }} </span>
    </p>

    <p class="text-lg font-black">Requested Services:</p>
    <div v-for="service in appointment.services">
      <p>{{ service.name }}</p>
      <p class="text-2xl font-black text-blue-500">{{ formatCurrency(service.price) }}</p>
    </div>

    <p class="text-2xl font-black text-right">
      Total to Pay: <span class="text-blue-600">{{ formatCurrency(appointment.totalAmount) }}</span>
    </p>

    <div class="flex gap-2 items-center">
      <RouterLink
        :to="{name: 'edit-appointment', params: {id: appointment._id}}"
        class="bg-slate-600 rounded-lg p-3 text-white text-sm uppercase font-black flex-1 md:flex-none">
        Edit Appointment
      </RouterLink>
      <button
        class="bg-red-600 rounded-lg p-3 text-white text-sm uppercase font-black flex-1 md:flex-none">
        Cancel Appointment
      </button>
    </div>
  </div>
</template>

