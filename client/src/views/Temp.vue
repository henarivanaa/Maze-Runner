<template>
    <div>
        <button type="button" v-on:click="showResult">Show result</button>
        <Result v-if="resultOpen" />
    </div>
</template>

<script>
import Result from './Result.vue';

export default {
    name: 'Temp',
    components: {
        Result,
    },
    data() {
        return {
            resultOpen: false,
        };
    },
    methods: {
        showResult() {
            this.resultOpen = true;
        },
    },
};
</script>