<template>
  <div
      :class="reminder?'task reminder':'task'"
    >
      <h3>
        {{task}}
      </h3>
      <p>{{dayAndTime}}</p>
        <span class="pill"
          :style="{backgroundColor: 'red', cursor: 'pointer'}"
          @click="$emit('on-delete',id)">delete
        </span>
        <span class="pill"
          :style="{backgroundColor: 'green', cursor: 'pointer'}"
          @click="$emit('on-update',{task,dayAndTime,reminder,id})">update
        </span>
    </div>
</template>

<script>
export default {
name:'Task',
props:['task','dayAndTime','reminder','id'],
}
</script>

