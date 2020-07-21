<template>
  <div class="product">
    <!-- 搜索框 -->
    <div class="search">
      <template>
        <el-select v-model="value9"
                   filterable
                   clearable
                   remote
                   reserve-keyword
                   @clear="clear"
                   placeholder="请输入关键词"
                   :remote-method="remoteMethod"
                   :loading="loading">
          <el-option v-for="item in options4"
                     :key="item.value"
                     :label="item.label"
                     :value="item.value">
          </el-option>
        </el-select>
      </template>
      <!-- 搜索按钮 -->
      <el-button type="primary"
                 icon="el-icon-search"
                 plain></el-button>
      <!-- 添加按钮 -->
      <el-button type="primary"
                 @click="addStu">添加项目</el-button>
    </div>
    <!-- 班级选择 -->
    <div class="select-class">
      <!-- 框框 -->
      <!-- <el-select v-model="value8"
                 filterable
                 placeholder="请选择">
        <el-option v-for="item in options"
                   :key="item.value"
                   :label="item.label"
                   :value="item.value">
        </el-option>
      </el-select> -->
    </div>
    <!-- 表格 -->
    <div class="stu-table">
      <el-table :data="stuData"
                v-loading="loading"
                border
                style="width: 100%">
        <el-table-column prop="avatarUrl"
                         align="center"
                         label="头像"
                         width="80">
          <template scope="scope">
            <img :src="scope.row.avatarUrl"
                 width="70"
                 alt="">
          </template>
        </el-table-column>
        <el-table-column prop="name"
                         align="center"
                         label="姓名"
                         width="180">
        </el-table-column>
        <el-table-column prop="class"
                         align="center"
                         label="班级">
        </el-table-column>
        <el-table-column prop="productUrl"
                         align="center"
                         label="项目">
        </el-table-column>
        <el-table-column align="center"
                         label="操作">
          <el-button type="primary"
                     class="btn"
                     icon="el-icon-view">查看</el-button>
          <el-button type="primary"
                     class="btn"
                     icon="el-icon-edit">编辑</el-button>
          <el-button type="danger"
                     class="btn"
                     icon="el-icon-delete">删除</el-button>
        </el-table-column>
      </el-table>
    </div>
    <!-- 分页器 -->
    <div class="pagination">
      <el-pagination background
                     layout="prev, pager, next"
                     :total="30">
      </el-pagination>
    </div>
    <!-- dialog弹出框 -->
    <qf-dialog></qf-dialog>
  </div>
</template>
<script>
  import dialog from '../../../components/dialog';
  import { getStuList } from "@/api";
  export default {
    components: {
      'qf-dialog': dialog
    },
    data() {
      return {
        //表格的数据对象
        stuData: [],
        //表格加载动画控制
        loading: true,
        value8: '',
        options4: [],
        value9: [],
        list: [],
        states: ['Alabama', 'Alaska', 'Arizona',
          'Arkansas', 'California', 'Colorado',
          'Connecticut', 'Delaware', 'Florida',
          'Georgia', 'Hawaii', 'Idaho', 'Illinois',
          'Indiana', 'Iowa', 'Kansas', 'Kentucky',
          'Louisiana', 'Maine', 'Maryland',
          'Massachusetts', 'Michigan', 'Minnesota',
          'Mississippi', 'Missouri', 'Montana',
          'Nebraska', 'Nevada', 'New Hampshire',
          'New Jersey', 'New Mexico', 'New York',
          'North Carolina', 'North Dakota', 'Ohio',
          'Oklahoma', 'Oregon', 'Pennsylvania',
          'Rhode Island', 'South Carolina',
          'South Dakota', 'Tennessee', 'Texas',
          'Utah', 'Vermont', 'Virginia',
          'Washington', 'West Virginia', 'Wisconsin',
          'Wyoming']

      }
    },
    methods: {
      //增加学员
      addStu() {
        //弹出dialog
        this.$bus.$emit('showDialog')
        // addStuDetail()
        //   .then(res => {

        //   })
      },
      //更新表格数据
      updateStuTable() {
        this.loading = true;
        getStuList()
          .then(res => {
            if (res.data && res.data.state) {
              this.stuData = res.data.data
              this.loading = false;
            } else {
              this.$message.warning('数据获取失败');
              this.loading = false;
            }
          })
          .catch(err => {
            console.log(err.message);
            this.$message.error('获取数据出错或者网络错误');
            this.loading = false;
          })
      },
      clear(e) { },
      remoteMethod(query) {

      }
    },
    mounted() {
      // 页面加载 获取表格数据
      this.updateStuTable()
      this.$bus.$on('updateStuTable', () => {
        this.updateStuTable()
      })
    }
  }
</script>
<style scoped>
  .search {
    line-height: 60px;
    text-align: left;
    margin: 20px 0;
  }
  .select-class {
    line-height: 40px;
    text-align: left;
    margin-bottom: 20px;
  }
  .stu-table .btn {
    width: 65px;
    height: 25px;
    padding: 0;
  }
  .pagination {
    margin-top: 20px;
  }
</style>
