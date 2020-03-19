<template>
    <div class="result">
        <audio src="/sounds/goal.mp3" autoplay></audio>
        <h1>You Win</h1>
        <h1>{{ time }}</h1>
        <div v-for="(player, index) in players" v-bind:key="player.name"
            class="px-3">
            <div v-if="index === 0" class="row">
                <div class="col">
                    <h2>{{ player.name }}</h2>
                </div>
                <div class="col">
                    <h2 class="text-right">{{ player.score }}</h2>
                </div>
            </div>
            <div v-else class="row">
                <div class="col">
                    <h3>{{ player.name }}</h3>
                </div>
                <div class="col">
                    <h3 class="text-right">{{ player.score }}</h3>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
//import axios from 'axios';

export default {
  name: 'Result',
  data() {
    return {
      players: [
        { name: "Player1", score: 100 },
        { name: "Player2", score: 97 },
        { name: "Player3", score: 80 },
      ],
      time: "13:15",
    };
  },
  //props: ["players", "time"],
  methods: {

  },
};
</script>

<style scoped>
.result {
    border: solid 10px rgba(180, 180, 180, 0.8);
    background: rgba(255, 255, 255, 0.8);
    position: fixed;
    width: 400px;
    height: 400px;
    left: 50%;
    margin-left: -200px;
    top: 100px;
    font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
}
h1 {
    text-align: center;
}
h2 {
    animation: bounce-in 1.1s linear 0s infinite;
}
@keyframes bounce-in {
    0% {
        transform: translateY(-3px);
    }
    40% {
        transform: translateY(10px);
        animation-timing-function: ease-out;
    }
    50% {
        transform: translateY(15px) scaleY(0.7);
    }
    60% {
        transform: translateY(10px);
    }
    100% {
        transform: translateY(-3px);
        animation-timing-function: ease-in;
    }
}
</style>