import { withApollo } from "../lib/apollo";
import { useRouter } from "next/router";
import { useEffect } from "react";

const IndexPage = () => {
  const router = useRouter();
  useEffect(() => {
    router.replace("/auth/register");
  }, []);

  return <div>Hello World!</div>;
};

export default withApollo({ ssr: true })(IndexPage);
