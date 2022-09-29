<template>
  <div class="app-container">
    <el-card>
      <el-tabs v-model="activeName">
        <el-tab-pane label="角色管理" name="first">
          <el-row :gutter="10">
            <el-button
              type="primary"
              style="margin-left:10px"
              size="small"
              icon="el-icon-plus"
              @click="addRole"
            >新增角色</el-button>
          </el-row>
          <el-table
            v-loading="loading"
            style="width: 100%"
            :data="roleList"
          >
            <el-table-column
              label="序号"
              width="120"
              type="index"
            />
            <el-table-column
              label="角色名称"
              width="240"
              prop="name"
            />
            <el-table-column
              label="描述"
              prop="description"
            />
            <el-table-column label="操作" width="260">
              <template slot-scope="{row}">
                <el-button size="small" type="success">分配权限</el-button>
                <el-button size="small" type="primary" @click="editRole(row)">编辑</el-button>
                <el-button size="small" type="danger" @click="delRow(row.id)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
          <el-row type="flex" justify="end" align="middle" style="height:60px">
            <el-pagination
              background
              layout="prev, pager, next,sizes"
              :total="total"
              :current-page.sync="page.page"
              :page-size.sync="page.pagesize"
              :page-sizes="[2,5,10,15]"
              @current-change="getRoleList"
              @size-change="getRoleList"
            />
          </el-row>
        </el-tab-pane>
        <el-tab-pane label="公司信息" name="second">公司信息</el-tab-pane>
        <el-alert
          title="对公司名称、公司地址、营业执照、公司地区的更新，将使得公司资料被重新审核，请谨慎修改"
          type="info"
          show-icon
          :closable="false"
        />
        <el-form label-width="120px" style="margin-top:50px">
          <el-form-item label="公司名称">
            <el-input v-model="companyInFo.name" disabled style="width:400px" />
          </el-form-item>
          <el-form-item label="公司地址">
            <el-input v-model="companyInFo.companyAddress" disabled style="width:400px" />
          </el-form-item>
          <el-form-item label="邮箱">
            <el-input v-model="companyInFo.mailbox" disabled style="width:400px" />
          </el-form-item>
          <el-form-item label="备注">
            <el-input v-model="companyInFo.remarks" type="textarea" :rows="3" disabled style="width:400px" />
          </el-form-item>
        </el-form>
      </el-tabs>
    </el-card>
    <addRole ref="addRole" :dialog-visible.sync="dialogVisible" @refreshList="getRoleList" />
  </div>
</template>

<script>
import { getRoleList, deleteRole, getCompanyInfo } from '@/api/setting'
import addRole from './compoents/addRole.vue'
import { mapGetters } from 'vuex'
export default {
  name: '',
  components: {
    addRole
  },
  data() {
    return {
      dialogVisible: false,
      activeName: 'first',
      page: {
        page: 1,
        pagesize: 10
      },
      total: 0,
      roleList: [],
      loading: false,
      companyInFo: {}
    }
  },
  computed: {
    ...mapGetters(['companyId'])
  },
  mounted() {
    this.getRoleList()
    this.getCompanyInfo()
  },
  methods: {
    async getRoleList() {
      try {
        this.loading = true
        const { rows, total } = await getRoleList(this.page)
        this.total = total
        this.roleList = rows
        if (total > 0 && rows.length === 0) {
          this.page.page = this.page.page - 1
          this.getRoleList()
        }
      } catch (e) {
        console.log(e)
      } finally {
        this.loading = false
      }
    },
    addRole() {
      this.dialogVisible = true
    },
    editRole(row) {
      this.$refs.addRole.fromData = { ...row }
      this.dialogVisible = true
    },
    async delRow(id) {
      try {
        await this.$confirm('确认删除嘛', '警告', {
          confirmButtonText: '确认',
          cancelButtonText: '取消',
          type: 'warning'
        })
        // console.log('success')
        await deleteRole(id)
        this.getRoleList()
      } catch (error) {
        console.log('cancel')
      }
    },
    async getCompanyInfo() {
      this.companyInFo = await getCompanyInfo(this.companyId)
    }
  }
}
</script>

<style>

</style>
