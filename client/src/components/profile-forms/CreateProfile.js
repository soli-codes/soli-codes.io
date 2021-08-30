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
        about: '',
    });

    const onChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const onSubmit = (e) => {
        e.preventDefault();
        createProfile(formData, history);
    };

    const { youtube, twitch, twitter, about } = formData;
    useEffect(() => {
        getCurrentProfile();

        setFormData({
            youtube:
                loading || profile === null || profile.social === undefined
                    ? ''
                    : profile.social.youtube,
            twitch:
                loading || profile === null || profile.social === undefined
                    ? ''
                    : profile.social.twitch,
            twitter:
                loading || profile === null || profile.social === undefined
                    ? ''
                    : profile.social.twitter,
            about:
                loading || profile === null || profile.about === undefined
                    ? ''
                    : profile.about,
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [getCurrentProfile, loading]);

    return loading && profile === null ? (
        <Spinner />
    ) : (
        <Fragment>
            <div className='topPadding'>
                <form className='form' onSubmit={(e) => onSubmit(e)}>
                    <div className='form-group social-input'>
                        <i className='fab fa-twitter fa-2x'></i>
                        <input
                            type='text'
                            placeholder={twitter}
                            className='formInput'
                            name='twitter'
                            value={twitter}
                            pattern='(https:\/\/twitter)\.com\/([a-zA-Z0-9_]+)'
                            title='URL must start with https://'
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
                            pattern='(https:\/\/youtube)\.com\/([a-zA-Z0-9_]+)'
                            title='URL must start with https://'
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
                            pattern='(https:\/\/twitch)\.tv\/([a-zA-Z0-9_]+)'
                            title='URL must start with https://'
                            onChange={(e) => onChange(e)}
                        />
                    </div>
                    <div className='form-group social-input'>
                        <i className='fa fa-user fa-2x'></i>
                        <textarea
                            type='text'
                            placeholder={about}
                            className='formInput'
                            name='about'
                            value={about}
                            onChange={(e) => onChange(e)}
                        />
                    </div>
                    <div style={{ margin: 'auto', textAlign: 'center' }}>
                        <input type='submit' className='btn btn-primary my-1' />
                        <Link className='btn btn-light my-1' to='dashboard'>
                            Go Back
                        </Link>
                    </div>
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
