<template>
<a-card :body-style="{padding: '24px 32px'}" :bordered="false" style="margin-top: 18px">
    <a-form @submit="handleSubmit" :form="form">
        <a-form-item label="渠道" :labelCol="labelCol" :wrapperCol="wrapperCol">
            <a-select placeholder="请选择渠道" v-decorator="['channel_id']" name="channel_id">
                <a-select-option v-for="(item, index) in channelList" :key="index" :value="item.channel_id">{{ item.channel_name }}</a-select-option>
            </a-select>
        </a-form-item>
        <a-form-item label="区服" :labelCol="labelCol" :wrapperCol="wrapperCol">
            <a-select placeholder="请选择区服" v-decorator="['server_id']" name="server_id">
                <a-select-option v-for="(item, index) in serverList" :key="index" :value="item.server_id">{{ item.server_name }}</a-select-option>
            </a-select>
        </a-form-item>
        <a-form-item label="账号" :labelCol="labelCol" :wrapperCol="wrapperCol">
            <a-input v-decorator="['account', {rules: [{required: true, message: '请输入账号'}]}]" />
        </a-form-item>
        <a-form-item label="角色名" :labelCol="labelCol" :wrapperCol="wrapperCol">
            <a-input v-decorator="['role_name', {rules: [{required: true, message: '请输入角色名'}]}]" />
        </a-form-item>
        <a-form-item label="踢下线理由" :labelCol="labelCol" :wrapperCol="wrapperCol">
            <a-textarea rows="4" placeholder="请输入踢下线理由" v-decorator="['reason', {rules: [{ required: true, message: '请输入踢下线理由' }]}]" />
        </a-form-item>
        <a-form-item :wrapperCol="{ span: 24 }" style="text-align: center">
            <a-button htmlType="submit" type="primary">提交</a-button>
        </a-form-item>
    </a-form>
</a-card>
</template>

<script>
import moment from 'moment'

import {
    mixin
} from '@/utils/mixin'

export default {
    mixins: [mixin],
    name: 'playRoleOffline',
    data() {
        return {
            labelCol: {
                lg: {
                    span: 7
                },
                sm: {
                    span: 7
                }
            },
            wrapperCol: {
                lg: {
                    span: 10
                },
                sm: {
                    span: 17
                }
            },
            form: this.$form.createForm(this),
        }
    },
    methods: {
        handleSubmit(e) {
            e.preventDefault()
            this.form.validateFields((err, values) => {
                if (!err) {
                    console.log('Received values of form: ', values)
                    this.$api.PLAYER_KICK_ROLE_OFFLINE_UPDATE(values).then(res => {
                        if (res.Code === 200) {
                            this.$message.success('下线成功')
                            this.form.resetFields();
                        } else {
                            this.$message.error(res.Error)
                        }

                    }).catch(err => {
                        this.$message.error(err.Error)
                    })
                }
            })
        },
    }
}
</script>
