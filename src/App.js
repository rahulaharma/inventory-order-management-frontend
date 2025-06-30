import React from "react";
import Layout from"./components/layout/Layout"
import { Outlet } from "react-router";

export default function App(){
    return (
        <>
            <Layout>
                 <Outlet/>
            </Layout>
        </>
    )
}