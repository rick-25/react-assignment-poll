import React from "react";
import ReactDOM from "react-dom";

import App from "./components/App";

import { QueryClientProvider, QueryClient } from "react-query";

const rootElement = document.getElementById("root");
const queryClient = new QueryClient();

ReactDOM.render(
    <React.StrictMode>
        <QueryClientProvider client={queryClient}>
            <App />
        </QueryClientProvider>
    </React.StrictMode>,
    rootElement
);
