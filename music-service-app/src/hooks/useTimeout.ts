import {useEffect, useState} from 'react';
import {TSetState} from "../core/types/setState.type";

function useTimeout(ms: number): [boolean, TSetState<boolean>] {
    const [boolTimeout, setBoolTimeout] = useState<boolean>(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setBoolTimeout(false)
        }, ms);
        return () => clearTimeout(timer);
    }, [boolTimeout, ms]);

    return [boolTimeout, setBoolTimeout];
}

export default useTimeout;
