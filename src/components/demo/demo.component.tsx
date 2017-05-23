import * as React from "react";
import * as highlight from 'highlight.js';
import * as beautify from 'js-beautify';
import { Route } from 'react-router-dom';
import { DemosDataService } from './../../services/demo-data.service';
import { IDemo } from '../demoList/demoList.component';


export class DemoComponent extends React.Component<{ id: string }, undefined>{
    public htmlTemplate: any;
    public html: any;
    public css: any;
    public script: any;
    public demo: IDemo;
    public extracted = {
        script: [],
        css: [],
        html: [],
    }
    constructor(props) {
        super(props);
        if (!this.props) return;

        this.demo = DemosDataService.getDemo((demo) => {
            return this.props.id === demo.id;
        })
        if (this.demo) {
            this.htmlTemplate = this.demo.htmlTemplate;
            if (this.htmlTemplate) {
                this.extracted.script = /<script>(.+)<\/script>/gi.exec(this.htmlTemplate);
                this.extracted.css = /<style>(.+)<\/style>/gi.exec(this.htmlTemplate);
                this.extracted.html = /<div id=mainContent>(.+)<\/div>/gi.exec(this.htmlTemplate);
                this.css = this.extracted.css && beautify.css(this.extracted.css[1]);
                this.script = this.extracted.script && beautify.js(this.extracted.script[1]);
                this.html = this.extracted.html && beautify.html(this.extracted.html[1]);
            }
        }

    }
    componentDidMount() {
        if (this.extracted.script) {
            (window as any).eval(this.extracted.script[1]);
        }

    }
    public onChange(): void {
        alert('ninja')
    }
    render() {
        return <div className="demo">
            <div className="demo__header capitalize">{this.demo.name}</div>
            <div className="demo__content">
                <div className="demo__code-panel ">
                    {(this.html) &&
                        <div className="code-view">
                            <div className="code-view__title">HTML</div>
                            <div className="code-view__title-placeholder"></div>
                            <div className="code-view__content" >
                                <pre><code>
                                    {this.html}
                                </code></pre></div>
                        </div>
                    }
                    {(this.css) &&
                        <div className="code-view">
                            <div className="code-view__title">CSS</div>
                            <div className="code-view__title-placeholder"></div>
                            <div className="code-view__content css" ><pre><code contentEditable>{this.css}</code></pre></div>
                        </div>
                    }
                    {this.script && <div className="code-view">
                        <div className="code-view__title">JS</div>
                        <div className="code-view__title-placeholder"></div>
                        <div className="code-view__content" ><pre><code contentEditable>{this.script}</code></pre></div>
                    </div>}
                </div>
                <div className="demo__view-panel" dangerouslySetInnerHTML={{ __html: this.htmlTemplate }}></div>
            </div>

            {highlight.initHighlightingOnLoad()}
        </div>;
    }
}