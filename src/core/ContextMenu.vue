<template>
  <ul
    id="context-menu"
    tabindex="-1"
    v-show="open"
    @blur="$emit('close')"
    :style="`top: ${top}; left: ${left};`"
  >
    <li 
      v-for="(option, index) in options"
      :key="'context-menu-opt' + index"
      @click="option.callback"
    >
      {{option.description}}
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    open: Boolean,
    top: String,
    left: String,
    options: Array
  }
};
</script>

<style scoped>

#context-menu {
  background: #4b4b4bb3;
  backdrop-filter: blur(.8);
  border: 1px solid #bdbdbd;
  box-shadow: 
    0 2px 2px 0     rgba(0, 0, 0, 0.14),
    0 3px 1px -2px  rgba(0, 0, 0, 0.2),
    0 1px 5px 0     rgba(0, 0, 0, 0.12);
  display: block;
  list-style: none;
  margin: 0;
  padding: 0;
  position: absolute;
  /* width: 250px; */
  transform: translateY(8px);
  opacity: 0;
  z-index: 2;
  transition: transform 0.2s, opacity .2s;
}

#context-menu:focus {
  opacity: 1;
  transform: translateY(0);
}

#context-menu li {
  border-bottom: 1px solid #e0e0e0;
  margin: 0;
  padding: 5px 35px;
  transition: 0.4s;
}

#context-menu li:last-child {
  border-bottom: none;
}

#context-menu li:hover {
  background: #1e88e570;
  color: #fafafa;
  transition: 0.4s;
}
</style>