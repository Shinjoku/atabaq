<template>
  <div id="tile-manager">
    <div class="modal" :class="{ 'open': !!open }">
      <button type="button" class="close-btn" @click="open = false" title="Close tile manager">
        <i class="fas fa-times"></i>
      </button>
      <div class="content">
        <button 
          type="button" 
          class="tile-choice"
          v-for="tile in tiles"
          :key="tile.name"
          :class="{ 'active': activeTile.name === tile.name }"
          @click="selectTile(tile)"
        >
          {{ tile.name }}
        </button>
      </div>
    </div>
    <button type="button" class="open-btn" @click="open = !open" title="Open window tileset manager">
      <i class="fas fa-th-large"></i>
    </button>
  </div>
</template>

<script>
export default {
  props: {
    activeTile: Object
  },
  data: () => ({
    open: false,
    tiles: [
      { rows: 2, cols: 3, name: "2x3" },
      { rows: 4, cols: 5, name: "4x5" },
      { rows: 1, cols: 2, name: "1x2" }
    ]
  }),
  methods: {
    selectTile(set){

      this.open = false;

      const { rows, cols } = this.activeTile;

      if (set.rows === rows && set.cols === cols)
        this.$emit("clear-tile");
      else
        this.$emit("set-tile", set);
    }
  }
}
</script>

<style lang="sass" scoped>
  #tile-manager
    position: fixed
    bottom: var(--taskbar-height)
    padding: 8px
    z-index: 1

    button
      cursor: pointer
      background: none
      border: none
      color: var(--primary-grey)
      font-size: 1.3em
      &:hover
        color: #2FCBC1

    .modal
      position: relative
      display: flex
      background: var(--background-grey)
      // padding: 1em
      margin-bottom: 1em
      min-width: 10vw

      transform: translateY(1em)
      opacity: 0
      transition: transform .2s, opacity .2s

      &.open
        transform: translateY(0)
        opacity: 1

      .close-btn
        position: absolute
        top:0
        right: 0
        padding: 8px
      
      .content
        margin-top: 1.5em
        padding: 1em

        .tile-choice
          padding: 4px 8px
          margin: 0 2px
          background: #2FCBC1
          color: #1e1e1e
          transition: background .3s, color .3s

          &:hover, &.active
            background: #60007B
            color: #e2e2e2
        
</style>