import React from "react";
import PollList from "./PollList";
import PollForm from "./PollForm";

import { useState } from "react";
import { useMutation } from "react-query";

import "../css/user.css";

function User() {
    const [userPolls, setUserPolls] = useState([]);
    const { mutate: addPoll, status: pollUpdateStatus } = useMutation(
        async (data) => {
            const response = await fetch("http://localhost:4400/api/poll", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });
            return response.json();
        },
        {
            onSuccess: (newPoll) => {
                setUserPolls([newPoll, ...userPolls]);
            },
        }
    );

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
            <PollForm onSubmit={addPoll} formStatus={pollUpdateStatus} />
            <PollList polls={userPolls} title="Your polls"/>
        </section>
    );
}

export default User;
