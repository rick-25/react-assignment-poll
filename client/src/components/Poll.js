import React, { useState } from "react";

import '../css/poll.css';


function Poll({ poll, votePoll }) {

    const [isMarked, setIsMarked] = useState(false);

    return (
        <div className="poll">
            <div className="question">{poll.question}</div>
            <div className="option-container">
                {poll.options.map((option =>
                    <div className="option" key={option._id} onClick={e => {
                        votePoll(option._id);
                        setIsMarked(true);
                    }}>
                        <div className="option-title">{option.title}</div>
                        {isMarked && <div className="option-percentage">{(option.voteCount / poll.totalVotes * 100).toFixed(1)}%</div>}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Poll;

