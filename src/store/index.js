import Vue from 'vue'
import * as VueFire from 'vuefire'
import 'firebase/firestore'
import Vuex from 'vuex';
import {db} from '../main'

Vue.use(Vuex);
Vue.use(VueFire)
Vue.use(Vuex);

export default new Vuex.Store({
    state:{
      list_category:[{id:0,name:"Продукты",img:"http://shcherbinin.students.academy.aiti20.com/coffee.png",cost:0},{id:1,name:"Кафе",img:"http://shcherbinin.students.academy.aiti20.com/coffee.png",cost:0},{id:2,name:"Одежда",img:"http://shcherbinin.students.academy.aiti20.com/coffee.png",cost:0},{id:3,name:"Коммунальные расходы",img:"http://shcherbinin.students.academy.aiti20.com/coffee.png",cost:0},{id:4,name:"Медицина",img:"http://shcherbinin.students.academy.aiti20.com/coffee.png",cost:0},{id:5,name:"Дом",img:"http://shcherbinin.students.academy.aiti20.com/coffee.png",cost:0},{id:6,name:"Транспорт",img:"http://shcherbinin.students.academy.aiti20.com/coffee.png",cost:0},{id:7,name:"Другое",img:"http://shcherbinin.students.academy.aiti20.com/coffee.png",cost:0}]
      ,
    budget:0,
    lastTransaction:"0",
    total_cost:0,
    capital:{},
    id_users:"",
    id_colletions:"",
    history_cost_for_category:{},
    obj_data:{},
    price:{},
    date:new Date()
    },
    mutations:{
      input_value(state,count){
        state.capital.budget+=count;
        state.capital.last_transaction=count;
        if(count>0) {
          state.capital.last_transaction="+"+count} 
        else if( count<0) {
          state.capital.last_transaction=count;
        }
      },
      settings_(state,obj){
        state.capital=obj;
      },
      set_history_cost(state,obj){
        state.history_cost_for_category.push(obj);
      },
      description_(state,val){
        state.description=val;
      },
      wasted(state,name,price){
        state.price[name]=price;
      },


    },
    getters:{ 
    get_cost_element:(state)=>(name)=>{
      return state.list_category.find(cost=>cost.name==name)
    },
    get_array(state){
      return state.history_cost_for_category;
    },
    get_capital(state){
      return state.capital;
    },
    get_lastTransaction(state){
      return state.lastTransaction;
    },
    get_date_now(state){
      return `${(state.date.getDate()<10? '0' : '')+state.date.getDate()}-${(state.date.getMonth()<10? '0' : '')+state.date.getMonth()}-${state.date.getFullYear()}`; 
  },
    get_time_now(state){
      return `${state.date.getHours()}-${state.date.getMinutes()}-${state.date.getSeconds()}`
    }
},
  actions:{
    update_(context,obj){
      db.collection("users").doc('rvMlOQ3NwSjSTxmaCTid').collection("operations").doc('WZO5N7G9oW9CGisq4rQW').update(obj)    
    },
    insert_data(context,obj){
      db.collection('users').doc('rvMlOQ3NwSjSTxmaCTid').collection('operations').doc('WZO5N7G9oW9CGisq4rQW').collection(obj.name_collection).add({created_at:obj.date,description:obj.description,price:obj.value,time:obj.time})
    },
    select_(context,date){
      db.collection('users').doc('rvMlOQ3NwSjSTxmaCTid').collection('operations').get().then(res=>{
        context.commit('settings_',{budget:res.docs[0].data().budget,last_transaction:res.docs[0].data().last_transaction,total_cost:res.docs[0].data().total_cost});
        context.id_colletions=res.docs[0].id;
         for (let variable in context.state.list_category) {
          let category_data=[];
          let summ_cost=0;
          db.collection('users').doc('rvMlOQ3NwSjSTxmaCTid').collection('operations').doc(context.id_colletions).collection(context.state.list_category[variable].name).where('created_at', "==", date).get().then(res=>{
            for (const key in res.docs) {
              category_data.push(res.docs[key].data())
              summ_cost+=res.docs[key].data().price;
            }
            context.state.history_cost_for_category[context.state.list_category[variable].name]=category_data
            context.state.list_category[variable].cost=summ_cost
          }); 
        }
        // context.commit('set_history_cost',history_costs_array);
      }); 
       }
    }
})