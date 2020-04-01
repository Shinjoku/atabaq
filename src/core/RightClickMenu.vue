<template>
  <ul
    id="right-click-menu"
    tabindex="-1"
    v-show="open"
    @blur="$emit('close')"
    :style="`top: ${top}; left: ${left};`"
  >
    <li>Change the world</li>
    <li>Create something new</li>
  </ul>
</template>

<script>
export default {
  props: {
    open: Boolean,
    top: String,
    left: String
  }
};
</script>

<style scoped>
#right-click-menu {
  background: #4b4b4bb3;
  backdrop-filter: blur(.8);
  border: 1px solid #bdbdbd;
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.2),
    0 1px 5px 0 rgba(0, 0, 0, 0.12);
  display: block;
  list-style: none;
  margin: 0;
  padding: 0;
  position: absolute;
  /* width: 250px; */
  z-index: 2;
}

#right-click-menu li {
  border-bottom: 1px solid #e0e0e0;
  margin: 0;
  padding: 5px 35px;
}

#right-click-menu li:last-child {
  border-bottom: none;
}

#right-click-menu li:hover {
  background: #1e88e570;
  color: #fafafa;
}
</style>