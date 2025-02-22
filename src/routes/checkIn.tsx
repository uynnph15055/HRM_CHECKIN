import ClientLayout from "@/components/layouts/client-layout";
import CheckInPage from "@/screens/checkin";
import { HomePage } from "@/screens/home-page";
import { Helmet } from "react-helmet";

export const CheckInRouter = () => {
  return (
    <>
      <Helmet>CheckIn</Helmet>
      <ClientLayout>
        <CheckInPage />
      </ClientLayout>
    </>
  );
};
