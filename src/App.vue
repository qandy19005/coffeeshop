<template>
  <div id="nav">
    <router-link :to="{ name: 'OrderList'}">
      <!-- <span class="nav-text">商品頁</span> -->
      <img class="nav-icon" src="./assets/icon/coffee-cup.png">
    </router-link>
    <router-link :to="{ name: 'Cart'}">
      <!-- <span class="nav-text">購物車</span> -->
      <img class="nav-icon" src="./assets/icon/package.png">
    </router-link>
  </div>
  <!-- <router-view/> -->
  <router-view v-slot="{ Component, route }">
    <transition name="fade">
      <component :is="Component" :key="route.path" />
    </transition>
  </router-view>
</template>

<style lang="scss">
@import "~@/styles/app.scss";
@import "~@/styles/plugin.scss";
@import "~@/styles/transition.scss";

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
