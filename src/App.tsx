import { QueryProvider } from "./components/provider/QueryClient.Provider";
import { Toaster } from "./components/ui/sonner";
import { AppRoutes } from "./routes/Routes";

const App = () => {
  return (
    <QueryProvider>
      <AppRoutes />
      <Toaster />
    </QueryProvider>
  );
};

export default App;
