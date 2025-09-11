import {createRouter, createWebHistory} from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AppointmentsLayout from '../views/appointments/AppointmentsLayout.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/appointments',
      name: 'appointments',
      component: AppointmentsLayout,
      children: [
        {
          path: 'new',
          component: () => import('../views/appointments/NewAppointmentLayout.vue'),
          children: [
            {
              path: '',
              name: 'new-appointment',
              component: () => import('../views/appointments/ServicesView.vue'),
            },
            {
              path: 'details',
              name: 'appointment-details',
              component: () => import('../views/appointments/AppointmentView.vue'),
            },
          ]
        }
      ]
    },
    {
      path:'/auth',
      name: 'auth',
      component: () => import('../views/auth/AuthLayout.vue'),
      children: [
        {
          path: 'sign-up',
          name: 'sign-up',
          component: () => import('../views/auth/SignUpView.vue'),
        },
        {
          path: 'confirm-account/:token',
          name: 'confirm-account',
          component: () => import('../views/auth/ConfirmAccountView.vue'),
        },
        {
          path: 'login',
          name: 'login',
          component: () => import('../views/auth/LoginView.vue'),
        }
      ]
    },
  ],
})

export default router
