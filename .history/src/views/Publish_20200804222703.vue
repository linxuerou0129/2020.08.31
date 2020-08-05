<template>
<div class="content">
    <div class="head">
        <img src="../assets/xuhua.jpg" width="100%" height="300" style="opacity:0.3;z-index:9">
        <div  class="addP" @click="showDialog=true">
            <img src="../assets/addP.png" width="120">
            <div style="margin-left:10px">
                <p class="p1">上传图片</p>
                <p class="p2">最多可上传九张</p>
            </div>
        </div>
        <div class="input">
            <el-input
            placeholder="请输入标题"
            v-model="tittle"
            maxlength="40"
            show-word-limit
            clearable>
            </el-input>
        </div>
    </div>
    <div class="zhengWen">
      <div style="width:70%">
        <el-input
          type="textarea"
          :autosize="{ minRows: 32}"
          placeholder="请输入正文"
          v-model="textarea">
        </el-input>
      </div>
      <div>
        <div class="information">
          <div>
            <p>出发日期</p>
            <el-date-picker
            v-model="data"
            type="date"
            placeholder="选择出发日期">
            </el-date-picker>
          </div>
          <div>
            <p>出行天数</p>
            <el-input-number v-model="dayNum" :min="1" label="输入出行天数"></el-input-number>
          </div>
          <div>
            <p>人物</p>
            <el-autocomplete
              class="inline-input"
              v-model="people"
              :fetch-suggestions="querySearch"
              placeholder="请输入内容"
              @select="handleSelect"
            ></el-autocomplete>
          </div>
          <div>
            <p>人均费用</p>
            <el-input-number v-model="money" :min="0" :step="100" label="输入人均费用"></el-input-number>
          </div>
        </div>
        <div class="information2">
          <p>目的地</p>
          <el-radio v-model="radio" label="0">国内</el-radio>
          <el-radio v-model="radio" label="1">国外</el-radio>
          <div v-if="radio=='1'">
            <el-select  placeholder="请选择目的地" filterable style="width: 77.9%;margin-top:5%;" v-model="place">
              <el-option-group v-for="group in country" :key="group.label" :label="group.label">
                <el-option v-for="item in group.options" :key="item.value" :label="item.label" :value="item.label">
                    <span style="float: left">{{ item.label }}</span>
                    <span style="float: right; color: #8492a6; font-size: 13px">{{ item.value }}</span>
	              </el-option>
              </el-option-group>
            </el-select>
          </div>
		  <div v-if="radio=='0'">
			  <v-distpicker :hide-area="true" @province="onChangeProvince" @city="onChangeCity" style="margin-top:5%;"></v-distpicker>
        <el-select v-model="scenics" filterable placeholder="请选择景点" style="width: 77.9%;margin-top:5%;">
          <el-option
            v-for="item in option"
            :key="item"
            :value="item">
          </el-option>
        </el-select>
		  </div>
        </div>
      </div>
    </div>
  <el-button type="primary" round style="margin-left:42.5%;margin-bottom:5%;width:15%;height:8%" @click="publish">发布游记</el-button>
  <el-dialog title="上传图片" :visible.sync="showDialog">
    <el-upload
      action="http://47.107.243.207/api/upload"
      list-type="picture-card"
      :on-preview="handlePictureCardPreview"
      :on-remove="handleRemove"
      :on-success="uploadSuccess"
      :limit="9"
      :on-exceed="handleExceed">
      <i class="el-icon-plus"></i>
    </el-upload>
    <el-dialog :visible.sync="dialogVisible" title="预览/添加备注">
      <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>
  </el-dialog>
</div>
</template>

