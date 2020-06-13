<template>
  <div 
    class="window" 
    :class="{ 'window--maximized': !!maximized, 'window--floating': !!floating }"
    :style="`width: ${w}px; height: ${h}px;`"
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
      <button type="button" class="top left xy-handler" @mousedown="resize($event)"></button>
      <button type="button" class="top right xy-handler" @mousedown="resize($event)"></button>
      <button type="button" class="bottom left xy-handler" @mousedown="resize($event)"></button>
      <button type="button" class="bottom right xy-handler" @mousedown="resize($event)"></button>
      <button type="button" class="top y-handler" @mousedown="resize($event)"></button>
      <button type="button" class="bottom y-handler" @mousedown="resize($event)"></button>
      <button type="button" class="left x-handler" @mousedown="resize($event)"></button>
      <button type="button" class="right x-handler" @mousedown="resize($event)"></button>
    </div>
    <slot />
  </div>
</template>

<script>
export default {
  props: {
    maximized: Boolean,
    floating: Boolean,
    width: Number,
    height: Number
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
    },
    resize(e){

      /**
       * This is the main function for the resizing logic needed for the window component.
       * It was based on this Medium article from Nguyễn Việt Hưng:
       * https://medium.com/the-z/making-a-resizable-div-in-js-is-not-easy-as-you-think-bda19a1bc53d
       * There's a lot of interesting insights about how to add this sort of feature into a div :D
      */

      const resizer = e.target;
      let _this = this;

      window.addEventListener('mousemove', _resize);
      window.addEventListener('mouseup', stopResize);

      function _resize(e){
        resizer.is = names => {
          const classes = names.split(" ");

          function reducer(containsAll, currentClass){
            return containsAll && resizer.classList.contains(currentClass);
          }

          return classes.reduce(reducer, true);

        }

        const rect = _this.$el.getBoundingClientRect();

        if (resizer.is("x-handler") || resizer.is("xy-handler")){
          if (resizer.is("left"))
            _this.w = rect.right - e.pageX;
          else // right
            _this.w = e.pageX - rect.left;
        }

        if (resizer.is("y-handler") || resizer.is("xy-handler")){
          if (resizer.is("top"))
            _this.h = rect.bottom - e.pageY;
          else // bottom
            _this.h = e.pageY - rect.top;
        }

      }

      function stopResize(){
        window.removeEventListener('mousemove', _resize);
        window.removeEventListener('mouseup', stopResize);
      }
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

  min-width: 200px
  min-height: 100px

  max-width: 100vw
  max-height: 100vh

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