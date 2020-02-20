<template>
    <div class="form-value w-full max-w-xs absolute"> 
        <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-10 ">
            <div class="mb-4">
                <label class="block text-gray-700 text-sm font-bold mb-2" for="incm">
                    Введите капитал в грн
                </label>
                <input v-focus @keyup="check_input()" :style="style" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" v-model.number="value_input" id="incm" type="number" :placeholder="placeholder">
            </div>
            <div class="flex items-center justify-between">
                <button  :disabled='check_btn' :class='style_btn'  @click="setValue" class="text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
                    Ввести
                </button>
                <button @click="cancel()" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
                    Отмена
                </button>
            </div>
        </form>
    </div>   
</template>
<script>
import Check from '../mixins/check'
export default {
    data(){
        return {  
        }
    },
    mixins: [Check],
    methods:{
        setValue(){
            // this.$emit("value",this.income);
            this.value(this.value_input);
            // this.$store.dispatch('update_', this.get_obj);
            this.cancel()
        },
        cancel(){
            this.$emit("cancel")
        }
        ,          
        value(val){
        return this.$store.commit("input_value",val);
    }
    },
    computed:{
        get_obj(){
        return this.$store.getters.get_obj
    }
    }
}
</script>

<style>
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
    -webkit-appearance: none;

}
form #incm::placeholder {
    font-size: 15px!important;
}
</style>