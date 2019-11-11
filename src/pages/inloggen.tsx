import React, { Component } from 'react';
import Layout from '../components/Layout';
import Title from '../components/Title';
import { Link, navigate } from 'gatsby';
import { Form, Icon, Input, Button, Checkbox, Col, Row, Result, Alert } from 'antd';
import { createHash } from 'crypto';
import { connect } from 'react-redux';
import { login } from '../store/auth';
import axios from 'axios';

class LoginForm extends Component<any, any> {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            wrongPassword: false
        };
    }

    handleSubmit = e => {
        e.preventDefault();
        const { dispatch } = this.props;
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.setState({
                    loading: true
                });
                axios
                    .post(`https://api.hageveldexperience.nl/login`, {
                        email: values.email.toLowerCase(),
                        wachtwoord: createHash('sha256')
                            .update(values.wachtwoord)
                            .digest('hex')
                    })
                    .then((response: any) => {
                        if (response.data.success) {
                            const { result } = response.data;
                            dispatch(
                                login({
                                    email: result.email.S.toLowerCase(),
                                    roepnaam: result.roepnaam.S,
                                    tussenvoegsel:
                                        'NULL' in result.tussenvoegsel
                                            ? undefined
                                            : result.tussenvoegsel.S,
                                    achternaam: result.achternaam.S,
                                    geslacht: result.geslacht.S,
                                    prefix: 'NULL' in result.prefix ? undefined : result.prefix.S,
                                    telefoonnummer:
                                        'NULL' in result.telefoonnummer
                                            ? undefined
                                            : result.telefoonnummer.S,
                                    wachtwoord: result.wachtwoord.S,
                                    school: result.school.S,
                                    verwijzing: result.verwijzing.S,
                                    admin: 'admin' in result ? result.admin.BOOL : false
                                })
                            );
                            navigate('/inschrijven');
                        } else {
                            this.setState({
                                loading: false,
                                wrongPassword: true
                            });
                        }
                    })
                    .catch(error => {
                        navigate('/error');
                    });
            }
        });
    };

    render() {
        const { isLoggedIn } = this.props;
        if (isLoggedIn) {
            navigate('/inschrijven');
        }
        const { getFieldDecorator } = this.props.form;
        const { loading, wrongPassword } = this.state;
        if (loading) {
            return (
                <Layout>
                    <Title centered={true}>Inloggen</Title>
                    <Result icon={<Icon type="loading" />} />
                </Layout>
            );
        } else {
            return (
                <Layout>
                    <Title centered={true}>Inloggen</Title>
                    <Row>
                        <Col span={12} offset={6}>
                            <Form onSubmit={this.handleSubmit} className="login-form">
                                {wrongPassword && (
                                    <Form.Item>
                                        <Alert
                                            message="Ongeldig e-mailadres of wachtwoord"
                                            type="error"
                                            showIcon={true}
                                        />
                                    </Form.Item>
                                )}
                                <Form.Item>
                                    {getFieldDecorator('email', {
                                        rules: [
                                            {
                                                required: true,
                                                message: 'Vul alsjeblieft je e-mailadres in!'
                                            }
                                        ]
                                    })(
                                        <Input
                                            prefix={
                                                <Icon
                                                    type="user"
                                                    style={{ color: 'rgba(0,0,0,.25)' }}
                                                />
                                            }
                                            placeholder="E-mailadres"
                                        />
                                    )}
                                </Form.Item>
                                <Form.Item>
                                    {getFieldDecorator('wachtwoord', {
                                        rules: [
                                            {
                                                required: true,
                                                message: 'Vul alsjeblieft je wachtwoord in!'
                                            }
                                        ]
                                    })(
                                        <Input
                                            prefix={
                                                <Icon
                                                    type="lock"
                                                    style={{ color: 'rgba(0,0,0,.25)' }}
                                                />
                                            }
                                            type="password"
                                            placeholder="Wachtwoord"
                                        />
                                    )}
                                </Form.Item>
                                <Form.Item>
                                    <Button
                                        type="primary"
                                        htmlType="submit"
                                        className="login-form-button"
                                    >
                                        Log in
                                    </Button>
                                </Form.Item>
                                <Form.Item>
                                    <p>
                                        Klik{' '}
                                        <Link to="/registreren">
                                            <b>hier</b>
                                        </Link>{' '}
                                        indien je nog geen account hebt.
                                    </p>
                                </Form.Item>
                            </Form>
                        </Col>
                    </Row>
                </Layout>
            );
        }
    }
}

const WrappedLoginForm = Form.create({ name: 'login' })(LoginForm);

const mapStateToProps = state => {
    return {
        isLoggedIn: state.auth.isLoggedIn
    };
};

export default connect(mapStateToProps)(WrappedLoginForm);
