<template>
<a-modal :title="title" :width="800" :visible="visible" :confirmLoading="confirmLoading" @ok="handleSubmit" @cancel="handleCancel">
    <a-spin :spinning="confirmLoading">
        <a-form :form="form">
            <a-form-item label="区服" :labelCol="labelCol" :wrapperCol="wrapperCol">
                <a-select placeholder="请选择" name="server_id" v-decorator="['server_id', { rules: [{required: true, message: '服务器不能为空'}] }]">
                    <a-select-option v-for="(item, index) in serverList" :key="index" :value="item.server_id">{{ item.server_name }}</a-select-option>
                </a-select>
            </a-form-item>
            <a-form-item label="公告内容" :labelCol="labelCol" :wrapperCol="wrapperCol">
                <a-textarea rows="4" placeholder="请输入公告内容" v-decorator="[
            'type',
            {rules: [{ required: true, message: '请输入公告内容' }]}
          ]" />
            </a-form-item>
            <a-form-item label="显示时间间隔" :labelCol="labelCol" :wrapperCol="wrapperCol">
                <a-input-number :min="0" :max="100" />
                <span class="ant-form-text"> 单位分钟</span>
            </a-form-item>
            <a-form-item label="显示的位置" :labelCol="labelCol" :wrapperCol="wrapperCol">
                <a-select v-decorator="['position']">
                    <a-select-option value="1">只在右侧提示栏显示</a-select-option>
                    <a-select-option value="2">屏幕中央</a-select-option>
                    <a-select-option value="3">弹出框</a-select-option>
                    <a-select-option value="4">公告栏</a-select-option>
                    <a-select-option value="5">Gm提示信息</a-select-option>
                    <a-select-option value="6">左侧聊天栏里</a-select-option>
                </a-select>
            </a-form-item>
            <a-form-item label="发布时间" :labelCol="labelCol" :wrapperCol="wrapperCol">
                <a-date-picker name="buildTime" v-decorator="[
                        'start_date',
                        {rules: [{ required: false, message: '请选择发布时间' }]}
                    ]" />
                <span class="ant-form-text" style="margin-left: 8px"> 留空为立即发布</span>
            </a-form-item>
            <a-form-item label="结束时间" :labelCol="labelCol" :wrapperCol="wrapperCol">
                <a-date-picker name="buildTime" v-decorator="[
                        'end_date',
                        {rules: [{ required: false, message: '请选择结束时间' }]}
                    ]" />
            </a-form-item>
        </a-form>
    </a-spin>
</a-modal>
</template>

<script>
import pick from 'lodash.pick'
import {
    updateClickLogSwitchConfig
} from '@/api/sys.game'

import {
    mixin
} from '@/utils/mixin'

export default {
    mixins: [mixin],
    data() {
        return {
            title: '发布游戏公告',
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

                    const params = {

                    }
                    console.log(params)
                    updateClickLogSwitchConfig(values).then(res => {
                        console.log(res.Error)
                        this.$message.success('新增客户端点击日志开关成功')
                        this.form.resetFields();
                    }).catch(err => {
                        this.$message.error(err.Error)
                    })
                    setTimeout(() => {
                        ;
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
