<template>
  <div class="container mt-5">
    <div class="row filter-mobile" v-if="width < 1024">
      <div class="col-12">
        <b-button v-b-toggle.sidebar-1>filter</b-button>
        <b-sidebar id="sidebar-1">
          <div class="mb-4">
            Filter
            <a class="clear float-right" @click="onClear">Clear all</a>
          </div>
          <sidebar ref="sidebar" :criteria="criteria" @initialData="initialData" @filterCate="filterCate" @filterBrand="filterBrand" />
        </b-sidebar>
      </div>
    </div>
    <div class="row">
      <div class="col-lg-3 sidebar-filter" v-if="width >= 1024">
        <div class="mb-4">
          Filter
          <a class="clear float-right" @click="onClear">Clear all</a>
        </div>
        <sidebar ref="sidebar" :criteria="criteria" @initialData="initialData" @filterCate="filterCate" @filterBrand="filterBrand" />
      </div>
      <div class="col-12 col-lg-9">
        <div class="mb-4">
          ผลลัพธ์ {{ totalCatalog.total }} ชิ้น
          <span class="tags mr-2" v-for="(v, i) in tagCate" :key="`${v.text}-${i}`">{{ v.text }}<i class="fas fa-times ml-2" @click="onFilterCate(v)" /></span>
          <span class="tags mr-2" v-for="(v, i) in tagBrand" :key="`${v.text}-${i}`">{{ v.text }}<i class="fas fa-times ml-2" @click="onFilterBrand(v)" /></span>
        </div>
        
        <div class="grid mb-3">
          <template v-for="item in catalogList">
            <catalog :key="item.id" :catalog="item" />
          </template>
        </div>
        <page :current-page="totalCatalog.current_page"
              :last-page="totalCatalog.last_page"
              :criteria="criteria"
              @initialData="initialData" />
      </div>
    </div>
  </div>
</template>

<script>
import Sidebar from './Sidebar'
import Catalog from './Catalog'
import Page from './Page'
import { mapState, mapActions } from 'vuex'
export default {
  name: 'Index',

  components: { Sidebar, Catalog, Page },

  data () {
    return {
      criteria: {
        category_id: [],
        category: [],
        brand_id: [],
        page: 1,
      },
      tagCate: [],
      tagBrand: [],
      width: ''
    }
  },

  created () {
    window.addEventListener('resize', () => {
      this.getWidth()
    })
  },

  mounted () {
    this.initialData()
    this.getWidth()
  },

  computed: {
    ...mapState(['catalogList', 'totalCatalog']),
    name () {
      return () => import('./Sidebar')
    }
  },

  methods: {
    ...mapActions(['getCatalog']),
    getWidth () {
      this.width = document.documentElement.clientWidth + 17
    },
    initialData () {
      const { category_id, brand_id, page } = this.criteria
      const params = {
        category_id: category_id.join(','),
        brand_id: brand_id.join(','),
        page
      }
      this.getCatalog(params)
    },
    onFilterCate (obj) {
      let temp = []
      this.tagCate.forEach(v => {
        if (obj.parentId && obj.value != v.value && obj.parentId != v.value) {
          temp.push(v)
        }
      })
      this.tagCate = [...temp]
      this.$set(this.criteria, 'category', temp.map(v => v.value))
    },
    filterCate (arr) {
      this.tagCate = [...arr]
    },
    onFilterBrand (obj) {
      const reject = this.tagBrand.filter(v => ![obj].includes(v))
      this.tagBrand = [...reject]
      this.$set(this.criteria, 'brand_id', reject.map(v => v.value))
    },
    filterBrand (arr) {
      this.tagBrand = [...arr]
    },
    onClear () {
      this.criteria = {
        category_id: [],
        category: [],
        brand_id: [],
        page: 1,
      }
      this.tagCate = []
      this.tagBrand = []
      this.initialData()
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.grid {
  text-align: center;
  -webkit-box-pack: center;
      -ms-flex-pack: center;
          /* justify-content: center; */
  display: -ms-grid;
  display: grid;
  /* grid-template-columns: 200px 200px 200px 200px; */
  /* grid-template-columns: repeat(auto-fill, minmax(220px, 0fr)); */
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  grid-auto-rows: minmax(100px, auto);
  grid-gap: 20px;
}
@media screen and (max-width: 1024px) {
  .grid {
     grid-template-columns: repeat(auto-fill, minmax(230px, 1fr));
  }
}
i {
  cursor: pointer;
}
.clear {
  cursor: pointer;
}
.clear:hover {
  color: blue;
}
.tags {
  background-color:#45a4e6;
  padding: 2px;
  border-radius: 4px;
  white-space: pre;
}

.sidebar-filter {
  display: none;
}

@media screen and (min-width: 1024px) {
  .sidebar-filter {
    display: block;
  }
  .filter-mobile {
    display: none;
  }
}

</style>
