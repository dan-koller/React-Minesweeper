/*
* This function is heavily inspired by GitHub user https://github.com/bazhanius
* He did a great job implementing these utility functions.
* They are used under the MIT license.
*/

const timeUtils = {
    secondsToMinutes: function(seconds) {
        let secs = Math.floor(seconds % 60);
        secs = secs < 10 ? "0" + secs : "" + secs;

        let min = Math.floor(seconds / 60);
        min = min < 10 ? "0" + min : "" + min;

        return (min + ":" + secs);
    }
}

export default timeUtils;