<script>
import axios from 'axios'
import VDistpicker from 'v-distpicker'
export default {
	components: { VDistpicker },
    data(){
        return{
            tittle:'',
            showDialog:false,
            dialogImageUrl: '',
            dialogVisible: false,
            showEdit:false,
            image: [],
            fileList:{},
            textarea:'',
            data:'',
            dayNum:1,
            people:'',
            restaurants: [],
            money:0,
            radio:'0',
            place:'',
            scenics:'',
            option:[],
            country:[/*{
    			　　label: '热门国家',
    			　　options: [,]
    		　　},*/{
    			　　label: '所有国家',
    			　　options: [
    			{value:'Angola',label:'安哥拉'},
					{value:'Afghanistan',label:'阿富汗'},
					{value:'Albania',label:'阿尔巴尼亚'},
					{value:'Algeria',label:'阿尔及利亚'},
					{value:'Andorra',label:'安道尔共和国'},
					{value:'Anguilla',label:'安圭拉岛'},
					{value:'Antigua and Barbuda',label:'安提瓜和巴布达'},
					{value:'Argentina',label:'阿根廷'},
					{value:'Armenia',label:'亚美尼亚'},
					{value:'Ascension',label:'阿森松'},
					{value:'Australia',label:'澳大利亚'},
					{value:'Austria',label:'奥地利'},
					{value:'Azerbaijan',label:'阿塞拜疆'},
					{value:'Bahamas',label:'巴哈马'},
					{value:'Bahrain',label:'巴林'},
					{value:'Bangladesh',label:'孟加拉国'},
					{value:'Barbados',label:'巴巴多斯'},
					{value:'Belarus',label:'白俄罗斯'},
					{value:'Belgium',label:'比利时'},
					{value:'Belize',label:'伯利兹'},
					{value:'Benin',label:'贝宁'},
					{value:'Bermuda Is',label:'百慕大群岛'},
					{value:'Bolivia',label:'玻利维亚'},
					{value:'Botswana',label:'博茨瓦纳'},
					{value:'Brazil',label:'巴西'},
					{value:'Brunei',label:'文莱'},
					{value:'Bulgaria',label:'保加利亚'},
					{value:'Burkina Faso',label:'布基纳法索'},
					{value:'Burma',label:'缅甸'},
					{value:'Burundi',label:'布隆迪'},
					{value:'Cameroon',label:'喀麦隆'},
					{value:'Canada',label:'加拿大'},
					{value:'Cayman Is',label:'开曼群岛'},
					{value:'Central African Republic',label:'中非共和国'},
					{value:'Chad',label:'乍得'},
					{value:'Chile',label:'智利'},
					{value:'Colombia',label:'哥伦比亚'},
					{value:'Congo',label:'刚果'},
					{value:'Cook Is',label:'库克群岛'},
					{value:'Costa Rica',label:'哥斯达黎加'},
					{value:'Cuba',label:'古巴'},
					{value:'Cyprus',label:'塞浦路斯'},
					{value:'Czech Republic',label:'捷克'},
					{value:'Denmark',label:'丹麦'},
					{value:'Djibouti',label:'吉布提'},
					{value:'Dominica Rep',label:'多米尼加共和国'},
					{value:'Ecuador',label:'厄瓜多尔'},
					{value:'Egypt',label:'埃及'},
					{value:'EI Salvador',label:'萨尔瓦多'},
					{value:'Estonia',label:'爱沙尼亚'},
					{value:'Ethiopia',label:'埃塞俄比亚'},
					{value:'Fiji',label:'斐济'},
					{value:'Finland',label:'芬兰'},
					{value:'France',label:'法国'},
					{value:'French Guiana',label:'法属圭亚那'},
					{value:'French Polynesia',label:'法属玻利尼西亚'},
					{value:'Gabon',label:'加蓬'},
					{value:'Gambia',label:'冈比亚'},
					{value:'Georgia',label:'格鲁吉亚'},
					{value:'Germany',label:'德国'},
					{value:'Ghana',label:'加纳'},
					{value:'Gibraltar',label:'直布罗陀'},
					{value:'Greece',label:'希腊'},
					{value:'Grenada',label:'格林纳达'},
					{value:'Guam',label:'关岛'},
					{value:'Guatemala',label:'危地马拉'},
					{value:'Guinea',label:'几内亚'},
					{value:'Guyana',label:'圭亚那'},
					{value:'Haiti',label:'海地'},
					{value:'Honduras',label:'洪都拉斯'},
					{value:'Hungary',label:'匈牙利'},
					{value:'Iceland',label:'冰岛'},
					{value:'India',label:'印度'},
					{value:'Indonesia',label:'印度尼西亚'},
					{value:'Iran',label:'伊朗'},
					{value:'Iraq',label:'伊拉克'},
					{value:'Ireland',label:'爱尔兰'},
					{value:'Israel',label:'以色列'},
					{value:'Italy',label:'意大利'},
					{value:'Ivory Coast',label:'科特迪瓦'},
					{value:'Jamaica',label:'牙买加'},
					{value:'Japan',label:'日本'},
					{value:'Jordan',label:'约旦'},
					{value:'Kampuchea (Cambodia )',label:'柬埔寨'},
					{value:'Kazakstan',label:'哈萨克斯坦'},
					{value:'Kenya',label:'肯尼亚'},
					{value:'Korea',label:'韩国'},
					{value:'Kuwait',label:'科威特'},
					{value:'Kyrgyzstan',label:'吉尔吉斯坦'},
					{value:'Laos',label:'老挝'},
					{value:'Latvia',label:'拉脱维亚'},
					{value:'Lebanon',label:'黎巴嫩'},
					{value:'Lesotho',label:'莱索托'},
					{value:'Liberia',label:'利比里亚'},
					{value:'Libya',label:'利比亚'},
					{value:'Liechtenstein',label:'列支敦士登'},
					{value:'Lithuania',label:'立陶宛'},
					{value:'Luxembourg',label:'卢森堡'},
					{value:'Madagascar',label:'马达加斯加'},
					{value:'Malawi',label:'马拉维'},
					{value:'Malaysia',label:'马来西亚'},
					{value:'Maldives',label:'马尔代夫'},
					{value:'Mali',label:'马里'},
					{value:'Malta',label:'马耳他'},
					{value:'Mariana Is',label:'马里亚那群岛'},
					{value:'Martinique',label:'马提尼克'},
					{value:'Mauritius',label:'毛里求斯'},
					{value:'Mexico',label:'墨西哥'},
					{value:'Moldova',label:'摩尔多瓦'},
					{value:'Monaco',label:'摩纳哥'},
					{value:'Mongolia',label:'蒙古'},
					{value:'Montserrat Is',label:'蒙特塞拉特岛'},
					{value:'Morocco',label:'摩洛哥'},
					{value:'Mozambique',label:'莫桑比克'},
					{value:'Namibia',label:'纳米比亚'},
					{value:'Nauru',label:'瑙鲁'},
					{value:'Nepal',label:'尼泊尔'},
					{value:'Netheriands Antilles',label:'荷属安的列斯'},
					{value:'Netherlands',label:'荷兰'},
					{value:'New Zealand',label:'新西兰'},
					{value:'Nicaragua',label:'尼加拉瓜'},
					{value:'Niger',label:'尼日尔'},
					{value:'Nigeria',label:'尼日利亚'},
					{value:'North Korea',label:'朝鲜'},
					{value:'Norway',label:'挪威'},
					{value:'Oman',label:'阿曼'},
					{value:'Pakistan',label:'巴基斯坦'},
					{value:'Panama',label:'巴拿马'},
					{value:'Papua New Cuinea',label:'巴布亚新几内亚'},
					{value:'Paraguay',label:'巴拉圭'},
					{value:'Peru',label:'秘鲁'},
					{value:'Philippines',label:'菲律宾'},
					{value:'Poland',label:'波兰'},
					{value:'Portugal',label:'葡萄牙'},
					{value:'Puerto Rico',label:'波多黎各'},
					{value:'Qatar',label:'卡塔尔'},
					{value:'Reunion',label:'留尼旺'},
					{value:'Romania',label:'罗马尼亚'},
					{value:'Russia',label:'俄罗斯'},
					{value:'Saint Lueia',label:'圣卢西亚'},
					{value:'Saint Vincent',label:'圣文森特岛'},
					{value:'Samoa Eastern',label:'东萨摩亚(美)'},
					{value:'Samoa Western',label:'西萨摩亚'},
					{value:'San Marino',label:'圣马力诺'},
					{value:'Sao Tome and Principe',label:'圣多美和普林西比'},
					{value:'Saudi Arabia',label:'沙特阿拉伯'},
					{value:'Senegal',label:'塞内加尔'},
					{value:'Seychelles',label:'塞舌尔'},
					{value:'Sierra Leone',label:'塞拉利昂'},
					{value:'Singapore',label:'新加坡'},
					{value:'Slovakia',label:'斯洛伐克'},
					{value:'Slovenia',label:'斯洛文尼亚'},
					{value:'Solomon Is',label:'所罗门群岛'},
					{value:'Somali',label:'索马里'},
					{value:'South Africa',label:'南非'},
					{value:'Spain',label:'西班牙'},
					{value:'SriLanka',label:'斯里兰卡'},
					{value:'St.Lucia',label:'圣卢西亚'},
					{value:'St.Vincent',label:'圣文森特'},
					{value:'Sudan',label:'苏丹'},
					{value:'Suriname',label:'苏里南'},
					{value:'Swaziland',label:'斯威士兰'},
					{value:'Sweden',label:'瑞典'},
					{value:'Switzerland',label:'瑞士'},
					{value:'Syria',label:'叙利亚'},
					{value:'Tajikstan',label:'塔吉克斯坦'},
					{value:'Tanzania',label:'坦桑尼亚'},
					{value:'Thailand',label:'泰国'},
					{value:'Togo',label:'多哥'},
					{value:'Tonga',label:'汤加'},
					{value:'Trinidad and Tobago',label:'特立尼达和多巴哥'},
					{value:'Tunisia',label:'突尼斯'},
					{value:'Turkey',label:'土耳其'},
					{value:'Turkmenistan',label:'土库曼斯坦'},
					{value:'Uganda',label:'乌干达'},
					{value:'Ukraine',label:'乌克兰'},
					{value:'United Arab Emirates',label:'阿拉伯联合酋长国'},
					{value:'United Kiongdom',label:'英国'},
					{value:'United States of America',label:'美国'},
					{value:'Uruguay',label:'乌拉圭'},
					{value:'Uzbekistan',label:'乌兹别克斯坦'},
					{value:'Venezuela',label:'委内瑞拉'},
					{value:'Vietnam',label:'越南'},
					{value:'Yemen',label:'也门'},
					{value:'Yugoslavia',label:'南斯拉夫'},
					{value:'Zimbabwe',label:'津巴布韦'},
					{value:'Zaire',label:'扎伊尔'},
					{value:'Zambia',label:'赞比亚'}
    			]
    		}],

        }
    },
    methods:{
      publish(){
        for(let i=0;i<this.fileList.length;i++){
           this.image.push({
                image:"http://47.107.243.207/api"+this.fileList[i].response.icon
            });
        }
        console.log(this.image);
        axios.post('http://47.107.243.207/api/publish', {
                image:this.image,
                text:this.textarea,
                title:this.tittle,
                position:this.place+this.scenics,
                statr:this.data,
                days:this.dayNum,
                people:this.people,
                pay:this.money+"元"
            })
          .then((response)=> {
            console.log(response.data);
            this.$message({
              message: '发布成功',
              type: 'success'
            });
          })
          .catch(function (error) {
            console.log(error);
          });
      },
	  onChangeProvince(a){
        console.log(a) 
        this.place = a.value
      },    
      onChangeCity(a){
        console.log(a)  
		//let name=(a.value).substring(0,2);
		let name=a.value;
		axios.post('http://47.107.243.207/api/get_scenic_list', {
                city:name
            })
          .then((response)=> {
            console.log(response.data);
            this.option=response.data.scenics;
          })
          .catch(function (error) {
            console.log(error);
          });
        this.place = this.place+name;
      },
      querySearch(queryString, cb) {
        var restaurants = this.restaurants;
        var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
        // 调用 callback 返回建议列表的数据
        cb(results);
      },
      createFilter(queryString) {
        return (restaurant) => {
          return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
        };
      },
      loadAll() {
        return [
          { "value": "家人/父母"},
          { "value": "情侣/夫妻" },
          { "value": "亲子"},
          { "value": "朋友"}
        ];
      },
      handleSelect(item) {
        console.log(item);
      },
      handleRemove(file, fileList) {
        console.log(file, fileList);
        this.fileList=fileList;
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
      uploadSuccess(res,file,fileList){
            this.fileList=fileList;
            console.log(this.fileList);
      },
      handleExceed(){
        this.$message({
          message: '至多只能上传九张',
          type: 'warning'
        });
      },
    },
    mounted(){
      this.restaurants = this.loadAll();
    }
}
</script>

<style scoped>
.information2{
  width: 125%;
  margin-left: 10%;
  padding: 10%;
  border-radius: 5px;
  background-color: #fafafa;
  margin-top: 10%;
}
.information{
  width: 125%;
  margin-left: 10%;
  padding: 10%;
  border-radius: 5px;
  background-color: #fafafa;
}
.zhengWen{
  margin:3% 5% ;
  display: -webkit-flex; /* Safari */
  display: flex;
  flex-direction: row;
}
.input{
    z-index: 999;
    position: absolute;
    width: 80%;
    top: 40%;
    left: 11%;
}
.p2{
    color: gray;
}
.p1{
    font-size: 25px;
}
.addP{
    z-index: 999;
    position: absolute;
    top: 12%;
    left: 40%;
    display: -webkit-flex; /* Safari */
  display: flex;
  flex-direction: row;
}
.content{
  width: 100%;
   top: 11.3%;
  
    bottom:0;
  
    position:fixed;
  
    overflow-y:scroll;
  
    overflow-x:hidden;
  right: 0;
  background-color:#fff;
}
</style>