import * as React from "react";
import * as ReactDOM from "react-dom";
import { HashRouter as Router, Route, Link, hashHistory } from 'react-router-dom';
import './styles.scss';
import '../node_modules/highlight.js/styles/railscasts.css'

import { AppComponent } from "./components/app.component";

ReactDOM.render(
    <Router >
        <Route path="/" component={AppComponent}></Route>
    </Router>,
    document.getElementById("example")
);