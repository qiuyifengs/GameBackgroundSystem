<template>
<a-modal :title="title" :width="500" :visible="visible" :confirmLoading="confirmLoading" @ok="handleSubmit" @cancel="handleCancel">
    <a-spin :spinning="confirmLoading">
        <a-form :form="form">
            <a-form-item label="开关英文名称" :labelCol="labelCol" :wrapperCol="wrapperCol">
                <a-input v-decorator="['switch_en_name', {rules: [{required: true, message: '请输入开关英文名称'}]}]" />
            </a-form-item>
            <a-form-item label="开关中文名称" :labelCol="labelCol" :wrapperCol="wrapperCol">
                <a-input v-decorator="['switch_cn_name', {rules: [{required: true, message: '请输入开关中文名称'}]}]" />
            </a-form-item>
            <a-form-item label="开关状态" :labelCol="labelCol" :wrapperCol="wrapperCol">
                <a-radio-group v-decorator="[
                    'switch_status',
                    { initialValue: 0, rules: [{ required: true, message: '请选择开关状态' }]}
                    ]" placeholder="请选择事件类型">
                    <a-radio-button :value="0">开启</a-radio-button>
                    <a-radio-button :value="1">关闭</a-radio-button>
                </a-radio-group>
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
import qs from 'qs'

export default {
    data() {
        return {
            title: '客户端点击日志开关-新建',
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
                    span: 16
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
            const { form: { setFieldsValue } } = this
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
