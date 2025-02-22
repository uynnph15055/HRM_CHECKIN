import { ReactNode } from "react";

const ClientLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div
      style={{
        background: `linear-gradient(rgba(135, 206, 250,.7), rgba(252,247,226,.7) 70%)`,
        backgroundRepeat: "no-repeat, no-repeat, no-repeat",
        backgroundPosition: "center bottom, center center, center bottom",
        backgroundSize: "cover, cover, cover",
        backgroundColor: "rgba(255, 255, 255, 0.5)",
      }}
    >
      {children}
    </div>
  );
};

export default ClientLayout;
