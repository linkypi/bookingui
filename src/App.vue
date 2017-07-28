<template>
  <div id="app">
    <h1 style="text-align:center">{{ title }}</h1>

    <table align="center" class='el-table'>
        <thead>
          <th style="text-align: center;" v-for="item of weeks">{{item.title}}</th>
        </thead>
        <tbody>
          <tr v-for="item of tableData">
            <td v-for="value in item" @mouseover="overShow($event)"
             @mouseout="outHide($event)" @click="click($event)">
                <div class="cell" style="width:80px;">{{value}}</div>
            </td>
          </tr>
        </tbody>
    </table>
    <el-table align="center"
      :data="tableData"
      style="width: 100%">

      <el-table-column v-for="item of weeks"
        :prop="item.name"
        :label="item.title"
        width="80">
      </el-table-column>
      
    </el-table>
    <el-form ref="form" :inline="true" :rules="rules" :model="form" label-width="80px">
      <el-form-item label="日期" prop="date">
        <el-date-picker type="date" placeholder="选择日期" :picker-options="datefilter"
                        v-model="form.date"></el-date-picker>
      </el-form-item>
      <el-form-item label="会议室" prop="meetingroom">
        <el-select v-model="form.meetingroom" filterable placeholder="会议室">
          <el-option label="57" value="shanghai"></el-option>
          <el-option label="58" value="beijing"></el-option>
        </el-select> 
      </el-form-item>
      <el-form-item label="开始时间" prop="start_time">
          <el-time-select  placeholder="开始时间" v-model="form.start_time"
                          :picker-options="{
                            start: '09:00',
                            step: '00:30',
                            end: '18:00'
                          }"></el-time-select>
      </el-form-item>
      <el-form-item label="结束时间" prop="end_time">
        <el-time-select  placeholder="结束时间" v-model="form.end_time"
                        :picker-options="{
                            start: '09:00',
                            step: '00:30',
                            end: '18:00',
                            minTime: form.start_time
                          }"></el-time-select>
      </el-form-item>
      <el-form-item label="部门" prop="department">
        <el-select v-model="form.department" filterable  placeholder="部门">
          <el-option label="信息化" value="shanghai"></el-option>
          <el-option label="销售" value="beijing"></el-option>
        </el-select> 
      </el-form-item>

      <el-form-item label="预订人" prop="username">
       <el-select v-model="form.username" filterable  placeholder="预订人">
          <el-option label="张三" value="shanghai"></el-option>
          <el-option label="李四" value="beijing"></el-option>
        </el-select> 
      </el-form-item>

      <el-form-item label-width="80px" style="width: 273px;" align="right">
        <el-button type="primary" @click="onSubmit('form')">确定</el-button>
        <el-button @click="reset('form')">取消</el-button>
      </el-form-item>
    </el-form>

  </div>
</template>

<script>
export default {
  data () {
    return {
      url: 'http://localhost:3000/',
      title: '皇庭会议室预订系统',
      bgcolor:'',
      weeks:[{'title':'',"name":'','index':0 },{'title':'一',"name":'d1'},
       {'title':'二',"name":'d2'},{'title':'三',"name":'d3'},
       {'title':'四',"name":'d4'},{'title':'五',"name":'d5'}],
      tableData:[
        
      ],
      form:{
        username: '',
        department: '',
        date:Date.now(),
        meetingroom:'57F',
        start_time: '',
        end_time: '',
      },
      datefilter: {
          disabledDate(date) {
              return date.getTime() < Date.now() - 8.64e7;
          }
      },
      rules: {
           username: [
                { required: true, message: '请选择预订人', trigger: 'change' }
            ],
           department: [
                { required: true, message: '请选择部门', trigger: 'change' }
            ],
            date: [
                { type:"date", required: true, message: '请选择日期', trigger: 'change' }
            ],
           meetingroom: [
                { required: true, message: '请选择会议室', trigger: 'change' }
            ],
           start_time: [
               { required: true, message: '请选择开始时间', trigger: 'change' }
           ],
           end_time: [
               { required: true, message: '请选择结束时间', trigger: 'change' }
           ]
      }
    }
  },
  methods: {
    onSubmit(formName) {
        console.log('submit!');
        let that = this;
        that.form.date = new Date(that.form.date);
        that.$refs[formName].validate((valid) => {
            if (valid) {
                 this.$http.post(this.url + 'add',that.form)
                 .then((response) => {
                    console.log(eval(response));
                  }).catch(function(response) {
                    console.log(response);
                  });
            } else {
                console.log('error submit!!');
                return false;
            }
        });
    },
    reset(formName) {
        this.$refs[formName].resetFields();
    },
    checktime(timestr){
        var date = new Date().toLocaleDateString();
        var current = new Date(date +' '+ timestr);
        if( current > new Date(date + ' 12:00') && current < new Date(date +' 13:30')){
          return false;
        }
         if( current > new Date(date + ' 18:00')){
          return false;
        }
        return true;
    },
    overShow (e) {
      this.bgcolor = e.target.style.backgroundColor;
      e.target.style.backgroundColor = "green";
    },
    outHide (e) {
      e.target.style.backgroundColor = this.bgcolor;
    },
    click(e){
      e.target.style.backgroundColor = "green";
    }
  },
  created: function() {
      var hour = 9,minutes = 0;

      for (var i = 20; i > 0; i--) {
        var hourstr = hour/10 >= 1? hour.toString():('0' + hour);
        var minstr = minutes/10 > 1? minutes.toString():('0'+ minutes);
        var timestr = hourstr+':'+minstr;

        if(this.checktime(timestr)){
          var item = {'time':'09:00','d1':'','d2':'','d3':'','d4':'','d5':''};
          item.time = timestr;
          this.tableData.push(item);
        }

        minutes+=30;
        if(minutes==60){ minutes = 0; hour+=1; }
      }
      
      this.$http.jsonp(this.url +'test',{ credentials: true })
      .then((response) => {
        console.log(eval(response));
      }).catch(function(response) {
        console.log(response);
      });
  }
}
</script>

<style>
  body {
    font-family: Helvetica, sans-serif;
  }
  .el-form{
    margin:0px auto;
    text-align: center;
  }
  .el-select{
    width:193px;
  }
  .el-table td, .el-table th {
    height: 10px;
    min-width: 0;
    text-overflow: ellipsis;
    vertical-align: middle;
  }

  @media (min-width: 490px) {
    .el-form{
      width: 550px;
    }
  }
  @media (min-width: 768px) {
    .el-form{
      width: 650px;
    }
  }
  @media (min-width: 960px) {
    .el-form{
      width: 70%;
    }
  }
  @media (min-width: 1400px) {
    .el-form{
      width: 950px;
    }
  }
</style>
