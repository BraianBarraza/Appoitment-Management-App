<script setup>
import VueTailwindDatepicker from "vue-tailwind-datepicker";
import SelectedService from "@/components/SelectedService.vue";
import {useAppointmentsStore} from "@/stores/appointments.js";
import {formatCurrency} from "@/helpers/index.js";

const appointmentsStore = useAppointmentsStore()
</script>

<template>
  <div class="space-y-5">
    <h2 class="text-4xl font-extrabold text-white">Appointment Details</h2>
    <p class="text-white text-lg">Please verify and confirm your appointment</p>

    <h3 class="text-3xl font-extrabold text-white">Services:</h3>

    <p v-if="appointmentsStore.noSelectedServices" class="text-white text-2xl text-center">No
      services selected yet</p>

    <div v-else>
      <div class="grid gap-5">
        <SelectedService
          v-for="service in appointmentsStore.services"
          :key="service._id"
          :service="service"
        />

        <p class="text-right text-white text-2xl">Total to Pay:
          <span class="font-black">{{ formatCurrency(appointmentsStore.totalAmount) }}</span>
        </p>
      </div>

      <div class="space-y-8">
        <h3 class="text-3xl font-extrabold text-white">Date and Time</h3>

        <div class="lg:flex gap-5 items-start">
          <div class="w-full lg:w-96 bg-white flex justify-center rounded-lg">
            <VueTailwindDatepicker
              i18n="en-US"
              as-single
              no-input
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
