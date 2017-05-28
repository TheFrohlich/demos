import * as React from "react";
import AceEditor from 'react-ace';
import 'brace/theme/monokai';
import 'brace/mode/javascript';
import 'brace/mode/html';
import 'brace/mode/css';

export interface ICodeEditorProps {
    title: string;
    code: string;
    language: string;
    hight?: string;
    onChange?: (newValue: string) => void;
}
export class CodeEditor extends React.Component<ICodeEditorProps, undefined>{

    public onChange(value: string, e: any): void {
        this.props.onChange && this.props.onChange(value);
    }
    render() {
        return <div className="code-editor">
            <div className="code-editor__title">{this.props.title}</div>
            <div className="code-editor__title-placeholder"></div>
            <div className="code-editor__content">
                <AceEditor
                    mode={this.props.language}
                    theme='monokai'
                    name={`${this.props.language}Editor`}
                    fontSize={16}
                    height={this.props.hight || '500px'}
                    width="48vw"
                    value={this.props.code}
                    onChange={this.onChange.bind(this)}
                />
            </div>
        </div>
    }
}