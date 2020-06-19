<template>
<a-modal :title="title" :width="600" :visible="visible" :confirmLoading="confirmLoading" @ok="handleSubmit" @cancel="handleCancel">
    <a-spin :spinning="confirmLoading">
        <a-form :form="form">
            <a-form-item v-if="operationType === 2" style="display: none">
                <a-input v-decorator="['user_id']" />
            </a-form-item>
            <a-form-item label="用户名" :labelCol="labelCol" :wrapperCol="wrapperCol">
                <a-input v-decorator="['user_name', rule.user_name]" placeholder="请填写用户名" />
            </a-form-item>
            <a-form-item label="登录密码" v-if="operationType == 1" :labelCol="labelCol" :wrapperCol="wrapperCol">
                <a-input-password v-decorator="['password', rule.password]" placeholder="请填写登录密码" />
            </a-form-item>
            <a-form-item label="登录密码" v-if="operationType == 2" :labelCol="labelCol" :wrapperCol="wrapperCol">
                <a-input-password v-decorator="['password']" placeholder="请填写登录密码" />
            </a-form-item>
            <a-form-item label="真实姓名" v-if="operationType == 1" :labelCol="labelCol" :wrapperCol="wrapperCol">
                <a-input v-decorator="['realname', rule.realname]" placeholder="请填写真实姓名" />
            </a-form-item>
            <a-form-item label="真实姓名" v-if="operationType == 2" :labelCol="labelCol" :wrapperCol="wrapperCol">
                <a-input v-decorator="['realname']" placeholder="请填写真实姓名" />
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
                <a-input v-decorator="['mobile']" placeholder="请填写手机号" />
            </a-form-item>
            <a-form-item label="邮箱" :labelCol="labelCol" :wrapperCol="wrapperCol">
                <a-input placeholder="请填写邮箱" v-decorator="['email', rule.email]" />
                <!-- <a-auto-complete placeholder="请填写邮箱" v-decorator="['email', rule.email]" @search="handleSearch">
                    <template slot="dataSource">
                        <a-select-option v-for="email in result" :key="email">{{email}}</a-select-option>
                    </template>
                </a-auto-complete> -->
            </a-form-item>
            <a-form-item label="用户分组" :labelCol="labelCol" :wrapperCol="wrapperCol">
                <a-row :gutter="8">
                    <a-col :span="16">
                        <a-select v-decorator="['item_id', rule.item_id]" placeholder="请选择用户">
                            <a-select-option v-for="(item, index) in userGroupArr" :key="index" :value="item.item_id">{{ item.name }}</a-select-option>
                        </a-select>
                    </a-col>
                    <a-col :span="8">
                        <a-button @click="$refs.createUserGroupModal.add()">添加用户分组</a-button>
                        <create-user-group-form ref="createUserGroupModal" @ok="handleOk" />
                    </a-col>
                </a-row>
            </a-form-item>
        </a-form>
    </a-spin>
</a-modal>
</template>

<script>
import pick from 'lodash.pick'
import CreateUserGroupForm from './CreateUserGroupForm'

export default {
    components: {
        CreateUserGroupForm
    },
    data() {
        return {
            title: '新增管理员',
            operationType: 1,
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
                locked: {
                    rules: [{
                        required: false,
                        message: '是否封禁'
                    }],
                    initialValue: '0'
                },
                lock_text: {
                    rules: [{
                        required: false,
                        message: '请填写封禁原因'
                    }]
                },
                // mobile: {
                //     rules: [{
                //         required: false,
                //         message: '请填写手机号'
                //     }, {
                //         validator: this.checkMobile.bind(this)
                //     }]
                // },
                // email: {
                //     rules: [{
                //         required: false,
                //         message: '请填写邮箱'
                //     }, {
                //         type: 'email',
                //         message: '请输入正确的邮箱'
                //     }]
                // },
                // item_id: {
                //     rules: [{
                //         required: false,
                //         message: '请选择用户'
                //     }]
                // }
            },
            labelCol: {
                xs: {
                    span: 24
                },
                sm: {
                    span: 4
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
            userGroupArr: [],
            result: [],
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
        handleOk() {
            this.getUserGroupList()
        },
        getUserGroupList() {
            this.$api.ADMIN_GROUP_ALL().then(res => {
                this.userGroupArr = res.Data
            })
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
        add() {
            this.title = '新增管理员'
            this.visible = true
            this.operationType = 1
            this.getUserGroupList()
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
            this.getUserGroupList()

            this.$api.ADMIN_GROUP_ALL().then(res => {
                this.userGroupArr = res.Data

                this.$nextTick(() => {
                    const item_id = this.userGroupArr.filter(item => {
                        return item.name === record.item_name
                    })
                    setFieldsValue({
                        user_id: record.user_id,
                        user_name: record.user_name,
                        password: record.password,
                        realname: record.realname,
                        mobile: record.mobile,
                        email: record.email,
                        item_id: item_id.length > 0 ? item_id[0].item_id : '',
                        locked: String(record.locked),
                        lock_text: record.lock_text
                    })
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
            this.$api.ADMIN_CREATE(values).then(res => {
                if (res.Success) {
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
            this.$api.ADMIN_UPDATE(values).then(res => {
                if (res.Code === 200) {
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
