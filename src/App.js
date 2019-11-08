import React from "react";
import style from "./App.module.scss";
import classNames from "classnames";
import md5 from "md5";

class App extends React.Component {
  timeoutID = null;
  hash = md5(Math.random());

  state = {
    maxChars: 500,
    charsLeft: 500 || null
  };

  handleCharCount = value => {
    const maxChars = this.state.maxChars;
    const charCount = value.length;
    const charsLeft = maxChars - charCount;
    this.setState({ charsLeft });
  };

  handleChange = event => {
    let val = event.target.value;

    if (this.timeoutID) {
      clearTimeout(this.timeoutID);
    }

    this.timeoutID = setTimeout(() => {
      this.handleCharCount(val);
    }, 300);
  };

  render() {

    const counterColor = classNames(style.counter, {
      [style.red]: this.state.charsLeft < 0
    });
    
    return (
      <div className={style.app}>
        <header className={style.header}>
          <div className={style.text}>
            <div className={counterColor}>500/{this.state.charsLeft} Left</div>
            <label htmlFor={this.hash}>Caracter Counter</label>
          </div>
          <textarea
            onChange={this.handleChange}
            className={style.input}
            name="text"
            id={this.hash}
            type="text"
            placeholder="Enter some text here..."
          ></textarea>
        </header>
      </div>
    );
  }
}

export default App;
