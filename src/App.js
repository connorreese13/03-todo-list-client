import React from "react";
import "./styles/styles.css";

class App extends React.Component {
  render() {
    return (
      <div class="layout">
        <h1>ToDo List.</h1>
        <div class="list">
          <form>
            <input type="text" placeholder="Add Item..." />
            <button>
              <i class="fas fa-plus"></i>
            </button>
          </form>
          <ul>
            <li>
              Go surfing <i class="fas fa-minus-circle"></i>
            </li>
            <li>
              Study JavaScript <i class="fas fa-minus-circle"></i>
            </li>
            <li>
              Make coffee <i class="fas fa-minus-circle"></i>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

export default App;
