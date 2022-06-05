import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import "../css/app.css";

import Header from "./Header";
import PollForm from "./PollForm";
import PollList from "./PollList";
import User from "./User";

const App = () => {
    const [polls, setPolls] = useState([]);
    const [userPolls, setUserPolls] = useState([]);

    const POLL_ENDPOINT = "/api/poll";

    const onSubmit = async (data) => {
        const serverResponse = await postPollApiCall(data);
        if (serverResponse) {
            fetchPolls();
            setUserPolls([...userPolls, serverResponse]);
            document.getElementById("add-poll-form").reset();
            alert("Values added");
        }
    };

    useEffect(() => {
        fetchPolls();
    }, []);

    const fetchPolls = async function() {
        const response = await fetch(POLL_ENDPOINT);
        setPolls(await response.json());
    };

    const postPollApiCall = async (poll) => {
        const response = await fetch(POLL_ENDPOINT, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(poll),
        });
        if (response.status !== 200) return null;
        return await response.json();
    };

    async function updatePollApiCall(optionId) {
        const res = await fetch("/api/vote/" + optionId);
        console.log(await res.json());
    }

    function votePoll(optionId) {
        polls.forEach((poll) => {
            poll.options.forEach((option) => {
                if (option._id === optionId) {
                    if (option.voteCount) option.voteCount++;
                    else option.voteCount = 1;
                    poll.totalVotes++;
                }
            });
        });
        updatePollApiCall(optionId);
        setPolls([...polls]);
    }

    return (
        <div className="app">
            <Header title={"Assignment"} />
            <div className="container">
                <section className="left">
                    <PollList
                        title="Trending polls 🔥"
                        polls={[...polls]
                            .sort((a, b) => b.totalVotes - a.totalVotes)
                            .slice(0, Math.min(polls.length, 5))}
                        votePoll={votePoll}
                    />
                </section>
                <section className="center">
                    <PollForm onSubmit={onSubmit} />
                    <PollList
                        title="Latest polls"
                        polls={[...polls].reverse()}
                        votePoll={votePoll}
                    />
                </section>
                <section className="right">
                    <User polls={userPolls} votePoll={votePoll} />
                </section>
            </div>
        </div>
    );
};

export default App;
