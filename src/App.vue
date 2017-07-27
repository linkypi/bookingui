<template>
  <div id="app">
    <h1 style="text-align:center">{{ title }}</h1>
<!--     <el-row :gutter="10">
      <el-col :xs="8" :sm="6" :md="4" :lg="3"><div class="grid-content bg-purple"></div></el-col>
      <el-col :xs="4" :sm="6" :md="8" :lg="9"><div class="grid-content bg-purple-light"></div></el-col>
      <el-col :xs="4" :sm="6" :md="8" :lg="9"><div class="grid-content bg-purple"></div></el-col>
      <el-col :xs="8" :sm="6" :md="4" :lg="3"><div class="grid-content bg-purple-light"></div></el-col>
    </el-row> -->
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
      title: '皇庭会议室预订系统',
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
    startHacking () {
      this.$notify({
        title: 'It Works',
        message: 'We have laid the groundwork for you. Now it\'s your time to build something epic!',
        duration: 6000
      })
    },
    onSubmit(formName) {
        console.log('submit!');
        let that = this;
        that.form.date = new Date(that.form.date);
        that.$refs[formName].validate((valid) => {
            if (valid) {
                 this.$http.post('http://localhost:3000/add',that.form)
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
    }
  },
  created: function() {
      this.$http.jsonp('http://localhost:3000/test',{ credentials: true })
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
