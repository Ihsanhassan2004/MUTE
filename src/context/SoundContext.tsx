import React, { createContext, useContext, useState, useRef, useEffect } from 'react';

interface SoundContextType {
  isPlaying: boolean;
  soundType: 'silence' | 'brown_noise' | 'zen_hum' | 'rainfall';
  volume: number;
  toggleSound: () => void;
  setSoundType: (type: 'silence' | 'brown_noise' | 'zen_hum' | 'rainfall') => void;
  setVolume: (vol: number) => void;
  playChime: () => void;
}

const SoundContext = createContext<SoundContextType | undefined>(undefined);

export const SoundProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [soundType, setSoundType] = useState<'silence' | 'brown_noise' | 'zen_hum' | 'rainfall'>('brown_noise');
  const [volume, setVolume] = useState(0.2);

  const audioCtxRef = useRef<AudioContext | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const activeNodesRef = useRef<AudioNode[]>([]);

  const stopActiveNodes = () => {
    activeNodesRef.current.forEach((node) => {
      try {
        if ('stop' in node && typeof (node as AudioScheduledSourceNode).stop === 'function') {
          (node as AudioScheduledSourceNode).stop();
        }
        node.disconnect();
      } catch (e) {
        console.debug('Error disconnecting audio node:', e);
      }
    });
    activeNodesRef.current = [];
  };

  const initAudio = () => {
    if (!audioCtxRef.current) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      audioCtxRef.current = new AudioCtx();
      const gain = audioCtxRef.current.createGain();
      gain.gain.value = volume;
      gain.connect(audioCtxRef.current.destination);
      gainNodeRef.current = gain;
    }
    if (audioCtxRef.current.state === 'suspended') {
      audioCtxRef.current.resume();
    }
  };

  const startSound = (type: 'silence' | 'brown_noise' | 'zen_hum' | 'rainfall') => {
    initAudio();
    const ctx = audioCtxRef.current;
    const gain = gainNodeRef.current;
    if (!ctx || !gain) return;

    stopActiveNodes();

    if (type === 'silence') return;

    if (type === 'brown_noise' || type === 'rainfall') {
      // Synthesize soothing warm brown noise buffer
      const bufferSize = ctx.sampleRate * 4;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      let lastOut = 0.0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        data[i] = (lastOut + (0.02 * white)) / 1.02;
        lastOut = data[i];
        data[i] *= 3.5; // Gain compensation
      }

      const noiseSource = ctx.createBufferSource();
      noiseSource.buffer = buffer;
      noiseSource.loop = true;

      const filter = ctx.createBiquadFilter();
      filter.type = type === 'rainfall' ? 'bandpass' : 'lowpass';
      filter.frequency.value = type === 'rainfall' ? 800 : 320;

      noiseSource.connect(filter);
      filter.connect(gain);
      noiseSource.start();
      activeNodesRef.current = [noiseSource, filter];
    } else if (type === 'zen_hum') {
      // Warm subtle binaural resonant tone at 108Hz + 112Hz (Alpha wave pause)
      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const toneGain = ctx.createGain();
      toneGain.gain.value = 0.15;

      osc1.type = 'sine';
      osc1.frequency.value = 108;
      osc2.type = 'sine';
      osc2.frequency.value = 114;

      osc1.connect(toneGain);
      osc2.connect(toneGain);
      toneGain.connect(gain);

      osc1.start();
      osc2.start();
      activeNodesRef.current = [osc1, osc2, toneGain];
    }
  };

  const toggleSound = () => {
    if (isPlaying) {
      stopActiveNodes();
      setIsPlaying(false);
    } else {
      startSound(soundType);
      setIsPlaying(true);
    }
  };

  const playChime = () => {
    initAudio();
    const ctx = audioCtxRef.current;
    if (!ctx) return;
    const osc = ctx.createOscillator();
    const chimeGain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(528, ctx.currentTime); // 528Hz Solfeggio frequency (transformation & clarity)
    osc.frequency.exponentialRampToValueAtTime(432, ctx.currentTime + 2.5);

    chimeGain.gain.setValueAtTime(0.2, ctx.currentTime);
    chimeGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 3.0);

    osc.connect(chimeGain);
    chimeGain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 3.0);
  };

  useEffect(() => {
    if (gainNodeRef.current && audioCtxRef.current) {
      gainNodeRef.current.gain.setValueAtTime(volume, audioCtxRef.current.currentTime);
    }
  }, [volume]);

  useEffect(() => {
    if (isPlaying) {
      startSound(soundType);
    }
  }, [soundType]);

  return (
    <SoundContext.Provider
      value={{
        isPlaying,
        soundType,
        volume,
        toggleSound,
        setSoundType,
        setVolume,
        playChime,
      }}
    >
      {children}
    </SoundContext.Provider>
  );
};

export const useSound = () => {
  const context = useContext(SoundContext);
  if (!context) {
    throw new Error('useSound must be used within a SoundProvider');
  }
  return context;
};
