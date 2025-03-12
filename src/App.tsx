import { QueryProvider } from "./components/provider/QueryClient.Provider";
import { AppRoutes } from "./routes/Routes";

const App = () => {
  return (
    <QueryProvider>
      <AppRoutes />
    </QueryProvider>
  );
};

export default App;
