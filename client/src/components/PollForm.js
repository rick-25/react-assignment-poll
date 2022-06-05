import React from "react";
import "../css/pollform.css";

import { useForm } from "react-hook-form"; //'react-hook-form'
import Loader from "./Loader";


function PollForm({ onSubmit , formStatus}) {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    return (
        <div className="post-form" id="post-form">
            <form
                action="/api/poll"
                method="post"
                onSubmit={handleSubmit(onSubmit)}
                id="add-poll-form"
            >
                <input
                    {...register("question")}
                    placeholder="Enter question e.g What's your fav starwar character?"
                    required={true}
                />
                <input
                    {...register("options[0].title")}
                    placeholder="Enter 1st option"
                    required={true}
                />
                <input
                    {...register("options[1].title")}
                    placeholder="Enter 2nd option"
                    required={true}
                />
                <input
                    {...register("options[2].title")}
                    placeholder="Enter 3rd option"
                    required={true}
                />
                <input
                    {...register("options[3].title")}
                    placeholder="Enter 4th option"
                    required={true}
                />
                {formStatus == 'loading' ? (
                    <Loader />
                ) : (
                    <input type="submit" value="Add poll" />
                )}
            </form>
        </div>
    );
}

export default PollForm;
