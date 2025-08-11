import "./style/App.css";
import MainLayout from "./components/layout/main/MainLayout";
import LazyRouter from "./components/router/LazyRouter";
import { ThemeProvider } from "./components/hooks/theme/ThemeContext";
import { queryClient } from "./setting/reactQuery/QueryClient";
import { QueryClientProvider } from "react-query";

function App() {
  return (
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <MainLayout>
          <LazyRouter/>
        </MainLayout>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
