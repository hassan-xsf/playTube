function formatSeconds(seconds) {
    const totalSeconds = Math.floor(seconds);
    
    const minutes = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    const timeString = `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;

    return timeString;
}

export {formatSeconds}