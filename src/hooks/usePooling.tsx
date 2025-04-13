import { useEffect } from "react";

function usePooling(delay: number, callback:() => Promise<any>) {
    let cancelled = false;
    useEffect(() => {
        const loadData = async () => {
            try {
                await callback();
                if (!cancelled) setTimeout(loadData, delay);
            } catch(error) {
                console.log('Ошибка загрузки', error)
                if (!cancelled) setTimeout(loadData, delay);
            }
        }

        loadData();

        return () => { cancelled = true;};
    }, [delay, callback])
}

export default usePooling;