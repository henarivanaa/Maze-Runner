<template>
  <div id="game">
    <div v-for="(m,index) in maze" class="maze-row" :key="index">
        <div v-for="(n,index2) in m" :style="n.styles" :key="index2"></div>
    </div>
  </div>
</template>

<script>
import maze from '../helpers/maze';

export default {
  name: "Game",
  data(){
    return {
      maze:null
    }
  },
  methods:{
  },
  mounted(){
    var _maze=maze.make()
    this.maze=_maze
    
  }
}
</script>

<style>
  .maze-row{
    width:100%;
    display:flex;
  }

  #game{
    width: 1200px;
    margin-left: 10%;
    height: 684px;
  }

</style>