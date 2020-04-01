<template>
  <div>
    <grid-item v-for="(gridItem, i) in itemsList" :key="i" :index="i" />
  </div>
</template>

<script>
export default {
  props: {
    width: Number,
    height: Number
  },
  data() {
    let iconCount = (this.width * this.height - itemArea) / itemSize ** 2;

    return {
      grid: iconList,
      itemsList: getItems()
    };
  }
};
</script>