import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { setAlert } from '../../actions/alert';
import PropTypes from 'prop-types';

import '../../style.css';
const Login = ({ setAlert }) => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const { email, password } = formData;

    const onChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        if (!email) {
            setAlert('Email is required', 'danger');
        }
        if (!password) {
            setAlert('Password is required', 'danger');
        }
    };

    return (
        <Fragment>
            <html lang='en'>
                <head>
                    <meta charset='UTF-8' />
                    <meta
                        name='viewport'
                        content='width=device-width, initial-scale=1.0'
                    />
                    <meta http-equiv='X-UA-Compatible' content='ie=edge' />
                    <link
                        href='https://fonts.googleapis.com/css?family=Raleway'
                        rel='stylesheet'
                    />
                    <link
                        rel='stylesheet'
                        href='https://use.fontawesome.com/releases/v5.8.1/css/all.css'
                        integrity='sha384-50oBUHEmvpQ+1lW4y57PTFmhCaXp0ML5d60M1M7uH2+nqUivzIebhndOJK28anvf'
                        crossorigin='anonymous'
                    />
                    <title>Login</title>
                </head>
                <body>
                    <section className='center main'>
                        <h1 className='large'>Sign In</h1>
                        <p className='lead'>
                            <i className='fas fa-user'></i> Sign into Your
                            Account
                        </p>
                        <form className='form' onSubmit={(e) => onSubmit(e)}>
                            <div className='form-group'>
                                <input
                                    type='email'
                                    placeholder='Email Address'
                                    name='email'
                                    value={email}
                                    onChange={(e) => onChange(e)}
                                    required
                                />
                            </div>
                            <div className='form-group'>
                                <input
                                    type='password'
                                    placeholder='Password'
                                    name='password'
                                    value={password}
                                    onChange={(e) => onChange(e)}
                                />
                            </div>
                            <input
                                type='submit'
                                className='btn btn-primary'
                                value='Login'
                            />
                        </form>
                    </section>
                </body>
            </html>
        </Fragment>
    );
};

Login.propTypes = {
    setAlert: PropTypes.func.isRequired,
};

export default connect(null, { setAlert })(Login);
