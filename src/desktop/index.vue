<template>
  <div id="desktop" @contextmenu.prevent="openContextMenu">
    <icon-grid @open="openProgram($event)" />
    <taskbar 
      :fixedPrograms="[{ name: 'Example', content: 'Something cool' }]"
      :openPrograms="windows" 
      @start="openProgram($event)"
      @open="toggleProgram($event)"
    />
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
      :open="window.open"
      @minimize="minimizeProgram(idx)"
      @close="closeProgram(idx)"
    >
      {{ window.content }}
    </window>
  </div>
</template>

<script>
import Window from "../core/window";
import ContextMenu from "../core/context-menu";
import Taskbar from '../core/taskbar';
import IconGrid from './icon-grid';

export default {
  components: { Window, ContextMenu, IconGrid, Taskbar },
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
      { 
        name: "Window #1", 
        width: 500, 
        height: 250, 
        maximized: false, 
        open: true,
        content: "what hell yea what" 
      }
    ]
  }),
  methods: {
    setToggleMenuFn(fn) {
      this.openContextMenu = fn;
    },
    closeProgram(idx){
      this.windows.splice(idx, 1);
    },
    openProgram(programInfo){
      this.windows.push({ ...programInfo, open: true });
    },
    /* Here Vue needs to react to a change in an object inside an array, which is one level deeper
      than expected (root-level is expected, like updating the whole array element). 
      Because of that, we need to explicitly specify that change via the `$set` function of the 
      Vue instance. */
    minimizeProgram(idx){
      this.$set(this.windows[idx], 'open', false)
    },
    toggleProgram(idx){
      const programRef = this.windows[idx];
      this.$set(programRef, "open", !programRef.open);
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
