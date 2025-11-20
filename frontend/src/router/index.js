import {createRouter, createWebHistory} from 'vue-router'
import AppointmentsLayout from '../views/appointments/AppointmentsLayout.vue'
import AuthAPI from "@/api/AuthAPI.js";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'root',
      beforeEnter: async (to, from, next) => {
        try {
          const {data} = await AuthAPI.auth();

          if (data.admin) {
            next({name: 'admin-appointments'});
          } else {
            next({name: 'new-appointment'});
          }
        } catch (error) {
          next({name: 'login'});
        }
      },
    },
    {
      path: '/admin',
      name: 'admin',
      component: () => import('../views/admin/AdminLayout.vue'),
      meta: {requiresAdmin: true},
      children: [
        {
          path: '',
          name: 'admin-appointments',
          component: () => import('../views/admin/AppointmentsView.vue'),
        }
      ]
    },
    {
      path: '/appointments',
      name: 'appointments',
      component: AppointmentsLayout,
      meta: {requiresAuth: true},
      children: [
        {
          path: '',
          name: 'my-appointments',
          component: () => import('../views/appointments/MyAppointmentsView.vue'),
        },
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
        },
        {
          path: ':id/edit',
          component: () => import('../views/appointments/EditAppointmentLayout.vue'),
          children: [
            {
              path: '',
              name: 'edit-appointment',
              component: () => import('../views/appointments/ServicesView.vue'),
            },
            {
              path: 'details',
              name: 'edit-appointment-details',
              component: () => import('../views/appointments/AppointmentView.vue'),
            },
          ]
        }
      ]
    },
    {
      path: '/auth',
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
        },
        {
          path: 'forgot-password',
          name: 'forgot-password',
          component: () => import('../views/auth/ForgotPasswordView.vue'),
        },
        {
          path: 'new-password/:token',
          name: 'new-password',
          component: () => import('../views/auth/NewPasswordView.vue'),
        }

      ]
    },
  ],
})

router.beforeEach(async (to, from, next) => {
  const requiresAuth = to.matched.some(url => url.meta.requiresAuth);
  if (requiresAuth) {
    try {
      const {data} = await AuthAPI.auth();
      if (data.admin) {
        next({name: 'admin'});
      } else {
        next()
      }
    } catch (error) {
      next({name: 'login'})
    }
  } else {
    next();
  }
})
router.beforeEach(async (to, from, next) => {
  const requiresAdmin = to.matched.some(url => url.meta.requiresAdmin);
  if (requiresAdmin) {
    try {
      await AuthAPI.admin();
      next()
    } catch (error) {
      next({name: 'login'})
    }
  } else {
    next();
  }
})

export default router
