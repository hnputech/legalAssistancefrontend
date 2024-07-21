import "./App.css";
import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import { Provider } from "react-redux";
import { store } from "./store/store";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes";
function App() {
  return (
    <Provider store={store}>
      <div className="App .main-content">
        <RouterProvider router={router} />
      </div>
    </Provider>
  );
}

export default App;
