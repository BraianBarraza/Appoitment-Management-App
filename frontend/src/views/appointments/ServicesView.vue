<script setup>
import {onMounted} from "vue";
import {useServicesStore} from "@/stores/services.js";
import ServiceItem from "@/components/ServiceItem.vue";

const servicesStore = useServicesStore();

onMounted(() => {
  if (servicesStore.services.length === 0) {
    servicesStore.fetchServices();
  }
})
</script>

<template>
  <div class="space-y-5">
    <h2 class="text-4xl font-extrabold text-white mt-10">Services</h2>
    <p class="text-white text-lg mt-5">Please select at least one service</p>

    <p v-if="servicesStore.loading" class="text-white text-2xl text-center mt-5">Loading services...</p>

    <div v-else class="grid grid-cols-2 gap-5 mt-5">
      <ServiceItem
        v-for="service in servicesStore.services"
        :key="service._id"
        :service="service"
      />
    </div>
  </div>
</template>
