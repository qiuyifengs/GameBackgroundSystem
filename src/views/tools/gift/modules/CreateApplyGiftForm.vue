<template>
<a-modal :title="title" :width="800" :visible="visible" :confirmLoading="confirmLoading" @ok="handleSubmit" @cancel="handleCancel">
    <a-spin :spinning="confirmLoading">
        <a-form :form="form">
            <a-form-item label="渠道" :labelCol="labelCol" :wrapperCol="wrapperCol">
                <a-select v-decorator="['switch_status', { rules: [{ required: true, message: '请选择渠道' }]}
                    ]" placeholder="请选择">
                    <a-select-option value="0">渠道1</a-select-option>
                    <a-select-option value="1">渠道2</a-select-option>
                    <a-select-option value="2">渠道3</a-select-option>
                </a-select>
            </a-form-item>
            <a-form-item label="礼包类型" :labelCol="labelCol" :wrapperCol="wrapperCol">
                <a-select v-decorator="['switch_status', { rules: [{ required: true, message: '请选择礼包类型' }]}
                    ]" placeholder="请选择">
                    <a-select-option value="0">区服1</a-select-option>
                    <a-select-option value="1">区服2</a-select-option>
                    <a-select-option value="2">区服3</a-select-option>
                </a-select>
            </a-form-item>
            <a-form-item label="礼包码类型" :labelCol="labelCol" :wrapperCol="wrapperCol">
                <a-select v-decorator="['switch_status', { rules: [{ required: true, message: '请选择礼包码类型' }]}
                    ]" placeholder="请选择">
                    <a-select-option value="0">区服1</a-select-option>
                    <a-select-option value="1">区服2</a-select-option>
                    <a-select-option value="2">区服3</a-select-option>
                </a-select>
            </a-form-item>
            <a-form-item label="申请数量" :labelCol="labelCol" :wrapperCol="wrapperCol" help="建议一次生成数量少于2万">
                <a-input />
            </a-form-item>
           <a-form-item label="玩家使用上限" :labelCol="labelCol" :wrapperCol="wrapperCol">
                <a-input />
            </a-form-item>
            <a-form-item label="开始时间" :labelCol="labelCol" :wrapperCol="wrapperCol">
                <a-date-picker placeholder="开始时间" />
            </a-form-item>
            <a-form-item label="结束时间" :labelCol="labelCol" :wrapperCol="wrapperCol">
                <a-date-picker placeholder="结束时间" />
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

import {
    mixin
} from '@/utils/mixin'

export default {
    mixins: [mixin],
    data() {
        return {
            title: '申请礼包码',
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
