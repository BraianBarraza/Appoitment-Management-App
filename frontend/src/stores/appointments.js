import {defineStore} from "pinia";
import {ref} from "vue";


export const useAppointmentsStore = defineStore('appointments', () => {

  const services = ref([])

  function onServiceSelected(service){
    if (services.value.some(selectedService => selectedService._id === service._id)) {
      console.log("Service is already in list, not adding again");
    }else{
      services.value.push(service);
      console.log("not in list, adding service");
    }

  }
  return {
    onServiceSelected,
  }
})
