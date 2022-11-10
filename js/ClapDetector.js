"use strict";
export const Recording = function(cb) {
  let recorder = null;
  let recording = true;
  let audioInput = null;
  let volume = null;
  let audioContext = null;
  const callback = cb;
  navigator.getUserMedia =
    navigator.getUserMedia ||
    navigator.webkitGetUserMedia ||
    navigator.mozGetUserMedia ||
    navigator.msGetUserMedia;
  if (navigator.getUserMedia) {
    navigator.getUserMedia({ audio: true }, function(e) {
      //success
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      audioContext = new AudioContext();
      volume = audioContext.createGain(); // creates a gain node
      audioInput = audioContext.createMediaStreamSource(e); // creates an audio node from the mic stream
      audioInput.connect(volume); // connect the stream to the gain node
      recorder = audioContext.createScriptProcessor(2048, 1, 1);
      recorder.onaudioprocess = function(e) {
        if (!recording)
          return;
        const left = e.inputBuffer.getChannelData(0);
        //const right = e.inputBuffer.getChannelData(1);
        callback(new Float32Array(left));
      };
      volume.connect(recorder); // connect the recorder
      recorder.connect(audioContext.destination);
    }, function(e) {
      //failure
      alert("Error capturing audio.");
    });
  }
  else {
    alert("getUserMedia not supported in this browser.");
  }
};
let lastClap = new Date().getTime();
export function detectClap(data, sensitivity) {
  const t = new Date().getTime();
  if (t - lastClap < 2000)
    return false; // TWEAK HERE
  let zeroCrossings = 0,
    highAmp = 0;
  for (let i = 1; i < data.length; i++) {
    if (Math.abs(data[i]) > sensitivity){
      
    highAmp++; // TWEAK HERE
    }
    if ((data[i] > 0 && data[i - 1] < 0) || (data[i] < 0 && data[i - 1] > 0))
      zeroCrossings++;
  }
  if (highAmp > 20 && zeroCrossings > 30) {
    // TWEAK HERE
    console.log(highAmp+' / '+zeroCrossings);
    lastClap = t;
    console.log(sensitivity)

    return true;
  }
  return false;
}

export function isMicrophoneAllowed() {
  navigator.permissions.query({
    name: 'microphone'
  }).then(function(permissionStatus) {
    return permissionStatus.state !== 'denied';
  });
}