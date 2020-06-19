<template>
<a-modal :title="title" :width="800" :visible="visible" :confirmLoading="confirmLoading" @ok="handleSubmit" @cancel="handleCancel">
    <a-spin :spinning="confirmLoading">
        <a-form :form="form">
            <a-form-item label="用户名" :labelCol="labelCol" :wrapperCol="wrapperCol">
                <a-input v-decorator="['user_name', rule.user_name]" placeholder="请填写用户名" />
            </a-form-item>
            <a-form-item label="登录密码" :labelCol="labelCol" :wrapperCol="wrapperCol">
                <a-input-password v-decorator="['password', rule.password]" placeholder="请填写登录密码" />
            </a-form-item>
            <a-form-item label="真实姓名" :labelCol="labelCol" :wrapperCol="wrapperCol">
                <a-input v-decorator="['realname', rule.realname]" placeholder="请填写真实姓名" />
            </a-form-item>
        </a-form>
    </a-spin>
</a-modal>
</template>

<script>
import pick from 'lodash.pick'
export default {
    data() {
        return {
            title: '编辑管理员',
            rule: {
                user_name: {
                    rules: [{
                        required: true,
                        message: '请填写用户名'
                    }]
                },
                password: {
                    rules: [{
                        required: true,
                        message: '请填写登录密码'
                    }]
                },
                realname: {
                    rules: [{
                        required: true,
                        message: '请填写真实姓名'
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
            userInfo: {}
        }
    },
    methods: {
        checkMobile(rule, value, callback) {
            const phoneReg = /^1[3|4|5|7|8][0-9]{9}$/
            if (!phoneReg.test(value.trim())) {
                callback('请输入正确的手机号码')
                return
            } else {
                callback()
            }
        },
        handleSearch(value) {
            let result;
            if (!value || value.indexOf('@') >= 0) {
                result = [];
            } else {
                result = ['gmail.com', '163.com', 'qq.com'].map(domain => `${value}@${domain}`);
            }
            this.result = result;
        },
        edit() {
            this.visible = true
            const {
                form: {
                    setFieldsValue
                }
            } = this

            this.$api.USER_ADMIN_INFO().then(res => {
                if (res.Success) {
                    this.$nextTick(() => {
                        setFieldsValue({
                            user_name: res.Data.user_name,
                            realname: res.Data.realname,
                        })
                    })
                } else {
                    this.$message.error(res.Error)
                }
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
                    this.handleEditAdmin(values)
                } else {
                    this.confirmLoading = false
                }
            })
        },
        handleEditAdmin(values) {
            this.$api.USER_ADMIN_UPDATE(values).then(res => {
                if (res.Success) {
                    this.$message.success('编辑管理员成功')
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
        handleCancel() {
            this.visible = false
            this.form.resetFields();
        }
    }
}
</script>
