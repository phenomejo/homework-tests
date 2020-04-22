<template>
  <div>
    <b-card no-body class="item">
      <b-card no-body>
        <a v-b-toggle.collapse-1 class="m-2">
          ประเภทสินค้า
          <span class="float-right"><i class="fas fa-chevron-down"></i></span>
        </a>
        <b-collapse visible id="collapse-1">
          <b-card no-body class="item" v-for="(o, i) in cateList" :key="i">
            <a @click="onToggle('collapse-1', o)" class="ml-2 mb-1">
              {{ o.name }}
            </a>
            <b-collapse :id="`collapse-1-${o.name}`">
              <a class="ml-3" @click="onSelectAll(o)"> {{ `${o.name}ทั้งหมด` }} </a>
              <!-- <b-form-checkbox :value="isCheck(o.id)" unchecked-value="">
                {{ `${o.name}ทั้งหมด` }}
              </b-form-checkbox> -->
              <b-form-group class="ml-4">
                <b-form-checkbox-group
                  v-model="criteria.category"
                  :options="o.list"
                  stacked
                ></b-form-checkbox-group>
              </b-form-group>
            </b-collapse>
          </b-card>
        </b-collapse>
      </b-card>
      
      <b-card no-body>
        <a v-b-toggle.collapse-2 class="m-2">
          แบรนด์
          <span class="float-right"><i class="fas fa-chevron-down"></i></span>
        </a>
        <b-collapse visible id="collapse-2">
          <b-form-group class="ml-1 mb-1">
            <b-form-checkbox-group
              v-model="criteria.brand_id"
              :options="brandList"
              stacked
            ></b-form-checkbox-group>
          </b-form-group>
        </b-collapse>
      </b-card>
    </b-card>
  </div>
</template>

