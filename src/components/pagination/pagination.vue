<template>
  <div class='pagination-container'>
    <ul class="pagination-pages">
      <li class="pagination-jump-prev" @click="prev">
        <a>
          <template v-if="prevText !== ''">{{ prevText }}</template>
          <svg v-else xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#999999" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="10" />
            <path d="M12 8l-4 4 4 4M16 12H9" />
          </svg>
        </a>
      </li>
      <li class="pagination-item" :class="{'active': currentPage === 1}" @click="onPageNumber(1)">1</li>
      <li class="pagination-item" v-show="pagesTotal[0] > 2">...</li>
      <li class="pagination-item" v-for="page in calcPages" :class="{'active': currentPage === page}" @click="onPageNumber(page)" :key="page">{{page}}</li>
      <li class="pagination-item" v-show="pagesTotal[pagesTotal.length-1] < pagesTotal - 1">...</li>
      <li class="pagination-jump-next" @click="next">
        <a>
          <template v-if="nextText !== ''">{{ nextText }}</template>
          <svg v-else xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#999999" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="10" />
            <path d="M12 8l4 4-4 4M8 12h7" />
          </svg>
        </a>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  name: 'Pagination',
  props: {
    // 总条数
    total: {
      type: Number,
      default: 0
    },
    // 当前页码
    currPage: {
      type: Number,
      default: 1
    },
    // 每页条数
    pageSize: {
      type: Number,
      default: 9
    },
    prevText: {
      type: String,
      default: ''
    },
    nextText: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      pagesTotal: [],
      currentPage: this.currPage,
      currentPageSize: this.pageSize
    }
  },
  watch: {
    currPage (v) {
      this.currentPage = v
    },
    pageSize (v) {
      this.currentPageSize = v
    }
  },
  computed: {
    calcPages () {
      let pages = Math.ceil(this.total / this.pageSize)
      return this.startPage((pages === 0) ? 1 : pages)
    }
  },
  methods: {
    startPage (pages) {
      // let pagesTotal = []
      let start = 0
      // 当前页码小于总页数时, 去除页码 1
      if (this.currentPage <= pages) {
        start = 2
      }
      for (let i = start; i <= pages; i++) {
        this.pagesTotal.push(i)
      }
      return this.pagesTotal
    },
    prev () {
      if (this.disabled) return
      const currPage = this.currentPage
      if (currPage <= 1) {
        return false
      }
      this.changePage(currPage - 1)
    },
    next () {
      if (this.disabled) return
      const currPage = this.currentPage
      debugger
      if (currPage >= this.pagesTotal.length) {
        return false
      }
      this.changePage(currPage + 1)
    },
    changePage (page) {
      if (this.disabled) return
      if (this.currPage !== page) {
        this.currentPage = page
        this.$emit('update:currPage', page)
        this.$emit('on-change', page)
      }
    },
    onPageNumber (page) {
      if (this.disabled) return
      this.changePage(page)
    }
  }
}
</script>
<style lang='scss' scoped>
@import "./pagination.scss";
</style>
