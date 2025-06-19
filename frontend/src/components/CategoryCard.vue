<template>
  <div class="category-card">
    <div class="card">
      <img height="48" width="48" :src="cover_image || defaultImage" />
      <h2>{{ name }}</h2>
      <p>{{ description }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  name: string
  cover_image: string | null
  description: string
}>()

const defaultImage = new URL('@/assets/no-img.svg', import.meta.url).href
</script>

<style scoped lang="scss">
.category-card {
  height: 100%;
  padding: 8px;
}

.card {
  height: 100%;
  padding: 24px;
  border: 1px solid #f6f6f7;
  background-color: #f6f6f7;
  border-radius: 10px;
  cursor: pointer;

  &:hover {
    border-color: $primary-color;
  }

  img {
    margin-bottom: 20px;
  }

  h2 {
    font-size: 16px;
    font-weight: bold;
    margin-bottom: 8px;
  }

  p {
    font-size: 14px;
    line-height: 24px;
    color: #67676c;
  }
}
</style>
