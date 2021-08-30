import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import '../../profile.css';

const ProfileItem = ({ profile }) => {
    return (
        <div className='center' style={{ padding: '1rem' }}>
            <div className='row'>
                <Link
                    to={`/profile/${profile.user._id}`}
                    className='btnAlign column'
                >
                    {profile.user.name}
                </Link>
                <div className='column'>
                    <div style={{ display: 'inline' }}>
                        {profile.social !== null &&
                        profile.social !== undefined &&
                        profile.social.twitter ? (
                            <a href={profile.social.twitter}>
                                {''}
                                <i
                                    className='fab fa-twitter fa-2x socialIcon'
                                    style={{ color: '#38a1f3' }}
                                />
                                {''}
                            </a>
                        ) : (
                            <i
                                className='fab fa-twitter fa-2x'
                                style={{ color: '#38a1f3' }}
                            />
                        )}
                        {profile.social !== null &&
                        profile.social !== undefined &&
                        profile.social.youtube ? (
                            <a href={profile.social.youtube}>
                                {' '}
                                <i
                                    className='fab fa-youtube fa-2x socialIcon'
                                    style={{ color: '#c4302b' }}
                                />{' '}
                            </a>
                        ) : (
                            <i
                                className='fab fa-youtube fa-2x'
                                style={{ color: '#c4302b' }}
                            />
                        )}
                        {profile.social !== null &&
                        profile.social !== undefined &&
                        profile.social.twitch ? (
                            <a href={profile.social.twitch}>
                                {' '}
                                <i className='fab fa-twitch fa-2x socialIcon' />{' '}
                            </a>
                        ) : (
                            <i className='fab fa-twitch fa-2x' />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

ProfileItem.propTypes = {
    profile: PropTypes.object.isRequired,
};

export default ProfileItem;