<script>
export default {
  name: 'Sidebar',

  props: {
    criteria: { type: Object, default: () => { return {} } },
    tagList: { type: Array, default: () => { return [] } }
  },

  watch: {
    'criteria.category' (newVal, oldVal) {
      if (newVal && oldVal && newVal.length != oldVal.length) {
        this.findCate(newVal)
      }
    },
    'criteria.brand_id' (newVal, oldVal) {
      if (newVal && oldVal && newVal.length != oldVal.length) {
        const brands = this.brandList.filter((v) => newVal.includes(v.value))
        this.$emit('initialData')
        this.$emit('filterBrand', brands)
      }
    }
  },

  methods: {
    onToggle (id, o) {
      this.$root.$emit('bv::toggle::collapse', `${id}-${o.name}`)
    },
    findCate (newVal) {
      let arr = []
      let id = []
      let cates = []
      let temp = this.criteria.category
      this.cateList.forEach(v => {
        cates = v.list.filter(vv => newVal.includes(vv.value))
        temp = temp.filter(vv => ![v.id].includes(vv))
        if ((cates.length == v.list.length && newVal.indexOf(v.id) == -1)) {
          cates = [{ value: v.id, text: v.name }, ...cates]
          id = [v.id]
        }

        arr = [ ...arr, ...cates ]
      })

      this.$set(this.criteria, 'category_id', [...new Set([...id, ...temp])])
      this.$emit('initialData')
      this.$emit('filterCate', arr)
    },
    onSelectAll (obj) {
      let arr = []
      obj.list.forEach(v => {
        arr.push(v.value)
      })

      const arr2 = this.criteria.category.filter(v => arr.includes(v))
      if (arr2.length > 0 && arr2.length == arr.length) {
        const temp = this.criteria.category.filter(v => !arr.includes(v))
        this.$set(this.criteria, 'category', [...temp])
      } else {
        this.$set(this.criteria, 'category', [...new Set([...this.criteria.category, ...arr])])
      }

    }
  },

  data () {
    return {
      cateList: [
        { 
          id: '16',
          name: 'ข้อต่อ',
          list: [
            { value: '77', parentId: '16', text: 'ข้อต่อทองเหลือง' },
            { value: '76', parentId: '16', text: 'ข้อต่อส่วนเร็ว' }
          ]
        },
        {
          id: '11',
          name: 'ท่อลำเลียง',
          list: [
            { value: '63', parentId: '11', text: 'สายลม PU' },
            { value: '65', parentId: '11', text: 'สายส่งน้ำ' },
            { value: '64', parentId: '11', text: 'สายอเนกประสงค์' },
          ]
        },
        { 
          id: '15',
          name: 'บรรจุภัณฑ์',
          list: [
            { value: '74', parentId: '15', text: 'ถุง' },
            { value: '75', parentId: '15', text: 'เทป' }
          ]
        },
        {
          id: '7',
          name: 'ปั๊มน้ำและวาล์ว',
          list: [
            { value: '47', parentId: '7', text: 'ก๊อก' },
            { value: '46', parentId: '7', text: 'ปั๊มน้ำ' },
            { value: '45', parentId: '7', text: 'วาล์ว' },
            { value: '48', parentId: '7', text: 'เทปพันเกลียว' },
          ]
        },
        {
          id: '13',
          name: 'ล้อ',
          list: [
            { value: '69', parentId: '13', text: 'ล้อยูรีเทน' }
          ]
        },
        {
          id: '3',
          name: 'สกรู',
          list: [
            { value: '29', parentId: '3', text: 'ตัวหนอน' },
            { value: '30', parentId: '3', text: 'มิลแฉก' },
            { value: '26', parentId: '3', text: 'หัวจม' },
            { value: '27', parentId: '3', text: 'หัวจมเตเปอร์' },
            { value: '31', parentId: '3', text: 'หัวน็อต' },
            { value: '28', parentId: '3', text: 'หัวเหลี่ยม' },
          ]
        },
        {
          id: '8',
          name: 'อุปกรณ์ขัดเจียร์',
          list: [
            { value: '49', parentId: '8', text: 'กระดาษทราย' },
            { value: '50', parentId: '8', text: 'ตะไบ' },
            { value: '53', parentId: '8', text: 'หินเจียร์' },
            { value: '52', parentId: '8', text: 'แปรงลวด' },
            { value: '51', parentId: '8', text: 'ใบเจียร์' }
          ]
        },
        {
          id: '14',
          name: 'อุปกรณ์ความปลอดภัย',
          list: [
            { value: '72', parentId: '14', text: 'มือและแขน' },
            { value: '70', parentId: '14', text: 'ศีรษะ' },
            { value: '73', parentId: '14', text: 'เทป' },
            { value: '71', parentId: '14', text: 'ใบหน้า' }
          ]
        },
        {
          id: '9',
          name: 'อุปกรณ์ตัดเจาะ',
          list: [
            { value: '57', parentId: '9', text: 'ดอกสว่าน' },
            { value: '56', parentId: '9', text: 'เลื่อย' },
            { value: '54', parentId: '9', text: 'โฮสชอว์' },
            { value: '55', parentId: '9', text: 'ใบตัด' }
          ]
        },
        {
          id: '1',
          name: 'อุปกรณ์ส่งกำลัง',
          list: [
            { value: '21', parentId: '1', text: 'สายพาน NARROW V-BELT' },
            { value: '20', parentId: '1', text: 'สายพาน POLYMAX' },
            { value: '19', parentId: '1', text: 'สายพาน RIBSTAR' },
            { value: '18', parentId: '1', text: 'สายพาน SUPER TORQUE TIMING BELT' },
            { value: '17', parentId: '1', text: 'สายพาน V-BELT' }
          ]
        },
        {
          id: '12',
          name: 'เคมีภัณฑ์และอุปกรณ์',
          list: [
            { value: '66', parentId: '12', text: 'งานซ่อมสร้าง' },
            { value: '68', parentId: '12', text: 'อุปกรณ์เคมี' },
            { value: '67', parentId: '12', text: 'เคมีภัณฑ์' }
          ]
        },
        {
          id: '6',
          name: 'เครื่องมือช่าง',
          list: [
            { value: '42', parentId: '6', text: 'ค้อน' },
            { value: '43', parentId: '6', text: 'คีม' },
            { value: '44', parentId: '6', text: 'ประแจ' },
            { value: '41', parentId: '6', text: 'ไขควง' }
          ]
        },
        {
          id: '2',
          name: 'เครื่องมือลม',
          list: [
            { value: '23', parentId: '2', text: 'บล็อกลม' },
            { value: '22', parentId: '2', text: 'ปืนฉีดฝุ่น' },
            { value: '25', parentId: '2', text: 'รีเวทลม' },
            { value: '24', parentId: '2', text: 'เครื่องเจียร์ลม' }
          ]
        },
        {
          id: '10',
          name: 'เครื่องมือวัด',
          list: [
            { value: '58', parentId: '10', text: 'ตลับเมตร' },
            { value: '60', parentId: '10', text: 'ฟุตสแตนเลส' },
            { value: '62', parentId: '10', text: 'ระดับน้ำ' },
            { value: '61', parentId: '10', text: 'เทปวัดที่' },
            { value: '59', parentId: '10', text: 'เวอร์เนีย' }
          ]
        },
        {
          id: '5',
          name: 'เครื่องมือเชื่อม',
          list: [
            { value: '38', parentId: '5', text: 'ตู้เชื่อม' },
            { value: '39', parentId: '5', text: 'ลวดเชื่อม' },
            { value: '40', parentId: '5', text: 'อุปกรณ์งานเชื่อม' },
          ]
        },
        {
          id: '4',
          name: 'เครื่องมือไฟฟ้า',
          list: [
            { value: '35', parentId: '4', text: 'กบไสไม้' },
            { value: '32', parentId: '4', text: 'สว่าน, ไขควงไฟฟ้า' },
            { value: '33', parentId: '4', text: 'เครื่องตัดเลื่อย' },
            { value: '37', parentId: '4', text: 'เครื่องมือไฟฟ้าอื่นๆ' },
            { value: '34', parentId: '4', text: 'เครื่องเจียร์' },
            { value: '36', parentId: '4', text: 'เครื่องเป่าลม' }
          ]
        },
      ],
      brandList: [
        { value: '65', text: '3M' },
        { value: '35', text: 'APEX' },
        { value: '22', text: 'ASAHI' },
        { value: '55', text: 'BOSNY' },
        { value: '17', text: 'CHAMPION' },
        { value: '4', text: 'CHIYODA' },
        { value: '56', text: 'CRC' },
        { value: '54', text: 'DEXERIALS' },
        { value: '44', text: 'ECLIPSE' },
        { value: '23', text: 'EIGHT' },
        { value: '33', text: 'FALCON' },
        { value: '46', text: 'GOLDEAL' },
        { value: '59', text: 'GUMTREE' },
        { value: '39', text: 'HAWK' },
        { value: '20', text: 'INGCO' },
        { value: '14', text: 'JASIC' },
        { value: '19', text: 'KANZAWA' },
        { value: '48', text: 'KDS' },
        { value: '21', text: 'KEIBA' },
        { value: '66', text: 'KING HAWK' },
        { value: '24', text: 'KITZ' },
        { value: '15', text: 'KOBE' },
        { value: '70', text: 'KOLA' },
        { value: '49', text: 'KOVET' },
        { value: '7', text: 'KUANI' },
        { value: '6', text: 'KUKEN' },
        { value: '9', text: 'MAKITA' },
        { value: '10', text: 'MAKTEC' },
        { value: '30', text: 'MAXSTAR' },
        { value: '50', text: 'META' },
        { value: '2', text: 'MITO' },
        { value: '28', text: 'MITSUBISHI' },
        { value: '1', text: 'MITSUBOSHI' },
        { value: '73', text: 'MITSUBOSHI' },
        { value: '47', text: 'NACHI' },
        { value: '63', text: 'NASA' },
        { value: '60', text: 'NEW CHOR' },
        { value: '36', text: 'NICHOLSON' },
        { value: '72', text: 'NITTO' },
        { value: '38', text: 'NKK' },
        { value: '12', text: 'ORP' },
        { value: '13', text: 'POLO' },
        { value: '64', text: 'PROTAPE Safetyman' },
        { value: '11', text: 'PUMPKIN' },
        { value: '25', text: 'SANWA' },
        { value: '27', text: 'SHOWFOU' },
        { value: '43', text: 'SOLO' },
        { value: '45', text: 'SOMIC' },
        { value: '58', text: 'SONAX' },
        { value: '18', text: 'STANLEY' },
        { value: '61', text: 'STAR TAPE' },
        { value: '68', text: 'SULION' },
        { value: '67', text: 'TIP TAPE' },
        { value: '34', text: 'TOA' },
        { value: '5', text: 'TOKU' },
        { value: '51', text: 'TOYOX' },
        { value: '52', text: 'TTT' },
        { value: '37', text: 'TWOTONG' },
        { value: '26', text: 'VALU' },
        { value: '3', text: 'VESSEL' },
        { value: '62', text: 'WAGEN' },
        { value: '57', text: 'WD-40' },
        { value: '16', text: 'WEL-D' },
        { value: '69', text: 'WIN' },
        { value: '31', text: 'จระเข้' },
        { value: '29', text: 'จอรีเทค' },
        { value: '32', text: 'ฉลาม' },
        { value: '40', text: 'ดอกไม้' },
        { value: '41', text: 'สมอ' },
        { value: '71', text: 'หลุยส์' },
        { value: '52', text: 'อูฐ' },
        { value: '53', text: 'เวเนอร์' },
        { value: '8', text: 'ไม่ระบุ' },
      ]
    }
  }
}
</script>

<style scoped>
.sidebar {
  width: 250px;
}
a {
  cursor: pointer;
}
.item {
  border: 1px solid transparent;
}
</style>