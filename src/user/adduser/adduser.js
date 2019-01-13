import React from 'react';
import {Form, Icon, Input} from 'antd';

import './adduser.css'

class AddUserForm extends React.Component {

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Form>
                <Form.Item>
                    {getFieldDecorator('loginName', {
                        validateTrigger: ['onChange', 'onBlur'],
                        rules: [
                            { required: true, message: '请输入用户名' }
                        ],
                    })(
                        <Input size={'large'} prefix={<Icon type="user" className="adduser-form-icon" />} placeholder="用户名" />
                    )}
                </Form.Item>
                <Form.Item>
                    {getFieldDecorator('nick', {
                    })(
                        <Input size={'large'} prefix={<Icon type="user" className="adduser-form-icon" />} placeholder="昵称" />
                    )}
                </Form.Item>
                <Form.Item>
                    <Input size={'large'} prefix={<Icon type="lock" className="adduser-form-icon" />}
                           value={'初始密码：P@55word'} disabled={true} />
                </Form.Item>
            </Form>
        );
    }
}

export default Form.create()(AddUserForm);