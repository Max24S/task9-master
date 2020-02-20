import Vue from 'vue'
import App from './App.vue'
import Vuex from 'vuex';
import * as VueFire from 'vuefire'
import firebase from 'firebase/app'
import 'firebase/firestore'
Vue.use(Vuex);
Vue.use(VueFire)
firebase.initializeApp({
  apiKey: "AIzaSyBiCAV7HLZMGjSHqMn-S_o1f7lrmixGvCQ",
  authDomain: "mypr-17866.firebaseapp.com",
  databaseURL: "https://mypr-17866.firebaseio.com",
  projectId: "mypr-17866",
  storageBucket: "mypr-17866.appspot.com",
  messagingSenderId: "193365158587",
  appId: "1:193365158587:web:134c53d61f83c7552dd79e",
  measurementId: "G-7EB0YSDRG7"
})
export const db = firebase.firestore()
const store=new Vuex.Store({
    state:{
      costs_list:[{id:0,name:"Продукты",img:"http://shcherbinin.students.academy.aiti20.com/coffee.png",cost:0},{id:1,name:"Кафе",img:"http://shcherbinin.students.academy.aiti20.com/coffee.png",cost:0},{id:2,name:"Одежда",img:"http://shcherbinin.students.academy.aiti20.com/coffee.png",cost:0},{id:3,name:"Коммунальные расходы",img:"http://shcherbinin.students.academy.aiti20.com/coffee.png",cost:0},{id:4,name:"Медицина",img:"http://shcherbinin.students.academy.aiti20.com/coffee.png",cost:0},{id:5,name:"Дом",img:"http://shcherbinin.students.academy.aiti20.com/coffee.png",cost:0},{id:6,name:"Транспорт",img:"http://shcherbinin.students.academy.aiti20.com/coffee.png",cost:0},{id:7,name:"Другое",img:"http://shcherbinin.students.academy.aiti20.com/coffee.png",cost:0}]
      ,
    value:0,
    lastTransaction:"0",
    total_cost:0,
    settings:{},
    id_users:"",
    id_colletions:"",
    array:[],
    obj_data:{},
    obj_list:{},
    price:{},
    date:new Date()
    },
    mutations:{
      input_value(state,count){
        state.value+=count;
        state.lastTransaction=count;
        if(count>0) {
        state.lastTransaction="+"+count} 
        else if( count<0) {
          state.lastTransaction=count;
          state.total_cost+=state.lastTransaction;
        }
      },
      specific_purchase(state,element){
        element.cost+=state.lastTransaction;
      },
      settings_(state,obj){
        state.settings=obj;
      },
      array_(state,obj){
        state.array.push(obj);
      },
      description_(state,val){
        state.description=val;
      },
      wasted(state,name,price){
        state.price[name]=price;
      }
    },
    getters:{ 
      sum(state){
      return state.total_cost;
    },
    get_cost_element:(state)=>(name)=>{
      return state.costs_list.find(cost=>cost.name==name)
    },
    get_db(state){
      return state.settings;
    },
    get_array(state){
      return state.array;
    },
    get_obj(state){
      return state.obj_data={budget:state.value,last_transaction:state.lastTransaction,total_cost:state.total_cost}
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
    specific_purchase(context,val_name) {
      context.commit('specific_purchase',context.getters.get_cost_element(val_name));
    },
    update_(context,obj){
      db.collection("users").doc('rvMlOQ3NwSjSTxmaCTid').collection("operations").doc('WZO5N7G9oW9CGisq4rQW').update(obj)    
    },
    insert_data(context,obj){
      // console.log(context+" " +name_collection+" "+obj)
      db.collection('users').doc('rvMlOQ3NwSjSTxmaCTid').collection('operations').doc('WZO5N7G9oW9CGisq4rQW').collection(obj.name_collection).add({created_at:obj.date,description:obj.description,price:obj.value,time:obj.time})
    },
    get_cost_list_for_day(context){
      let object={}
      console.log(context.state.array);

      // for(let i=0;i<context.state.array.length;i++){
        for (let i in context.state.array){
        console.log(context.state.array[i].name)
        let obg=context.state.array[i];
        for (let key in obg) {
          let sum=0;
          for (const el in obg[key]) {
              let element_categoties=obg[key];
              sum+=element_categoties[el].price  
            }
            object[context.array[i].name]=sum;
          }
        }
      },
    select_(context,date){
      db.collection('users').doc('rvMlOQ3NwSjSTxmaCTid').collection('operations').get().then(res=>{
        context.commit('settings_',{total:res.docs[0].data().budget,last_transaction:res.docs[0].data().last_transaction,total_cost:res.docs[0].data().total_cost});
        // console.log(context.getters.get_db());
        context.id_colletions=res.docs[0].id;
         let collection_name=['Продукты','Кафе']
         let a;
         for (let variable in collection_name) {
          let d=[];
          let name_obj={};
          db.collection('users').doc('rvMlOQ3NwSjSTxmaCTid').collection('operations').doc(context.id_colletions).collection(collection_name[variable]).where('created_at', "==", date).get().then(res=>{
            a=res.docs;
           collection_name[variable];
            for (const key in a) {
              d.push(a[key].data())
            }
            name_obj[collection_name[variable]]=d
            context.commit('array_',name_obj);
          }); 
        }
        context.dispatch('get_cost_list_for_day');
      }); 
       }
    }
})
Vue.config.productionTip = false
new Vue({
  render: h => h(App),
  store
}).$mount('#app')
