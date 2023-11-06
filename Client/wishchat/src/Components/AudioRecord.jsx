import React, { Component } from 'react';
import RecordRTC from 'recordrtc';

class AudioRecorder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isRecording: false,
      recordedAudioBlob: null,
    };
    this.recordRTC = null;
  }

  startRecording = () => {
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then((stream) => {
        this.recordRTC = RecordRTC(stream, {
          type: 'audio',
        });
        this.recordRTC.startRecording();
        this.setState({ isRecording: true });
      })
      .catch((error) => {
        console.error('Error accessing the microphone:', error);
      });
  };

  stopRecording = () => {
    if (this.recordRTC) {
      this.recordRTC.stopRecording(() => {
        const audioBlob = this.recordRTC.getBlob();
        this.setState({
          isRecording: false,
          recordedAudioBlob: audioBlob,
        });
      });
    }
  };

  render() {
    const { isRecording, recordedAudioBlob } = this.state;
    return (
      <div>
        <button onClick={this.startRecording} disabled={isRecording}>
          Start Recording
        </button>
        <button onClick={this.stopRecording} disabled={!isRecording}>
          Stop Recording
        </button>
        {recordedAudioBlob && (
          <audio controls src={URL.createObjectURL(recordedAudioBlob)} />
        )}
      </div>
    );
  }
}

export default AudioRecorder;