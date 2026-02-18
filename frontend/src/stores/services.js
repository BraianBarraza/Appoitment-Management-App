import {ref} from "vue";
import {defineStore} from "pinia";
import ServicesAPI from "@/api/ServicesAPI.js";

export const useServicesStore = defineStore("services", () => {

  const services = ref([]);
  const loading = ref(false);

  async function fetchServices() {
    loading.value = true;
    try {
      const {data} = await ServicesAPI.all();
      services.value = data.services;
    } catch(e) {
      console.error("Error fetching services:", e);
    } finally {
      loading.value = false;
    }
  }

  return {
    services,
    loading,
    fetchServices
  }
})
