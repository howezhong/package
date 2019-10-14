<template>
    <div class='banner-container'>
        <img :src="img">
    </div>
</template>
<script>
export default {
    name: 'Banner',
    props: {
        img: {
            type: String
        }
    }
}
</script>
<style lang='scss' scoped>
@import './banner.scss';
</style>
