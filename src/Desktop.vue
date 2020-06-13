<template>
  <div id="desktop" @contextmenu.prevent="openContextMenu">
    <context-menu
      ref="context-menu"
      :options="contextMenuOptions"
      @ready="setToggleMenuFn"
    />
    <window 
      v-for="(window, idx) in windows" 
      :key="'window-' + window.name"
      :title="window.name"
      :width="window.width"
      :height="window.height"
      :maximized="window.maximized"
      @close="closeWindow(idx)"
    >
      what're ya talking about
    </window>
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
    openContextMenu: null,
    windows: [
      { name: "Window #1", width: 500, height: 250, maximized: false }
    ]
  }),
  methods: {
    setToggleMenuFn(fn) {
      this.openContextMenu = fn;
    },
    closeWindow(idx){
      this.windows.splice(idx, 1);
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
