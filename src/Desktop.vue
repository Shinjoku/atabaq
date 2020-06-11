<template>
  <div id="desktop" @contextmenu.prevent="openContextMenu">
    <context-menu
      ref="context-menu"
      :options="contextMenuOptions"
      @ready="setToggleMenuFn"
    />
    <h1>Here's a window o/</h1>
    <window :width="500" :height="250">what're ya talking about</window>
    <!-- <icon-grid /> -->
    <!-- <taskbar /> -->
  </div>
</template>

<script>
import Window from "./core/window";
import ContextMenu from "./core/ContextMenu";

export default {
  components: { Window, ContextMenu },
  data: () => ({
    contextMenuOptions: [
      {
        description: "Show Icon Grid",
        callback: () => {
          console.log("Opens the craziest icon grid ever!");
        }
      },
      {
        description: "Change Wallpaper...",
        callback: () => {
          console.log("Opens the laziest wallpaper window!");
        }
      }
    ],
    openContextMenu: null 
  }),
  methods: {
    setToggleMenuFn(fn) {
      this.openContextMenu = fn;
    }
  }
};
</script>

<style lang="sass">

  #desktop
    display: flex
    background-color: lightblue
    width: 100%
    flex-direction: column
    justify-content: center
    align-items: center

  .color--danger
    color: red

</style>
