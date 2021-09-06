import React from "react";
import { Header } from "./Header";
import { Routes } from "./Router";

export default function Content() {
  return (
    <div className="Page-Container">
      <Header/>
      <div className="Content-Container">
        <Routes/>
      </div>
    </div>
  );
}
