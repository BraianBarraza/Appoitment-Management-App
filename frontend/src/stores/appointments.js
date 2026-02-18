import {computed, ref, watch} from "vue";
import {defineStore} from "pinia";
import AppointmentAPI from "@/api/AppointmentAPI.js";
import {convertToDDMMYYYY, convertToISO} from "@/helpers/date.js";
import {useUserStore} from "./user.js";
import router from "@/router/index.js";

export const useAppointmentsStore = defineStore('appointments', () => {

    const appointmentId = ref('')
    const services = ref([])
    const date = ref('')
    const time = ref('')
    const appointmentsByDate = ref([])

    const startHour = 10
    const endHour = 19
    const hours = ref(
      Array.from({length: endHour - startHour + 1}, (_, i) => `${startHour + i}:00`)
    )

    let toast = null

    function setToast(toastInstance) {
      toast = toastInstance
    }

    watch(date, async () => {
      time.value = ''
      if (date.value === '') return

      try {
        const {data} = await AppointmentAPI.getByDate(date.value)

        if (appointmentId.value) {
          appointmentsByDate.value = data.filter(appointment => appointment._id !== appointmentId.value)
          const currentAppointment = data.find(appointment => appointment._id === appointmentId.value)
          if (currentAppointment) {
            time.value = currentAppointment.time
          }
        } else {
          appointmentsByDate.value = data
        }
      } catch (err) {
        console.error('Error fetching appointments by date:', err)
      }
    })


    function setSelectedAppointment(appointment) {
      services.value = appointment.services
      date.value = convertToDDMMYYYY(appointment.date)
      time.value = appointment.time
      appointmentId.value = appointment._id
    }

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

    async function saveAppointment() {
      const userStore = useUserStore()

      const appointment = {
        services: services.value.map(service => service._id),
        date: convertToISO(date.value),
        time: time.value,
        totalAmount: totalAmount.value
      }

      try {
        if (appointmentId.value) {
          const {data} = await AppointmentAPI.update(appointmentId.value, appointment)
          toast?.open({
            message: data.msg,
            type: 'success',
          })
        } else {
          const {data} = await AppointmentAPI.create(appointment)
          toast?.open({
            message: data.msg,
            type: 'success',
          })
        }

        clearAppointmentData()
        await userStore.getUserAppointments()
        router.push({name: 'my-appointments'})
      } catch (err) {
        console.error(err);
        toast?.open({
          message: 'There was an error saving the appointment',
          type: 'error',
        })
      }
    }

    function clearAppointmentData() {
      appointmentId.value = ''
      services.value = []
      date.value = ''
      time.value = ''
    }

    async function deleteAppointment(id) {
      const userStore = useUserStore()

      if (confirm("Are you sure you want to delete this appointment?")) {
        try {
          const {data} = await AppointmentAPI.delete(id)
          toast?.open({
            message: data.msg,
            type: 'success',
          })
          userStore.userAppointments = userStore.userAppointments.filter(appointment => appointment._id !== id)
        } catch (err) {
          toast?.open({
            message: 'There was an error deleting the appointment',
            type: 'error',
          })
        }
      }
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
      setToast,
      onServiceSelected,
      setSelectedAppointment,
      saveAppointment,
      clearAppointmentData,
      deleteAppointment,
      isServiceSelected,
      totalAmount,
      noSelectedServices,
      isValidAppointment,
      isDateSelected,
      disableTime
    }
  }
)
