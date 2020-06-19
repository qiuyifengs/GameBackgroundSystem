<template>
<a-modal title="添加礼包" :width="800" :visible="visible" :confirmLoading="confirmLoading" @ok="handleSubmit" @cancel="handleCancel">
    <a-spin :spinning="confirmLoading">
        <a-form :form="form">
            <a-form-item label="礼包名称" :labelCol="labelCol" :wrapperCol="wrapperCol">
                <a-input placeholder="请填写礼包名称" v-decorator="['page_id', rule.gift_name]" />
            </a-form-item>
            <a-form-item label="礼包价值" :labelCol="labelCol" :wrapperCol="wrapperCol">
                <a-input placeholder="请填写礼包价值" v-decorator="['event_id', rule.gift_jiazhi]" />
            </a-form-item>
            <a-form-item label="说明" :labelCol="labelCol" :wrapperCol="wrapperCol">
                <a-textarea v-decorator="['switch_cn_name', rule.shuoming]" />
            </a-form-item>
            <a-form-item label="需要发送的道具" :labelCol="labelCol" :wrapperCol="wrapperCol">
                <a-select v-decorator="['event_type', rule.daoju]" placeholder="请选择需要发送的道具">
                    <a-select-option value="0">新手礼包</a-select-option>
                </a-select>
            </a-form-item>
            <a-form-item label="道具列表" :labelCol="labelCol" :wrapperCol="wrapperCol">
                <a-input v-decorator="['event_theme', rule.daojuList]" />
            </a-form-item>
            <a-form-item v-for="(k, index) in form.getFieldValue('keys')" :key="k" v-bind="index === 0 ? formItemLayout : formItemLayoutWithOutLabel" :label="index === 0 ? '属性1' : `属性${index+ 1}`" :required="false">
                <a-form-item :style="{ display: 'inline-block', width: 'calc(50% - 28px)', margin: 0 }">
                    <a-input v-decorator="[
                        `key[${k}]`,
                        {
                            validateTrigger: ['change', 'blur'],
                        }
                        ]" placeholder="key" style="width: 100%; margin-right: 8px" />
                </a-form-item>
                <span :style="{ display: 'inline-block', width: '24px', textAlign: 'center' }">-</span>
                <a-form-item :style="{ display: 'inline-block', width: 'calc(50% - 28px)', margin: 0 }">
                    <a-input v-decorator="[
                        `value[${k}]`,
                        {
                            validateTrigger: ['change', 'blur'],
                        }
                        ]" placeholder="value" style="width: 100%" />
                </a-form-item>
                <a-icon style="display: inline-block; margin-left: 8px" v-if="form.getFieldValue('keys').length > 0" class="dynamic-delete-button" type="minus-circle-o" @click="() => remove(k)" />
            </a-form-item>

            <a-form-item label="新增道具" :labelCol="labelCol" :wrapperCol="wrapperCol">
                <a-button type="dashed" style="width: 60%" @click="addAttribute">
                    <a-icon type="plus" /> Add field
                </a-button>
            </a-form-item>
        </a-form>
    </a-spin>
</a-modal>
</template>

<script>
import {
    addClientEventsConfig
} from '@/api/sys.game'
import qs from 'qs'

let id = 0
import {
    mixin
} from '@/utils/mixin'

export default {
    mixins: [mixin],
    data() {
        return {
            rule: {
                gift_name: {
                    rules: [{
                        required: true,
                        min: 5,
                        message: '请填写礼包名称'
                    }]
                },
                gift_jiazhi: {
                    rules: [{
                        required: true,
                        min: 5,
                        message: '请填写礼包价值'
                    }]
                },
                shuoming: {
                    rules: [{
                        required: true,
                        message: '请输入开关中文名称'
                    }]
                },
                daoju: {
                    rules: [{
                        required: true,
                        message: '请选择事件类型'
                    }],
                    initialValue: '0'
                },
                daojuList: {
                    rules: [{
                        required: true,
                        min: 5,
                        message: '请输入事件主题'
                    }]
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
            event_type_value: '1',
            sort: 1,
            visible: false,
            confirmLoading: false,
            form: this.$form.createForm(this),
            formItemLayout: {
                labelCol: {
                    xs: {
                        span: 23
                    },
                    sm: {
                        span: 7
                    },
                },
                wrapperCol: {
                    xs: {
                        span: 23
                    },
                    sm: {
                        span: 13
                    },
                },
            },
            formItemLayoutWithOutLabel: {
                labelCol: {
                    xs: {
                        span: 23
                    },
                    sm: {
                        span: 7
                    },
                },
                wrapperCol: {
                    xs: {
                        span: 23,
                    },
                    sm: {
                        span: 13,
                    },
                },
            },
        }
    },
    created() {
        this.form.getFieldDecorator('keys', {
            initialValue: [],
            preserve: true
        });
    },
    methods: {
        add() {
            this.visible = true
        },
        handleSelectChange(value) {
            console.log(value)
        },
        onSortChange() {

        },
        addAttribute() {
            const {
                form
            } = this
            // can use data-binding to get
            const keys = form.getFieldValue('keys');
            const nextKeys = keys.concat(++id);
            // // can use data-binding to set
            form.setFieldsValue({
                keys: nextKeys,
            });
        },
        remove(k) {
            const {
                form
            } = this;
            // can use data-binding to get
            const keys = form.getFieldValue('keys');
            // We need at least one passenger
            // if (keys.length === 1) {
            //     return;
            // }

            // can use data-binding to set
            form.setFieldsValue({
                keys: keys.filter(key => key !== k)
            });
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
                    let arr = [],
                        attributeJson = {}
                    if (values.hasOwnProperty('key')) {
                        for (let i = 0; i < values.key.length; i++) {
                            arr.push({
                                key: values.key[i],
                                value: values.value[i]
                            })
                        }

                        const filterAttributeArr = arr.filter(item => item.key !== undefined)
                        filterAttributeArr.forEach(attr => {
                            const source = JSON.parse(`{"${attr.key}":"${attr.value}"}`)
                            Object.assign(attributeJson, source)
                        })
                    }

                    const {
                        page_id,
                        event_id,
                        page_name,
                        event_name,
                        event_type,
                        event_theme,
                        collect_timing,
                        sort,
                        game_version
                    } = values
                    const params = {
                        page_id: page_id,
                        event_id: event_id,
                        page_name: page_name,
                        event_name: event_name,
                        event_type: event_type,
                        event_theme: event_theme,
                        collect_timing: collect_timing,
                        sort: sort,
                        game_version: game_version,
                        attribute: String(JSON.stringify(attributeJson))
                    }
                    console.log(params)
                    addClientEventsConfig(params).then(res => {
                        console.log(res.Error)
                        this.$message.success('新增客户端事件配置成功')
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
