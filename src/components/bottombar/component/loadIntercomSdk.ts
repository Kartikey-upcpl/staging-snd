let intercomReady = false;

export const waitForIntercom = () => {
    return new Promise<void>((resolve) => {
        const interval = setInterval(() => {
            if (intercomReady) {
                clearInterval(interval);
                resolve();
            }
        }, 100); // Check every 100ms
    });
};

export const initializeIntercom = async () => {
    if (intercomReady) {
        return; // Prevent reinitialization if already ready
    }

    try {
        const response = await fetch('/api/intercom', {
            method: 'GET',
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch Intercom App ID: ${response.statusText}`);
        }

        const { appId } = await response.json();
        if (!appId) {
            console.error("Intercom App ID is missing");
            return;
        }

        if (!window.Intercom) {
            const script = document.createElement('script');
            script.src = `https://widget.intercom.io/widget/${appId}`;
            script.async = true;
            script.onload = () => {
                window.Intercom?.('boot', { app_id: appId });
                intercomReady = true; // Mark Intercom as ready
            };
            document.head.appendChild(script);
        } else {
            window.Intercom?.('boot', { app_id: appId });
            window.Intercom?.("update", { hide_default_launcher: false });
            intercomReady = true; // Mark Intercom as ready
        }
    } catch (error) {
        console.error('Failed to initialize Intercom:', error);
    }
};
