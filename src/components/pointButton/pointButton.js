import React from 'react'

class PointButton extends React.PureComponent {
    constructor() {
        super();
        this.onClick = this.onClick.bind(this);
    }

    onClick() {
        const {onClick} = this.props;
        onClick ? onClick() : false;
    }

    render() {
        const {text} = this.props;
        return (
            <div className={'point-button'}>
                <button onClick={this.onClick}>{text}</button>
            </div>
        )
    }
}
export default PointButton