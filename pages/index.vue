<template>
  <div>
    <!-- beginnig form for adding single task -->
    <form
      v-if="this.$store.state.showAdd"
      class="add-form"
      @submit="handleSubmit"
    >
      <div class="form-control">
        <label>Task</label>
        <input type="text" placeholder="Add Task" required v-model="task" />
      </div>
      <div class="form-control">
        <label>Day & Time</label>
        <input
          type="text"
          placeholder="Add Day & Time"
          required
          v-model="dayAndTime"
        />
      </div>
      <div class="form-control form-control-check">
        <label>Set Reminder</label>
        <input type="checkbox" v-model="reminder" />
      </div>

      <input
        v-if="!isUpdateTask"
        type="submit"
        value="Save Task"
        class="btn btn-block"
      />
      <input v-else type="submit" value="Save Changes" class="btn btn-block" />
    </form>
    <!-- end form for adding single task -->

    <!-- beginnig code for displaying all tasks -->

    <div v-if="!isUpdateTask">
      <div v-if="allTasks.length >= 1">
        <div v-for="task in allTasks" :key="task.id" class="task">
          <Task
            :task="task.task"
            :dayAndTime="task.dayAndTime"
            :reminder="task.reminder"
            :id="task._id"
            @on-delete="deleteTask"
            @on-update="updateTask"
          />
        </div>
      </div>
      <div v-else>
        <Spinner />
        <div class="center">No resources available . . .</div>
      </div>
    </div>

    <!--     <div v-if="!isUpdateTask">
      <div v-if="this.allTasks.length >= 1">
        <div
          v-for="task in allTasks"
          :key="task._id"
          :class="task.reminder ? 'task reminder' : 'task'"
        >
          <h3>
            {{ task.task }}
          </h3>
          <p>{{ task.dayAndTime }}</p>
          <span
            class="pill"
            :style="{ backgroundColor: 'red', cursor: 'pointer' }"
            @click="deleteTask(task._id)"
            >delete
          </span>
          <span
            class="pill"
            :style="{ backgroundColor: 'green', cursor: 'pointer' }"
            @click="updateTask(task)"
            >update
          </span>
        </div>
      </div>
      <div v-else>
        <Spinner />
        <div class="center">No resources available . . .</div>
      </div>
    </div> -->
    <!-- end code for displaying all tasks -->
  </div>
</template>

<script>
import Button from "../components/Button.vue";
import Task from "../components/Task.vue";
import Spinner from "../components/Spinner.vue";

export default {
  components: { Button, Task, Spinner },

  data() {
    return {
      title: "To do List",
      task: "",
      dayAndTime: "",
      reminder: true,
      isUpdateTask: false,
      taskIdToUpdate: null,
      allTasks: [],
    };
  },
  methods: {
    handleSubmit() {
      if (!this.isUpdateTask) {
        this.$http
          .$post("https://todo-list-app-server-api.herokuapp.com/todos", {
            task: this.task,
            dayAndTime: this.dayAndTime,
            reminder: this.reminder,
          })
          .then((data) => {
            console.log(data);
          });
      } else {
        this.$http
          .$put(
            `https://todo-list-app-server-api.herokuapp.com/todos/${this.taskIdToUpdate}`,
            {
              task: this.task,
              dayAndTime: this.dayAndTime,
              reminder: this.reminder,
            }
          )
          .then((data) => {
            console.log(data);
          });
      }
    },
    deleteTask(id) {
      this.$http
        .$delete("https://todo-list-app-server-api.herokuapp.com/todos/" + id)
        .then((data) => (window.location.href = data.redirect))
        .catch((err) => console.log(err));
    },
    async fetchAllTasks() {
      this.allTasks = await this.$http.$get(
        "https://todo-list-app-server-api.herokuapp.com/todos/"
      );
      console.log(this.allTasks);
    },
    updateTask(task) {
      this.task = task.task;
      this.dayAndTime = task.dayAndTime;
      this.reminder = task.reminder;
      this.taskIdToUpdate = task.id;
      this.isUpdateTask = true;
      this.$store.state.showAdd || this.$store.commit("toggle");
    },
  },
  mounted() {
    this.fetchAllTasks();
  },
};
</script>
