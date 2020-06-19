<template>
<a-card :bordered="false" style="margin-top: 18px">

    <a-form @submit="handleSubmit" :form="form">
        <a-form-item label="渠道" :labelCol="labelCol" :wrapperCol="wrapperCol">
            <a-select placeholder="请选择渠道" v-decorator="['channel_id', {rules: [{ required: true, message: '请选择渠道' }]}]" name="channel_id">
                <a-select-option v-for="(item, index) in channelList" :key="index" :value="item.channel_id">{{ item.channel_name }}</a-select-option>
            </a-select>
        </a-form-item>
        <a-form-item label="区服" :labelCol="labelCol" :wrapperCol="wrapperCol">
            <a-select placeholder="请选择区服" v-decorator="['server_id', {rules: [{ required: true, message: '请选择服务器' }]}]" name="server_id">
                <a-select-option v-for="(item, index) in serverList" :key="index" :value="item.server_id">{{ item.server_name }}</a-select-option>
            </a-select>
        </a-form-item>
        <a-form-item label="角色名称" :labelCol="labelCol" :wrapperCol="wrapperCol">
            <a-input v-decorator="['role_name', {rules: [{required: true, message: '请输入角色名称！'}]}]" />
        </a-form-item>
        <a-form-item label="邮件标题" :labelCol="labelCol" :wrapperCol="wrapperCol">
            <a-input v-decorator="['title', {rules: [{required: true, message: '请输入邮件标题！'}]}]" />
        </a-form-item>
        <a-form-item label="邮件内容" :labelCol="labelCol" :wrapperCol="wrapperCol">
            <a-textarea rows="4" v-decorator="['body', {rules: [{ required: true, message: '请输入邮件内容' }]}
          ]" />
        </a-form-item>
        <a-form-item :wrapperCol="{ span: 24 }" style="text-align: center ">
            <a-button htmlType="submit" type="primary">提交</a-button>
        </a-form-item>
    </a-form>
</a-card>
</template>

<script>
import {
    sendMail
} from '@/api/game'

import {
    mixin
} from '@/utils/mixin'

export default {
    mixins: [mixin],
    name: 'sendMail',
    data() {
        return {
            labelCol: {
                lg: {
                    span: 7
                },
                sm: {
                    span: 10
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
                    this.$api.PLAYER_SEND_MAIL_CREATE(Object.assign(values)).then(res => {
                        if (res.Code === 200) {
                            this.$message.success('发送成功')
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
