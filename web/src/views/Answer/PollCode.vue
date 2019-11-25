<template>
  <div class="container">
    <h1 class="header">Insert your poll Code</h1>
    <input type="text" placeholder="code" class="pollCode" maxlength="4" v-model="code" @keyup.enter="goToRoute('poll')">
    <button class="btn" :class="{'btn__green': isCodeValid, 'btn__green-disabled': !isCodeValid}" :disabled="!isCodeValid" @click="goToRoute('poll')">Join Poll</button>
  </div>
</template>

<script>
export default {
  data () {
    return {
      code: '',
      isCodeValid: false
    }
  },
  methods: {
    goToRoute (route) {
      if (this.isCodeValid) {
        return this.$store.commit('goToRoute', { routeName: route, parameters: { code: this.code } })
      }
    }
  },
  watch: {
    code: function () {
      this.isCodeValid = this.code.length === 4
    }
  }
}
</script>

<style lang="scss">
@import "@/styles/components/answer/_pollCode.scss";
</style>
