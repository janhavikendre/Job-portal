import { userAPI } from "../services/user";
import { useState } from "react";

export const userJob = () => {

    const [job, setJob] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const handleJob = async () => {
    
    }   

    return (
        <div>
            <h1>User Job</h1>
        </div>
    )
}
