import React from 'react';
import PollList from './PollList';


import '../css/user.css';

function User({ polls }) {
    return (
        <section className="user-section">
            <div className="user-card">
                <div className="container">
                    <img
                        src="https://image.shutterstock.com/image-vector/portrait-photo-icon-flat-vector-600w-1648930807.jpg"
                        alt="user profile image"
                        className="user-image"
                    />
                    <div className="user-name">John</div>
                    <div className="user-contact">
                        +91-237293293
                        <br />
                        temp123@gmail.com
                    </div>
                </div>
            </div>
            <PollList polls={polls} title="Your polls" />
        </section>
    );
}

export default User;