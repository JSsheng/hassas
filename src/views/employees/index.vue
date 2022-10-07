<template>
  <div>
    <PageTools type="success">
      <template #before>
        <span>25条数据</span>
      </template>
      <template #after>
        <el-button size="small" type="warning">导入</el-button>
        <el-button size="small" type="danger">导出</el-button>
      </template>
    </PageTools>
  </div>
</template>

<script>
// import PageTools from '@/components/PageTools'
export default {
  name: 'HrsaasIndex',
  components: {
    // PageTools
  },
  data() {
    return {

    }
  },

  mounted() {

  },

  methods: {

  }
}
</script>

<style lang="scss" scoped>

</style>
