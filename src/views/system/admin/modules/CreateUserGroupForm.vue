<template>
<a-modal :title="title" :width="800" :visible="visible" :confirmLoading="confirmLoading" @ok="handleSubmit" @cancel="handleCancel">
    <a-spin :spinning="confirmLoading">
        <a-form :form="form">
            <a-form-item label="分组名称" :labelCol="labelCol" :wrapperCol="wrapperCol">
                <a-input v-decorator="['name', { rules: [{ required: true, message: '请填写分组名称' }]}]" placeholder="请填写分组名称" />
            </a-form-item>
            <a-form-item label="别名" :labelCol="labelCol" :wrapperCol="wrapperCol">
                <a-input v-decorator="['alias', { rules: [{ required: true, message: '请填写别名' }]}]" placeholder="请填写别名" />
            </a-form-item>
        </a-form>
    </a-spin>
</a-modal>
</template>

<script>
import pick from 'lodash.pick'
import {
    addUserGroup
} from '@/api/auth'

export default {
    data() {
        return {
            title: '新增用户分组',
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
                    addUserGroup(values).then(res => {
                        if (res.Code === 200) {
                            this.$message.success('新增用户分组成功')
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