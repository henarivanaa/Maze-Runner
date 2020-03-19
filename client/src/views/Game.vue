<template>
  <div>
    <div id="game" class="game-container">
      <div v-for="(m,index) in maze" class="maze-row" :key="index">
          <div v-html="occupiedPos(n)" v-for="(n,index2) in m" :style="n.styles" :key="index2">
          </div>
      </div>
    </div>
    <div class="game-container mt-min-vh">
      <div class="row">
        <div class="col-4">
          <h2>Number Step: {{step}}</h2>
        </div>
        <div class="col-4">
          <button class="btn btn-success mt-2" v-if="step>=50 && !hasUsedSP " @click="makeSP">Make Shortest Path</button>
        </div>
      </div>

    </div>
  </div>

</template>

<script>
import maze from '../helpers/maze';

export default {
  name: "Game",
  data(){
    return {
      maze:null,
      player:null,
      destination:null,
      step:0,
      hasUsedSP:false
    }
  },
  methods:{
    occupiedPos(n){
      
      if(n.i===this.player.pos.i && n.j===this.player.pos.j ){
        return this.player.char;
      }
      else if(n.i===this.destination.pos.i && n.j===this.destination.pos.j){
        return this.destination.char;
      }
      return null;
    },
    
    onKeyUp(e){

      var code=e.key;
      var n=this.maze[this.player.pos.i][this.player.pos.j];
      var validD=false;

      switch(code){
        case 'ArrowUp':
          if(n.direction.up){
            this.player.pos.i!==0?this.player.pos.i--:null
            this.step++;
            validD=true;
          }
          break;
        case 'ArrowDown':
          if(n.direction.down){
            this.player.pos.i!==maze.num_row-1?this.player.pos.i++:null
            this.step++;
             validD=true;
          }
        break;
        case 'ArrowLeft':
          if(n.direction.left){
            this.player.pos.j!==0?this.player.pos.j--:null
            this.step++;
             validD=true;
          }
        break;
        case 'ArrowRight':
          if(n.direction.right){
            this.player.pos.j!==maze.num_col-1?this.player.pos.j++:null
            this.step++;
            validD=true;
          }
        break;
      }

      if(validD){
        if(n.isSP){
          n.styles['background-color']='lightgrey';
        }
      }
    },

    makeSP(){
      if(this.hasUsedSP)
        return;

      var sp=maze.getShortestPath(this.destination.pos,this.player.pos,this.maze);

      for(var i=0;i<Math.floor(sp.length/2);i++){
        var s=sp[i];
        var curr_maze=this.maze[s.i][s.j];
        curr_maze.styles['background-color']='yellow';
      }
      this.hasUsedSP=true;
    }
  },
  created(){
    var _maze=maze.make()
    this.maze=_maze;
    this.player=maze.generatePlayer('&#128561',maze.P_1);
    this.destination=maze.generatePlayer('&#128536',maze.D);
  },
  mounted(){
    document.onkeyup=this.onKeyUp;
    document.body.style.overflow='hidden';
  }
}
</script>

<style>
  .maze-row{
    width:100%;
    display:flex;
  }

  .game-container{
     width: 1200px;
     margin-left: 10%;
  }

  .mt-min-vh{
    margin-top: -0.2vh
  }

</style>