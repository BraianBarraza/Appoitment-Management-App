import {defineStore} from "pinia";
import {ref, computed, onMounted} from "vue";


export const useAppointmentsStore = defineStore('appointments', () => {

  const services = ref([])
  const date = ref('')
  const hours = ref([])
  const time = ref('')

  function onServiceSelected(service){
    if (services.value.some(selectedService => selectedService._id === service._id)) {
      services.value = services.value.filter(selectedService => selectedService._id !== service._id);
    }else{
      if(services.value.length === 3){
      alert("You can select a maximum of 3 services per day.");
      return
      }
      services.value.push(service);
    }
  }

  const isServiceSelected = computed(() => {
    return(id) => services.value.some(service => service._id === id);
  })

  const noSelectedServices = computed(() => services.value.length === 0 )

  const totalAmount = computed(() => {
    return services.value.reduce((total, service) => total + service.price, 0)
  })

  function createAppointment(){
    const appointment = {
      services: services.value.map(service => service._id),
      date: date.value,
      time: time.value,
      totalAmount: totalAmount.value
    }
    console.log(appointment)
    return appointment
  }

  onMounted(()=>{
    const startHour = 10
    const endHour = 19
    for (let hour = startHour; hour <= endHour; hour++ ) {
      hours.value.push(hour + ':00');
    }
  })

  const isValidAppointment = computed(() => {
    return services.value.length && date.value.length && time.value.length
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
    isValidAppointment
  }
})
