<template>
  <div class="container">
    <header>
      <nav>
        <ul>
          <li @click="showTodos" :class="{ active: isTodosVisible }">Todos</li>
          <li @click="showPosts" :class="{ active: isPostsVisible }">Posts</li>
        </ul>
      </nav>
    </header>
    <h1>Simple Todo App</h1>
    <div v-if="isTodosVisible">
      <div class="todo-input-container">
        <input type="text" v-model="newTodo" class="todo-input" @keyup.enter="addTodo">
        <button class="todo-button" @click="addTodo">Add</button>
      </div>

      <ul>
        <li v-for="(todo, index) in filteredTodos" :key="index" class="todo-item" :data-index="index">
          <input type="checkbox" v-model="todo.completed" class="todo-checkbox">
          <span :class="{ 'completed': todo.completed }" class="todo-text" @click="toggleCompletion(todo)">
            {{ todo.text }}
          </span>
          <button class="todo-delete" @click="deleteTodo(index)">Delete</button>
        </li>
      </ul>
    </div>

    <div v-if="isPostsVisible">
      <h2>User Posts Feature</h2>
      <select v-model="selectedUser" @change="fetchUserPosts">
        <option value="">Select User</option>
        <option v-for="user in users" :key="user.id" :value="user.id">{{ user.name }}</option>
      </select>
      <div v-if="selectedUser">
        <h3>Posts by {{ selectedUserName }}</h3>
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
        this.showNotification('Todo added successfully!');
      }
    },
    deleteTodo(index) {
      this.todos.splice(index, 1);
      this.showNotification('Todo deleted successfully!');
    },
    toggleCompletion(todo) {
      todo.completed = !todo.completed;
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
    },
    showNotification(message) {
      alert(message);
    },
  }
};
</script>

<style scoped>
/* CSS Styles */

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

.container {
  max-width: 500px;
  margin: 20px auto;
  background-color: #a8da56;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

h1 {
  color: #2fa7a5;
  margin-bottom: 20px;
}

.todo-input-container {
  display: flex;
  margin-bottom: 20px;
}

.todo-input {
  width: calc(100% - 80px);
  padding: 8px;
  border-radius: 4px;
  border: 1px solid #22bbcd;
  margin-right: 10px;
  font-size: 16px;
}

.todo-button {
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  background-color: #4ca3af;
  color: #fff;
  font-size: 16px;
  cursor: pointer;
}

.todo-button:hover {
  background-color: #5ab4e9;
}

ul {
  list-style-type: none;
  padding: 0;
}

.todo-item {
  display: flex;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid #eeeeee;
}

.todo-item:last-child {
  border-bottom: none;
}

.todo-text {
  flex-grow: 1;
  cursor: pointer;
}

.todo-delete {
  background-color: #d9534f;
  color: #ffffff;
  border: none;
  border-radius: 4px;
  padding: 6px 12px;
  margin-left: 10px;
  cursor: pointer;
}

.todo-delete:hover {
  background-color: #c9302c;
}

.todo-text.completed {
  color: #5cb85c;
  text-decoration: line-through;
}
</style>
