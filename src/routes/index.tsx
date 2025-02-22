import ClientLayout from "@/components/layouts/client-layout";
import { HomePage } from "@/screens/home-page";
import { Helmet } from "react-helmet";

export const IndexPage = () => {
  return (
    <>
      <Helmet>Trang chủ</Helmet>
      <ClientLayout>
        <HomePage />
      </ClientLayout>
    </>
  );
};
