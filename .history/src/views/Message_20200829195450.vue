<template>
<div class="content">
    
</div> 
</template>

<script>
import axios from 'axios'
export default {
    data(){
        return{
        }
    },
    methods:{
    },
    created(){
      axios({
            url:'http://106.75.157.168:5657/api/getinfo',
	            method: 'get'
            })
            .then((response)=>{
                 console.log(response.data);
                 this.imageUrl="http://106.75.157.168:5657/api"+response.data.头像;
                 this.name=response.data.用户名;
            })
            .catch(function(error){
                console.log(error);
            });
    }
}
</script>

<style scoped>
.content{
  width: 100%;
   top: 11.3%;
  
    bottom:0;
  
    position:fixed;
  
    overflow-y:scroll;
  
    overflow-x:hidden;
  right: 0;
  background-color: #FAFAFA;
}
</style>