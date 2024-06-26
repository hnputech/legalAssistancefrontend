import "./App.css";
import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import { Chat } from "./conponents/chat/Chat";
import { Provider } from "react-redux";
import { store } from "./store/store";

function App() {
  return (
    <Provider store={store}>
      <div className="App" style={{ height: "90vh" }}>
        <Chat />
      </div>
    </Provider>
  );
}

export default App;
