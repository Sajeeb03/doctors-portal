import { useEffect, useState } from "react"

const useToken = email => {
    const [token, setToken] = useState('');
    useEffect(() => {
        if (email) {
            fetch(`https://doctors-portal-server-woad.vercel.app/jwt?email=${email}`)
                .then(res => res.json())
                .then(data => {
                    if (data.success) {
                        localStorage.setItem('accessToken', data.data);
                        setToken(data.data);
                    }
                })
        }
    }, [email])
    return [token];
}

export default useToken;