<template>
<a-modal title="新建客户端事件配置列表" :width="900" :visible="visible" :confirmLoading="confirmLoading" @ok="handleSubmit" @cancel="handleCancel">
    <a-spin :spinning="confirmLoading">
        <a-form :form="form">
            <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol">
                <span slot="label">
                    界面ID&nbsp;
                    <a-tooltip title="APP界面唯一标识（命名规则：英文前缀_界面名称）">
                        <a-icon type="question-circle-o" />
                    </a-tooltip>
                </span>
                <a-input v-decorator="['page_id', rule.page_id]" />
            </a-form-item>
            <a-form-item :labelCol="labelCol" :wrapperCol="wrapperCol">
                <span slot="label">
                    事件ID&nbsp;
                    <a-tooltip title="命名规则：事件类型界面名称功能名称，如点击事件比赛报名报名=btn_matchchoose_sign">
                        <a-icon type="question-circle-o" />
                    </a-tooltip>
                </span>
                <a-input v-decorator="['event_id', rule.event_id]" />
            </a-form-item>
            <a-form-item label="界面名称" :labelCol="labelCol" :wrapperCol="wrapperCol">
                <a-input v-decorator="['page_name', rule.page_name]" />
            </a-form-item>
            <a-form-item label="事件名称" :labelCol="labelCol" :wrapperCol="wrapperCol">
                <a-input v-decorator="['event_name', rule.event_name]" />
            </a-form-item>
            <a-form-item label="事件类型" :labelCol="labelCol" :wrapperCol="wrapperCol">
                <a-radio-group v-decorator="['event_type', rule.event_type]" placeholder="请选择事件类型">
                    <a-radio-button value="1">点击事件</a-radio-button>
                    <a-radio-button value="2">浏览事件</a-radio-button>
                </a-radio-group>
            </a-form-item>
            <a-form-item label="事件主题" :labelCol="labelCol" :wrapperCol="wrapperCol">
                <a-input v-decorator="['event_theme', rule.event_theme]" />
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
                <a-icon style="display: inline-block; margin-left: 8px" v-if="form.getFieldValue('keys').length > 0" class="dynamic-delete-button" type="delete" @click="() => remove(k)" />
            </a-form-item>

            <a-form-item label="新增属性" :labelCol="labelCol" :wrapperCol="wrapperCol">
                <a-button type="dashed" style="width: 100%" @click="addAttribute">
                    <a-icon type="plus" /> 添加属性
                </a-button>
            </a-form-item>

            <a-form-item label="采集时机" :labelCol="labelCol" :wrapperCol="wrapperCol">
                <a-input v-decorator="['collect_timing', rule.collect_timing]" />
            </a-form-item>
            <a-form-item label="优先级别" :labelCol="labelCol" :wrapperCol="wrapperCol">
                <a-input-number :min="1" :max="10" @change="onSortChange" v-decorator="['sort', rule.sort]" />
            </a-form-item>
            <a-form-item label="版本号" :labelCol="labelCol" :wrapperCol="wrapperCol">
                <a-input v-decorator="['game_version', rule.game_version]" />
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

let id = 0;
export default {
    data() {
        return {
            rule: {
                page_id: {
                    rules: [{
                        required: true,
                        min: 5,
                        message: '请输入界面ID'
                    }]
                },
                event_id: {
                    rules: [{
                        required: true,
                        min: 5,
                        message: '请输入事件ID'
                    }]
                },
                page_name: {
                    rules: [{
                        required: true,
                        min: 5,
                        message: '请输入界面名称'
                    }]
                },
                event_name: {
                    rules: [{
                        required: true,
                        min: 5,
                        message: '请输入事件名称'
                    }]
                },
                event_type: {
                    rules: [{
                        required: true,
                        message: '请选择事件类型'
                    }],
                    initialValue: '1'
                },
                event_theme: {
                    rules: [{
                        required: true,
                        min: 5,
                        message: '请输入事件主题'
                    }]
                },
                collect_timing: {
                    rules: [{
                        required: true,
                        min: 5,
                        message: '请输入采集时机'
                    }]
                },
                sort: {
                    rules: [{
                        required: false,
                        message: '请输入优先级0至3依次降低'
                    }]
                },
                game_version: {
                    rules: [{
                        required: true,
                        min: 5,
                        message: '请输入版本号'
                    }]
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
                        span: 3
                    },
                },
                wrapperCol: {
                    xs: {
                        span: 23
                    },
                    sm: {
                        span: 20
                    },
                },
            },
            formItemLayoutWithOutLabel: {
                labelCol: {
                    xs: {
                        span: 23
                    },
                    sm: {
                        span: 3
                    },
                },
                wrapperCol: {
                    xs: {
                        span: 23,
                    },
                    sm: {
                        span: 20,
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
