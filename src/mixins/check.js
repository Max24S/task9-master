export default {
    data() {
        return {
            value_input:'',
            style:'',
            placeholder:'Value',
            style_btn:'bg-gray-500',
            check_btn:true,
            selected:"",
            value_desc:"",
            check:[this.value_input,this.selected]
        }
    },
    methods :{
        check_input(){
            if(!this.value_input){
               this.style="border: 1px solid red"
               this.placeholder="не должно быть пустой строкой"
               this.style_btn="bg-gray-500"
                this.check_btn=true
            }
            else{
            this.style="border:none"
            this.check_btn=false
            this.style_btn="bg-blue-500";
            }
        }
    }
    ,
    directives: {
        focus: {
            // определение директивы
            inserted: function (el) {
            el.focus()
            }
        }
    },
    watch:{
        check(){
            if(!this.check.value_input || !this.check.selected){
               this.style="border: 1px solid red"
               this.placeholder="не должно быть пустой строкой"
               this.style_btn="bg-gray-500"
                this.check_btn=true
            }
            else{
            this.style="border:none"
            this.check_btn=false
            this.style_btn="bg-blue-500";
            }
        }

    }   
}