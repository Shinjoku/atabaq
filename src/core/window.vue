<template>
  <div 
    class="window" 
    :class="{ 
      'window--maximized': !!isMaximized, 
      'window--floating': !!floating, 
      'animate-resize': !!animateResize
    }"
    :style="!isMaximized ? `width: ${w}px; height: ${h}px;` : ''"
  >
    <div class="window-action-bar">
      <p class="title">{{ title }}</p>
      <p class="action-btn-container">
        <button type="button" @click.stop="open=false; $emit('minimize')">
          <i class="fas fa-minus"></i>
        </button>
        <button type="button" @click.stop="isMaximized = !isMaximized">
          <i :class="isMaximized ? 'fas fa-compress' : 'far fa-square'"></i>
        </button>
        <button type="button" @click.stop="$emit('close')">
          <i class="fas fa-times color--danger"></i>
        </button>
      </p>
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
const minWidth = 250;
const minHeight = 100;

export default {
  props: {
    maximized: {
      type: Boolean,
      default: false
    },
    floating: Boolean,
    width: {
      type: Number,
      default: minWidth
    },
    height: {
      type: Number,
      default: minHeight
    },
    title: String
  },
  data(){
    return { 
      open: true,
      isMaximized: this.maximized,
      w: this.width,
      h: this.height,
      // controls whether width or height should be animated (it shouldn't during manual resize)
      animateResize: true
    };
  },
  methods: {
    resize(e){

      /**
       * This is the main function for the resizing logic needed for the window component.
       * It was based on this Medium article from Nguyễn Việt Hưng:
       * https://medium.com/the-z/making-a-resizable-div-in-js-is-not-easy-as-you-think-bda19a1bc53d
       * There's a lot of interesting insights about how to add this sort of feature into a div :D
      */

      const resizer = e.target;
      let _this = this;

      _this.animateResize = false;

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
        let w, h;

        if (resizer.is("x-handler") || resizer.is("xy-handler")){
          if (resizer.is("left"))
            w = rect.right - e.pageX;
          else // right
            w = e.pageX - rect.left;
        }

        if (resizer.is("y-handler") || resizer.is("xy-handler")){
          if (resizer.is("top"))
            h = rect.bottom - e.pageY;
          else // bottom
            h = e.pageY - rect.top;
        }

        _this.w = w > minWidth ? w : minWidth;
        _this.h = h > minHeight ? h : minHeight;

      }

      function stopResize(){
        window.removeEventListener('mousemove', _resize);
        window.removeEventListener('mouseup', stopResize);
        _this.animateResize = true;
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
  background-color: var(--background-grey)
  overflow: auto

  max-width: 100vw
  max-height: 100vh

  &.animate-resize
    transition: width .4s, height .4s

  &.window--maximized
    width: 100vw
    height: 100vh

  .window-action-bar
    display: flex
    justify-content: space-between
    background-color: var(--primary-grey)
    color: #e2e2e2

    .title
      margin-left: 8px

    .action-btn-container
      text-align: right
    
      button
        all: unset
        padding: .1em .5em
        &:hover
          background-color: var(--secondary-grey)
          color: var(--hovered-icon)

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