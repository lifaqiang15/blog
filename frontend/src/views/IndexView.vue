<template>
  <el-container>
    <HeaderTop />
    <el-main class="main">
      <div class="container">
        <img src="@/assets/penguin.png" class="image" />
        <div class="introduction">
          <p class="title">代码杂货铺</p>
          <p class="introduction-text">程序员的高效补给站</p>
          <p class="introduction-text">一个为开发者打造的"技术便利店"：</p>
          <ul>
            <li>🔧 即拿即用的代码片段 - 告别重复造轮子</li>
            <li>📦 开箱即用的工具库 - 提升开发效率</li>
            <li>💡 实战技术指南 - 浓缩前辈经验，少踩坑多成长</li>
            <li>🛒 开发者好物 - 键盘外设到生产力工具真实测评</li>
          </ul>
        </div>
      </div>
      <el-row>
        <el-col :xs="12" :sm="6" v-for="category in categoryStore.categories">
          <CategoryCard
            :key="category.id"
            :name="category.name"
            :cover_image="category.cover_image"
            :description="category.description"
          />
        </el-col>
      </el-row>
    </el-main>
    <el-footer class="footer">
      <p>© 2025-present Faqiang Li. All rights reserved.</p>
    </el-footer>
  </el-container>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import HeaderTop from '@/components/HeaderTop.vue'
import CategoryCard from '@/components/CategoryCard.vue'
import { useCategoryStore } from '@/store/category'

const categoryStore = useCategoryStore()

onMounted(async () => {
  await categoryStore.get_categories()
})
</script>

<style scoped lang="scss">
.main {
  margin: 0 auto;
  padding: 64px 24px;
  max-width: 1152px;
}

.container {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
}

.introduction {
  width: 512px;

  .title,
  .introduction-text {
    margin: 0;
    font-size: 56px;
    font-weight: bold;
    line-height: 64px;
  }

  .title {
    color: $primary-color;
  }

  ul {
    margin-top: 10px;

    li {
      margin-bottom: 16px;
      font-size: 20px;
    }
  }
}

.image {
  width: 512px;
}

.footer {
  display: flex;
  justify-content: center;
  align-items: center;
  border-top: 1px solid #eee;
}
</style>
