<template>
    <div>
        <ul>
            <li class="flex w-3/6 mx-auto mb-8" v-for="item in lists" :key="item.id"><span class="flex"><img class="w-1/12" :src=item.img alt=""><span class="flex items-center">{{item.name}}</span></span><span class="flex items-center">{{item.cost}}$</span></li>
        </ul>
        <div>
            <button @click="exit=true">-</button>
        </div>
       <waste v-if="exit" @cancel="exit=false"></waste>
                <!-- {{get_db}} 
                {{get_array}} -->
                {{get_array}}
                {{get_o}}



    </div> 
</template>

<script>
import Waste from './Waste'
export default {
data(){
    return{
    exit:false
    }
},
components:{Waste},
computed :{
    lists(){
        return this.$store.state.costs_list;
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
     }
    // get_list_elements()

},
created(){

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