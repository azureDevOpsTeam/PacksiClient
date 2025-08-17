import "./style/App.css";
import MainLayout from "./components/layout/main/MainLayout";
import LazyRouter from "./components/router/LazyRouter";
import { ThemeProvider } from "./components/hooks/context/ThemeContext";
import { queryClient } from "./setting/reactQuery/QueryClient";
import { QueryClientProvider } from "react-query";
import { BrowserRouter } from "react-router-dom";
import { AppWrapper } from "./components/tools/common/PageMeta";

function App() {
  return (
    <AppWrapper>
      <BrowserRouter>
        <ThemeProvider>
          <QueryClientProvider client={queryClient}>
            <MainLayout>
              <LazyRouter/>
            </MainLayout>
          </QueryClientProvider>
        </ThemeProvider>
      </BrowserRouter>
    </AppWrapper>
  );
}

export default App;
