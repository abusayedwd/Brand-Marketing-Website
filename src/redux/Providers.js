"use client"
import React from 'react';
import { Provider } from 'react-redux';
import store from './store/store';
import RealtimeSync from '@/components/shared/RealtimeSync';


const Providers = ({children}) => {
    return (
        <div>
             <Provider store={store}>
                <RealtimeSync />
                {children}
           </Provider>
        </div>
    );
};

export default Providers;
