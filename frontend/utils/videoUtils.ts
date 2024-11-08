import * as React from 'react';

export function shareMedia(
    selfVideoRef: React.RefObject<HTMLVideoElement>,
    pc: RTCPeerConnection | null,
    isVideoOn: boolean,
    isMicOn: boolean
) {
    if (selfVideoRef.current && selfVideoRef.current.srcObject) {
        modifyExistingMediaStream(selfVideoRef.current.srcObject as MediaStream, selfVideoRef , isVideoOn, isMicOn, pc);
    } else {
        createMediaStream(selfVideoRef, pc, isVideoOn, isMicOn);
    }

}

const modifyExistingMediaStream = (existingStream: MediaStream , selfVideoRef:React.RefObject<HTMLVideoElement> , isVideoOn: boolean, isMicOn: boolean, pc: RTCPeerConnection | null) => {
    const videoTrack = existingStream.getVideoTracks()[0];
    const audioTrack = existingStream.getAudioTracks()[0];

  

    // Stop video track if video is turned off
    if (videoTrack && !isVideoOn) {
        videoTrack.stop();
        existingStream.removeTrack(videoTrack);
    }

    // Start video if not already started
    if (!videoTrack && isVideoOn) {
        navigator.mediaDevices.getUserMedia({ video: true, audio: isMicOn })
            .then((newStream) => {
                const newVideoTrack = newStream.getVideoTracks()[0];
                existingStream.addTrack(newVideoTrack);
                 if (selfVideoRef.current) {
                selfVideoRef.current.srcObject = existingStream;
                selfVideoRef.current.muted = true;
                selfVideoRef.current.play();
            }

                // Add the video track to the peer connection if necessary
                pc?.addTrack(newVideoTrack, newStream);
            })
            .catch((err) => console.error('Error accessing video:', err));
    }

    // Stop audio track if mic is turned off
    if (audioTrack && !isMicOn) {
        audioTrack.stop();
        existingStream.removeTrack(audioTrack);
    }

    // Start audio if not already started
    if (!audioTrack && isMicOn) {
        navigator.mediaDevices.getUserMedia({ video: isVideoOn, audio: true })
            .then((newStream) => {
                const newAudioTrack = newStream.getAudioTracks()[0];
                existingStream.addTrack(newAudioTrack);
            
                // Add the audio track to the peer connection if necessary
                pc?.addTrack(newAudioTrack, newStream);
            })
            .catch((err) => console.error('Error accessing audio:', err));
    }

    // If both video and mic are off, stop all tracks
    if (!isMicOn && !isVideoOn) {
        closeMediaStream(existingStream);
    }
};

const createMediaStream = (selfVideoRef: React.RefObject<HTMLVideoElement>, pc: RTCPeerConnection | null, isVideoOn: boolean, isMicOn: boolean) => {
    navigator.mediaDevices
        .getUserMedia({ video: isVideoOn, audio: isMicOn })
        .then((stream) => {
            if (selfVideoRef.current) {
                selfVideoRef.current.srcObject = stream;
                selfVideoRef.current.muted = true;
                selfVideoRef.current.play();
            }

            stream.getTracks().forEach((track) => {
                // Add the tracks to the peer connection if necessary
                // pc?.addTrack(track, stream);
            });

        })
        .catch((err) => {
            console.error('Error accessing media devices:', err);
        });
};

const closeMediaStream = (existingStream: MediaStream) => {
    existingStream.getTracks().forEach((track) => track.stop());
};
