import React, { useState, useEffect } from "react";
import UserNav from "../../nav/UserNav";
import { getComplete, removeComplete } from "../../functions/auth";
import { useSelector } from "react-redux";
import { DeleteOutlined } from "@ant-design/icons";
import Header from '../../nav/Header'
import { toast } from "react-toastify";

const Complete = () => {
    const [complete, setComplete] = useState([]);
    const { user } = useSelector((state) => ({ ...state }));

    useEffect(() => {
        loadComplete();
        // eslint-disable-next-line
    }, []);

    const loadComplete = () =>
        getComplete(user.token).then((res) => {
            setComplete(res.data.complete);
        });

    const handleRemove = (toDoListId) =>
        removeComplete(toDoListId, user.token).then((res) => {
            toast.warn("Removed")
            loadComplete();
        });

    return (
        <>
            <Header />
            <div className="container-fluid">
                <div className="row">
                    <div className="col-sm-0 mt-4">
                        <UserNav />
                    </div>
                    <div className="col mt-4">
                        <h4>Your Complete</h4>

                        {complete.map((c) => (
                            <div key={c._id} className="alert alert-secondary">
                                <b>{console.log(c.title)}</b>
                                <span
                                    onClick={() => handleRemove(c._id)}
                                    className="btn btn-sm float-right"
                                >
                                    <DeleteOutlined className="text-danger float-right" />
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Complete;
