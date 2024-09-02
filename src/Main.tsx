import React from "react";
import { Chat, Navbar } from "./Components";

export const Main: React.FC = () => {
  return (
    <div>
      <header>
        <Navbar />
      </header>

      <main>
        <Chat />
      </main>
    </div>
  );
};
