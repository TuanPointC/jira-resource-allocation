"use client"

import { useState, useEffect } from "react";
import axios from "axios";
import { ClipLoader } from "react-spinners";

export default function TimeOffPage() {

    const [timeOffRequests, setTimeOffRequests] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTimeOffRequests = async () => {
            setLoading(true);
            const response = await axios.get("/api/sage/leave-management/requests");
            setTimeOffRequests(response.data);
            console.log(response);
            setLoading(false);
        };

        fetchTimeOffRequests();
    }, []);

    return (

        <div>
            Time Off Page test tuan hahaha
            {loading ? (
                <ClipLoader />
            ) : (
                <ul>
                    {timeOffRequests.map((request) => (
                        <li key={request.id}>{request.status} - {request.totalHours} - {request.start_date} - {request.end_date}</li>
                    ))}
                </ul>
            )}
        </div>
    );
}
