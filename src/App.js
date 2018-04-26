import React, {Component} from 'react';
import './App.css';
import Card from "./Card/index";
import values from './values'

class App extends Component {

    render() {
        return (
            <div className="App">
                <header>
                    <img src={require('./logo.png')} alt="logo" className="logo"/>
                    <h1>Awesome Gradient</h1>
                    <a className="github-button" href="https://github.com/wangdicoder/awesome-gradient"
                       data-show-count="true" aria-label="Star wangdicoder/awesome-gradient on GitHub">Star</a>
                </header>
                <main>
                    {values.map((item, i) => {
                        return <Card key={i} backgroundImage={item}/>
                    })}
                </main>
                <footer>

                </footer>
            </div>
        );
    }
}

export default App;
