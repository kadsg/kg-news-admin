<template>
  <div class="app-container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span style="margin-right: 15px;  font-weight: bold">{{ detail.title }}</span>
        <span style="margin-right: 15px"><el-link type="primary">{{ detail.mediaName }}</el-link></span>
        <span style="margin-right: 15px"><el-tag type="danger">浏览量 {{ detail.viewCount }}</el-tag></span>
        <span style="margin-right: 15px"><el-tag type="success">评论数{{ detail.commentCount }}</el-tag></span>
        <span style="margin-right: 15px"><el-tag type="primary">点赞数{{ detail.likeCount }}</el-tag></span>
      </div>
      <div class="text item">
        {{ detail.content }}
      </div>
      <div style="margin-top: 30px">
        <el-divider content-position="right">本文发布于{{ detail.createTime }}</el-divider>
      </div>
    </el-card>
  </div>
</template>

<script>
import { getDetail } from '@/api/news'
import { getNewsCommentList } from '@/api/comment'

export default {
  name: 'Detail',
  data() {
    return {
      id: this.$route.params.id,
      detail: {},
      commentQuery: {
        newsId: this.$route.params.id,
        commentId: '',
        parentId: '',
        pageNum: 1,
        pageSize: 10
      },
      commentList: []
    }
  },
  created() {
    this.getDetail()
    this.getCommentList()
  },
  methods: {
    getDetail() {
      getDetail(this.id).then(response => {
        this.detail = response.data
      })
    },
    getCommentList() {
      this.commentQuery.newsId = this.id
      getNewsCommentList(this.commentQuery).then(response => {
        this.commentList = response.data
      })
    }
  }
}
</script>

<style>
.text {
  font-size: 16px; /* 调整字体大小 */
  line-height: 1.5; /* 增加行间距 */
}

.item {
  margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both
}

.box-card {
  width: 100%;
}
</style>
