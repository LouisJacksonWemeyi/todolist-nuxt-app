<template>
<div class="header">
  <h1>{{title}}</h1>
  <Button v-if="$route.path=='/'" :color="this.$store.state.showAdd?'red':'green'" :text="this.$store.state.showAdd?'Close':'Add'" @toggle="showAddTask"/>
</div>  
</template>

<script>
import Button from './Button.vue'
export default {
  name: 'TheHeader',
  components:{Button},
  data() {
    return {
      title:'To do List',
    }
  },
  methods:{
    showAddTask() {
      this.$store.commit('toggle')
      console.log(this.$store.state.showAdd)
    },
  }

}
</script>
