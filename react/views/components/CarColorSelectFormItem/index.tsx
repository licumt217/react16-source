import React from 'react'
import { Select, Form } from 'antd'
const { Option } = Select;

export default function CarColorSelectFormItem() {

    return (


        < Form.Item label="车牌颜色" name="PlateNumColor" rules={[{ required: true, message: '请选择车牌颜色' }]} >
            <Select placeholder="请选择" allowClear >
                <Option value="蓝">蓝</Option>
                <Option value="黄">黄</Option>
                <Option value="白">白</Option>
                <Option value="黑">黑</Option>
                <Option value="绿">绿</Option>
                <Option value="黄绿">黄绿</Option>
            </Select>
        </ Form.Item>

    )
}
