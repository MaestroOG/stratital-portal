import { useEffect, useState } from "react";

export function useCountry() {
    const [countryCode, setCountryCode] = useState(null);
    const [countryName, setCountryName] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUserCountry = async () => {
            try {
                const response = await fetch("https://api.ipify.org?format=json");
                const data = await response.json();
                const userIP = data.ip;

                const [codeRes, nameRes] = await Promise.all([
                    fetch(`https://ipapi.co/${userIP}/country/`),
                    fetch(`https://ipapi.co/${userIP}/country_name/`),
                ]);

                const code = await codeRes.text();
                const name = await nameRes.text();

                setCountryCode(code);
                setCountryName(name);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchUserCountry();
    }, []);

    return { countryCode, countryName, loading, error };
}
