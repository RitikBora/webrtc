import * as React from 'react';

export function shareMedia(
    selfVideoRef: React.RefObject<HTMLVideoElement>,
    pc: RTCPeerConnection | null,
    isVideoOn: boolean,
    isMicOn: boolean
) {
    if (selfVideoRef.current && selfVideoRef.current.srcObject) {
        // Close the existing stream and start a new one
        modifyExistingMediaStream(selfVideoRef.current.srcObject as MediaStream, selfVideoRef, isVideoOn, isMicOn, pc);
    } else {
        // If there's no stream yet, create a new one
        createMediaStream(selfVideoRef, pc, isVideoOn, isMicOn);
    }
}

const modifyExistingMediaStream = (
    existingStream: MediaStream,
    selfVideoRef: React.RefObject<HTMLVideoElement>,
    isVideoOn: boolean,
    isMicOn: boolean,
    pc: RTCPeerConnection | null
) => {
    // Close and stop the existing stream
    closeMediaStream(existingStream);

    // Create and attach a new media stream
    createMediaStream(selfVideoRef, pc, isVideoOn, isMicOn);
};

const createMediaStream = (
    selfVideoRef: React.RefObject<HTMLVideoElement>,
    pc: RTCPeerConnection | null,
    isVideoOn: boolean,
    isMicOn: boolean
) => {
    navigator.mediaDevices
        .getUserMedia({ video: isVideoOn, audio: isMicOn })
        .then((newStream) => {
            // Set the new stream to the video element
            if (selfVideoRef.current) {
                selfVideoRef.current.srcObject = newStream;
                selfVideoRef.current.muted = true;
                selfVideoRef.current.play(); // Ensure video plays
            }

            // Add the new tracks to the peer connection
            newStream.getTracks().forEach((track) => {
                pc?.addTrack(track, newStream);
            });
        })
        .catch((err) => {
            console.error('Error accessing media devices:', err);
        });
};

export const closeMediaStream = (existingStream: MediaStream) => {
    existingStream.getTracks().forEach((track) => track.stop()); // Stop all tracks
};
