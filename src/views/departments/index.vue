<template>
  <div v-loading="loading" class="departments-container">
    <el-card>
      <treeTools :tree-node="company" :is-root="false" />
    </el-card>
    <el-tree :data="departs" :props="defaultProps" :default-expand-all="true">
      <treeTools slot-scope="{data}" :tree-node="data" @addDept="handelAddDept" @editDept="editDept" @refreshList="getDepartments" />
    </el-tree>
    <addDept ref="addDept" :dialog-visible.sync="dialogVisible" :tree-node="currentNode" />
  </div>
</template>

<script>
import addDept from './componets/add-dept.vue'
import { tranListToTreeData } from '@/utils/index'
import { getDepartments } from '@/api/departments'
import treeTools from '@/views/departments/componets/terr-tools.vue'
export default {
  name: 'HrsaasIndex',
  components: {
    treeTools,
    addDept
  },

  data() {
    return {
      company: { name: 'companyName', manager: 'companyManage' },
      departs: [],
      defaultProps: {
        label: 'name' // 表示 从这个属性显示内容
      },
      dialogVisible: false,
      currentNode: {},
      loading: false
    }
  },
  mounted() {
    this.getDepartments()
  },
  methods: {
    async getDepartments() {
      try {
        this.loading = true
        const { depts, companyName, companyManage } = await getDepartments()
        // console.log(depts)
        this.departs = tranListToTreeData(depts, '')
        this.company = { name: companyName, manager: companyManage, id: '' }
      } finally {
        this.loading = false
      }
    },
    handelAddDept(node) {
      this.dialogVisible = true
      this.currentNode = node
    },
    editDept(node) {
      this.dialogVisible = true
      this.currentNode = { ...node }
      this.$refs.addDept.formData = { ...node }
    }
  }
}
</script>

<style lang="scss">
.departments-container {
  width: 900px;
  margin: 20px auto;
  .el-tree {
    .el-tree-node__content {
      padding-right: 20px;
    }
  }
}
</style>
