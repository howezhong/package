<template>
    <div class="select-container">
        <div class="select-selection" @click="openDropdown">
            <img class="select-img" :src="`${imgPath}/zh.png`">
            <span class="select-placeholder">中文</span>
            <i class="iconfont icon-down select-arrow" :class="{'rotate-arrow': isHide}"></i>
        </div>
        <transition name="fade">
            <div class="select-dropdown" v-show="isHide">
                <ul>
                    <li :class="['select-list-item', {'active': isActive === item.title}]" v-for="(item, i) in lists" :key="i">
                        <img class="select-list-img" :src="item.url" />
                        <span class="select-placeholder">{{item.title}}</span>
                    </li>
                </ul>
            </div>
        </transition>
    </div>
</template>
<script>
export default {
    name: 'Select',
    data() {
        return {
            lists: [
                { title: '中文', url: `${this.imgPath}/zh.png` }
                // { title: '英文', url: `${this.imgPath}/en.png`) }
            ],
            isActive: '中文',
            isHide: false
        }
    },
    methods: {
        openDropdown() {
            this.isHide = !this.isHide
        }
    }
}
</script>
<style lang='scss' scoped>
@import './select.scss';
</style>
