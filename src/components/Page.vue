<template>
  <nav aria-label="Page navigation example">
    <ul class="pagination">
      <li class="page-item" @click="onChangePage(currentPage - 1)">
        <a class="page-link" aria-label="Previous">
          <span aria-hidden="true">&laquo;</span>
        </a>
      </li>
      <li class="page-item"
          :class="{'active': num === currentPage}"
          v-for="num in lastPage"
          :key="num"
          @click="onChangePage(num)">
        <a class="page-link">{{ num }}</a>
      </li>
      <li class="page-item" @click="onChangePage(currentPage + 1)">
        <a class="page-link" aria-label="Next">
          <span aria-hidden="true">&raquo;</span>
        </a>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: 'Page',

  props: {
    currentPage: { type: Number, default: 1 },
    lastPage: { type: Number, default: 1 },
    criteria: { type: Object, default: () => { return { } } }
  },

  methods: {
    onChangePage (page) {
      if (page > 0 && page <= this.lastPage) {
        this.$set(this.criteria, 'page', page)
        this.$emit('initialData', this.criteria)
      }
    }
  }
}
</script>

<style scoped>
  nav {
    cursor: pointer;
  }
</style>