<template>
  <ul
    ref="menu"
    tabindex="-1"
    id="context-menu"
    v-show="open"
    @blur="closeMenu"
    @click="forceFocusLoss"
    :style="`top: ${top + 'px'}; left: ${left + 'px'};`"
  >
    <li
      v-for="(option, index) in options"
      :key="'context-menu-opt' + index"
      @click="option.callback"
    >{{ option.description }}</li>
  </ul>
</template>

<script>
export default {
  props: { options: Array },
  data: () => ({
    open: false,
    top: 0,
    left: 0,
    _exitTimeout: null
  }),
  mounted() {
    this.$emit("ready", this.openMenu);
  },
  methods: {
    setMenu(top, left) {
      const menu = this.$refs.menu;

      let largestHeight = window.innerHeight - menu.offsetHeight - 15;
      let largestWidth = window.innerWidth - menu.offsetWidth - 15;

      if (top > largestHeight) top = largestHeight;

      if (left > largestWidth) left = largestWidth;

      this.top = top;
      this.left = left;
    },

    closeMenu() {
      this._exitTimeout = setTimeout(() => this.open = false, 200);
    },

    forceFocusLoss(){
      this.$refs.menu.blur();
    },

    openMenu(e) {

      if (this._exitTimeout){
        clearTimeout(this._exitTimeout);
        this._exitTimeout = null;
      }

      this.open = true;

      this.$nextTick(() => {
        this.setMenu(e.y, e.x);
        this.$refs.menu.focus();
      });

    }
  }
};
</script>

<style scoped lang="sass">

#context-menu
  background: #4b4b4bb3
  backdrop-filter: blur(0.8)
  border: 1px solid #bdbdbd
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 1px 5px 0 rgba(0, 0, 0, 0.12)
  display: block
  list-style: none
  margin: 0
  padding: 0
  position: absolute
  /* width: 250px */
  transform: translateY(8px)
  opacity: 0
  z-index: 2
  transition: transform 0.2s, opacity 0.2s
  &:focus
    opacity: 1
    transform: translateY(0)
  li
    border-bottom: 1px solid #e0e0e0
    margin: 0
    padding: 5px 35px
    transition: 0.4s
    &:last-child
      border-bottom: none
    &:hover
      background: #1e88e570
      color: #fafafa
      transition: 0.4s
</style>