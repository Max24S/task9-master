<template>
  <div>
    <div class="flex items-center flex-col font-sans antialiased text-white text-lg font-bold px-4 py-3">
        <div class="relative w-25 mx-auto">
            <div class="">Бюджет</div>
            <div class="flex justify-center ">{{getCapital.budget}} &#8372;</div>
            <div class="bt-b absolute">
                <button class="bg-red-500 hover:bg-red-700 text-white font-bold rounded-full w-6 h-6 relative" @click="exit=true"><span class="absolute">+</span></button>
            </div>
        </div>
        <div class="w-full flex justify-end">
            <div>Последняя операция:{{getCapital.last_transaction}} &#8372;</div>
        </div>
        <input-value v-if="exit" @cancel="exit=false"></input-value>
    </div>
  </div>
</template>
<script>
import InputValue from './InputValue'
export default {
    components:{InputValue},
    data(){
        return{
            income:0,
            exit:false,
            costs:0
        }
    },
    computed:{
        getCapital(){
            return this.$store.getters.get_capital;
        }
        
    }
}
</script>
<style>
.bt-b{
    top: 19px;
    left: 130%;
}
span{
    top: -3px;
    left: 6px;
}
</style>