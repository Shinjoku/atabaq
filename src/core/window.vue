<template>
  <div 
    class="window" 
    :class="{ 'window--maximized': !!maximized, 'window--floating': !!floating }"
    :style="`width: ${w}; height: ${h};`"
  >
    <div class="window-action-container">
      <button type="button" @click.stop="open=false; $emit('minimize')">
        <i class="fas fa-minus"></i>
      </button>
      <button type="button" @click.stop="toggleMaximize()">
        <i class="far fa-square"></i>
      </button>
      <button type="button" @click.stop="$emit('close')">
        <i class="fas fa-times color--danger"></i>
      </button>
    </div>
    <slot />
  </div>
</template>

<script>
export default {
  props: {
    maximized: Boolean,
    floating: Boolean,
    width: String,
    height: String
  },
  data(){
    return { 
      open: true,
      isMaximized: this.maximized || false,
      w: this.width,
      h: this.height
    };
  },
  methods: {
    toggleMaximize(){
      this.isMaximized = !this.isMaximized;

      // TODO: handle changes in dimensions based on this.isMaximized

      this.$emit("maximize");
    }
  }
}
</script>

<style scoped lang="sass">

.window
  display: block
  background-color: #4b4b4b
  resize: both
  overflow: auto

  .window-action-container
    background-color: #2b2b2b
    text-align: right

  button
    all: unset
    padding: .1em .5em
    color: #e2e2e2
    &:hover
      background-color: #3b3b3b
      color: #ff6a6a
</style>