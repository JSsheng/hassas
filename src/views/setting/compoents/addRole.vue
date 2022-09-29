<template>
  <el-dialog
    :title="title"
    width="50%"
    :visible.sync="dialogVisible"
    :before-close="handleClose"
  >
    <el-form
      ref="roleDialogForm"
      label-width="80px"
      :model="fromData"
    >
      <el-form-item
        prop="name"
        label="角色"
        :rules="[{ required: true, message: '角色名称不能为空', trigger: 'blur' }]"
      >
        <el-input v-model="fromData.name" />
      </el-form-item>
      <el-form-item label="描述" prop="description">
        <el-input v-model="fromData.description" type="textarea" row="3" />
      </el-form-item>
    </el-form>
    <el-row slot="footer" type="flex" justify="center" align="middle" class="dialog-footer">
      <el-button @click="handleClose">取 消</el-button>
      <el-button type="primary" @click="submit">确 定</el-button>
    </el-row>
  </el-dialog>
</template>

<script>
import { addRole, updateRole } from '@/api/setting'
export default {
  name: 'HrsaasAddRole',
  props: {
    dialogVisible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      fromData: {
        name: '',
        description: ''
      }
    }
  },
  computed: {
    title() {
      return this.fromData.id ? '编辑角色' : '新增角色'
    }
  },
  methods: {
    handleClose() {
      this.$emit('update:dialogVisible', false)
      this.$refs.roleDialogForm.resetFields()
      this.fromData = { name: '', description: '' }
    },
    async  submit() {
      try {
        await this.$refs.roleDialogForm.validate()
        this.loading = true
        this.fromData.id ? await updateRole(this.fromData) : await addRole(this.fromData)
        this.$emit('refreshList')
        this.$message.success(this.fromData.id ? '编辑成功' : '新增成功')
        this.handleClose()
      } catch (e) {
        console.log(e)
      } finally {
        this.loading = false
      }
    }
  }
}

</script>

<style lang="scss" scoped>

</style>
