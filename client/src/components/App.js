import React, { useState } from "react";

import { useQuery } from "react-query";

import "../css/app.css";

import Header from "./Header";
import Loader from "./Loader";
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
    const [view, setView] = useState("latest");
    if (pollFetchStatus == "loading") return <Loader />;

    return (
        <div className="app">
            <Header title={"Assignment"} />
            <select
                name="view"
                id="view"
                onChange={(e) => setView(e.target.value)}
            >
                <option value="latest">Latest</option>
                <option value="trending">Trending</option>
                <option value="user">User</option>
            </select>
            <div className="container">
                <section
                    className="left"
                    style={view == "trending" ? { display: "block" } : {}}
                >
                    <PollList
                        title="Trending polls 🔥"
                        polls={[...polls]
                            .sort((a, b) => b.totalVotes - a.totalVotes)
                            .slice(0, Math.min(polls.length, 5))}
                    />
                </section>
                <section
                    className="center"
                    style={view == "latest" ? { display: "block" } : {}}
                >
                    <PollList
                        title="Latest polls"
                        polls={[...polls].reverse()}
                    />
                </section>
                <section
                    className="right"
                    style={view == "user" ? { display: "block" } : {}}
                >
                    <User />
                </section>
            </div>
        </div>
    );
};

export default App;
