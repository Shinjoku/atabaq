<template>
  <div id="tile-view">
    <p class="tile-setting">{{rows}}x{{cols}}</p>
    <p class="dev">[implementation still being figured out]</p>
    <div v-for="r in rows" :key="'row-' + r" class="row">
      <div v-for="c in cols" :key="'col-' + c" class="col">
        <window :open="true" :title="'Mock #'+ ((r-1) * cols + c)" width="100%">
          Content! :D
        </window>
      </div>
    </div>
  </div>
</template>

<script>
import Window from './window';

export default {
  components: { Window },
  props: {
    rows: Number,
    cols: Number
  }
}
</script>

<style lang="sass" scoped>
  #tile-view
    text-align: center

    .tile-setting
      font-size: 4em
    .dev
      font-size: .8em
      margin-bottom: 2em

    .row
      display: flex

    .col
      flex-grow: 1
      margin: 4px
      padding: 1em
      background: red

      .window
        position: static
        margin: 0 auto
        width: 100%
    
</style>