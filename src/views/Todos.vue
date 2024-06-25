<template>
  <main class="app">
    <section class="greeting">
      <h2 class="title">
        <input type="text" id="name" placeholder="Name here" v-model="nameData" />
      </h2>
    </section>

    <section class="create-todo">
      <h4 class="center-title">⏺️CREATE A TODO</h4>

      <form id="new-todo-form" @submit.prevent="addTodo">
        <h4>NAMA MAHASISWA/I</h4>
        <input 
          type="text" 
          name="content" 
          id="content" 
          placeholder="Type your task here"
          v-model="input_content" />
        
        <h4>JENIS KELAMIN</h4>
        <div class="options">
          <label>
            <input 
              type="radio" 
              name="category" 
              id="category1" 
              value="personal"
              v-model="input_category" />
            <span class="bubble personal"></span>
            <div>Laki-Laki</div>
          </label>
          <label>
            <input 
              type="radio" 
              name="category" 
              id="category2" 
              value="college"
              v-model="input_category" />
            <span class="bubble college"></span>
            <div>Perempuan</div>
          </label>
        </div>

        <input type="submit" value="Add todo" />
      </form>
    </section>

    <section class="todo-list">
      <h3>TODO LIST</h3>
      <div class="list" id="todo-list">
        <div v-for="todo in todos" :class="`todo-item ${todo.done ? 'done' : ''}`" :key="todo.createdAt">
          <label>
            <input type="checkbox" v-model="todo.done" />
            <span :class="`bubble ${todo.category == 'personal' ? 'personal' : 'college'}`"></span>
          </label>

          <div class="todo-content">
            <input type="text" v-model="todo.content" />
          </div>

          <div class="actions">
            <button class="delete" @click="removeTodo(todo)">Delete</button>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script setup>
import { ref, onMounted, computed, watch } from 'vue';

const todosData = ref([]);
const nameData = ref('');

const input_content = ref('');
const input_category = ref(null);

const todos = computed(() => todosData.value.sort((a, b) => a.createdAt - b.createdAt));

watch(nameData, (newVal) => {
  localStorage.setItem('name', newVal);
});

watch(todosData, (newVal) => {
  localStorage.setItem('todos', JSON.stringify(newVal));
}, {
  deep: true,
});

const addTodo = () => {
  if (input_content.value.trim() === '' || input_category.value === null) {
    return;
  }

  todosData.value.push({
    content: input_content.value,
    category: input_category.value,
    done: false,
    editable: false,
    createdAt: new Date().getTime(),
  });
  input_content.value = '';
  input_category.value = null;
};

const removeTodo = (todo) => {
  todosData.value = todosData.value.filter((t) => t !== todo);
};

onMounted(() => {
  nameData.value = localStorage.getItem('name') || '';
  todosData.value = JSON.parse(localStorage.getItem('todos')) || [];
});
</script>

<style>
body {
  font-family: Arial, sans-serif;
  background-image: url("https://i.pinimg.com/564x/9f/47/0d/9f470d8770a365e4ad46878e43256069.jpg");
  margin: 0;
  padding: 0;
}

.app {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
}

.greeting {
  background-color: rgb(160, 199, 148);
  color: white;
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 20px;
  width: 100%;
  max-width: 600px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.title {
  font-size: 24px;
  margin: 0;
}

.title input {
  font-size: 24px;
  padding: 5px;
  border: none;
  border-radius: 4px;
}

.create-todo,
.todo-list {
  background-color: rgb(160, 199, 148);
  padding: 20px;
  border-radius: 8px;
  width: 100%;
  max-width: 600px;
  margin-bottom: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.create-todo .center-title,
.todo-list h3 {
  margin-top: 0;
  text-align: center;
}

#create-todo-form input[type="text"],
#create-todo-form input[type="submit"] {
  width: 100%;
  padding: 10px;
  margin-top: 10px;
  margin-bottom: 10px;
  border-radius: 4px;
  border: 1px solid #ddd;
}

#create-todo-form input[type="submit"] {
  background-color: #4caf50;
  color: white;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

#create-todo-form input[type="submit"]:hover {
  background-color: #45a049;
}

.options {
  display: flex;
  justify-content: space-around;
  margin-bottom: 10px;
}

.options label {
  display: flex;
  align-items: center;
  cursor: pointer;
}

.bubble {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  display: inline-block;
  margin-right: 10px;
}

.bubble.personal {
  background-color: #007bff;
}

.bubble.college {
  background-color: #ffc107;
}

.todo-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background-color: #fafafa;
  transition: background-color 0.3s ease;
}

.todo-item.done {
  background-color: #d4edda;
}

.todo-item label {
  display: flex;
  align-items: center;
}

.todo-item .todo-content {
  flex-grow: 1;
  margin-left: 10px;
}

.todo-item .actions {
  margin-left: 10px;
}

.todo-item .actions .delete {
  background-color: #f44336;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.todo-item .actions .delete:hover {
  background-color: #e53935;
}
</style>
