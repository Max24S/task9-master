<template>
<div class="w-full max-w-xs">
  <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
    <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
      <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-state">
        Выберите услуги
      </label>
      <div class="relative">
        <select v-model="check.selected" class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-state">
          <option v-for="item in lists" :key="item.id">{{item.name}}</option>
        </select>
        <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
          <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
        </div>
      </div>
    </div>
    <div class="mb-4">
      <label class="block text-gray-700 text-sm font-bold mb-2" for="value_id">
        Введите оплату
      </label>
      <input v-focus :style="style" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="value_id" type="number" v-model.number="check.value_input" :placeholder="placeholder">
    </div>
    <div class="mb-4">
      <label class="block text-gray-700 text-sm font-bold mb-2" for="value_desc">
        на что потратили
      </label>
      <input v-focus :style="style" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="value_desc" type="text" v-model="value_desc" :placeholder="placeholder">
    </div>
    <div class="flex items-center justify-between">
        <button  :disabled='check_btn' :class='style_btn' @click="setValue" class="text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
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
    return{
    }
  },
   mixins: [Check],
    methods:{
        setValue(){
            this.value(this.check.value_input);
            this.$store.dispatch('specific_purchase',this.check.selected);
            this.$store.dispatch('insert_data',{date:this.get_date_now,description:this.value_desc,name_collection:this.check.selected,value:(this.get_value*-1),time:this.get_time_now});
            this.$store.dispatch('update_', this.get_obj);
            this.$store.dispatch('select_',this.get_date_now);
            this.cancel()
        },
        cancel(){
            this.$emit("cancel")
        }
        ,          
        value(val){
        return this.$store.commit("input_value",(-1*val));
      }
    },
    computed:{
    lists(){
        return this.$store.state.costs_list;
    },
    get_value(){
      return this.$store.getters.get_lastTransaction;
    },
    get_obj(){
    return this.$store.getters.get_obj
    },
    get_date_now(){
      return this.$store.getters.get_date_now;
    },
    get_time_now(){
      return this.$store.getters.get_time_now;
    }
}
}
</script>
<style>
</style>