import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';

const Navbar = ({ auth: { isAuthenticated, loading }, logout }) => {
    const authLinks = (
        <ul>
            <li className='hoverUnderline'>
                <Link to='/profiles'>Profiles</Link>
            </li>
            <li className='hoverUnderline'>
                <Link to='/dashboard'>
                    <i className='fas fa-user' /> Dashboard
                </Link>
            </li>
            <li className='hoverUnderline'>
                <a onClick={logout} href='#!'>
                    <i className='fas fa-sign-out-alt' /> Logout
                </a>
            </li>
        </ul>
    );

    const guestLinks = (
        <ul>
            <li className='hoverUnderline'>
                <Link to='/profiles'>Profiles</Link>
            </li>
            <li className='hoverUnderline'>
                <Link to='/register'>Register</Link>
            </li>
            <li className='hoverUnderline'>
                <Link to='/login'>Login</Link>
            </li>
        </ul>
    );
    return (
        <nav className='navbar'>
            <h1 className='hoverUnderline'>
                <Link to='/'>
                    <i /> soli-codes
                </Link>
            </h1>
            {!loading && (
                <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
            )}
        </nav>
    );
};

Navbar.propTypes = {
    logout: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    auth: state.auth,
});

export default connect(mapStateToProps, { logout })(Navbar);
