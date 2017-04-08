import React from 'react'

class Toggle extends React.PureComponent {
    constructor() {
        super()
        this.onClick = this.onClick.bind(this)
    }

    onClick() {
        const {onClick} = this.props;
        onClick ? onClick() : false;
    }

    render() {
        return (
            <div className={'toggle'}>
                Debug: <input onClick={this.onClick} type="checkbox" name="vehicle" value="Bike"/>
            </div>
        )
    }
}
export default Toggle