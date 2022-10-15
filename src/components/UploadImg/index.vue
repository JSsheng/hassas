<template>
  <div>
    <el-upload
      class="upLoadImg"
      action="#"
      list-type="picture-card"
      :file-list="fileList"
      :on-preview="onPreview"
      :on-remove="onRemove"
      :on-change="onChange"
      :http-request="onHttpRequest"
      :before-upload="beforeUpload"
      :limit="1"
    >
      <i class="el-icon-plus" />
    </el-upload>
    <el-dialog
      title="图片预览"
      :visible.sync="previewDialog"
      width="50%"
    >
      <img style="width:100%;" :src="previewImgUrl" alt="">
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'UploadImg',
  data() {
    return {
      fileList: [

      ],
      previewDialog: false,
      previewImgUrl: ''
    }
  },
  methods: {
    onPreview(file) {
      this.previewDialog = true
      this.previewImgUrl = file.url
    },
    onRemove(file, fileList) {
      // console.log('删除')
      this.fileList = fileList
    },
    beforeUpload(file) {
      const allowTypes = ['image/jpeg', 'image/gif']
      const ishas = allowTypes.includes(file.type)
      if (!ishas) {
        this.$message.error('小犊子只能上传' + allowTypes.join(`,`) + '类型文件')
        return false
      }

      const maxSize = 1 * 1024 * 1024
      if (file.size > maxSize) {
        this.$message.error('图片大小不能超过1Mb')
        return false
      }
    },
    onChange(file, fileList) {
      this.fileList = fileList
    },
    onHttpRequest() {
      console.log('等一等')
    }
  }
}
</script>

<style lang="scss" scoped>
.upLoadImg{
  width: 148px;
  height: 148px;
  overflow: hidden;
}
</style>
