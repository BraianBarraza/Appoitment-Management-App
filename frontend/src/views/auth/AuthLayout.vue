<script setup>
const authRoutes = [
  {name: 'sign-up', text: 'Sign Up'},
  {name: 'login', text: 'Log In'},
]
</script>

<template>
  <div class="mx-auto lg:w-4/5 mt-20">
    <RouterView/>
    <nav
      class="mt-10 flex flex-col items-center space-y-5 lg:flex-row lg:justify-between lg:space-y-0">
      <RouterLink
        v-for="authRoute in authRoutes"
        class="uppercase font-bold text-white"
        :to="{name: authRoute.name}"
      >{{ authRoute.text }}
      </RouterLink>

    </nav>
  </div>
</template>
