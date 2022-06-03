import React, { useEffect, useState } from "react";

import '../css/app.css';


import Header from "./Header";
import PollList from "./PollList";
import User from "./User";


const App = () => {

    const [polls, setPolls] = useState([]);
    const [userPolls, setUserPolls] = useState([]);

    const SERVER_END_POINT = 'http://localhost:4400';
    const Poll_END_POINT = 'http://localhost:4400/api/poll';

    useEffect(() => {
        fetchPolls();
    }, []);

    const fetchPolls = async function () {
        const response = await fetch(Poll_END_POINT);
        setPolls(await response.json());
    }




    const postPollApiCall = async (poll) => {
        const response = await fetch(Poll_END_POINT, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(poll)
        });
        if (response.status !== 200) return null;
        return await response.json();
    }

    const handleForm = async (e) => {
        const { question, options } = e.target;
        e.preventDefault();
        let reqestBody = {
            question: question.value,
            options: []
        };
        options.forEach(el => {
            if (el.value) reqestBody.options.push(el.value)
        });

        const serverResponse = await postPollApiCall(reqestBody);
        if (serverResponse) {
            fetchPolls();
            setUserPolls([...userPolls, serverResponse]);
            document.getElementById("add-poll-form").reset();
            alert("Values added");
        }
    }

    async function updatePollApiCall(optionId) {
        const res = await fetch(SERVER_END_POINT + "/api/vote/" + optionId);
        console.log(await res.json());
    }




    function votePoll(optionId) {
        polls.forEach((poll) => {
            poll.options.forEach(option => {
                if (option._id === optionId) {
                    option.voteCount++;
                    poll.totalVotes++;
                }
            })
        });
        updatePollApiCall(optionId);
        setPolls([...polls]);
    }


    return (
        <div className="app">
            <Header title={"Assignment"} />
            <div className="container">
                <section className="left">
                    <PollList title="Trending polls 🔥" polls={[...polls].sort((a, b) => b.totalVotes - a.totalVotes)} votePoll={votePoll} />
                </section>
                <section className="center">
                    <div className="post-form">
                        <form action="http://localhost:4400/api/poll" method="post" onSubmit={handleForm} id="add-poll-form">
                            <input type="text" name="question" placeholder="Enter question e.g What's your fav starwar character?" required={true} />
                            <input type="text" name="options" placeholder="Enter 1st option" required={true} />
                            <input type="text" name="options" placeholder="Enter 2nd option" required={true} />
                            <input type="text" name="options" placeholder="Enter 3rd option" required={true} />
                            <input type="text" name="options" placeholder="Enter 4th option" required={true} />
                            <input type="submit" value="Add poll" />
                        </form>
                    </div>
                    <PollList title="Latest polls" polls={polls} votePoll={votePoll} />
                </section>
                <section className="right">
                    <User polls={userPolls} />
                </section>
            </div>
        </div>
    )
}


export default App;