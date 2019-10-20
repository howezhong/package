<template>
    <swiper class="swipe-container" :options="swiperOption">
        <swiper-slide class="bank-list-wrap" v-for="(item,index) in lists" :key="index">
            <img class="swipe-img" :src="item.up_img" @click="handleClickImg(item)">
        </swiper-slide>
        <div class="swiper-pagination" slot="pagination"></div>
        <div class="swiper-button-prev" v-if="hasNextOrPrev" slot="button-prev"></div>
        <div class="swiper-button-next" v-if="hasNextOrPrev" slot="button-next"></div>
    </swiper>
</template>
<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper'

export default {
    name: 'Swipe',
    props: {
        // 轮播图
        lists: {
            type: Array,
            default: () => []
        },
        // 是否渲染左右切换箭头
        hasNextOrPrev: {
            type: Boolean,
            default: false
        }
    },
    components: {
        swiper,
        swiperSlide
    },
    data() {
        return {
            swiperOption: {
                slidesPerView: 1,
                spaceBetween: 0,
                loop: true,
                autoplay: {
                    delay: 3000,
                    disableOnInteraction: false
                },
                pagination: {
                    el: '.swiper-pagination',
                    clickable: true
                },
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev'
                }
                // 轮播图切换方式
                // coverflow: {
                //     rotate: 30,
                //     stretch: 10,
                //     depth: 60,
                //     modifier: 2,
                //     slideShadows: true
                // }
            }
        }
    },
    methods: {
        handleClickImg(params) {
            this.$emit('on-click', params)
        }
    }
}
</script>
<style lang='scss' scoped>
@import './swipe.scss';
</style>
