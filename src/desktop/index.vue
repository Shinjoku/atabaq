<template>
  <div id="desktop" @contextmenu.prevent="openContextMenu">
    <icon-grid @open="openProgram($event)" />
    <context-menu
      ref="context-menu"
      :options="contextMenuOptions"
      @ready="setToggleMenuFn"
    />
    <window 
      v-for="(window, idx) in windows" 
      :key="'window-' + window.name.replace(/\s/g, '_')"
      :title="window.name"
      :width="window.width"
      :height="window.height"
      :maximized="window.maximized"
      @close="closeWindow(idx)"
    >
      {{ window.content }}
    </window>
    <!-- <taskbar /> -->
  </div>
</template>

<script>
import Window from "../core/window";
import ContextMenu from "../core/context-menu";
import IconGrid from './icon-grid';

export default {
  components: { Window, ContextMenu, IconGrid },
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
      { name: "Window #1", width: 500, height: 250, maximized: false, content: "what hell yea what" }
    ]
  }),
  methods: {
    setToggleMenuFn(fn) {
      this.openContextMenu = fn;
    },
    closeWindow(idx){
      this.windows.splice(idx, 1);
    },
    openProgram(programInfo){
      this.windows.push(programInfo);
    }
  }
};
</script>

<style lang="sass">

  #desktop
    display: flex
    background-color: var(--background)
    width: 100%
    min-height: 100vh
    flex-direction: column
    justify-content: center
    align-items: center

  .color--danger
    color: var(--attention-red)

</style>
