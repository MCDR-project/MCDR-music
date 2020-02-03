import Resampler from "../api/libs/xaudio";
import {OpusEncoder} from "../api/libs/opus";
import {AbstractAudio} from "../objects/AbstractAudio";
import {StreamingPlatform} from "../helpers/StreamingPlatform";

export class Streamer extends AbstractAudio {

    constructor(config, socket) {
        super();

        this.config = config;
        this.config.codec = this.config.codec || this.defaultConfig.codec;
        this.sampler = new Resampler(this.audioContext.sampleRate, this.config.codec.sampleRate, 1, this.config.codec.bufferSize);
        this.parentSocket = socket;
        this.encoder = new OpusEncoder(this.config.codec.sampleRate, this.config.codec.channels, this.config.codec.app, this.config.codec.frameDuration);
    }

    _makeStream(onError) {
        new StreamingPlatform({audio: this.config.micId}, (stream) => {
            this.stream = stream;
            this.audioInput = this.audioContext.createMediaStreamSource(stream);
            this.gainNode = this.audioContext.createGain();
            this.recorder = this.audioContext.createScriptProcessor(this.config.codec.bufferSize, 1, 1);
            this.recorder.onaudioprocess = (e) => {
                let resampled = this.sampler.resampler(e.inputBuffer.getChannelData(0));
                let packets = this.encoder.encode_float(resampled);
                for (let i = 0; i < packets.length; i++) {
                    if (this.socket.readyState === 1) this.socket.send(packets[i]);
                }
            };
            this.audioInput.connect(this.gainNode);
            this.gainNode.connect(this.recorder);
            this.recorder.connect(this.audioContext.destination);
        }, onError || this.onError);
    }

    start(onError) {
        this.socket = this.parentSocket;
        this.socket.binaryType = 'arraybuffer';

        if (this.socket.readyState === WebSocket.OPEN) {
            this._makeStream(onError);
        } else if (this.socket.readyState === WebSocket.CONNECTING) {
            let _onopen = this.socket.onopen;
            this.socket.onopen = () => {
                if (_onopen) {
                    _onopen();
                }
                this._makeStream(onError);
            }
        } else {
            console.error('Socket is in CLOSED state');
        }

        this.socket.onclose = () => {
            if (onclose) {
                onclose();
            }

            this._shutdown();
            console.log('Disconnected from server');
        };
    };

    mute() {
        this.gainNode.gain.value = 0;
        console.log('Mic muted');
    }

    unMute() {
        this.gainNode.gain.value = 1;
        console.log('Mic unmuted');
    }

    onError(e) {
        let error = new Error(e.name);
        error.name = 'NavigatorUserMediaError';
        throw error;
    }

    _shutdown() {
        if (this.audioInput) {
            this.audioInput.disconnect();
            this.audioInput = null;
        }

        if (this.gainNode) {
            this.gainNode.disconnect();
            this.gainNode = null;
        }

        if (this.recorder) {
            this.recorder.disconnect();
            this.recorder = null;
        }

        if (this.stream != null) {
            this.stream.getTracks().forEach(track => {
                track.stop();
            })
        }
    }

    stop() {
        this._shutdown();

        if (!this.parentSocket) {
            this.socket.close();
        }
    }

}
