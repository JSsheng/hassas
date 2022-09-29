<template>
  <div>
    <el-row type="flex" justify="space-between" align="middle" style="width: 100%">
      <el-col>
        <span>{{ treeNode.name }}</span>
      </el-col>
      <el-col :span="4">
        <el-row type="flex" justify="right">
          <span style="margin-right:8px;">{{ treeNode.manager }}</span>
          <el-dropdown>
            <span>操作 <i class="el-icon-arrow-down el-icon--right" /> </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>添加子部门</el-dropdown-item>
              <el-dropdown-item v-if="isRoot">编辑部门</el-dropdown-item>
              <el-dropdown-item v-if="isRoot">删除部门</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'HrsaasTreeTools',
  props: {
    treeNode: {
      type: Object,
      required: true
    },
    isRoot: {
      type: Boolean,
      default: true
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
