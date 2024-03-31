import React, { useState, useEffect, useRef } from 'react';
import Peer from '@peerjs/peer';
import Controls from './Controls';
import styles from '../styles/VideoCall.module.css'; // Import custom styles

const VideoCall = () => {
  const [peerId, setPeerId] = useState(null);
  const [remoteStream, setRemoteStream] = useState(null);
  const [localStream, setLocalStream] = useState(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [connected, setConnected] = useState(false);
  const videoRef = useRef(null);
  const remoteVideoRef = useRef(null);

  useEffect(() => {
    const myPeer = new Peer({ key: 'your-peerjs-server-key' }); // Replace with your PeerJS server key

    myPeer.on('open', (id) => {
      setPeerId(id);
    });

    myPeer.on('call', (call) => {
      setIsConnecting(true);
      call.answer(localStream);
      call.on('stream', (stream) => {
        setRemoteStream(stream);
        setIsConnecting(false);
        setConnected(true);
      });
    });

    // Handle connection errors
    myPeer.on('error', (error) => {
      console.error('PeerJS error:', error);
    });

    // Cleanup on unmount
    return () => myPeer.destroy();
  }, []);

  const handleStartCall = async () => {
    setIsConnecting(true);

    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        setLocalStream(stream);
        videoRef.current.srcObject = stream;

        const call = myPeer.call(connectToPeerId, stream);
        call.on('stream', (stream) => {
          setRemoteStream(stream);
          remoteVideoRef.current.srcObject = stream;
          setIsConnecting(false);
          setConnected(true);
        });
      })
      .catch((error) => {
        console.error('getUserMedia error:', error);
        setIsConnecting(false);
      });
  };

  const handleConnect = (connectToPeerId) => {
    if (peerId) {
      handleStartCall();
    } else {
      alert('Please wait for your Peer ID to be generated.');
    }
  };

  const handleMute = () => {
    localStream?.getAudioTracks()?.forEach((track) => (track.enabled = !track.enabled));
  };

  const handleVideoToggle = () => {
    localStream?.getVideoTracks()?.forEach((track) => (track.enabled = !track.enabled));
  };

  // Implement screen sharing functionality (refer to documentation or libraries)

  return (
    <div className={styles.container}>
      <div className={styles.videoContainer}>
        <video ref={videoRef} muted autoPlay className={styles.localVideo} />
        {connected && <video ref={remoteVideoRef} autoPlay className={styles.remoteVideo} />}
        {isConnecting && <div className={styles.connectingOverlay}>Connecting...</div>}
      </div>
      <Controls
        peerId={peerId}
        onConnect={handleConnect}
        onMute={handleMute}
        onVideoToggle={handleVideoToggle}
        onShare={() => console.log('Share button clicked (implement screen sharing)')} // Placeholder for screen sharing
      />
    </div>
  );
};

export default VideoCall;
