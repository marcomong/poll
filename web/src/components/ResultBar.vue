<template>
  <div class="result">
    <div class="result__header">
      <div class="result__header-answer">
        {{answer}}
      </div>
      <div class="result__header-percentage">
        {{percentage}}
      </div>
    </div>
    <div class="result__bar">
      <div class="result__bar-back"></div>
      <div class="result__bar-front" :style="{'width': percentage}"></div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['answer', 'percentage']
}
</script>

<style lang="scss">
@import "@/styles/components/_resultBar.scss";
</style>
