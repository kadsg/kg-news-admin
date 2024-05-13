<template>
  <div class="app-container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span style="margin-right: 15px;  font-weight: bold">{{ detail.title }}</span>
        <span style="margin-right: 15px"><el-link type="primary">{{ detail.mediaName }}</el-link></span>
        <span style="margin-right: 15px"><el-tag type="danger">浏览量 {{ detail.viewCount }}</el-tag></span>
        <span style="margin-right: 15px"><el-tag type="success">评论数{{ detail.commentCount }}</el-tag></span>
        <span style="margin-right: 15px"><el-tag type="primary">点赞数{{ detail.likeCount }}</el-tag></span>
        <el-button @click="drawer = true; getCommentList()" type="primary" style="margin-left: 16px;">
            查看评论
        </el-button>
      </div>
      <div class="text item">
        {{ detail.content }}
      </div>
      <div style="margin-top: 30px">
        <el-divider content-position="right">本文发布于{{ detail.createTime }}</el-divider>
      </div>
    </el-card>

    <el-drawer
      title="评论区"
      :visible.sync="drawer"
      :with-header="false"
      size="50%">
      <div class="text item">
        <el-card>
          <el-input
            type="textarea"
            :rows="2"
            placeholder="快来发表意见吧！"
            v-model="textarea">
          </el-input>
          <div style="display: flex; justify-content: flex-end;">
            <el-button style="margin-top: 30px " type="success" icon="el-icon-check" circle>发送</el-button>
          </div>
        </el-card>
        </div>

      <!--   二级评论   -->
      <div>
        <el-drawer
          :title="`回复 ${authorName}`"
          :append-to-body="true"
          :before-close="handleClose"
          :visible.sync="innerDrawer">
          <el-card>
            <el-input
              type="textarea"
              :rows="2"
              placeholder="发布一条友善的评论~"
              v-model="textarea">
            </el-input>
            <div style="display: flex; justify-content: flex-end;">
              <el-button style="margin-top: 30px " type="success" icon="el-icon-check" circle>发送</el-button>
            </div>
          </el-card>

          <div class="block" style="margin-top: 30px">
              <el-timeline v-for="comment in subCommentList">
                <el-timeline-item  :timestamp="comment.createTime" placement="top">
                  <el-card>
                    <h4>{{ comment.authorName }}</h4>
                    <p>{{ comment.content }}</p>
                    <span>
                    <el-button class="el-icon-arrow-up" type="text" size="mini">点赞 {{ comment.likeCount }}</el-button>
                    <el-button class="el-icon-arrow-down" type="text" size="mini">踩 {{ comment.unlikeCount }}</el-button>
                  </span>
                  </el-card>
                </el-timeline-item>
              </el-timeline>
          </div>
        </el-drawer>
      </div>

      <!--   顶级评论   -->
      <div class="block">
        <el-timeline v-for="comment in commentList">
          <el-timeline-item v-if="comment.fatherId === null" :timestamp="comment.createTime" placement="top">
            <el-card>
              <h4>{{ comment.authorName }}</h4>
              <p>{{ comment.content }}</p>
              <span>
                <el-button class="el-icon-arrow-up" type="text" size="mini">点赞 {{ comment.likeCount }}</el-button>
                <el-button class="el-icon-arrow-down" type="text" size="mini">踩 {{ comment.unlikeCount }}</el-button>
                <el-button class="el-icon-s-comment" type="text" size="mini" @click="openSubComment(comment.authorName, comment.children)">回复 {{ comment.children.length }}</el-button>
              </span>
            </el-card>
          </el-timeline-item>
        </el-timeline>
      </div>
    </el-drawer>

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
      commentList: [],
      subCommentList: [],
      authorName: '',
      drawer: false,
      innerDrawer: false,
      direction: 'rtl',
      textarea: ''
    }
  },
  created() {
    this.getDetail()
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
        this.commentList = response.data.list
      })
    },
    openSubComment(authorName, children) {
      this.authorName = authorName
      this.subCommentList = children
      this.innerDrawer = true
    },
    handleClose(done) {
      done()
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
