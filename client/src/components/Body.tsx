import React, { ReactNode, FC } from "react";
import Navbar from "./Navbar";

type BodyProps = {
  children: ReactNode;
};

const Body: FC<BodyProps> = ({ children }) => {
  return (
    <div className="app">
      <Navbar />
      <main className="container">{children}</main>
    </div>
  );
};

export default Body;
