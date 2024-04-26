import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/header";

export default function Layout() {
    return (<main className="container-fluid">
        <Header />
        <Outlet />
    </main>)
}