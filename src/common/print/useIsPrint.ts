import {useEffect, useState} from 'react';

function useIsPrint() {
    const [ isPrint, setIsPrint ] = useState(false);

    useEffect(() => {
        const beforePrint = () => setIsPrint(true);
        const afterPrint= () => setIsPrint(false);

        window.addEventListener('beforeprint', beforePrint);
        window.addEventListener('afterprint', afterPrint);

        return () => {
            window.removeEventListener('beforeprint', beforePrint);
            window.removeEventListener('afterprint', afterPrint);
        }
    }, [isPrint]);


    return isPrint;
}

export default useIsPrint;
