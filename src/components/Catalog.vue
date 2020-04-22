<template>
  <b-card>
    <template v-slot:header>
      <img class="cover" :src="getImage(catalog.cover)" />
    </template>
    <b-card-text class="card-text text-left">
      {{ catalog.name }} <br />
      ฿{{ catalog.sku.price }}
    </b-card-text>
  </b-card>
</template>

<script>
export default {
  name: 'Catalog',

  props: {
    catalog: { type: Object, default: () => { return {} } }
  },

  methods: {
    getImage (cover) {
      return !cover ? require('@/assets/icon-06.svg') : cover
    }
  }
}
</script>

<style scoped>
  .card-header {
    height: 170px;
    vertical-align: middle;
    line-height: 7;
    background-color: transparent;
    border-bottom: 0px;
  }
  .card-body {
    padding: 0.35rem;
  }
  .cover {
    max-width: 70%;
  }
</style>