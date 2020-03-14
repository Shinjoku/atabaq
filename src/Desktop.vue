<template>
  <div id="desktop">
    <h1>Here's a window o/</h1>
    <window width="500px" height="250px">
      what're ya talking about
    </window>
    <!-- <icon-grid />
    <taskbar /> -->
  </div>
</template>

<script>
import Window from './components/core/window';

export default {
  components: { Window }
}
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
.color--danger { color: red; }
</style>
