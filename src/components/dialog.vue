<template>
  <!-- dialog窗口 用于添加和编辑的弹窗-->
  <el-dialog title="增加学员项目"
             :visible.sync="dialogVisible">
    <el-form :model="stuForm"
             :rules="stuRules"
             ref="addStuRuleForm">
      <el-form-item label="头像">
        <el-upload class="uploadAvatar"
                   action="http://chst.vip:1901/students/uploadStuAvatar"
                   list-type="picture-card"
                   :on-success="uploadSuccess"
                   :on-remove="removeAvatar"
                   :limit="1"
                   name="avatar"
                   :multiple="false">
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-input v-show="false"
                  v-model="stuForm.avatarUrl"
                  placeholder=""></el-input>
      </el-form-item prop="name">
      <el-form-item label="姓名"
                    prop="name">
        <el-input v-model="stuForm.name"
                  autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="项目地址"
                    prop="productUrl">
        <el-input v-model="stuForm.productUrl"
                  autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="班级"
                    prop="class">
        <el-input v-model="stuForm.class"
                  autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="年龄"
                    prop="age">
        <el-input v-model="stuForm.age"
                  autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="城市"
                    prop="city">
        <el-input v-model="stuForm.city"
                  autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="学历"
                    prop="degree">
        <el-input v-model="stuForm.degree"
                  autocomplete="off"></el-input>
      </el-form-item>
      </el-form-item>
      <el-form-item label="描述"
                    prop="description">
        <el-input v-model="stuForm.description"
                  autocomplete="off"></el-input>
      </el-form-item>
      </el-form-item>
    </el-form>
    <div slot="footer"
         class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary"
                 @click="confirmClick('addStuRuleForm')">确 定</el-button>
    </div>
  </el-dialog>
</template>
<script>
  export default {
    data() {
      return {
        showAvatar: true,
        dialogVisible: true,
        stuRules: {
          name: [
            { required: true, message: '请输入名字', trigger: 'blur' },
          ],
          class: [
            { required: true, message: '请输入班级', trigger: 'blur' },
          ],
          degree: [
            { required: true, message: '请输入学历', trigger: 'blur' },
          ],
          city: [
            { required: true, message: '请输入城市', trigger: 'blur' },
          ],
          productUrl: [
            { required: true, message: '请输入项目地址', trigger: 'blur' },
          ],
          age: [
            { required: true, message: '请输入年龄', trigger: 'blur' },
          ],
          description: [
            { required: true, message: '请输入描述', trigger: 'blur' },
          ]
        },
        stuForm: {
          name: "",
          productUrl: "",
          avatarUrl: "",
          class: '',
          age: "",
          city: "",
          degree: "",
          description: ""
        }
      }
    },
    methods: {
      uploadSuccess(r) {
        console.log(r)
      },
      removeAvatar(r) {
        console.log(r)
      }
    },
    confirmClick() { },
  }
</script>
<style>
  .uploadAvatar {
    text-align: left;
  }
  .el-upload-list__item.is-success,
  .el-upload--picture-card {
    width: 100px !important;
    height: 100px !important;
    line-height: 100px !important;
  }
  .el-dialog__header {
    padding: 0 !important;
    line-height: 60px;
  }
</style>