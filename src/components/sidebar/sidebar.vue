<template>
    <aside class='sidebar-container'>
        <div class="sidebar-item" @mousemove="mousemove(1)" @mouseleave="mouseleave">
            <span class="iconfont icon-skype"></span>
            <p class="sidebar-title">skype</p>
            <div class="sidebar-hover" v-show="isHide" @mousemove="mousemove(1)" @mouseleave="mouseleave">
                <p>skype:</p>
                <p>{{skepe}}</p>
            </div>
        </div>
        <div class="sidebar-item" @mousemove="mousemove(2)" @mouseleave="mouseleave">
            <span class="iconfont icon-follow"></span>
            <p class="sidebar-title">关注我们</p>
            <div class="sidebar-hover sidebar-hover-advisory" v-show="isHideAdvisory" @mousemove="mousemove(2)" @mouseleave="mouseleave">
                <p>扫码关注我们</p>
                <img :src="`${imgPath}/QRCode.png`">
            </div>
        </div>
        <div class="sidebar-item">
            <span class="iconfont icon-advisory"></span>
            <p class="sidebar-title">在线咨询</p>
        </div>
        <div class="sidebar-item" v-if="isBackTop" @click="backTop">
            <span class="iconfont icon-top"></span>
            <p class="sidebar-title">返回顶部</p>
        </div>
    </aside>
</template>
<script>
import { getContactMode } from '@/api/interface'

export default {
    name: 'Sidebar',
    data() {
        return {
            // 是否渲染返回顶部
            isBackTop: false,
            isHide: false,
            isHideAdvisory: false,
            timer: null,
            skepe: '',
            modes: []
        }
    },
    methods: {
        mousemove(param) {
            clearTimeout(this.timer)
            if (param === 1) {
                this.isHide = true
                this.isHideAdvisory = false
            } else {
                this.isHide = false
                this.isHideAdvisory = true
            }
        },
        mouseleave() {
            this.timer = setTimeout(() => {
                this.isHide = false
                this.isHideAdvisory = false
            }, 300)
        },
        backTop() {
            let timer = setInterval(() => {
                let ispeed = Math.floor(this.scrollTop / -5)
                document.documentElement.scrollTop = document.body.scrollTop = this.scrollTop + ispeed
                if (this.scrollTop === 0) {
                    clearInterval(timer)
                }
            }, 30)
        },
        scrollToTop() {
            this.scrollTop = document.documentElement.scrollTop || document.body.scrollTop || window.pageYOffset
            if (this.scrollTop > this.winH) {
                this.isBackTop = true
            } else {
                this.isBackTop = false
            }
        },
        initData() {
            getContactMode().then((res) => {
                res.status === 200 && res.data && (
                    res.data.forEach(item => {
                        if (item.type === 'SKYPE') this.skepe = item.title
                    })
                )
            })
        }
    },
    mounted() {
        this.$nextTick(() => {
            this.initData()
        })
        this.winH = document.documentElement.clientHeight || window.innerHeight
        window.addEventListener('scroll', this.scrollToTop)
    },
    destroyed() {
        window.removeEventListener('scroll', this.scrollToTop)
    }
}
</script>
<style lang='scss' scoped>
@import './sidebar.scss';
</style>
