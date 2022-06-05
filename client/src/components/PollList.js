import React from 'react';
import Poll from './Poll';
import Title from './Title';

import '../css/polllist.css';


function PollList( {title, polls} ) {
    return (
        <div className="poll-list">
            <Title title={title}/>
            <div className="container">
                {polls.map((el) => {
                    return <Poll poll={el} key={el._id}/>
                })}
                {polls.length === 0 && <p>Sorry! empty list</p>}
            </div>
        </div>
    );
}

export default PollList;