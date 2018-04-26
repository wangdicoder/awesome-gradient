import React, {Component} from 'react';
import './card.css';
import PropTypes from 'prop-types';
import Notification from 'rc-notification';

let notification = null;
Notification.newInstance({prefixCls: 'copy-message-container', style: {}}, (n) => notification = n);

export default class Card extends Component {

    static propTypes = {
        backgroundImage: PropTypes.string
    };

    render() {
        const {backgroundImage} = this.props;
        return (
            <div className="card-container">
                <div className="color-panel" style={{backgroundImage}}>
                    <div className="clip-btn" onClick={this._onClick.bind(this, backgroundImage)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                             stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
                             className="feather feather-code">
                            <polyline points="16 18 22 12 16 6"/>
                            <polyline points="8 6 2 12 8 18"/>
                        </svg>
                    </div>
                </div>
                <div className="label-panel">
                    {this._handleValue(backgroundImage)}
                </div>
            </div>
        );
    }

    _handleValue(backgroundImage) {
        const start = backgroundImage.indexOf('(');
        const end = backgroundImage.indexOf(')');
        const substr = backgroundImage.substr(start + 1, end - start - 1);
        return substr.split(',').map((item, i) => {
            return <span key={i} style={{textTransform: i === 0 ? 'lowercase' : 'uppercase'}}>{item.trim()}</span>
        })
    }

    _onClick(text) {
        const content = `background-image: ${text};`;
        if (window.clipboardData && window.clipboardData.setData) {
            this._displayMessage();
            // IE specific code path to prevent textarea being shown while dialog is visible.
            return window.clipboardData.setData("Text", content);
        } else if (document.queryCommandSupported && document.queryCommandSupported("copy")) {
            const textarea = document.createElement("textarea");
            textarea.textContent = content;
            textarea.style.position = "fixed";  // Prevent scrolling to bottom of page in MS Edge.
            document.body.appendChild(textarea);
            textarea.select();
            try {
                this._displayMessage();
                return document.execCommand("copy");  // Security exception may be thrown by some browsers.
            } catch (e) {
                console.warn("Copy to clipboard failed.", e);
                return false;
            } finally {
                document.body.removeChild(textarea);
            }
        }
    }

    _displayMessage() {
        const key = new Date().toString();

        notification.notice({
            key,
            onClose: () => {
                notification.removeNotice(key);
            },
            content: <span className="copy-message">Code Copied 👌</span>,
            duration: 2,
        });
    }
}