import { defineStore } from 'pinia'
import type { category } from '@/type'
import type { CategoryRequest } from '@/api/category/type'
import { create_category, get_categories, update_category, delete_category } from '@/api/category'

export const useCategoryStore = defineStore('category', {
  state: () => ({
    categories: [] as category[],
  }),
  actions: {
    async create_category(data: CategoryRequest) {
      const res = await create_category(data)
      const newCategory = {
        ...data,
        ...res.data!,
      }
      this.categories.push(newCategory)
    },

    async get_categories() {
      const res = await get_categories()
      this.categories = res.data!
    },
    async update_category(id: number, data: CategoryRequest) {
      await update_category(id, data)
    },

    async delete_category(id: number) {
      await delete_category(id)
    },
  },
})
