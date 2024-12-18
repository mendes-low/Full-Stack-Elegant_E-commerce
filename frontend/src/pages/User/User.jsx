import { useState, useContext } from 'react';

import './User.css'
import UserModal from './UserModal';

import userIcon from '../../assets/images/header/user-cicrle.svg';

import UserContext from '../../context/user/user';

const VerticalTabs = () => {
    const [stepLabel, setStepLabel] = useState('Account');
    const { user } = useContext(UserContext);

    return (
        <div className='user'>
            <div className='user-header'>
                <h3>{stepLabel}</h3>
            </div>
            <div className='user-content'>
                <div className='user-labels'>
                    <div className='user-label-avatar'>
                        <img src={userIcon} alt="user" style={{ width: '80px', height: '80px' }} />
                        <p style={{ color: '#000' }}>{user?.fullname}</p>
                    </div>
                    <ul >
                        <li
                            onClick={() => setStepLabel('Account')}
                            className={stepLabel === 'Account' ? 'user-label-active' : 'user-label-default'}
                        >
                            <p>Account</p>
                        </li>
                        <li
                            onClick={() => setStepLabel('Address')}
                            className={stepLabel === 'Address' ? 'user-label-active' : 'user-label-default'}
                        >
                            <p>Address</p>
                        </li>
                        <li
                            onClick={() => setStepLabel('Orders')}
                            className={stepLabel === 'Orders' ? 'user-label-active' : 'user-label-default'}
                        >
                            <p>Orders</p>
                        </li>
                        <li
                            onClick={() => setStepLabel('Wishlist')}
                            className={stepLabel === 'Wishlist' ? 'user-label-active' : 'user-label-default'}
                        >
                            <p>Wishlist</p>
                        </li>
                        <li className='user-label-default'>
                            <UserModal />
                        </li>
                    </ul>
                </div>
                <div>
                    {stepLabel === 'Account' && (
                        <p>Account</p>
                    )}
                    {stepLabel === 'Address' && (
                        <p>Address</p>
                    )}
                    {stepLabel === 'Orders' && (
                        <p>Orders</p>
                    )}
                    {stepLabel === 'Wishlist' && (
                        <p>Wishlist</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default VerticalTabs;
