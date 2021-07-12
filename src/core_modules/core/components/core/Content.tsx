import React from "react";
import Footer from "./Footer";
import { Header } from "./Header";
import { BasicRoutes, RouterRoutes } from "./Router";

export default function Content() {
  return (
    <div className="Page-Container">
      <Header/>
      <div className="Content-Container">
        <BasicRoutes/>
        <RouterRoutes/>
      </div>
      {/*<Footer/>*/}
    </div>
  );
}
