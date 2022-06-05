import React, { useState } from "react";

import { useMutation, useQuery, useQueryClient } from "react-query";

import "../css/poll.css";
import Loader from "./Loader";

function Poll({ poll }) {
    
    const [selectedOptionId, setSelectedOptionId] = useState("");

    const queryClient = useQueryClient();
    const { mutate: votePoll, status: pollVoteStatus } = useMutation(
        async (optionId) => {
            const response = await fetch(
                "http://localhost:4400/api/vote/" + optionId
            );
            return response.json();
        },
        {
            onSuccess: () => {
                queryClient.invalidateQueries("polls");
            },
        }
    );

    return (
        <div className="poll">
            <div className="question">{poll.question}</div>
            <div className="option-container">
                {poll.loading ? (
                    <Loader />
                ) : (
                    poll.options.map((option) => (
                        <div
                            className="option"
                            key={option._id}
                            style={{
                                ...(selectedOptionId === option._id && {
                                    backgroundColor: "#a8c6ff",
                                }),
                            }}
                            onClick={(e) => {
                                if (selectedOptionId == "") {
                                    votePoll(option._id);
                                    setSelectedOptionId(option._id);
                                    poll.loading = true;
                                }
                            }}
                        >
                            <div className="option-title">{option.title}</div>
                            {selectedOptionId !== "" && (
                                <div className="option-percentage">
                                    {(
                                        (option.voteCount / poll.totalVotes) *
                                        100
                                    ).toFixed(1)}
                                    %
                                </div>
                            )}
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

export default Poll;
