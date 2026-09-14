import { useEffect, useState } from "react";

export default function useFetch(fetchFunction) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        let ignore = false;

        async function loadData() {
            try {
                setLoading(true);
                setError("");

                const result = await fetchFunction();

                if (!ignore) {
                    setData(result);
                }
            } catch (err) {
                if (!ignore) {
                    setError(err.message || "Something went wrong");
                }
            } finally {
                if (!ignore) {
                    setLoading(false);
                }
            }
        }

        loadData();

        return () => {
            ignore = true;
        };
    }, [fetchFunction]);

    return { data, loading, error };
}