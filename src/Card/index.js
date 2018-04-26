import React, {Component} from 'react';
import './card.css';
import PropTypes from 'prop-types';

export default class Card extends Component {

    static propTypes = {
        backgroundImage: PropTypes.string
    };

    render() {
        const {backgroundImage} = this.props;
        return (
            <div className="card-container">
                <div className="color-panel" style={{backgroundImage}}>
                    <div className="clip-btn" onClick={this._onClick.bind(this)}>
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

    _onClick() {

    }
}