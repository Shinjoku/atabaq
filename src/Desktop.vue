<template>
  <div id="desktop" @contextmenu.prevent="openMenu">
    <context-menu
      ref="context-menu"
      :open="contextMenu.isOpen"
      :top="contextMenu.top + 'px'"
      :left="contextMenu.left + 'px'"
      :options="contextMenu.options"
      @close="closeMenu"
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
      ]
    }
  }),
  methods: {
    setMenu(top, left) {

      const menu = this.$refs["context-menu"].$el;

      let largestHeight = window.innerHeight - menu.offsetHeight - 15;
      let largestWidth = window.innerWidth - menu.offsetWidth - 15;

      if (top > largestHeight) top = largestHeight;

      if (left > largestWidth) left = largestWidth;

      this.contextMenu.top = top;
      this.contextMenu.left = left;
    },

    closeMenu() {
      setTimeout(() => {
        this.contextMenu.isOpen = false;
      }, 200);
    },

    openMenu(e) {

      const menu = this.$refs["context-menu"];

      this.contextMenu.isOpen = true;

      this.$nextTick(() => {
        this.setMenu(e.y, e.x);
        menu.$el.focus();
      });
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
