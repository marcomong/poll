<template>
  <div class="answer">
    <img v-if="isEditing && this.value.id > 2" src="@/assets/close.svg" alt="remove answer" class="answer__closeBtn" @click="deleteAnswer()">
    <div class="answer__radio" :class="{'answer__radio-selected': value.selected}"></div>
    <div v-if="!isEditing" class="answer__content" :class="{'answer__content-selected': value.selected}">{{value.value}}</div>
    <input v-else type="text" class="answer__content answer__content--input" placeholder="Answer" @keyup="$emit('update:value', value);" v-model="value.value">
  </div>
</template>

<script>
export default {
  props: ['value', 'isEditing'],
  methods: {
    deleteAnswer () {
      this.$parent.deleteAnswer(this.value)
    }
  }
}
</script>

<style lang="scss">
@import "@/styles/components/_answerRadio.scss";
</style>
