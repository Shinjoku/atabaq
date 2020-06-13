<template>
  <div id="taskbar">
    <button 
      type="button"
      class="fixed program"
      v-for="program in fixedPrograms"
      :key="'fixed-program-'+program.name.replace(/\s/g, '_')"
      @click="$emit('start', program)"
    >
      <span class="image"></span>
    </button>
    <button 
      type="button"
      class="open program"
      v-for="program in openPrograms"
      :key="'open-program-'+program.name.replace(/\s/g, '_')"
      @click="$emit('open', program)"
    >
      <span class="image"></span>
    </button>
  </div>
</template>
<script>
export default {
  props: {
    fixedPrograms: Array,
    openPrograms: Array
  }
}
</script>

<style lang="sass" scoped>
  #taskbar
    display: flex
    position: fixed
    background: var(--primary-grey)
    bottom: 0
    width: 100vw
    height: var(--taskbar-height)

    button.program 
      all: unset
      box-sizing: border-box
      position: relative
      padding: 0 1em
      margin: 0 1px
      
      &:hover
        background: #0f0f0f

      /* 
        Getting a little fancy here to be able to make the bottom border of the open programs
        on the taskbar be curved inwards on the edges. For that, instead of just using border-bottom
        on the button.program.open elements, an ::after pseudoelement is being used at the bottom of
        the element. It's like a lil' new fully-featured element on the inside of the original =D */
      &.open::after
        display: block
        background: var(--background)
        content: ''

        position: absolute
        border-radius: 4px 4px 0 0
        left: 0
        bottom: 0
        width: 100% 
        height: 4px

      .image
        display: block
        background: var(--background-grey)
        width: 1.5em
        height: 1.5em
</style>