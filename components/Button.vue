<template>
  <button class="btn" :style="{backgroundColor: color}" @click="toggleAddTask">
   {{text}}
  </button>
</template>

<script>
export default {
  name:'Button',
  props:['text','color'],
  methods:{
    toggleAddTask(){
      this.$emit('toggle')
    }
  }
}
</script>