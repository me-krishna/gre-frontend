
import Header from "src/components/common/Header";
import { ReactNode } from "react";

const MainLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <Header />
      <main>{children}</main>
      {/* <footer>Footer</footer> */}
    </div>
  );
};

export default MainLayout;
