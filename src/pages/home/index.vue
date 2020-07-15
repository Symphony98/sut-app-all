<template>
  <div class="home">
    <el-container>
      <!-- 侧边菜单栏 -->
      <el-aside width="200">
        <subMenu></subMenu>
      </el-aside>
      <el-container>
        <!-- 顶栏布局 -->
        <el-header>
          <el-row type="flex"
                  class="row-bg"
                  justify="space-between">
            <el-col :span="6">
              <div class="grid-content">
                图标
              </div>
            </el-col>
            <el-col :span="6">
              <div class="grid-content">
                万锋管理系统
              </div>
            </el-col>
            <el-col :span="6">
              <div class="grid-content">
                <el-avatar shape="square"
                           :size="40"
                           fit="fit"
                           src="http://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTIzXDib7zrmdYxdEQpYk85B26DZAJS6PUJC7ic4Fydibdz9L2gU3hloPcibuyo0xAFztxqPbgdVWp1zpQ/132"></el-avatar>
                <span>欢迎您:</span>
                <span>退出</span>
              </div>
            </el-col>
          </el-row>
        </el-header>
        <!-- main内容布局 -->
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
import subMenu from '../../components/subMenu'
export default {
  components: {
    subMenu
  }
}
</script>
<style scoped>
  /* 修改avatar的样式 */
  .el-avatar.el-avatar--square {
    vertical-align: middle;
    margin-right: 10px;
  }
  /* layout顶栏样式 */
  .grid-content {
    border-radius: 4px;
    min-height: 60px;
  }
  .row-bg {
    background-color: #41b883;
  }

  /* container样式 */
  .el-header {
    background-color: #41b883;
    color: #333;
    text-align: center;
    line-height: 60px;
  }

  .el-aside {
  }

  .el-main {
    background-color: #e9eef3;
    color: #333;
    text-align: center;
    line-height: 160px;
  }

  body > .el-container {
    margin-bottom: 40px;
  }

  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }

  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }
</style>
