import { FC, useState } from 'react';

import { Form, Input, Button } from 'antd';
import { EyeTwoTone, EyeInvisibleOutlined } from '@ant-design/icons';
import classes from './changePasswordPage.module.css';
import classnames from 'classnames';

type RebootPassFieldType = {
    password?: string;
    confirmPassword?: string;
};

export const ChangePasswordPage: FC = () => {
    const [isPasswordHelperVisible, setIsPasswordHelperVisible] = useState(false);
    const [passPlaceholderVisible, setPassPlaceholderVisible] = useState(true);
    const [confirmPlaceholderVisible, setConfirmPlaceholderVisible] = useState(true);
    const [disabledSubmit, setDisabledSubmit] = useState(false);
    const [form] = Form.useForm();

    const passwordErrorMessage = 'Пароль не менее 8 символов, с заглавной буквой и цифрой';
    const matchedErrorMessage = 'Пароли не совпадают';

    const handleSubmit = (values: any) => {
        console.log(values);
    };

    const handleFailed = (errorInfo: any) => {
        console.log(errorInfo);
    };

    const handleFormChanged: () => void = () => {
        const hasErrors = form.getFieldsError().some(({ errors }) => errors.length);
        setDisabledSubmit(hasErrors);
    };

    return (
        <div className={classes.changeForm}>
            <h1 className={classes.title}>Восстановление аккауанта</h1>
            <Form
                form={form}
                onFieldsChange={handleFormChanged}
                name='setNewPassForm'
                autoComplete='off'
                onFinish={handleSubmit}
                onFinishFailed={handleFailed}
                className={classes.formPassReset}
            >
                <Form.Item<RebootPassFieldType>
                    className={classnames(classes.antFixed)}
                    help={isPasswordHelperVisible ? passwordErrorMessage : ''}
                    name='password'
                    rules={[
                        {
                            required: true,
                            pattern: new RegExp(/^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/),
                            message: passwordErrorMessage,
                        },
                    ]}
                >
                    <Input.Password
                        size='large'
                        placeholder={passPlaceholderVisible ? 'Новый пароль' : ''}
                        onChange={() => {
                            setPassPlaceholderVisible(false);
                        }}
                        style={{ outline: 'none' }}
                        onFocus={() => {
                            setIsPasswordHelperVisible(true);
                        }}
                        iconRender={(visible) =>
                            visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                        }
                    />
                </Form.Item>
                <Form.Item<RebootPassFieldType>
                    name='confirmPassword'
                    className={classnames(classes.antFixed)}
                    rules={[
                        {
                            required: true,
                            message: '',
                        },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (!value || getFieldValue('password') === value) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(new Error(matchedErrorMessage));
                            },
                        }),
                    ]}
                >
                    <Input.Password
                        size='large'
                        placeholder={confirmPlaceholderVisible ? 'Повторите пароль' : ''}
                        style={{ outline: 'none' }}
                        onChange={() => {
                            setConfirmPlaceholderVisible(false);
                        }}
                        iconRender={(visible) =>
                            visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                        }
                    />
                </Form.Item>
                <Form.Item className={classnames(classes.antFixed, classes['submit-block'])}>
                    <Button
                        size='large'
                        className={classnames(classes['submit-button'], classes.antFixed)}
                        type='primary'
                        htmlType='submit'
                        block
                        disabled={disabledSubmit}
                    >
                        Сохранить
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};
