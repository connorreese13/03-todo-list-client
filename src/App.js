import React from "react";
import "./styles/styles.css";
import axios from "axios";

class App extends React.Component {
  state = {
    items: [],
    input: ""
  };
  componentDidMount() {
    axios
      .get("http://localhost:4000/items")
      .then(response => {
        console.log(response);
        this.setState({ items: response.data });
      })
      .catch(err => {
        console.log(err);
      });
  }
  updateName = e => {
    let inputValue = e.target.value;
    this.setState({ input: inputValue });
    console.log(this.state);
  };
  addItem = e => {
    e.preventDefault();
    axios
      .post("http://localhost:4000/items", {
        name: this.state.input
      })
      .then(response => {
        console.log(this.state);
        let submittedItems = this.state.items;
        submittedItems.push(response.data);
        this.setState({ items: submittedItems, input: "" });
      });
  };
  toggleDone = e => {
    axios
      .patch(`http://localhost:4000/items/${this.state.items[e]._id}`, {
        done: !this.state.items[e].done
      })
      .then(response => {
        let tmp = this.state.items;
        tmp[e].done = response.data.done;
        this.setState({ items: tmp });
      });
  };
  getItemsStyle = e => {
    return e ? "done" : "";
  };
  deleteItem = e => {
    axios
      .delete(`http://localhost:4000/items/${this.state.items[e]._id}`)
      .then(response => {
        console.log(response);
        let tmp = this.state.items;
        delete tmp[e];
        this.setState({ items: tmp });
      });
  };
  render() {
    return (
      <div className="layout">
        <h1>ToDo List.</h1>
        <div className="list">
          <form onSubmit={this.addItem}>
            <div className="button-align">
              <input
                onChange={this.updateName}
                type="text"
                value={this.state.input}
                placeholder="Add Item..."
              />
              <button>
                <i className="fas fa-plus"></i>
              </button>
            </div>
          </form>
          <ul>
            {this.state.items.map((e, i) => {
              return (
                <li
                  onClick={x => this.toggleDone(i)}
                  key={e._id}
                  className={this.getItemsStyle(e.done)}
                >
                  {e.name}
                  <i
                    onClick={x => {
                      x.stopPropagation();
                      this.deleteItem(i);
                    }}
                    className="fas fa-minus-circle"
                  ></i>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    );
  }
}

export default App;
