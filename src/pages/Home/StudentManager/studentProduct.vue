<template>
  <div class="product">
    <!-- 搜索框 -->
    <div class="search">
      <template>
        <el-select v-model="searchValue"
                   filterable
                   clearable
                   remote
                   @blur="searchBlur"
                   @change="searchTextChange"
                   reserve-keyword
                   @clear="clear"
                   placeholder="请输入关键词"
                   :remote-method="remoteMethod"
                   :loading="loading">
          <el-option v-for="item in searchList"
                     :key="item.sId"
                     :label="item.name"
                     :value="item.name">
          </el-option>
        </el-select>
      </template>
      <!-- 搜索按钮 -->
      <el-button type="primary"
                 icon="el-icon-search"
                 @click="searchButton"
                 plain></el-button>
      <!-- 添加按钮 -->
      <el-button type="primary"
                 @click="addStu"
                 :disabled="disabled"
                 >添加项目</el-button>
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
        <el-table-column prop="headimgurl"
                         align="center"
                         label="头像"
                         width="80">
          <template slot-scope="scope">
            <el-avatar shape="square"
                       :size="50"
                       fit="fill"
                       :src="scope.row.headimgurl"></el-avatar>
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
          <template slot-scope="{row}">
            <el-button type="primary"
                       class="btn"
                       icon="el-icon-view"
                       @click="$router.push({name:'studentProfile'})">查看</el-button>
            <el-button type="primary"
                       class="btn"
                       icon="el-icon-edit"
                       @click="editStu(row)">编辑</el-button>
            <el-button type="danger"
                       class="btn"
                       icon="el-icon-delete"
                       @click="deleteStu(row)">删除</el-button>
          </template>
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
  import dialog from '../../../components/dialog'
  import { getStuList, delStu, searchStu } from '@/api'
  export default {
    components: {
      'qf-dialog': dialog
    },
    data() {
      return {
        disabled: false,
        // 表格的数据对象
        stuData: [],
        // 表格加载动画控制
        loading: true,
        value8: '',
        searchList: [],
        searchValue: [],
        blurSearchValue: "",
        list: []
      }
    },
    methods: {
      searchButton() {
        // 点击搜索按钮
        this.loading = true
        let key = this.searchValue
        searchStu(key)
          .then(res => {
            if (res.data && res.data.state) {
              console.log(res.data.data)
              //更改表格数据对象
              this.stuData = res.data.data
              this.loading = false;
            } else {
              this.$message.warning("搜索失败")
            }
          })
          .catch(err => {
            this.$message.error("搜索出错")
          })
      },
      //搜索框失去焦点 保持输入框的内容
      searchBlur() {
        //将存储好的输入框值 设置给select组件
        this.searchValue = this.blurSearchValue;
      },
      //编辑学员
      editStu(row) {
        this.$bus.$emit("editStuEvent", row)
      },
      //删除学员
      deleteStu(row) {
        console.log(row)
        if (row && row.sId) {
          //让用户确认是否删除
          this.$confirm('此操作将永久删除该文件, 是否继续?', '删除提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            //用户企鹅人删除
            //调用删除请求
            delStu(row.sId)
              .then(res => {
                if (res.data && res.data.state) {
                  //删除成功
                  this.$message.success("删除成功")
                  this.updateStuTable()
                } else {
                  this.$message.warning("删除失败")
                }
              })
              .catch(err => {
                this.$message.error("删除出错")
              })
          }).catch(() => {
            // 用户取消删除
            this.$message('已取消删除');
          });
        } else {
          //没有row
          this.$message.error("没有传入row对象")
          return
        }
      },
      // 增加学员
      addStu() {
        // 弹出dialog
        this.$bus.$emit('showDialog')
      },
      // 更新表格数据
      updateStuTable() {
        this.loading = true
        getStuList()
          .then(res => {
            if (res.data && res.data.state) {
              this.stuData = res.data.data
              this.loading = false
            } else {
              this.$message.warning('数据获取失败')
              this.loading = false
            }
          })
          .catch(err => {
            console.log(err.message)
            this.$message.error('获取数据出错或者网络错误')
            this.loading = false
          })
      },
      clear(e) { },
      //搜索框选中值发生变化的事件
      searchTextChange(searchText) {
        this.loading = true
        console.log(searchText)
        //再次调用搜索接口
        let key = searchText
        searchStu(key)
          .then(res => {
            if (res.data && res.data.state) {
              console.log(res.data.data)
              //更改表格数据对象
              this.stuData = res.data.data
              this.loading = false;
            } else {
              this.$message.warning("搜索失败")
            }
          }).catch(err => {
            this.$message.error("搜索出错")
          })
      },
      remoteMethod(query) {
        // 键盘弹起的时候获取输入值 赋值三方变量进行输入框内容存储
        this.blurSearchValue = query;
        let key = query;
        searchStu(key)
          .then(res => {
            if (res.data && res.data.state) {
              console.log(res.data.data)
              this.searchList = res.data.data
            } else {
              this.$message.warning("搜索失败")
            }
          }).catch(err => {
            this.$message.error("搜索出错")
          })
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
