<template>
  <div class="app-container">
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
      <el-table-column type="selection" align="center" width="40">
      </el-table-column>
      <el-table-column align="center" label="序号" width="35">
        <template slot-scope="scope">
          {{ scope.$index }}
        </template>
      </el-table-column>
      <el-table-column label="订单编号" width="140">
        <template slot-scope="scope">
          {{ scope.row.ordernumber }}
        </template>
      </el-table-column>
      <el-table-column label="收货人" width="63" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.receivername }}</span>
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="订单状态" width="80" align="center">
        <template slot-scope="scope">
          <el-tag :type="scope.row.state | statusFilter">
            <div v-if="scope.row.state == -1">已取消</div>
            <div v-else-if="scope.row.state == 0">待付款</div>
            <div v-else-if="scope.row.state == 1">待发货</div>
            <div v-else-if="scope.row.state == 2">待收货</div>
            <div v-else-if="scope.row.state == 3">已完成</div>
            <div v-else-if="scope.row.state == 5">已退款</div>
            <div v-else-if="scope.row.state == 7">已关闭</div>
            <div v-else-if="scope.row.state == -2">已删除</div>
            <div v-else>{{ scope.row.state }}</div></el-tag>
        </template>
      </el-table-column>
      <el-table-column label="拼团状态" width="77" align="center">
        <template slot-scope="scope">
          <div v-if="scope.row.groupbuystate == 1">正在拼团</div>
            <div v-else-if="scope.row.groupbuystate == 2">拼团成功</div>
            <div v-else-if="scope.row.groupbuystate == 3">拼团失败</div>
            <div v-else-if="scope.row.groupbuystate == 0 || scope.row.groupbuystate == null"></div>
        </template>
      </el-table-column>
      <el-table-column label="最新物流" width="77" align="center">
        <template slot-scope="scope">
          <div v-if="scope.row.logisticsname == '' || scope.row.logisticsname == null">暂无</div>
          <div v-else>{{ scope.row.logisticsname }}</div>
        </template>
      </el-table-column>
      <el-table-column label="物流运单号" width="91" align="center">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="text" size="small">添加单号</el-button>
        </template>
      </el-table-column>
      <el-table-column label="支付方式" width="77" align="center">
        <template slot-scope="scope">
          <div v-if="scope.row.dealtype == null" style="color:black">无</div>
          <div v-else-if="scope.row.dealtype == 1 " style="color:blue">支付宝</div>
          <div v-else-if="scope.row.dealtype == 0 " style="color:black">货到付款</div>
          <div v-else-if="scope.row.dealtype == 2 " style="color:green">微信</div>
          <div v-else-if="scope.row.dealtype == 4 " style="color:black">已确认收款</div>
          <div v-else-if="scope.row.dealtype == 5 " style="color:black">全额饭卡</div>
          <div v-else-if="scope.row.dealtype == 6 " style="color:black">福利</div>
          <div v-else-if="scope.row.dealtype == 3 " style="color:#9B30FF">银联支付</div>
          <!-- {{ scope.row.dealtype }} -->
        </template>
      </el-table-column>
      <el-table-column label="下单时间" width="151" align="center">
        <template slot-scope="scope">
          {{ scope.row.createtime }}
        </template>
      </el-table-column>
      <el-table-column label="实付款" width="63" align="center">
        <template slot-scope="scope">
          {{ scope.row.real_price }}
        </template>
      </el-table-column>
      <el-table-column label="用户名" width="63" align="center">
        <template slot-scope="scope">
          {{ scope.row.name }}
        </template>
      </el-table-column>
      <el-table-column label="标签" width="49" align="center">
        <template slot-scope="scope">
          {{ scope.row.tagname }}
        </template>
      </el-table-column>
      <el-table-column label="部门名" width="110" align="center">
        <template slot-scope="scope">
          {{ scope.row.deptname }}
        </template>
      </el-table-column>
      <el-table-column label="操作" width="49" align="center">
        <template slot-scope="scope">
          <el-button
          size="mini"
          @click="handleEdit(scope.$index, scope.row)">Edit</el-button>
        </template>
      </el-table-column>
      <!-- <el-table-column class-name="status-col" label="Status" width="110" align="center">
        <template slot-scope="scope">
          <el-tag :type="scope.row.status | statusFilter">{{ scope.row.status }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="Display_time" width="200">
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span>{{ scope.row.display_time }}</span>
        </template>
      </el-table-column> -->
    </el-table>
  </div>
</template>

<script>
import { getList } from '@/api/table'

export default {
  name: 'Ordermanage',
  filters: {
    statusFilter(status) {
      const statusMap = {
        1: 'primary',
        2: 'warning',
        3: 'success',
        5: 'warning',
        7: 'success',
        '-1': 'primary',
        '-2': 'primary'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      list: null,
      listLoading: true
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      getList().then(response => {
        this.list = response.data.items
        this.listLoading = false
      })
    }
  }
}
</script>
