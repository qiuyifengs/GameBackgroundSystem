<template>
<a-modal :title="title" :width="800" :visible="visible" :confirmLoading="confirmLoading" @ok="handleSubmit" @cancel="handleCancel">
    <a-spin :spinning="confirmLoading">
        <a-form :form="form">
            <a-form-item label="申请类型" :labelCol="labelCol" :wrapperCol="wrapperCol">
                <a-select @change="typeChange" v-decorator="[ 'type', { initialValue: '1', rules: [{ required: true, message: '请选择申请类型' }]}]">
                    <a-select-option value="1">审批后立即发放</a-select-option>
                    <a-select-option value="2">审批通过后指定时间发放</a-select-option>
                </a-select>
            </a-form-item>
            <a-form-item label="发放时间" :labelCol="labelCol" :wrapperCol="wrapperCol" v-if="applyType==2">
                <a-date-picker format="YYYY-MM-DD" v-decorator="['date']" placeholder="请选择时间" style="width: 100%" />
            </a-form-item>
            <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol">
                <span slot="label">
                    范例&nbsp;
                    <a-tooltip title="格式：中间用1个以上空格隔开">
                        <a-icon type="question-circle-o" />
                    </a-tooltip>
                </span>
                <a-table :columns="columns" :pagination="pagination" :dataSource="data" size="small" />
            </a-form-item>
            <a-form-item label="资源列表" :labelCol="labelCol" :wrapperCol="wrapperCol">
                <a-textarea v-decorator="['list', {rules: [{required: true, message: '请选择资源'}]}]" placeholder="资源列表" />
            </a-form-item>
            <a-form-item label="备注" :labelCol="labelCol" :wrapperCol="wrapperCol">
                <a-textarea v-decorator="['reason', {rules: [{required: true, message: '请填写备注'}]}]" placeholder="备注" />
            </a-form-item>
        </a-form>
    </a-spin>
</a-modal>
</template>

<script>
import pick from 'lodash.pick'
import {
    updateApplyDiamond
} from '@/api/props'

const columns = [{
        title: '平台',
        dataIndex: 'name',
    },
    {
        title: '服务器',
        dataIndex: 'server_id',
    },
    {
        title: '账号',
        dataIndex: 'account',
    },
    {
        title: '角色名',
        dataIndex: 'role_name'
    },
    {
        title: '数量(万)',
        dataIndex: 'total'
    }
];
const data = [{
        key: '1',
        name: '应用宝',
        server_id: 3,
        account: 'mddgmae',
        role_name: '英雄来了',
        total: '100'
    },
    {
        key: '2',
        name: '九游',
        server_id: 5,
        account: 'mddwan',
        role_name: '荣耀之战',
        total: '1000'
    },
];

export default {
    data() {
        return {
            data,
            columns,
            pagination: {
                hideOnSinglePage: true
            },
            applyType: 0,
            title: '钻石申请',
            labelCol: {
                xs: {
                    span: 20
                },
                sm: {
                    span: 3
                }
            },
            wrapperCol: {
                xs: {
                    span: 24
                },
                sm: {
                    span: 20
                }
            },
            visible: false,
            confirmLoading: false,
            form: this.$form.createForm(this),
        }
    },
    methods: {
        typeChange(key) {
            this.applyType = key
        },
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
                    let params = {}
                    if (this.applyType === 2) {
                        params = {
                            date: this.form.getFieldsValue().date.format('YYYY-MM-DD')
                        }
                    }
                    updateApplyDiamond(Object.assign(values, params)).then(res => {
                        console.log(res.Error)
                        this.$message.success('钻石申请成功')
                        this.form.resetFields();
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
