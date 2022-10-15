<template>
  <div>
    <template>
      <div class="app-container">
        <PageTools>
          <span slot="before">共{{ total }}条记录</span>
          <template slot="after">
            <el-button size="small" type="warning" @click="$router.push('/import')">导入</el-button>
            <el-button size="small" type="danger" @click="exportExcel">导出</el-button>
            <el-button size="small" type="primary" @click="handleEmploy">新增员工</el-button>
          </template>
        </PageTools>
        <!-- 放置表格和分页 -->
        <el-card>
          <el-table v-loading="loading" border :data="list">
            <el-table-column type="index" label="序号" sortable="" width="80" />
            <el-table-column label="头像">
              <template slot-scope="{row}">
                <img style="width:100px;height:100px" :src="row.staffphoto" alt="" @click="genQrCode(row.staffphoto)">
              </template>
            </el-table-column>
            <el-table-column label="姓名" prop="username" />
            <el-table-column label="工号" prop="workNumber" />
            <el-table-column label="聘用形式" prop="formOfEmployment" :formatter="formatterFn" />
            <el-table-column label="部门" prop="departmentName" />
            <el-table-column label="入职时间" sortable="" prop="timeOfEntry">
              <template slot-scope="{ row }">
                {{ row.timeOfEntry | formatDate }}
              </template>
            </el-table-column>
            <el-table-column label="账户状态" prop="enableState">
              <template slot-scope="{ row }">
                <!-- 根据当前状态来确定 是否打开开关 -->
                <el-switch :value="row.enableState === 1" />
              </template>
            </el-table-column>
            <el-table-column label="操作" fixed="right" width="280">
              <template slot-scope="{row}">
                <el-button type="text" size="small" @click="goDetai(row)">查看</el-button>
                <el-button type="text" size="small">转正</el-button>
                <el-button type="text" size="small">调岗</el-button>
                <el-button type="text" size="small">离职</el-button>
                <el-button type="text" size="small">角色</el-button>
                <el-button type="text" size="small" @click="del(row.id)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
          <!-- 分页组件 -->
          <el-row type="flex" justify="end" align="middle" style="height: 60px">
            <el-pagination
              layout=" sizes,  prev, pager, next , total"
              :total="total"
              :current-page.sync="page.page"
              :page-size.sync="page.size"
              :page-sizes="[2,5,10]"
              @current-change="getEmployeeList"
              @size-change="getEmployeeList"
            />
          </el-row>
        </el-card>
      </div>
    </template>
    <addEmployee :dialog-visible.sync="dialogVisible" />
    <el-dialog
      title="图片预览"
      :visible.sync="dialogVisibleQrCode"
      width="50%"
    >
      <!-- <span>这是一段信息</span> -->
      <canvas ref="canvas" />
    </el-dialog>
  </div>
</template>

<script>
import EnumHireType from '@/api/constant/employees'
import { getEmployeeList, delEmployee } from '@/api/employees'
import addEmployee from './components/add-employee.vue'
import Qrcode from 'qrcode'
// import PageTools from '@/components/PageTools'
export default {
  name: 'HrsaasIndex',
  components: {
    // PageTools
    addEmployee
  },
  data() {
    return {
      page: {
        page: 1,
        size: 10
      },
      list: [],
      total: 0,
      loading: false,
      hireType: EnumHireType.hireType,
      dialogVisible: false,
      dialogVisibleQrCode: false
    }
  },

  mounted() {
    this.getEmployeeList()
  },

  methods: {
    async getEmployeeList() {
      try {
        // console.log(this.hareType)
        this.loading = true
        const { rows, total } = await getEmployeeList(this.page)
        // const res = await getEmployeeList(this.page)
        // console.log(res)
        this.list = rows
        this.total = total
      } finally {
        this.loading = false
      }
    },
    formatterFn(row, column, cellValue) {
      const res = this.hireType.find(ele => ele.id === cellValue)
      return res ? res.value : '未知'
    },
    handleEmploy() {
      this.dialogVisible = true
    },
    async del(id) {
      try {
        await this.$confirm('确认删除嘛', '警告', {
          type: 'warning'
        })
        await delEmployee(id)
        this.getEmployeeList()
      } catch (error) {
        console.log(error)
      }
    },
    async exportExcel() {
      const { rows } = await getEmployeeList({
        page: 1,
        size: this.total
      })
      // console.log(rows)
      const { export_json_to_excel } = await import('@/vendor/Export2Excel.js')
      const exportExceMapPath = {
        '姓名': 'username',
        '手机号': 'mobile',
        '入职日期': 'timeOfEntry',
        '聘用形式': 'formOfEmployment',
        '转正日期': 'correctionTime',
        '工号': 'workNumber',
        '部门': 'departmentName'
      }
      const header = Object.keys(exportExceMapPath)
      const data = rows.map(item => {
        return header.map(h => {
          if (h === '聘用形式') {
            const find = this.hireType.find(hire => {
              return hire.id === item[exportExceMapPath[h]]
            })
            // return item[exportExceMapPath[h]] + '测试'
            return find ? find.value : '未知'
          }
          return item[exportExceMapPath[h]]
        })
      })
      export_json_to_excel({
        // console.log(data);
        header, // 表头 必填
        data, // 具体数据 必填
        filename: '黑马程序员列表', // 非必填
        autoWidth: true, // 非必填
        bookType: 'xlsx' // 非必填
      })
    },
    goDetai(row) {
      this.$router.push('/employees/detail/' + row.id)
    },
    genQrCode(staffphoto) {
      if (!staffphoto) return this.$message.error('没有头像')
      this.dialogVisibleQrCode = true
      this.$nextTick(() => {
        Qrcode.sta(this.$refs.canvas, staffphoto, function(error) {
          if (error) console.error(error)
          console.log('success')
        })
      })
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
