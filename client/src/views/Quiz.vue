<template>
  <div class="quiz">
    <el-carousel class="quiz-carousel" height="100%" indicator-position="none" :loop="false" :autoplay="false" @change="change">
      <el-carousel-item v-for="(item, index) in questions" :key="index">
        <div v-if="!showAnswer">
          <div style="font-size:20px;margin-top:200px;">{{ item.title }}</div>
          <el-button @click="showAnswer=true">看答案</el-button>
        </div>
        <div v-else>
          <div style="font-size:20px;margin-top:200px;">{{ item.title }}</div>
          <div>{{ item.answer }}</div>
          <el-rate v-model="item.score"></el-rate>
        </div>
        <el-button @click="submit">完成</el-button>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>
<script>
import ajax from '@/utils/ajax'
export default {
  name: 'Quiz',
  data() {
    return {
      questions: [],
      showAnswer: false
    }
  },
  mounted() {
    ajax({
      url: '/questions',
      method: 'GET'
    }).then(res => {
      this.questions = JSON.parse(res)
    })
  },
  methods: {
    change(index) {
      this.showAnswer = false
      console.log(index)
    },
    submit() {
      var score = this.questions.map(item => item.score).reduce((acc, currentVal) => acc + currentVal)
      console.log(score)
      this.$alert(score/this.questions.length, '分数')
    }
  }
}
</script>
<style>
.quiz {
  background-color: #004680;
  color: #ffffff;
  height: 100%;
}
.quiz-carousel {
  height: 100%;
}
</style>