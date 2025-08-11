import Api from "../../../services/api/CallApi";
import { useQuery } from "react-query";
import { useState, useEffect } from "react";

export const useFetch = (apiDetails: any, initialData: any, timeout: number = 0) => {
    const [data, setData] = useState(initialData);

    const queryResult = useQuery(
        [apiDetails.key, apiDetails],
        () =>
            new Promise(resolve => {
                setTimeout(() => {
                    resolve(
                        Api<any>(
                            apiDetails.url,
                            apiDetails.body || null,
                            apiDetails.headers,
                            apiDetails.method
                        )
                    );
                }, timeout);
            }),
        {
            staleTime: 300000,
            cacheTime: 600000,
            refetchOnWindowFocus: false,
            refetchOnMount: false,
            onSuccess: (fetchedData) => {
                setData(fetchedData);
            },
        }
    );

    useEffect(() => {
        if (!queryResult.isFetching && !queryResult.isError) {
            setData(queryResult.data);
        }
    }, [queryResult.isFetching, queryResult.isError, queryResult.data]);

    return {
        ...queryResult,
        data,
    };
};
