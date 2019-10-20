<template>
  <div class='pagination-container' v-if="isRender">
    <ul class="pagination-pages">
      <li class="pagination-jump-prev" @click="prev">
        <template v-if="prevText !== ''">{{ prevText }}</template>
        <svg v-else xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#999999" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
          <path d="M15 18l-6-6 6-6" /></svg>
      </li>
      <li :class="['pagination-item', {'active': currentPage === 1}]" @click="handlePage(1)">1</li>
      <li class="pagination-item" v-if="showPrevMore">
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#999999" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="1"></circle>
          <circle cx="19" cy="12" r="1"></circle>
          <circle cx="5" cy="12" r="1"></circle>
        </svg>
      </li>
      <li :class="['pagination-item', {'active': currentPage === page}]" v-for="page in pages" @click="handlePage(page)" :key="page">{{page}}</li>
      <li class="pagination-item" v-if="showNextMore">
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#999999" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="1"></circle>
          <circle cx="19" cy="12" r="1"></circle>
          <circle cx="5" cy="12" r="1"></circle>
        </svg>
      </li>
      <li :class="['pagination-item', {'active': currentPage === pagesTotal}]" v-if="pagesTotal > 1" @click="handlePage(pagesTotal)">{{pagesTotal}}</li>
      <li class="pagination-jump-next" @click="next">
        <template v-if="nextText !== ''">{{ nextText }}</template>
        <svg v-else xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#999999" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
          <path d="M9 18l6-6-6-6" /></svg>
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
    // 当前页码, 支持.sync
    currPage: {
      type: Number,
      default: 1
    },
    // 每页渲染数
    limit: {
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
    },
    // 可见页码, 超出的以...替代(必须是奇数), 如 1...[45678]...11, 1[23456]...11
    sizePage: {
      type: Number,
      default: 5
    }
  },
  data () {
    return {
      // 总页数
      pagesTotal: 1,
      // 当前页码
      currentPage: this.currPage,
      // 每页渲染数
      currentLimit: this.limit,
      showPrevMore: false,
      showNextMore: false
    }
  },
  watch: {
    currPage (v) {
      this.currentPage = v
    },
    limit (v) {
      this.currentLimit = v
    }
  },
  computed: {
    isRender () {
      return true
    },
    pages () {
      return this.calcPages()
    }
  },
  methods: {
    prev () {
      if (this.disabled) return
      if (this.currentPage <= 1) return false
      this.changePage(this.currentPage - 1)
    },
    next () {
      if (this.disabled) return
      if (this.currentPage >= this.pagesTotal) return false
      this.changePage(this.currentPage + 1)
    },
    handlePage (page) {
      if (this.disabled) return
      this.changePage(page)
    },
    changePage (page) {
      if (this.disabled) return
      this.currentPage = page
      this.$emit('update:currPage', page)
      this.$emit('on-change', page)
    },
    calcPages () {
      this.pagesTotal = Math.ceil(this.total / this.currentLimit)
      this.showPrevMore = false
      this.showNextMore = false
      const sizePage = this.sizePage
      const totals = this.pagesTotal
      const currPage = this.currentPage
      if (totals < sizePage + 2) {
        return this.renderPages(2, totals)
      } else if (currPage <= Math.ceil(sizePage / 2)) {
        this.showNextMore = true
        return this.renderPages(2, sizePage)
      } else if (currPage >= totals - Math.ceil(sizePage / 2)) {
        this.showPrevMore = true
        return this.renderPages(totals + 1 - sizePage, totals - 1)
      } else {
        this.showNextMore = true
        this.showPrevMore = true
        let median = Math.ceil(sizePage / 2) - 1
        return this.renderPages(currPage - median, currPage + median)
      }
    },
    renderPages (start, end) {
      if (end === this.pagesTotal) end = this.pagesTotal - 1
      const arrs = []
      for (let i = start; i <= end; i++) {
        arrs.push(i)
      }
      return arrs
    }
  }
}
</script>
<style lang='scss' scoped>
@import "./pagination.scss";
</style>
