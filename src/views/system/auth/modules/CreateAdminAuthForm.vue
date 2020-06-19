<template>
<a-modal :title="title" :width="800" :visible="visible" :confirmLoading="confirmLoading" @ok="handleSubmit" @cancel="handleCancel">
    <a-spin :spinning="confirmLoading">
        <a-form :form="form">
            <a-form-item v-if="operationType === 2" style="display: none">
                <a-input v-decorator="['user_id']" />
            </a-form-item>
            <a-form-item label="用户名" :labelCol="labelCol" :wrapperCol="wrapperCol">
                <a-input v-decorator="['user_name', rule.user_name]" placeholder="请填写用户名" />
            </a-form-item>
            <a-form-item label="登录密码" :labelCol="labelCol" :wrapperCol="wrapperCol">
                <a-input v-decorator="['password', rule.password]" placeholder="请填写登录密码" />
            </a-form-item>
            <a-form-item label="真实姓名" :labelCol="labelCol" :wrapperCol="wrapperCol">
                <a-input v-decorator="['realname', rule.realname]" placeholder="请填写真实姓名" />
            </a-form-item>
            <a-form-item v-if="operationType === 2" label="是否封禁" :labelCol="labelCol" :wrapperCol="wrapperCol">
                <a-radio-group v-decorator="['locked', rule.locked]" placeholder="请选择封禁状态">
                    <a-radio-button value="0">正常</a-radio-button>
                    <a-radio-button value="1">封禁</a-radio-button>
                </a-radio-group>
            </a-form-item>
            <a-form-item v-if="operationType === 2" label="封禁原因" :labelCol="labelCol" :wrapperCol="wrapperCol">
                <a-textarea v-decorator="['lock_text', rule.lock_text]" placeholder="请填写封禁原因" />
            </a-form-item>
            <a-form-item label="手机号" :labelCol="labelCol" :wrapperCol="wrapperCol">
                <a-input v-decorator="['mobile', rule.mobile]" placeholder="请填写手机号" />
            </a-form-item>
            <a-form-item label="邮箱" :labelCol="labelCol" :wrapperCol="wrapperCol">
                <a-input v-decorator="['email', rule.email]" placeholder="请填写邮箱" />
            </a-form-item>
            <a-form-item label="用户分组" :labelCol="labelCol" :wrapperCol="wrapperCol">
                <!-- <a-select v-decorator="['item_id', {rules: [{required: true, message: '请选择用户'}]}]" placeholder="请选择用户">
                </aselect> -->
                <a-input v-decorator="['item_id']" />
            </a-form-item>
        </a-form>
    </a-spin>
</a-modal>
</template>

<script>
import pick from 'lodash.pick'
import {
    addAdmin,
    editAdmin
} from '@/api/auth'
import {
    getChannelList,
    getServerList,
} from '@/api/common'

export default {
    data() {
        return {
            title: '新增管理员',
            operationType: 1,
            rule: {
                user_name: {
                    rules: [{
                        rules: [{
                            required: true,
                            message: '请填写用户名'
                        }]
                    }],
                },
                password: {
                    rules: [{
                        rules: [{
                            required: true,
                            message: '请填写登录密码'
                        }]
                    }],
                },
                realname: {
                    rules: [{
                        rules: [{
                            required: true,
                            message: '请填写真实姓名'
                        }]
                    }],
                },
                locked: {
                    rules: [{
                        rules: [{
                            required: true,
                            message: '是否封禁'
                        }]
                    }],
                    initialValue: '0'
                },
                lock_text: {
                    rules: [{
                        rules: [{
                            required: true,
                            message: '请填写封禁原因'
                        }]
                    }]
                },
                mobile: {
                    rules: [{
                        rules: [{
                            required: false,
                            message: '请填写手机号'
                        }]
                    }],
                },
                email: {
                    rules: [{
                        rules: [{
                            required: false,
                            message: '请填写邮箱'
                        }]
                    }],
                }
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
            this.title = '新增管理员'
            this.visible = true
            this.operationType = 1
        },
        edit(record) {
            this.title = '编辑管理员'
            this.operationType = 2
            this.visible = true
            const {
                form: {
                    setFieldsValue
                }
            } = this
            this.$nextTick(() => {
                setFieldsValue({
                    user_id: record.user_id,
                    user_name: record.user_name,
                    password: record.password,
                    realname: record.realname,
                    mobile: record.mobile,
                    email: record.email,
                })
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
                    if (this.operationType === 1) {
                        this.handleAddAdmin(values)
                    } else {
                        this.handleEditAdmin(values)
                    }
                } else {
                    this.confirmLoading = false
                }
            })
        },
        handleAddAdmin(values) {
            console.log(1)
            addAdmin(Object.assign(values)).then(res => {
                if (res.Code === 200) {
                    this.$message.success('新增管理员成功')
                    this.form.resetFields();

                    setTimeout(() => {
                        this.visible = false
                        this.confirmLoading = false
                        this.$emit('ok', values)
                    }, 1500)

                } else {
                    this.$message.error(res.Error)
                    setTimeout(() => {
                        this.confirmLoading = false
                    }, 1500)
                }
            }).catch(err => {
                this.$message.error(err.Error)
            })
        },
        handleEditAdmin(values) {
            console.log(values)
            // editAdmin(Object.assign(values)).then(res => {
            //     if (res.Code === 200) {
            //         this.$message.success('编辑管理员成功')
            //         this.form.resetFields();

            //         setTimeout(() => {
            //             this.visible = false
            //             this.confirmLoading = false
            //             this.$emit('ok', values)
            //         }, 1500)

            //     } else {
            //         this.$message.error(res.Error)
            //         setTimeout(() => {
            //             this.confirmLoading = false
            //         }, 1500)
            //     }
            // }).catch(err => {
            //     this.$message.error(err.Error)
            // })
        },
        handleCancel() {
            this.visible = false
        }
    }
}
</script>
