<template>
<div>
    <slot></slot>
    <div class="sm:flex-col md:flex md:flex-row  w-5/6 bg-gray-200 mx-auto">
        <div class="flex-1 text-gray-700 text-center bg-gray-400 px-4 py-2 m-2"><div>За сегодня</div><div>{{costs_for_day}} &#8372;</div></div>
        <div class="flex-1 text-gray-700 text-center bg-gray-400 px-4 py-2 m-2"><div>За неделю</div><div>0 &#8372;</div></div>
        <div class="flex-1 text-gray-700 text-center bg-gray-400 px-4 py-2 m-2"><div>За месяц</div><div>0 &#8372;</div></div>
    </div>
</div>
</template>
<script>
export default {
computed:{
    costs_for_day(){
       let sum=0;
        for (const key in this.$store.state.list_category) {
            sum+=this.$store.state.list_category[key].cost
            }
            return sum;
        }
}
}
</script>

<style>

</style>