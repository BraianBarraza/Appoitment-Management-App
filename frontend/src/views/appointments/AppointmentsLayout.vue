<script setup>
import {onMounted, inject, computed} from "vue";
import {useRoute} from "vue-router";
import {useUserStore} from "@/stores/user.js";
import {useAppointmentsStore} from "@/stores/appointments.js";

const user = useUserStore();
const appointmentsStore = useAppointmentsStore();
const toast = inject('toast');
const route = useRoute();

appointmentsStore.setToast(toast);

onMounted(() => {
  user.fetchUser();
})

const isMyAppointments = computed(() => route.name === 'my-appointments')
</script>

<template>
  <div class="flex justify-between">
    <h1 class="text-2xl lg:text-6xl font-black text-white">Barbershop App</h1>
    <div class="flex flex-col space-y-5">

      <div class="flex gap-2 items-center justify-end">
        <p class="text-white text-right">Hello: {{user.getUserName}}</p>
        <button
          type="button"
          class="bg-red-600 hover:bg-red-700 p-2 text-white uppercase text-xs font-extrabold rounded-lg"
          @click="user.logout()">
          Logout
        </button>
      </div>

      <nav class="nav-toggle flex items-center relative">
        <div
          class="nav-slider"
          :class="isMyAppointments ? 'slider-left' : 'slider-right'"
        />
        <router-link
          :to="{name:'my-appointments'}"
          class="nav-link"
          :class="isMyAppointments ? 'text-white' : 'text-gray-300'"
        >
          My appointments
        </router-link>

        <RouterLink
          :to="{name:'new-appointment'}"
          class="nav-link"
          :class="!isMyAppointments ? 'text-white' : 'text-gray-300'"
        >
          New appointment
        </RouterLink>
      </nav>
    </div>
  </div>
  <main>
    <RouterView/>
  </main>
</template>

<style scoped>
.nav-toggle {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 0.5rem;
  padding: 0.2rem;
}

.nav-link {
  position: relative;
  z-index: 1;
  padding: 0.6rem 1rem;
  font-size: 0.75rem;
  font-weight: 900;
  text-transform: uppercase;
  transition: color 0.3s ease;
  white-space: nowrap;
}

.nav-slider {
  position: absolute;
  top: 0.2rem;
  bottom: 0.2rem;
  width: calc(50% - 0.2rem);
  background: rgb(29 78 216);
  border-radius: 0.4rem;
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  z-index: 0;
}

.slider-left {
  transform: translateX(0.2rem);
}

.slider-right {
  transform: translateX(calc(100% + 0.2rem));
}
</style>
