<template>
  <div class="departments-container">
    <el-row type="flex" justify="space-between" align="middle" style="width: 100%">
      <el-col>
        <span>{{ treeNode.name }}</span>
      </el-col>
      <el-col :span="4">
        <el-row type="flex" justify="right">
          <span style="margin-right:8px;">{{ treeNode.manager }}</span>
          <el-dropdown @command="handleCommand">
            <span>操作 <i class="el-icon-arrow-down el-icon--right" /> </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="add">添加子部门</el-dropdown-item>
              <el-dropdown-item v-if="isRoot" command="edit">编辑部门</el-dropdown-item>
              <el-dropdown-item v-if="isRoot" commadn="del">删除部门</el-dropdown-item>
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
  },
  methods: {
    handleCommand(type) {
      console.log(type)
      if (type === 'add') {
        // 添加
        this.$emit('addDept', this.treeNode)
      } else if (type === 'edit') {
        // 编辑
      } else {
        // 删除
      }
    }
  }
}
</script>

<style lang="scss" scoped>
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
