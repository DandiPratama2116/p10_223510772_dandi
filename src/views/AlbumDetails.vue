<template>
  <div class="photos-container">
    <h1>Photos in Album</h1>
    <div v-if="photos.length === 0" class="loading">Loading...</div>
    <div v-else class="photo-grid">
      <div v-for="photo in photos" :key="photo.id" class="photo-item">
        <img :src="photo.thumbnailUrl" @click="showPhoto(photo.url)" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useAlbumStore } from '../stores/albumStore';

const albumStore = useAlbumStore();
const route = useRoute();
const photos = ref([]);

onMounted(async () => {
  await albumStore.fetchPhotos(route.params.id);
  photos.value = albumStore.photos;
});

const showPhoto = (url) => {
  window.open(url, '_blank');
};
</script>

<style scoped>
.photos-container {
  padding: 20px;
}

.loading {
  text-align: center;
  margin-top: 20px;
}

.photo-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 10px;
}

.photo-item {
  cursor: pointer;
}

.photo-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 8px;
  transition: transform 0.2s ease-in-out;
}

.photo-item img:hover {
  transform: scale(1.05);
}
</style>
