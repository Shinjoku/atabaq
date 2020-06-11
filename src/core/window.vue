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
    <div class="window-resize-handlers">
      <button type="button" class="top left xy-handler"></button>
      <button type="button" class="top right xy-handler"></button>
      <button type="button" class="bottom left xy-handler"></button>
      <button type="button" class="bottom right xy-handler"></button>
      <button type="button" class="top y-handler"></button>
      <button type="button" class="bottom y-handler"></button>
      <button type="button" class="left x-handler"></button>
      <button type="button" class="right x-handler"></button>
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

$resize-handler-width: 5px
$resize-handler-height: 5px

.window
  display: block
  position: relative
  background-color: #4b4b4b
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

  .window-resize-handlers
    button
      all: unset
      position: absolute
      background: #e2e2e2
      opacity: 0

      &.top
        top: 0
      &.bottom
        bottom: 0
      &.left
        left: 0
      &.right
        right: 0

      &.y-handler
        box-sizing: border-box

        cursor: ns-resize
        left: $resize-handler-width * 2

        width: calc(100% - #{$resize-handler-width} * 4)
        height: $resize-handler-height
      
      &.x-handler
        box-sizing: border-box

        cursor: ew-resize
        top: $resize-handler-height * 2

        width: $resize-handler-width
        height: calc(100% - #{$resize-handler-height} * 4)

      &.xy-handler
        width: $resize-handler-height
        height: $resize-handler-width
        &.top.right, &.bottom.left
          cursor: nesw-resize
        &.top.left, &.bottom.right
          cursor: nwse-resize
</style>