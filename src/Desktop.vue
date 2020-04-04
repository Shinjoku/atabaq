<template>
  <div id="desktop" @contextmenu.prevent="openContextMenu">
    <context-menu
      ref="context-menu"
      :options="contextMenu.options"
      @ready="setToggleMenuFn"
    />
    <h1>Here's a window o/</h1>
    <window width="500px" height="250px">what're ya talking about</window>
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
    contextMenu: {
      isOpen: false,
      top: 0,
      left: 0,
      options: [
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
    }
  }),
  methods: {
    setToggleMenuFn(fn) {
      this.openContextMenu = fn;
    }
  }
};
</script>

<style>
#desktop {
  display: flex;
  background-color: lightblue;
  width: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.color--danger {
  color: red;
}
</style>
