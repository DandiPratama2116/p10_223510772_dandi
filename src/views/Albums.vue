<!-- src/views/Albums.vue -->
<template>
  <div class="container">
    <h1>ALBUM ⏺️</h1>
    <div class="album-grid">
      <div v-for="album in albums" :key="album.id" @click="selectAlbum(album)" class="album-item">
        <router-link :to="getAlbumLink(album.id)" class="album-link">
          <img :src="album.thumbnailUrl" :alt="album.title" class="album-image" />
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import axios from 'axios';

export default {
  setup() {
    const albums = ref([]);

    onMounted(() => {
      fetchAlbums();
    });

    const fetchAlbums = async () => {
      try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/albums');
        const albumsData = response.data;

        // Fetch album photos in a more efficient way
        const photosResponse = await axios.get('https://jsonplaceholder.typicode.com/photos');
        const photosData = photosResponse.data;

        albums.value = albumsData.map(album => {
          const albumPhoto = photosData.find(photo => photo.albumId === album.id);
          return {
            ...album,
            thumbnailUrl: albumPhoto ? albumPhoto.thumbnailUrl : 'https://via.placeholder.com/150',
          };
        });
      } catch (error) {
        console.error('Error fetching albums:', error);
      }
    };

    const getAlbumLink = (albumId) => `/albums/${albumId}`;

    const selectAlbum = (album) => {
      console.log('Selected album:', album);
    };

    return {
      albums,
      getAlbumLink,
      selectAlbum,
    };
  },
};
</script>

<style scoped>
body, html {
  height: 100%;
  margin: 0;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  background-color: #e0f7fa; /* Light cyan background */
  border: 1px solid #ddd; /* Light grey border */
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Subtle shadow */
  min-height: 100%; /* Ensure container takes full height */
  box-sizing: border-box;
}

h1 {
  text-align: center;
  color: #333; /* Dark grey text */
  font-family: 'Arial', sans-serif;
}

.album-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr); /* Create 5 equal columns */
  gap: 10px;
}

.album-item {
  padding: 10px;
  background-color: #fff; /* White background */
  border: 1px solid #ddd; /* Light grey border */
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* Subtle shadow */
  transition: transform 0.3s ease;
}

.album-item:hover {
  transform: translateY(-5px);
}

.album-link {
  display: block;
  text-decoration: none;
}

.album-image {
  width: 100%;
  height: auto;
  border-radius: 10px;
  display: block;
}
</style>
