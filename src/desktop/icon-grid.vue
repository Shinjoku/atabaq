<template>
  <div class="icon-grid">
    <button 
      class="shortcut" 
      v-for="(shortcut, i) in shortcuts" 
      :key="'shortcut-'+i"
      @click="$emit('open', shortcut)"
    >
      <p class="image"></p>
      <p class="title">{{shortcut.name}}</p>
    </button>
  </div>
</template>

<script>
export default {
  data() {
    // let iconCount = (this.width * this.height - itemArea) / itemSize ** 2;

    return {
      shortcuts: [
        { name: "Window #2", content: "Content!" }
      ]
    };
  }
};
</script>

<style lang="sass" scoped>
  .icon-grid
    position: fixed
    top: 0
    left: 0
    width: 100vw
    height: 100vh

    button.shortcut 
      all: unset
      display: inline-block
      margin: 1em
      cursor: pointer
      
      &:hover
        .image
          background: #2b2b2b
        .title
          color: #004fff
      
      .image
        margin: 10px auto
        width: 80px
        height: 80px
        background: #1b1b1b
</style>