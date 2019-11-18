<template>
  <div class="appContainer">
    <Header v-if="this.$route.name != 'home'"></Header>
    <div class="main">
      <router-view/>
    </div>
  </div>
</template>

<script>
import Header from '@/components/Header.vue'
export default {
  components: {
    Header
  }
}
</script>
