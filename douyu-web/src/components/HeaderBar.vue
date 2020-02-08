<template>
    <header>
        <span class="back" @click="back">&lt;</span>
        <slot class="hd-text"></slot>
    </header>
</template>
<script>
export default {
    name: 'HeaderBar',
    methods:{
        back(){
            this.$router.go(-1);
        }
    }
}
</script>
<style scoped>
    header{
        height: 3.75rem;
        line-height: 3.75rem;
        background-color: black;
        color: white;
        text-align: center;
    }
    .back{
        font-size: 1.125rem;
        position: absolute;
        left: .625rem;
    }
</style>