<template>
    <div class="page-content">
        <el-form :model="form" label-width="100px">
            <el-form-item label="活动名称">
                <span>几个果子</span>
                <!-- <el-input v-model="ruleForm.name"></el-input> -->
            </el-form-item>
            <el-form-item label="店铺编号">
                <span>3346778</span>
                <!-- <el-input v-model="ruleForm.name"></el-input> -->
            </el-form-item>
            <el-form-item label="主体信息">
                <span>上海官十九餐饮集团</span>
                <!-- <el-input v-model="ruleForm.name"></el-input> -->
            </el-form-item>
            <el-form-item label="主营类目">
                <span>餐饮</span>
                <!-- <el-input v-model="ruleForm.name"></el-input> -->
            </el-form-item>
            <el-form-item label="创建日期">
                <span>2018-01-01</span>
                <!-- <el-input v-model="ruleForm.name"></el-input> -->
            </el-form-item>
            <el-form-item label="店铺logo">
                <img src alt>
                <!-- <el-input v-model="ruleForm.name"></el-input> -->
            </el-form-item>
            <el-form-item label="商铺简介">
                <span></span>
                <!-- <el-input v-model="ruleForm.name"></el-input> -->
            </el-form-item>
            <el-form-item label="微信小程序">
                <span>几个果子</span>
                <!-- <el-input v-model="ruleForm.name"></el-input> -->
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">立即创建</el-button>
                <el-button>取消</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
export default {
    data() {
        return {
            form: {

            }
        }
    },
    methods: {
        onSubmit(){

        }
    }
}
</script>

<style>
</style>
