import {ref, computed} from "vue";
import {defineStore} from "pinia";
import AuthAPI from "@/api/AuthAPI.js";
import AppointmentAPI from "@/api/AppointmentAPI.js";
import router from "@/router/index.js";

export const useUserStore = defineStore('user', () => {
  const user = ref({});
  const userAppointments = ref([])
  const loading = ref(true);

  async function fetchUser() {
    try {
      const {data} = await AuthAPI.auth()
      user.value = data;
      await getUserAppointments()
    } catch(err) {
      console.error(err)
    } finally {
      loading.value = false
    }
  }

  async function getUserAppointments() {
    try {
      const {data} = await AppointmentAPI.getUserAppointments(user.value._id)
      userAppointments.value = data
    } catch (err) {
      console.error('Error fetching user appointments:', err)
    }
  }

  function logout() {
    localStorage.removeItem('AUTH_TOKEN')
    user.value = {}
    router.push({name: 'login'})
  }

  const getUserName = computed(() => user.value?.name ? user.value?.name : '')

  const noAppointments = computed(() => userAppointments.value.length === 0)

  return {
    user,
    userAppointments,
    getUserName,
    noAppointments,
    loading,
    logout,
    getUserAppointments,
    fetchUser
  }
})
