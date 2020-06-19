<template>
<a-modal :title="title" :width="900" :visible="visible" :confirmLoading="confirmLoading" @ok="handleSubmit" @cancel="handleCancel">
    <a-spin :spinning="confirmLoading">
        <a-form :form="form">
            <a-form-item v-if="operationType == 2" style="display: none">
                <a-input v-decorator="['uid']" />
            </a-form-item>

            <a-form-item label="选择管理员" :labelCol="labelCol" :wrapperCol="wrapperCol">
                <a-select v-decorator="['uid', rule.uid]" :disabled="operationType==2" placeholder="请选择管理员">
                    <a-select-option v-for="(item, index) in userList" :key="index" :value="item.uid">{{ item.user_name }}</a-select-option>
                </a-select>
            </a-form-item>
            <a-form-item label="选择权限组" :labelCol="labelCol" :wrapperCol="wrapperCol">
                <a-tree-select style="width: 100%" :treeData="permissionTreeData" v-model="permissionSelected" treeCheckable :showCheckedStrategy="SHOW_PARENT" placeholder="请选择权限" :dropdownStyle="{ maxHeight: '300px', overflow: 'auto' }" searchPlaceholder="请选择权限" />

                <!-- <a-row :gutter="16" v-for="(permission, index) in permissions" :key="index">
                    <a-col :xl="24" v-if="permission.actionsOptions.length > 0">
                        <a-checkbox :indeterminate="permission.indeterminate" :checked="permission.checkedAll" @change="onChangeCheckAll($event, permission)">
                            <span class="primary">全选-{{ permission.title }}</span>
                        </a-checkbox>
                    </a-col>
                    <a-col :xl="24">
                        <a-checkbox-group :options="permission.actionsOptions" v-model="permission.selected" @change="onChangeCheck(permission)" />
                    </a-col>
                </a-row> -->
            </a-form-item>
        </a-form>
    </a-spin>
</a-modal>
</template>

<script>
import pick from 'lodash.pick'
import {
    saveAdminAuth,
    getAuthData
} from '@/api/auth'
import {
    TreeSelect
} from 'ant-design-vue';
const SHOW_PARENT = TreeSelect.SHOW_PARENT;

