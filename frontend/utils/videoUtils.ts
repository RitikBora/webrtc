import * as React from 'react';

export function shareMedia(
    selfVideoRef: React.RefObject<HTMLVideoElement>,
    pc: RTCPeerConnection | null,
    isVideoOn: boolean,
    isMicOn: boolean
): Promise<MediaStream> {
    if (selfVideoRef.current && selfVideoRef.current.srcObject) {
        // Modify the existing media stream and return it
        return modifyExistingMediaStream(
            selfVideoRef.current.srcObject as MediaStream,
            selfVideoRef,
            isVideoOn,
            isMicOn,
            pc
        );
    } else {
        // Create a new media stream and return it
        return createMediaStream(selfVideoRef, pc, isVideoOn, isMicOn);
    }
}

const modifyExistingMediaStream = (
    existingStream: MediaStream,
    selfVideoRef: React.RefObject<HTMLVideoElement>,
    isVideoOn: boolean,
    isMicOn: boolean,
    pc: RTCPeerConnection | null
): Promise<MediaStream> => {
    // Close and stop the existing stream
    closeMediaStream(existingStream);

    // Create and return a new media stream
    return createMediaStream(selfVideoRef, pc, isVideoOn, isMicOn);
};

const createMediaStream = (
    selfVideoRef: React.RefObject<HTMLVideoElement>,
    pc: RTCPeerConnection | null,
    isVideoOn: boolean,
    isMicOn: boolean
): Promise<MediaStream> => {
    return navigator.mediaDevices
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

            // Return the new media stream
            return newStream;
        })
        .catch((err) => {
            console.error('Error accessing media devices:', err);
            throw err; // Re-throw error for better handling
        });
};

export const closeMediaStream = (existingStream: MediaStream) => {
    existingStream.getTracks().forEach((track) => track.stop()); // Stop all tracks
};
