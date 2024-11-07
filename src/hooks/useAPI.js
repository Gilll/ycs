import {useState} from "react";

export const useApi = (settings) => {
    const [isLoading, setIsLoading] = useState(false);
    const hostName = '';

    const fetching = async (dt, url) => {
        let resp = '';
        let headers = {
            'Content-Type': 'application/json'
        }
        if (url) settings.url = url;
        if (!isLoading) setIsLoading(true);
        if (dt) {
            if (dt.formData) {
                settings.formData = dt.formData
            } else {
                Object.assign(settings.data, dt)
            }
        }
        try {
            const response = await fetch(hostName + settings.url, {
                crossDomain: false,
                credentials: "include",
                method: settings.method || 'POST',
                body: settings.formData ? settings.formData : (settings.data && JSON.stringify(settings.data)),
                headers: settings.headers ? settings.headers === 'remove' ? {} : Object.assign(headers, settings.headers) : headers
            });
            if (settings.rawResp) {
                resp = await response.text()
            } else {
                resp = await response.json();
            }
            if (!response.ok) {
                setIsLoading(false);
                if (resp.error.description) {
                    throw new Error(resp.error.description);
                } else {
                    throw new Error(resp.error.message);
                }
            }
        } catch (e) {
            setIsLoading(false);
            if (e.message === 'Failed to fetch') {
                throw new Error('Нет соединения с сервером')
            } else {
                throw new Error(e.message)
            }
        }
        setIsLoading(false);
        return resp;
    }

    return [fetching, isLoading];
}