export default {
    data() {
        return {
            SHOW_PARENT,
            permissionSelected: [],
            permissionTreeData: [],
            title: '新增管理员授权',
            indeterminate: true,
            checkAll: false,
            operationType: 1,
            spinning: false,
            delayTime: 500,
            rule: {
                uid: {
                    rules: [{
                        required: true,
                        message: '请填写用户名'
                    }],

                },
                group: {
                    rules: [{
                        required: true,
                        message: '请选择权限'
                    }]
                },
            },
            labelCol: {
                xs: {
                    span: 24
                },
                sm: {
                    span: 5
                }
            },
            wrapperCol: {
                xs: {
                    span: 24
                },
                sm: {
                    span: 18
                }
            },
            visible: false,
            confirmLoading: false,
            form: this.$form.createForm(this),
            permissions: [],
            userList: []
        }
    },
    methods: {
        getAccessAuthAddForm() {
            this.$api.ACCESS_AUTH_ADD_FORM().then(res => {
                this.userList = res.Data.list.users
                const systemGroup = res.Data.list.groups.system_group
                const customGroup = res.Data.list.groups.custom_group

                this.permissionSelected = []
                this.permissionTreeData = []
                const systemGroupObj = {
                    key: '0-0',
                    value: '0-0',
                    title: '系统权限',
                    children: systemGroup.map(option => {
                        return {
                            key: String(option.id),
                            value: String(option.id),
                            title: option.title
                        }
                    })
                }
                this.permissionTreeData.push(systemGroupObj)

                const customGroupObj = {
                    key: '0-1',
                    value: '0-1',
                    title: '自定义权限',
                    children: customGroup.map(option => {
                        return {
                            key: String(option.id),
                            value: String(option.id),
                            title: option.title
                        }
                    })
                }
                this.permissionTreeData.push(customGroupObj)

                // let systemGroupObj = {
                //     title: '系统权限',
                //     checkedAll: false,
                //     selected: [],
                //     indeterminate: false,
                //     actionsOptions: systemGroup.map(option => {
                //         return {
                //             label: option.title,
                //             value: option.id
                //         }
                //     })
                // }
                // this.permissions.push(systemGroupObj)

                // let customGroupObj = {
                //     title: '自定义权限',
                //     checkedAll: false,
                //     selected: [],
                //     indeterminate: false,
                //     actionsOptions: customGroup.map(option => {
                //         return {
                //             label: option.title,
                //             value: option.id
                //         }
                //     })
                // }
                // this.permissions.push(customGroupObj)
            })
        },
        onChangeCheck(permission) {
            permission.indeterminate = !!permission.selected.length && (permission.selected.length < permission.actionsOptions.length)
            permission.checkedAll = permission.selected.length === permission.actionsOptions.length
            console.log(permission)
        },
        onChangeCheckAll(e, permission) {
            console.log('permission:', permission)
            Object.assign(permission, {
                selected: e.target.checked ? permission.actionsOptions.map(obj => obj.value) : [],
                indeterminate: false,
                checkedAll: e.target.checked
            })
        },
        add() {
            this.title = '新增管理员授权'
            this.visible = true
            this.operationType = 1
            this.getAccessAuthAddForm()
        },
        edit(record) {
            this.title = '编辑管理员授权'
            this.operationType = 2
            this.visible = true
            const {
                form: {
                    setFieldsValue
                }
            } = this
            console.log(record)

            this.$nextTick(() => {
                setFieldsValue({
                    uid: record.user_id
                })
            })

            this.permissionTreeData = []
            this.permissionSelected = []
            this.$api.ACCESS_AUTH_UPDATE_FORM({
                uid: record.user_id
            }).then(res => {
                this.userList = res.Data.list.users
                const systemGroup = res.Data.list.groups.system_group
                const customGroup = res.Data.list.groups.custom_group
                const mergeGroup = [{
                        title: '系统权限',
                        rules: systemGroup
                    },
                    {
                        title: '自定义权限',
                        rules: customGroup
                    }
                ]

                console.log(mergeGroup)

                this.permissionTreeData = []
                this.permissionTreeData = mergeGroup.map((item, index) => {
                    const permission = {
                        title: item.title,
                        key: `0-${index}`,
                        value: `0-${index}`,
                        children: item.rules.map(option => {
                            if (option.is_auth) {
                                this.permissionSelected.push(String(option.id))
                            }
                            return {
                                title: option.title,
                                key: `${String(option.id)}`,
                                value: `${String(option.id)}`
                            }
                        })
                    }
                    return permission
                })

                // this.permissions = mergeGroup.map(permission => {
                //     const options = permission.rules
                //     permission.checkedAll = false
                //     permission.selected = []
                //     permission.indeterminate = false
                //     permission.actionEntitySet = options.filter(entity => {
                //         if (entity.is_auth) {
                //             return {
                //                 label: entity.title,
                //                 value: entity.id
                //             }
                //         }
                //     })
                //     permission.actionsOptions = options.map(option => {
                //         return {
                //             label: option.title,
                //             value: option.id
                //         }
                //     })
                //     return permission
                // })

                // // 先处理要勾选的权限结构
                const permissionsAction = {}
                this.permissions.forEach(permission => {
                    permissionsAction[permission.title] = permission.actionEntitySet.map(option => option.id)
                })

                console.log('permissionsAction', permissionsAction)

                // // 把权限表遍历一遍，设定要勾选的权限 action
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
                    // let ids = []
                    // this.permissions.forEach(item => {
                    //     if (item.selected.length > 0) {
                    //         ids = [...ids, ...item.selected]
                    //     }
                    // })
                    let ids = []
                    this.permissionSelected.forEach(permission => {
                        console.log(permission)
                        if (permission.includes('-')) {
                            const filterPermission = this.permissionTreeData.filter(item => {
                                if (item.value === permission) {
                                    return item.children
                                }
                            })[0]
                            filterPermission.children.forEach(option => {
                                ids.push(option.value)
                            })
                        } else {
                            ids.push(Number(permission))
                        }
                    })
                    console.dir(ids)
                    
                    const params = {
                        uid: values.uid,
                        group: ids
                    }
                    console.log(params)
                    this.$api.ACCESS_AUTH_SAVE(params).then(res => {
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
            this.form.resetFields()
            this.permissions = []
        }
    }
}
</script>
