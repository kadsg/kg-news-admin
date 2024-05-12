<template>
  <div class="tab-container">
    <el-tabs v-model="activeName" style="margin-top:15px;" type="border-card">
      <el-tab-pane v-for="item in tabMapOptions" :key="item.roleId" :label="item.label" :name="item.roleId">
        <keep-alive>
          <tab-pane v-if="activeName===item.roleId" :role-id="item.roleId" @updatePageInfo="handlePageInfoUpdate"  />
        </keep-alive>
      </el-tab-pane>
    </el-tabs>
    <pagination v-show="total>0" :total="total" :page.sync="listQuery.pageNum" :limit.sync="listQuery.pageSize" @pagination="getList" />
  </div>
</template>

<script>
import TabPane from './components/TabPane'
import { getList } from '@/api/roles'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination

export default {
  name: 'Tab',
  components: { TabPane, Pagination },
  data() {
    return {
      total: 0,
      list: null,
      listQuery: {
        roleId: '',
        username: '',
        pageNum: 1,
        pageSize: 10
      },
      tabMapOptions: [],
      activeName: ''
    }
  },
  watch: {
    activeName(val) {
      this.$router.push(`${this.$route.path}?tab=${val}`)
    }
  },
  async created() {
    await this.getList()
    // init the default selected tab
    const tab = this.$route.query.tab
    if (tab) {
      this.activeName = tab
    }
  },
  methods: {
    async getList() {
      const response = await getList()
      this.list = response.data.list
      this.total = response.data.total
      this.list.forEach(item => {
        this.tabMapOptions.push({ label: item.description, roleId: item.roleId })
      })
    },
    handlePageInfoUpdate(total, pageNum, pageSize) {
      console.log(total, pageNum, pageSize)
      // 在这里处理 pageNum 和 pageSize
      this.total = total
      this.listQuery.pageNum = pageNum
      this.listQuery.pageSize = pageSize
    }
  }
}
</script>

<style scoped>
  .tab-container {
    margin: 30px;
  }
</style>
