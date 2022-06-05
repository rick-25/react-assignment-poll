import React, { useEffect, useState } from "react";

import { useMutation, useQuery } from "react-query";

import "../css/app.css";

import Header from "./Header";
import Loader from "./Loader";
import PollForm from "./PollForm";
import PollList from "./PollList";
import User from "./User";

const App = () => {

    const { data: polls, status: pollFetchStatus } = useQuery(
        "polls",
        async () => {
            const response = await fetch("http://localhost:4400/api/poll");
            return response.json();
        }
    );    

    if (pollFetchStatus == "loading") return <Loader/>;

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
                    />
                </section>
                <section className="center">
                    <PollList
                        title="Latest polls"
                        polls={[...polls].reverse()}
                    />
                </section>
                <section className="right">
                    <User />
                </section>
            </div>
        </div>
    );
};

export default App;
