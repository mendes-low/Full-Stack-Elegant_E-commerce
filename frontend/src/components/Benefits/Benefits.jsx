import React from 'react'

import './Benefits.css'

import delivery from '../../assets/images/benefits/delivery.svg';
import call from '../../assets/images/benefits/call.svg';
import money from '../../assets/images/benefits/money.svg';
import lock from '../../assets/images/benefits/lock.svg';

const Benefits = () => {
    return (
        <div className='benefits'>
            <div className='benefits-card'>
                <img src={delivery} />
                <div className='benefits-card-text'>
                    <h3>Free Shipping</h3>
                    <p>Order above $200</p>
                </div>
            </div>
            <div className='benefits-card'>
                <img src={call} />
                <div className='benefits-card-text'>
                    <h3>Money-back</h3>
                    <p>30 days guarantee</p>
                </div>
            </div>
            <div className='benefits-card'>
                <img src={money} />
                <div className='benefits-card-text'>
                    <h3>Secure Payments</h3>
                    <p>Secured by Stripe</p>
                </div>
            </div>
            <div className='benefits-card'>
                <img src={lock} />
                <div className='benefits-card-text'>
                    <h3>24/7 Support</h3>
                    <p>Phone and Email support</p>
                </div>
            </div>
        </div>
    )
}

export default Benefits;