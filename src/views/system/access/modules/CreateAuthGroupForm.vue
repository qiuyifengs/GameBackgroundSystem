<template>
<!-- :bodyStyle="{ 'height': '650px', 'overflow-y': 'scroll'}" -->
<a-modal :title="title" :width="900" :visible="visible" :confirmLoading="confirmLoading" @ok="handleSubmit" @cancel="handleCancel">
    <a-spin :spinning="confirmLoading">
        <a-form :form="form">
            <a-form-item v-if="operationType === 2" style="display: none">
                <a-input v-decorator="['id']" />
            </a-form-item>

            <a-form-item label="分组标识" :labelCol="labelCol" :wrapperCol="wrapperCol">
                <a-input v-decorator="['name', rule.name]" placeholder="请填写分组标识" />
            </a-form-item>
            <a-form-item label="分组标题" :labelCol="labelCol" :wrapperCol="wrapperCol">
                <a-input v-decorator="['title', rule.title]" placeholder="请填写分组标题" />
            </a-form-item>
            <a-form-item label="分组状态" :labelCol="labelCol" :wrapperCol="wrapperCol">
                <a-select style="width: 100%" v-decorator="['status', rule.status]" placeholder="请选择分组状态">
                    <a-select-option value="1">启用</a-select-option>
                    <a-select-option value="0">禁用</a-select-option>
                </a-select>
            </a-form-item>
            <a-form-item label="选择权限" :labelCol="labelCol" :wrapperCol="wrapperCol">

                <a-tree-select style="width: 100%" :treeData="permissionTreeData" v-model="permissionSelected" treeCheckable :showCheckedStrategy="SHOW_PARENT" placeholder="请选择权限" :dropdownStyle="{ maxHeight: '300px', overflow: 'auto' }" searchPlaceholder="请选择权限" />

                <!-- <a-collapse expandIconPosition="right">
                    <a-collapse-panel v-for="(permission, index) in permissions" :key="index">
                        <div slot="header">
                            <a-checkbox :indeterminate="permission.indeterminate" :checked="permission.checkedAll" @change="onChangeCheckAll($event, permission)">
                                <span class="primary">全选-{{ permission.title }}</span>
                            </a-checkbox>
                        </div>
                        <a-checkbox-group :options="permission.actionsOptions" v-model="permission.selected" @change="onChangeCheck(permission)" />
                    </a-collapse-panel>
                </a-collapse> -->

                <!-- <a-card hoverable v-for="(permission, index) in permissions" :key="index" style="margin-bottom: 18px; ">
                    <div slot="title">
                        <a-checkbox :indeterminate="permission.indeterminate" :checked="permission.checkedAll" @change="onChangeCheckAll($event, permission)">
                            <span class="primary">全选-{{ permission.title }}</span>
                        </a-checkbox>
                    </div>
                    <a-checkbox-group :options="permission.actionsOptions" v-model="permission.selected" @change="onChangeCheck(permission)" />

                </a-card> -->

                <!-- <a-spin :spinning="spinning" :delay="delayTime">
                    <a-row :gutter="16" v-for="(permission, index) in permissions" :key="index">
                        <a-col :xl="24" v-if="permission.actionsOptions.length > 0" :style="{ borderBottom: '1px solid #E9E9E9', marginBottom: '12px' }">
                            <a-checkbox :indeterminate="permission.indeterminate" :checked="permission.checkedAll" @change="onChangeCheckAll($event, permission)">
                                <span class="primary">全选-{{ permission.title }}</span>
                            </a-checkbox>
                        </a-col>
                        <a-col :xl="24">
                            <a-checkbox-group :options="permission.actionsOptions" v-model="permission.selected" @change="onChangeCheck(permission)" />
                        </a-col>
                    </a-row>
                </a-spin> -->

            </a-form-item>
        </a-form>
    </a-spin>
</a-modal>
</template>

<script>
import pick from 'lodash.pick'
import {
    TreeSelect
} from 'ant-design-vue';
const SHOW_PARENT = TreeSelect.SHOW_PARENT;

