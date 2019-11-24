<template>
  <div class="appContainer">
    <Header v-if="this.$route.name != 'home'"></Header>
    <router-view/>
  </div>
</template>

<script>
import Header from '@/components/Header.vue'
const Fingerprint2 = require('fingerprintjs2')

export default {
  data () {
    return {
      fingerprint: '',
      fpComponents: [],
      fpOptions: {
        excludeAdBlock: true
      }
    }
  },
  components: {
    Header
  },
  methods: {
    fetchFingerprint () {
      var self = this
      if (window.requestIdleCallback) {
        requestIdleCallback(function () {
          Fingerprint2.getV18(function (result, components) {
            self.fingerprint = result
            self.setFingerPrint()
            // console.log(components) // an array of components: {key: ..., value: ...}
          })
        })
      } else {
        setTimeout(function () {
          Fingerprint2.getV18(function (result, components) {
            self.fingerprint = result
            self.setFingerPrint()
            // console.log(components) // an array of components: {key: ..., value: ...}
          })
        }, 500)
      }
    },
    setFingerPrint () {
      this.$store.commit('setFingerPrint', this.fingerprint)
    }
  },
  mounted () {
    this.fetchFingerprint()
  }
}
</script>
