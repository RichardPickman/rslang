import React from 'react';

const Main = ({ children }: { children: JSX.Element }) => {
  return (
    <main>
      {children}
    </main>
  );
};

export default Main;