<template>
  <div class="question">
    <el-form :model="form" class="question-form">
      <el-form-item>填加题目</el-form-item>
      <el-form-item label="题目">
        <el-input v-model="form.title"></el-input>
      </el-form-item>
      <el-form-item label="答案">
        <el-input v-model="form.answer" type="textarea"></el-input>
      </el-form-item>
      <el-form-item label="标签">
        <el-input v-model="form.tags"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="submit">确定</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import ajax from '@/utils/ajax'
export default {
  name: 'Questions',
  data() {
    return {
      form: {}
    }
  },
  methods: {
    submit() {
      console.log(ajax)
      ajax({
        method: 'POST',
        url: '/questions',
        data: this.form
      })
    }
  },
}
</script>
<style>
.question {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}
.question-form {
  width: 400px;
}
</style>