<template>
  <div class="container">
    <header>
      <nav>
        <ul class="menu">
          <li @click="showTodos">Todos</li>
          <li @click="showPosts">Post</li>
        </ul>
      </nav>
    </header>
    <h1>Simple Todo App</h1>
    <div class="todo-input-container">
      <input v-show="isTodosVisible" type="text" v-model="newTodo" class="todo-input" @keyup.enter="addTodo">
      <button v-show="isTodosVisible" class="todo-button" @click="addTodo">Add</button>
    </div>

    <ul v-show="isTodosVisible">
      <li v-for="(todo, index) in filteredTodos" :key="index" class="todo-item" :data-index="index">
        <input type="checkbox" v-model="todo.completed" class="todo-checkbox">
        <span :style="{ color: color[todo.completed ? 'completed' : 'active'] }" class="todo-text" @click="toggleCompletion(todo)">
          {{ todo.text }}
        </span>
        <button class="todo-edit" @click="editTodo(index)">Edit</button>
        <button class="todo-delete" @click="deleteTodo(index)">Delete</button>
      </li>
    </ul>

    <div v-show="isPostsVisible">
      <h2>Fitur Postingan Pengguna</h2>
      <select v-model="selectedUser" @change="fetchUserPosts">
        <option value="">Pilih User</option>
        <option v-for="user in users" :key="user.id" :value="user.id">{{ user.name }}</option>
      </select>
      <div v-if="selectedUser">
        <h3>Postingan dari {{ selectedUserName }}</h3>
        <ul>
          <li v-for="post in userPosts" :key="post.id">
            <h4>{{ post.title }}</h4>
            <p>{{ post.body }}</p>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      todos: [],
      newTodo: '',
      isTodosVisible: true,
      isPostsVisible: false,
      users: [],
      selectedUser: '',
      userPosts: [],
      selectedUserName: '',
      filter: 'all',
      color: {
        completed: 'green',
        active: 'red'
      }
    };
  },
  created() {
    this.fetchUsers();
  },
  computed: {
    filteredTodos() {
      if (this.filter === 'all') {
        return this.todos;
      } else if (this.filter === 'completed') {
        return this.todos.filter(todo => todo.completed);
      } else if (this.filter === 'active') {
        return this.todos.filter(todo => !todo.completed);
      }
    }
  },
  methods: {
    addTodo() {
      if (this.newTodo.trim() !== '') {
        this.todos.push({ text: this.newTodo, completed: false });
        this.newTodo = '';
        this.showNotification('Todo berhasil ditambahkan!');
      }
    },
    deleteTodo(index) {
      this.todos.splice(index, 1);
      this.showNotification('Todo berhasil dihapus!');
    },
    toggleCompletion(todo) {
      todo.completed = !todo.completed;
    },
    editTodo(index) {
      const newText = prompt('Edit todo:', this.todos[index].text);
      if (newText !== null) {
        this.todos[index].text = newText.trim();
      }
    },
    showNotification(message) {
      alert(message);
    },
    showTodos() {
      this.isTodosVisible = true;
      this.isPostsVisible = false;
    },
    showPosts() {
      this.isTodosVisible = false;
      this.isPostsVisible = true;
    },
    fetchUsers() {
      fetch('https://jsonplaceholder.typicode.com/users')
        .then(response => response.json())
        .then(data => {
          this.users = data;
        })
        .catch(error => {
          console.error('Error fetching users:', error);
        });
    },
    fetchUserPosts() {
      if (this.selectedUser) {
        fetch(`https://jsonplaceholder.typicode.com/posts?userId=${this.selectedUser}`)
          .then(response => response.json())
          .then(data => {
            this.userPosts = data;
            const selectedUser = this.users.find(user => user.id === parseInt(this.selectedUser));
            if (selectedUser) {
              this.selectedUserName = selectedUser.name;
            }
          })
          .catch(error => {
            console.error('Error fetching user posts:', error);
          });
      } else {
        this.userPosts = [];
        this.selectedUserName = '';
      }
    }
  }
};
</script>

<style scoped>
/* Gaya CSS Anda */

header {
  background-color: #4ca3af;
  color: #fff;
  padding: 10px 0;
}

nav ul {
  list-style-type: none;
  padding: 0;
}

nav ul li {
  display: inline;
  margin-right: 20px;
  cursor: pointer;
}

nav ul li:hover {
  text-decoration: underline;
}
</style>
