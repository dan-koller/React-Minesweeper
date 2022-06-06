import React from "react";
import "./TimerStyles.css"
import timeUtils from "../../utils/TimeUtils";

class Timer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            seconds: 0,
        };
    }

    componentDidMount() {
        this.timerID = setInterval(() => {
                if (this.props.stage === "init") {
                    this.setState({
                        seconds: 0
                    });
                }
                if (this.props.stage === "playing") {
                    this.tick()
                }
            }, 1000
        );

        if (this.props.stage === "ended" || this.props.stage === "won") {
            if (this.timerID) {
                clearInterval(this.timerID);
                this.timerID = null;
            }
        }
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    tick() {
        this.setState({
            seconds: this.state.seconds + 1
        });
    }

    render() {
        return (
            <div className="control-panel__timer">{timeUtils.secondsToMinutes(this.state.seconds)}</div>
        )
    }
}

export default Timer;
