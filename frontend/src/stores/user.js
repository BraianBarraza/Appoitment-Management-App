import {ref, onMounted, computed} from "vue";
import {defineStore} from "pinia";
import {useRouter} from "vue-router";
import AuthAPI from "@/api/AuthAPI.js";

export const defineUserStore = defineStore('user', () =>{
  const user = ref({});
  const router = useRouter();

  onMounted(async () => {
    try {
      const {data} = await AuthAPI.auth()
      user.value = data;
    }catch(err){
      console.log(err)
    }
  })

  function logout(){
    localStorage.removeItem('AUTH_TOKEN')
    user.value = {}
    router.push({name: 'login'})
  }

  const getUserName = computed(()=> user.value?.name ? user.value?.name : '')

  return {
    user,
    getUserName,
    logout,
  }
})
