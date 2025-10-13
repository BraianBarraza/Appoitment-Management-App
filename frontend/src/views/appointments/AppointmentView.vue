<script setup>
import VueTailwindDatepicker from "vue-tailwind-datepicker";
import SelectedService from "@/components/SelectedService.vue";
import {useAppointmentsStore} from "@/stores/appointments.js";
import {formatCurrency} from "@/helpers/index.js";
import {ref} from "vue";

const appointmentsStore = useAppointmentsStore()

const formatter = ref({
  date: 'DD/MM/YYYY',
  month: 'MMM',
})

const disableDate = (date) => {
  const today = new Date()
  return date < today || date.getMonth() > today.getMonth() + 1 || [0, 6].includes(date.getDay())
}
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
              :disable-date="disableDate"
              i18n="en-US"
              as-single
              no-input
              :formatter="formatter"
              v-model=appointmentsStore.date
            />
          </div>
          <div v-if="appointmentsStore.isDateSelected"
               class="flex-1 grid grid-cols-1 xl:grid-cols-2 gap-5 mt-10 lg:mt-0">
            <button v-for="hour in appointmentsStore.hours"
                    class="block text-blue-500 rounded-lg text-xl font-black p-3 disabled:opacity-10"
                    :class="appointmentsStore.time === hour ? 'bg-blue-500 text-white': 'bg-white' "
                    @click="appointmentsStore.time = hour"
                    :disabled="appointmentsStore.disableTime(hour) ? true : false">
              {{ hour }}
            </button>
          </div>
        </div>
      </div>
      <div v-if="appointmentsStore.isValidAppointment" class="flex justify-end">
        <button
          class="w-full md:w-auto sm:mt-4 bg-blue-500 p-3 rounded-lg uppercase font-black text-white"
          @click="appointmentsStore.createAppointment">
          Confirm Appointment
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
