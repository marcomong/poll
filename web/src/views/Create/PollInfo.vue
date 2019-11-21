<template>
  <div class="pollInfo">
    <h1 class="pollInfo__header">Save and share the poll!</h1>
    <div class="pollInfo__section">
      <div class="pollInfo__section__title">
        Link
      </div>
      <div class="pollInfo__section__content">
        <div class="pollInfo__section__content__value">
          <a href="http://localhost:8080/answer/poll">http://localhost:8080/answer/poll</a>
        </div>
        <button class="btn btn__green btn-small">copy</button>
      </div>
    </div>
    <div class="pollInfo__section">
      <div class="pollInfo__section__title">
        Code
      </div>
      <div class="pollInfo__section__content">
        <div class="pollInfo__section__content__value">
          1234
        </div>
        <button class="btn btn__green btn-small">copy</button>
      </div>
    </div>
    <div class="pollInfo__section">
      <div class="pollInfo__section__title">
        Results
      </div>
      <div class="pollInfo__section__content">
        <div class="pollInfo__section__content__value">
          <a href="https://votazio.com/pollResults/1234">https://votazio.com/pollResults/1234</a>
        </div>
        <button class="btn btn__green btn-small">copy</button>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
@import "@/styles/components/create/_pollInfo.scss";
</style>
