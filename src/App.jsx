import { Suspense, useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import EngiMetrics from './feature';
import AppToast from './shared/components/AppToast';

// Load KT plugins
import './assets/plugins/ktcookie';
import './assets/plugins/ktmenu';
import './assets/plugins/ktoffcanvas';
import './assets/plugins/kttoggle';
import './assets/plugins/ktutil';

// Aside
import './assets/plugins/aside/aside';
import './assets/plugins/aside/aside-menu';
import './assets/plugins/aside/aside-toggle';

// Header
import './assets/plugins/header/ktheader-mobile';
import './assets/plugins/header/ktheader-topbar';
import KTPageError01 from './shared/components/Keens/KTPageError01';
import DataCommonListener from './shared/listener/DataCommonListener';

function App() {
    useEffect(() => {
        if (import.meta.env.VITE_ENVIRONMENT === 'PROD') {
            console.log = () => {};
            console.error = () => {};
            console.warn = () => {};
        }
    }, [import.meta.env.VITE_ENVIRONMENT]);

    return (
        <>
            <BrowserRouter>
                <Suspense fallback={<div>Loading...</div>}>
                    <Routes>
                        <Route path="/*" element={<EngiMetrics />} />

                        <Route path="*" element={<KTPageError01 />} />
                    </Routes>
                </Suspense>
                <AppToast />
                <DataCommonListener />
            </BrowserRouter>
        </>
    );
}

export default App;
