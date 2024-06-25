<template>
  <div class="container">
    <h2>⏺️USER POST</h2>
    <select v-model="selectedUser" @change="fetchUserPosts">
      <option value="">Select User</option>
      <option v-for="user in users" :key="user.id" :value="user.id">{{ user.name }}</option>
    </select>
    <div v-if="selectedUser">
      <h3>Posts by {{ selectedUserName }}</h3>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Body</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="post in userPosts" :key="post.id">
            <td>{{ post.title }}</td>
            <td>{{ post.body }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      users: [],
      selectedUser: '',
      userPosts: [],
      selectedUserName: ''
    };
  },
  created() {
    this.fetchUsers();
  },
  methods: {
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

;<style scoped>
body {
  font-family: Arial, sans-serif;
  background-image: url("https://i.pinimg.com/564x/9f/47/0d/9f470d8770a365e4ad46878e43256069.jpg");
  margin: 0;
  padding: 0
}

.container {
  max-width: 800px;
  margin: 50px auto;
  padding: 20px;
  background:  rgb(160, 199, 148);;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
}

h2, h3 {
  color: #333;
}

select {
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
  background: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: border 0.3s ease;
}

select:focus {
  border-color: #4ca3af;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

th, td {
  padding: 12px;
  border: 1px solid #ddd;
  text-align: left;
}

th {
  background-color: #4ca3af;
  color: white;
}

tbody tr:nth-child(even) {
  background-color: #f2f2f2;
}

tbody tr:hover {
  background-color: #e9f4f7;
}
</style>
