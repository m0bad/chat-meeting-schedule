import {withApollo} from "../lib/apollo";
import {useRouter} from "next/router";
import {useEffect} from "react";
import {Spin} from "antd";

const IndexPage = () => {
  const router = useRouter();
  useEffect(() => {
    router.replace("/auth/register");
  }, []);

  return (
    <div className="loading-spinner">
      <Spin />
    </div>
  );
};

export default withApollo({ ssr: true })(IndexPage);
