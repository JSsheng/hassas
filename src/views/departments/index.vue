<template>
  <div class="departments-container">
    <el-card>
      <treeTools :tree-node="company" :is-root="false" />
    </el-card>
    <el-tree :data="departs" :props="defaultProps" :default-expand-all="true">
      <treeTools slot-scope="{data}" :tree-node="data" />
    </el-tree>
  </div>
</template>

<script>
import { getDepartments } from '@/api/departments'
import treeTools from '@/views/departments/componets/terr-tools.vue'
export default {
  name: 'HrsaasIndex',
  components: {
    treeTools
  },

  data() {
    return {
      company: { name: '江苏传智播客教育科技股份有限公司', manager: '负责人' },
      departs: [{ name: '总裁办', manager: '曹操', children: [{ name: '董事会', manager: '曹丕' }] },
        { name: '行政部', manager: '刘备' },
        { name: '人事部', manager: '孙权' }],
      defaultProps: {
        label: 'name' // 表示 从这个属性显示内容
      }
    }
  },

  mounted() {
    this.getDepartments()
  },

  methods: {
    async getDepartments() {
      const res = await getDepartments()
      console.log(res)
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
