import { useEffect } from "react";

function usePooling(delay: number, callback:() => Promise<void>, enabled=true, retryDelay=100) {
    useEffect(() => {
        if (!enabled) {
            return;
        }
        let curDelay = delay;
        let cancelled = false;
        let retries = 0;
        const maxRetries = 10;
        const loadData = async () => {
            try {
                await callback();
                retries = 0;
                curDelay = delay;
            } catch(error) {

                if (retries >= 10) {
                    console.warn('Достигнуто максимальное количество попыток отправки запроса. Останавливаю пуллинг.')
                    return;
                }

                retries++;
                curDelay = retryDelay
                console.log(`Ошибка загрузки (${retries} / ${maxRetries})`)
            } finally {
                if (!cancelled && retries < 10) {
                    setTimeout(loadData, curDelay);
                }
            }
        }
        loadData();

        return () => { cancelled = true;};
    }, [delay, callback])
}

export default usePooling;