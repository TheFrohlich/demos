import * as React from "react";
import * as highlight from 'highlight.js';
import * as beautify from 'js-beautify';
import { Route } from 'react-router-dom';
import { DemosDataService } from './../../services/demo-data.service';
import { IDemo } from '../demoList/demoList.component';
import { CodeEditor } from '../code-editor/code-editor.component';


export class DemoComponent extends React.Component<{ id: string }, undefined>{
    public htmlTemplate: any;
    public html: string;
    public css: string;
    public script: string;
    public demo: IDemo;
    public codeEditorHeight:number;
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
                this.codeEditorHeight = this.calcHeight();
            }
        }

    }
    public calcHeight():number{
        let numForItems = 0;
        this.css && (++numForItems); 
        this.html && (++numForItems); 
        this.script && (++numForItems);
        return (100/(numForItems || 1)) 
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
                        <CodeEditor
                            code={this.html}
                            name='HTML'
                            language='html'
                            height={this.codeEditorHeight}
                            onChange={() => {
                            }} />
                    }
                    {(this.css) &&
                        <CodeEditor
                            code={this.css}
                            name='CSS'
                            language='css'
                            height={this.codeEditorHeight}                            
                            onChange={() => {
                            }} />
                    }
                    {this.script &&
                        <CodeEditor
                            code={this.script}
                            name='JS'
                            language='javascript'
                            height={this.codeEditorHeight}
                            
                            onChange={() => {
                            }} />}

                </div>
                <div className="demo__view-panel" dangerouslySetInnerHTML={{ __html: this.htmlTemplate }}></div>
            </div>

            {/*highlight.initHighlightingOnLoad()*/}
        </div>;
    }
}