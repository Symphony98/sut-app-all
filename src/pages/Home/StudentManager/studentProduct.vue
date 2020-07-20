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
      <el-button type="primary">添加项目</el-button>
    </div>
    <!-- 班级选择 -->
    <div class="select-class">
      <!-- 框框 -->
      <el-select v-model="value8"
                 filterable
                 placeholder="请选择">
        <el-option v-for="item in options"
                   :key="item.value"
                   :label="item.label"
                   :value="item.value">
        </el-option>
      </el-select>
    </div>
    <!-- 表格 -->
    <div class="stu-table">

      <el-table :data="tableData"
                border
                style="width: 100%">
        <el-table-column prop="date"
                         label="日期"
                         width="180">
        </el-table-column>
        <el-table-column prop="name"
                         label="姓名"
                         width="180">
        </el-table-column>
        <el-table-column prop="address"
                         label="地址">
        </el-table-column>
        <el-table-column label="操作">
          <el-button type="primary"
                     class="btn"
                     icon="el-icon-edit">编辑</el-button>
          <el-button type="danger"
                     class="btn"
                     icon="el-icon-delete">删除</el-button>
        </el-table-column>
      </el-table>

    </div>
    <!-- dialog -->
    <qf-dialog></qf-dialog>
  </div>
</template>
<script>
  import dialog from "../../../components/dialog"
  export default {
    components: {
      "qf-dialog": dialog
    },
    data() {
      return {
        tableData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }],
        options: [{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }],
        value8: '',
        options4: [],
        value9: [],
        list: [],
        loading: false,
        states: ["Alabama", "Alaska", "Arizona",
          "Arkansas", "California", "Colorado",
          "Connecticut", "Delaware", "Florida",
          "Georgia", "Hawaii", "Idaho", "Illinois",
          "Indiana", "Iowa", "Kansas", "Kentucky",
          "Louisiana", "Maine", "Maryland",
          "Massachusetts", "Michigan", "Minnesota",
          "Mississippi", "Missouri", "Montana",
          "Nebraska", "Nevada", "New Hampshire",
          "New Jersey", "New Mexico", "New York",
          "North Carolina", "North Dakota", "Ohio",
          "Oklahoma", "Oregon", "Pennsylvania",
          "Rhode Island", "South Carolina",
          "South Dakota", "Tennessee", "Texas",
          "Utah", "Vermont", "Virginia",
          "Washington", "West Virginia", "Wisconsin",
          "Wyoming"]

      }
    },
    methods: {
      clear(e) {
        console.log(e)
      },
      remoteMethod(query) {
        if (query !== '') {
          this.loading = true;
          setTimeout(() => {
            this.loading = false;
            this.options4 = this.list.filter(item => {
              return item.label.toLowerCase()
                .indexOf(query.toLowerCase()) > -1;
            });
          }, 200);
        } else {
          this.options4 = [];
        }
      }
    },
    mounted() {
      this.list = this.states.map(item => {
        return { value: item, label: item };
      });
    },
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
</style>