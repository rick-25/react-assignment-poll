import React, { useState } from "react";

import { useMutation, useQuery, useQueryClient } from "react-query";

import "../css/poll.css";
import Loader from "./Loader";

function Poll({ poll }) {
    const [isMarked, setIsMarked] = useState(false);

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
                {(poll.loading) ? (
                    <Loader />
                ) : (
                    poll.options.map((option) => (
                        <div
                            className="option"
                            key={option._id}
                            onClick={(e) => {
                                if (!isMarked) {
                                    votePoll(option._id);
                                    setIsMarked(true);
                                    poll.loading = true;
                                }
                            }}
                        >
                            <div className="option-title">{option.title}</div>
                            {isMarked && (
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
