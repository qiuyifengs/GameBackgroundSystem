<template>
<a-modal :title="title" :width="800" :visible="visible" :confirmLoading="confirmLoading" @ok="handleSubmit" @cancel="handleCancel">
    <a-spin :spinning="confirmLoading">
        <a-form :form="form">
            <a-form-item label="渠道" :labelCol="labelCol" :wrapperCol="wrapperCol">
                <a-select v-decorator="[ 'channel_id']" placeholder="请选择">
                    <a-select-option v-for="(item, index) in channelList" :key="index" :value="item.channel_id">{{ item.channel_name }}</a-select-option>
                </a-select>
            </a-form-item>
            <a-form-item label="区服" :labelCol="labelCol" :wrapperCol="wrapperCol">
                <a-select v-decorator="[ 'server_id']" placeholder="请选择">
                    <a-select-option v-for="(item, index) in serverList" :key="index" :value="item.server_id">{{ item.server_name }}</a-select-option>
                </a-select>
            </a-form-item>
            <a-form-item label="封禁类型" :labelCol="labelCol" :wrapperCol="wrapperCol">
                <a-radio-group v-decorator="['lock_type', rule.lock_type]">
                    <a-radio-button value="1">角色封禁</a-radio-button>
                    <a-radio-button value="2">账号封禁</a-radio-button>
                </a-radio-group>
            </a-form-item>
            <a-form-item label="封禁列表(每行一个)" :labelCol="labelCol" :wrapperCol="wrapperCol">
                <a-textarea v-decorator="['list', rule.list]" placeholder="请输入封禁项" />
            </a-form-item>
            <a-form-item label="封禁时间" :labelCol="labelCol" :wrapperCol="wrapperCol">
                <a-input-group compact>
                    <a-input-number v-decorator="['lock_time', { initialValue: 1 }]" :min="1" :max="100" style="width: 35%" />
                    <a-select v-decorator="['unit', { initialValue: 'min', rules: [{ required: true, message: '请指定时间(单位分钟)' }]}]">
                        <a-select-option value="min">分钟</a-select-option>
                        <a-select-option value="hour">小时</a-select-option>
                        <a-select-option value="day">天</a-select-option>
                        <a-select-option value="week">周</a-select-option>
                        <a-select-option value="forever">永久</a-select-option>
                    </a-select>
                </a-input-group>
            </a-form-item>
            <a-form-item label="禁言原因" :labelCol="labelCol" :wrapperCol="wrapperCol">
                <a-textarea v-decorator="['reason', rule.reason]" placeholder="请输入禁言原因" />
            </a-form-item>
        </a-form>
    </a-spin>
</a-modal>
</template>

<script>
import pick from 'lodash.pick'

import {
    mixin
} from '@/utils/mixin'

export default {
    mixins: [mixin],
    data() {
        return {
            title: '账号角色禁言',
            rule: {
                lock_type: {
                    initialValue: '1'
                },
                list: {
                    rules: [{
                        required: false,
                        message: '封禁列表不能为空'
                    }]
                },
                reason: {
                    rules: [{
                        required: false,
                        message: '封禁原因不能为空'
                    }]
                },
            },
            labelCol: {
                xs: {
                    span: 24
                },
                sm: {
                    span: 7
                }
            },
            wrapperCol: {
                xs: {
                    span: 24
                },
                sm: {
                    span: 13
                }
            },
            visible: false,
            confirmLoading: false,
            form: this.$form.createForm(this),
        }
    },
    methods: {
        add() {
            this.visible = true
        },
        edit(record) {
            this.title = '客户端点击日志开关-修改'
            console.log(record)
            this.visible = true
            const {
                form: {
                    setFieldsValue
                }
            } = this
            this.$nextTick(() => {
                setFieldsValue(pick(record, []))
            })
        },
        handleSubmit() {
            const {
                form: {
                    validateFields
                }
            } = this
            this.confirmLoading = true
            validateFields((errors, values) => {
                if (!errors) {
                    console.log(values)
                   
                    this.$api.PLATER_ROLE_FORBIDDEN_WORDS_UPDATE(values).then(res => {
                        if (res.Code === 200) {
                            console.log(res.Error)
                            this.$message.success('禁言成功')
                            this.form.resetFields();
                        } else {
                            this.$message.error(res.Error)
                        }

                    }).catch(err => {
                        this.$message.error(err.Error)
                    })
                    setTimeout(() => {
                                this.visible = false
                                this.confirmLoading = false
                                this.$emit('ok', values)
                            }, 1500)
                } else {
                    this.confirmLoading = false
                }
            })
        },
        handleCancel() {
            this.visible = false
        }
    }
}
</script>

<style scoped>
.dynamic-delete-button {
    cursor: pointer;
    position: relative;
    top: 4px;
    font-size: 24px;
    color: #999;
    transition: all .3s;
}

.dynamic-delete-button:hover {
    color: #777;
}

.dynamic-delete-button[disabled] {
    cursor: not-allowed;
    opacity: 0.5;
}
</style>
