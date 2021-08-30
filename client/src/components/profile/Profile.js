import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { getProfileById } from '../../actions/profile';
import { Link } from 'react-router-dom';
import '../../profile.css';
const Profile = ({ getProfileById, profile: { profile, loading }, match }) => {
    useEffect(() => {
        getProfileById(match.params.id);
    }, [getProfileById, match.params.id]);
    return (
        <Fragment className='topPadding'>
            {profile === null || loading ? (
                <Spinner />
            ) : (
                <Fragment>
                    <div className='topPadding'>
                        {' '}
                        <div className='center large'>{profile.user.name}</div>
                        <div className='profileContainer'>
                            <p className='about'>
                                {profile.about !== null &&
                                profile.about !== undefined
                                    ? profile.about
                                    : 'There is no information about this user yet'}
                            </p>
                            <ul>
                                <li>
                                    <i
                                        className='fab fa-twitter icoSpacing'
                                        style={{ color: '#38a1f3' }}
                                    ></i>
                                    {profile.social !== null &&
                                    profile.social !== undefined &&
                                    profile.social.twitter ? (
                                        <a href={profile.social.twitter}>
                                            {profile.social.twitter}
                                        </a>
                                    ) : (
                                        'This user has no Twitter'
                                    )}
                                </li>
                                <li>
                                    <i
                                        className='fab fa-youtube icoSpacing'
                                        style={{ color: '#c4302b' }}
                                    ></i>
                                    {profile.social !== null &&
                                    profile.social !== undefined &&
                                    profile.social.youtube ? (
                                        <a href={profile.social.youtube}>
                                            {profile.social.youtube}
                                        </a>
                                    ) : (
                                        'This user has no Youtube'
                                    )}
                                </li>
                                <li>
                                    <i className='fab fa-twitch icoSpacing'></i>
                                    {profile.social !== null &&
                                    profile.social !== undefined &&
                                    profile.social.twitch ? (
                                        <a href={profile.social.twitch}>
                                            {profile.social.twitch}
                                        </a>
                                    ) : (
                                        'This user has no Twitch'
                                    )}
                                </li>
                            </ul>
                            <Link to='/profiles' className='btn my-2'>
                                Back to profiles
                            </Link>
                        </div>
                    </div>
                </Fragment>
            )}
        </Fragment>
    );
};

Profile.propTypes = {
    getProfileById: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
    profile: state.profile,
});

export default connect(mapStateToProps, { getProfileById })(Profile);
