<template>
    <div>
        <ul>
            <li ref="name_category"  @click="call_formhistory=true;getname(item.name)" class="flex w-3/6 mx-auto mb-8" v-for="item in lists" :key="item.id"><span class="flex"><img class="w-1/12" :src=item.img alt=""><span class="flex items-center">{{item.name}}</span></span><span class="flex items-center">{{item.cost}}$</span></li>
        </ul>
        <div>
            <button @click="call_waste=true">-</button>
        </div>
       <waste v-if="call_waste" @cancel="call_waste=false"></waste>
        <form-history v-if="call_formhistory" :name="name" @cancel="call_formhistory=false"></form-history>
  
    </div> 
</template>

<script>
import FormHistory from './FormHistory'
import Waste from './Waste'
export default {
data(){
    return{
    call_waste:false,
    call_formhistory:false,
    name:""
    }
},
components:{Waste,FormHistory},
methods:{
    getname(name){
       this.name=name;
    }
},
computed :{
    lists(){
        return this.$store.state.list_category;
    }
    ,
    get_db(){
        return this.$store.getters.get_db;
    },
    get_array(){
       return this.$store.getters.get_array;
    },
    get_description(){
        return this.$store.getters.get_description_;
    },
    get_obj(){
        return this.$store.getters.get_obj
    },
    get_o(){
       return this.$store.getters.get_cost_list_for_day;
     },
    costs_for_category(){
        console.log(this.$store.state.cost_list);
        return this.$store.state.cost_list;
     },
     history_cost_for_categorey(){
         console.log(this.$store.state.history_cost_for_category)
         return this.$store.state.history_cost_for_category;
     }       
     , get_date_now(){
      return this.$store.getters.get_date_now;
    },
    get_time_now(){
      return this.$store.getters.get_time_now;
    },
    // get_list_elements()

},
created(){
    this.$store.dispatch('select_',this.get_date_now);
}
}
</script>

<style>
li:hover{
    opacity: 0.8;
     border-color: transparent;
    outline: solid 2px #1dde85;
    
}
li{
    cursor: pointer;
}
</style>