export default {
    data() {
        return {
            SHOW_PARENT,
            title: '新增权限分组',
            indeterminate: true,
            checkAll: false,
            operationType: 1,
            spinning: false,
            delayTime: 500,
            rule: {
                name: {
                    rules: [{
                        required: true,
                        message: '请填写分组标识'
                    }],
                },
                title: {
                    rules: [{
                        required: true,
                        message: '请填写分组标题'
                    }]
                },
                status: {
                    rules: [{
                        required: true,
                        message: '请选择分组状态'
                    }],
                    initialValue: '1'
                }
            },
            labelCol: {
                xs: {
                    span: 24
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
            permissions: [],
            permissionSelected: [],
            permissionTreeData: []
        }
    },
    methods: {
        getAuthGroupAddFrom() {
            this.$api.ACCESS_AUTH_GROUP_ADDFORM_FORM().then(res => {
                const result = res.Data.list.auth_group
                // this.permissions = []
                // this.permissions = result.map(permission => {
                //     const options = permission.rules
                //     permission.checkedAll = false
                //     permission.selected = []
                //     permission.indeterminate = false
                //     permission.actionsOptions = options.map(option => {
                //         return {
                //             label: option.rule_name,
                //             value: option.rule_id
                //         }
                //     })
                //     return permission
                // })
                this.permissionSelected = []
                this.permissionTreeData = []
                this.permissionTreeData = result.map((item, index) => {
                    const permission = {
                        title: item.title,
                        key: `0-${index}`,
                        value: `0-${index}`,
                        children: item.rules.map(option => {
                            return {
                                title: option.rule_name,
                                key: `${Number(option.rule_id)}`,
                                value: `${Number(option.rule_id)}`
                            }
                        })
                    }
                    return permission
                })
            })
        },
        onChangeCheck(permission) {
            permission.indeterminate = !!permission.selected.length && (permission.selected.length < permission.actionsOptions.length)
            permission.checkedAll = permission.selected.length === permission.actionsOptions.length
        },
        onChangeCheckAll(e, permission) {
            Object.assign(permission, {
                selected: e.target.checked ? permission.actionsOptions.map(obj => obj.value) : [],
                indeterminate: false,
                checkedAll: e.target.checked
            })
        },
        add() {
            this.title = '新增权限分组'
            this.visible = true
            this.operationType = 1
            this.getAuthGroupAddFrom()
        },
        edit(record) {
            this.title = '编辑权限分组'
            this.operationType = 2
            this.visible = true
            const {
                form: {
                    setFieldsValue
                }
            } = this

            this.$nextTick(() => {
                setFieldsValue({
                    id: record.id,
                    name: record.name,
                    title: record.title,
                    status: String(record.status)
                })
            })

            this.permissions = []
            this.permissionSelected = []
            this.$api.ACCESS_AUTH_GROUP_UPDATE_FORM({
                id: record.id
            }).then(res => {
                const result = res.Data.list.auth_group
                // this.permissions = result.map(permission => {
                //     const options = permission.rules
                //     permission.checkedAll = false
                //     permission.selected = []
                //     permission.indeterminate = false
                //     permission.actionEntitySet = options.filter(entity => {
                //         if (entity.is_auth) {
                //             return {
                //                 label: entity.rule_name,
                //                 value: entity.rule_id
                //             }
                //         }
                //     })
                //     permission.actionsOptions = options.map(option => {
                //         return {
                //             label: option.rule_name,
                //             value: option.rule_id
                //         }
                //     })
                //     return permission
                // })

                this.permissionTreeData = []
                this.permissionTreeData = result.map((item, index) => {
                    const permission = {
                        title: item.title,
                        key: `0-${index}`,
                        value: `0-${index}`,
                        children: item.rules.map(option => {
                            if (option.is_auth) {
                                this.permissionSelected.push(option.rule_id)
                            }
                            return {
                                title: option.rule_name,
                                key: `${Number(option.rule_id)}`,
                                value: `${Number(option.rule_id)}`
                            }
                        })
                    }
                    return permission
                })

                // 先处理要勾选的权限结构
                const permissionsAction = {}
                this.permissions.forEach(permission => {
                    permissionsAction[permission.title] = permission.actionEntitySet.map(option => option.rule_id)
                })

                console.log('permissionsAction', permissionsAction)

                // 把权限表遍历一遍，设定要勾选的权限 action
                this.permissions.forEach(permission => {
                    const selected = permissionsAction[permission.title]
                    permission.selected = selected || []
                    this.onChangeCheck(permission)
                })
                console.log('this.permissions', this.permissions)
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

                    // this.permissions.forEach(item => {
                    //     if (item.selected.length > 0) {
                    //         ids = [...ids, ...item.selected]
                    //     }
                    // })
                    let ids = []
                    this.permissionSelected.forEach(permission => {
                        if (permission.includes('-')) {
                            const filterPermission = this.permissionTreeData.filter(item => {
                                if (item.value === permission) {
                                    return item.children
                                }
                            })[0]
                            filterPermission.children.forEach(option => {
                                ids.push(Number(option.value))
                            })
                        } else {
                            ids.push(Number(permission))
                        }
                    })
                    console.dir(ids)
                    const params = {
                        rules: ids
                    }

                    this.$api.ACCESS_AUTH_GROUP_SAVE(Object.assign(values, params)).then(res => {
                        if (res.Success) {
                            this.$message.success('管理员授权保存成功')
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
            this.form.resetFields();
        }
    }
}
</script>
