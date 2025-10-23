import {ref, computed, onMounted, inject, watch} from "vue";
import {defineStore} from "pinia";
import {useRouter} from "vue-router";

import AppointmentAPI from "@/api/AppointmentAPI.js";
import {convertToISO} from "@/helpers/date.js";


export const useAppointmentsStore = defineStore('appointments', () => {

  const services = ref([])
  const date = ref('')
  const hours = ref([])
  const time = ref('')
  const appointmentsByDate = ref([])

  const toast = inject('toast')
  const router = useRouter()

  onMounted(() => {
    const startHour = 10
    const endHour = 19
    for (let hour = startHour; hour <= endHour; hour++) {
      hours.value.push(hour + ':00');
    }
  })

  watch(date, async () => {
    time.value = ''
    //avoid fetch if date is empty
    if (date.value==='') return
    //get date appointments
    const {data} = await AppointmentAPI.getByDate(date.value)
    appointmentsByDate.value = data
  })


  function onServiceSelected(service) {
    if (services.value.some(selectedService => selectedService._id === service._id)) {
      services.value = services.value.filter(selectedService => selectedService._id !== service._id);
    } else {
      if (services.value.length === 3) {
        alert("You can select a maximum of 3 services per day.");
        return
      }
      services.value.push(service);
    }
  }

  const isServiceSelected = computed(() => {
    return (id) => services.value.some(service => service._id === id);
  })

  const noSelectedServices = computed(() => services.value.length === 0)

  const totalAmount = computed(() => {
    return services.value.reduce((total, service) => total + service.price, 0)
  })

  async function createAppointment() {
    const appointment = {
      services: services.value.map(service => service._id),
      date: convertToISO(date.value),
      time: time.value,
      totalAmount: totalAmount.value
    }
    try {
      const {data} = await AppointmentAPI.create(appointment)
      toast.open({
        message: data.message,
        type: 'success',
      })
      clearAppointmentData()
      router.push({name: 'my-appointments'})
    } catch (err) {
      console.error(err);
      toast.open({
        message: 'There was an error creating the appointment',
        type: 'error',
      })
    }
  }

  function clearAppointmentData() {
    services.value = []
    date.value = ''
    time.value = ''
  }


  const isValidAppointment = computed(() => {
    return services.value.length && date.value.length && time.value.length
  })

  const isDateSelected = computed(() => {
    return !!date.value
  })

  const disableTime = computed(() => {
    return (hour) => {
      return appointmentsByDate.value.find(appointment => appointment.time === hour)
    }
  })
  return {
    services,
    date,
    hours,
    time,
    onServiceSelected,
    createAppointment,
    isServiceSelected,
    totalAmount,
    noSelectedServices,
    isValidAppointment,
    isDateSelected,
    disableTime
  }
})
