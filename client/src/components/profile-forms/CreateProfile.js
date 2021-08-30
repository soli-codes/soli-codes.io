import React, { Fragment, useState, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createProfile, getCurrentProfile } from '../../actions/profile';
import Spinner from '../layout/Spinner';

const CreateProfile = ({
    getCurrentProfile,
    createProfile,
    history,
    profile: { profile, loading },
}) => {
    const [formData, setFormData] = useState({
        youtube: '',
        twitch: '',
        twitter: '',
    });

    const onChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const onSubmit = (e) => {
        e.preventDefault();
        createProfile(formData, history);
    };

    const { youtube, twitch, twitter } = formData;
    useEffect(() => {
        getCurrentProfile();

        setFormData({
            youtube: loading || profile === null ? '' : profile.social.youtube,
            twitch: loading || profile === null ? '' : profile.social.twitch,
            twitter: loading || profile === null ? '' : profile.social.twitter,
        });
    }, [loading]);
    return loading && profile === null ? (
        <Spinner />
    ) : (
        <Fragment>
            <div className='topPadding'>
                <p className='lead' style={{ padding: '0.5rem' }}>
                    Let's get some information to make your profile stand out
                </p>
                <form className='form' onSubmit={(e) => onSubmit(e)}>
                    <div className='form-group social-input'>
                        <i className='fab fa-twitter fa-2x'></i>
                        <input
                            type='text'
                            placeholder={twitter}
                            className='formInput'
                            name='twitter'
                            value={twitter}
                            onChange={(e) => onChange(e)}
                        />
                    </div>

                    <div className='form-group social-input'>
                        <i className='fab fa-youtube fa-2x'></i>
                        <input
                            type='text'
                            className='formInput'
                            placeholder={youtube}
                            name='youtube'
                            value={youtube}
                            onChange={(e) => onChange(e)}
                        />
                    </div>

                    <div className='form-group social-input'>
                        <i className='fab fa-twitch fa-2x'></i>
                        <input
                            type='text'
                            placeholder={twitch}
                            className='formInput'
                            name='twitch'
                            value={twitch}
                            onChange={(e) => onChange(e)}
                        />
                    </div>
                    <input type='submit' className='btn btn-primary my-1' />
                    <Link className='btn btn-light my-1' to='dashboard'>
                        Go Back
                    </Link>
                </form>
            </div>
        </Fragment>
    );
};

CreateProfile.propTypes = {
    createProfile: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    auth: state.auth,
    profile: state.profile,
});

export default connect(mapStateToProps, { createProfile, getCurrentProfile })(
    withRouter(CreateProfile)
);
