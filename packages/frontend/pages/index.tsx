import { withApollo } from "../lib/apollo";

const IndexPage = () => <div>hello World</div>;

export default withApollo({ ssr: true })(IndexPage);
