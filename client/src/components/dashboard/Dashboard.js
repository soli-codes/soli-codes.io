import React, { Fragment, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { getCurrentProfile, deleteAccount } from '../../actions/profile';
import '../../style.css';

const Dashboard = ({
    getCurrentProfile,
    deleteAccount,
    auth: { user },
    profile: { profile, loading },
}) => {
    useEffect(() => {
        getCurrentProfile();
    }, []);
    return loading && profile === null ? (
        <Spinner />
    ) : (
        <Fragment>
            <div className='topPadding'>
                <h1 className='large'>Dashboard</h1>
                <p className='lead'>
                    <i className='fas fa-user'>Welcome {user && user.name}</i>
                </p>
                {profile !== null ? (
                    <Fragment>
                        {' '}
                        <Link to='/create-profile' className='btn btn-primary'>
                            Edit profile
                        </Link>
                        <button
                            className='btn btn-danger'
                            onClick={() => deleteAccount()}
                        >
                            <i className='fas'>Delete my account</i>
                        </button>
                    </Fragment>
                ) : (
                    <Fragment>
                        <p>
                            You have not yet setup a profile, please add some
                            info
                        </p>
                        <Link to='/create-profile' className='btn btn-primary'>
                            Create profile
                        </Link>
                        <button
                            className='btn btn-danger'
                            onClick={() => deleteAccount()}
                        >
                            <i className='fas'>Delete my account</i>
                        </button>
                    </Fragment>
                )}
            </div>
        </Fragment>
    );
};

Dashboard.propTypes = {
    getCurrentProfile: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired,
    deleteAccount: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
    auth: state.auth,
    profile: state.profile,
});

export default connect(mapStateToProps, { getCurrentProfile, deleteAccount })(
    Dashboard
);
