<template>
  <div class="dashhord-container">
    <div class="app-container">
      <el-card class="box-card">
        <el-tabs v-model="activeName">
          <el-tab-pane label="登录账户设置" name="first">
            <el-form ref="from" :model="accounInfo" :rules="accounInfoRules" label-width="120px">
              <!-- style="margin-left: 120px; margin-top:30px" -->
              <el-form-item label="姓名:" prop="username">
                <el-input v-model="accounInfo.username" />
                <!-- style="width:300px" -->
              </el-form-item>
              <el-form-item label="密码:" prop="password">
                <el-input v-model="accounInfo.password" type="password" />
                <!-- style="width:300px" -->
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="updateEmployess">更新</el-button>
              </el-form-item>
            </el-form>
          </el-tab-pane>
          <el-tab-pane label="个人详情" name="second">
            <!-- 配置管理 -->
            <UserInfo />
          </el-tab-pane>
          <el-tab-pane label="岗位信息" name="third">
            <!-- 角色管理 -->
            <JobInfo />
          </el-tab-pane>
        </el-tabs>
      </el-card>
    </div>
  </div>
</template>

<script>
import { getUserDetailById, saveUserDetailById } from '@/api/user.js'
import UserInfo from '@/views/employees/components/user-info.vue'
import JobInfo from '@/views/employees/components/job-info.vue'
export default {
  components: {
    UserInfo,
    JobInfo
  },
  data() {
    return {
      activeName: 'first',
      accounInfo: {},
      accounInfoRules: {
        username: [
          { required: true, message: '请输入员工名称', trigger: 'blur' },
          { min: '2', max: '10', message: '长度在2到十位之间', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入员工密码', trigger: 'blur' },
          { max: '6', message: '密码长度最小六位', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.loadEmployessInfo()
  },
  methods: {
    async loadEmployessInfo() {
      const res = await getUserDetailById(this.$route.params.id)
      this.accounInfo = res
      // console.log(res)
    },
    async updateEmployess() {
      try {
        await this.$refs.from.validate()
        await saveUserDetailById(this.accounInfo)
        this.$message.success('更新成功')
        // console.log('校验成功')
      } catch (err) {
        console.log(err)
      }
    }
  }
}
</script>

<style lang="less" scoped>

</style>
