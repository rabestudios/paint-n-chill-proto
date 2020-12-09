import Router from "components/common/Router";
import useSocket from "hooks/useSocket";
import config from "config";

const App = () => {
  const socket = useSocket(config.server.baseUrl);
  console.log(socket);
  return <Router />;
};

export default App;
