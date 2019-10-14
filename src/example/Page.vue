<template>
  <div class='page-container'>
    <div class="page-list">
      <div class="page-list-item" v-for="(item, i) in handleLists" :key="i">{{item}}</div>
    </div>
    <pagination :total="this.lists.length" :is-long-prev-next="true" @determine="determine" :sizePage="sizePage"></pagination>
  </div>
</template>
<script>
import Pagination from '@@/pagination'

export default {
  name: 'Page',
  components: {
    Pagination
  },
  data () {
    return {
      lists: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
      currPage: 1,
      // 每页渲染个数
      sizePage: 7,
      totals: 3
    }
  },
  computed: {
    // 分页渲染
    handleLists () {
      return this.lists.slice((this.currPage - 1) * this.sizePage, this.currPage * this.sizePage)
    }
  },
  methods: {
    // 分页
    determine (params) {
      this.currPage = params.page
    }
  },
  mounted () {
    // this.totals = Math.ceil(this.lists.length / this.sizePage)
  }
}
</script>
<style lang='scss' scoped>
.page-container {
  width: 100%;
  overflow: hidden;
}
.page-list {
  display: flex;
  flex-wrap: wrap;
  width: 700px;
  margin: auto;
}
.page-list-item {
  width: 31.5%;
  height: 80px;
  line-height: 80px;
  border: 1px solid #58508d;
  border-radius: 10px;
  margin-right: 18px;
  margin-bottom: 18px;
  font-size: 50px;
  text-align: center;
  &:nth-of-type(3n) {
    margin-right: 0;
  }
}
</style>
