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
    <Result
      v-if="resultOpen"
      v-bind:highScores="highScores"
      v-bind:player="winner"
      v-on:restart="toLobby" />
  </div>

</template>

<script>
import maze from '../helpers/maze';
import Result from './Result.vue';
import { mapGetters } from 'vuex';
import io from 'socket.io-client';
const socket = io('https://enigmatic-escarpment-45133.herokuapp.com/')

export default {
  name: "Game",
  components: {
    Result,
  },
  data(){
    return {
      maze:null,
      player:null,
      destination:null,
      step:0,
      hasUsedSP:false,
      score:1000,
      resultOpen:false,
      winner:{},  
      highScores:localStorage.scores ? JSON.parse(localStorage.scores) : []
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
    
    finish(winner, id) {
      this.highScores.push({
        name: winner.player,
        score: winner.score
      });
      this.highScores.sort((a, b) => b.score - a.score);
      this.highScores = this.highScores.slice(0, 5);
      localStorage.scores = JSON.stringify(this.highScores);
      this.resultOpen = true;
      var audio_goal=new Audio('/sounds/goal.mp3');
      audio_goal.play();
      var obj={
        id:this.getCurrentRoom,
        winner:winner
      }
      if (!id) {
        socket.emit('set-winner',obj);
      } 

    },
    restart() {
      // this.maze=_maze;
      this.player=maze.generatePlayer('&#128561',maze.P_1);
      this.destination=maze.generatePlayer('&#128536',maze.D);
      this.step = 0;
      this.score = 1000;
      this.resultOpen = false;
      this.hasUsedSP=false;
    },
    toLobby(){
      this.$router.push('/lobby')
    },
    onKeyUp(e){
      if (this.resultOpen) return;

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
        this.score = 1000 - this.step;
        if (this.player.pos.i === this.destination.pos.i && this.player.pos.j === this.destination.pos.j) {
          this.winner={
            player:this.getCurrentPlayer,
            score:this.score
          }
          this.finish(this.winner);
        }
      }
    },

    makeSP(){
      if(this.hasUsedSP)
        return;

      var sp=maze.getShortestPath(this.destination.pos,this.player.pos,this.maze);

      for(var i=0;i<sp.length;i++){
        var s=sp[i];
        var curr_maze=this.maze[s.i][s.j];
        curr_maze.styles['background-color']='yellow';
      }
      this.hasUsedSP=true;
    }
      
  },
  created(){
    socket.emit('join', this.getCurrentRoom)

    this.maze=this.getMaze;
    // var pos=Number(this.$rou te.id);
    this.player=maze.generatePlayer('&#128561',maze.P_1);
    this.destination=maze.generatePlayer('&#128536',maze.D);
    var self=this;
    socket.on('get-winner',(winner)=>{
      console.log('Get winner',winner);
      self.finish(winner, socket.id);
    })
    window.finish=this.finish;
  },
  mounted(){
    document.onkeyup=this.onKeyUp;
    document.body.style.overflow='hidden';
  },
  computed: mapGetters(['getMaze','getCurrentPlayer','getCurrentRoom']),
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