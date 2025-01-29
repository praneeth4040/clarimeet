import pyaudio
import wave
import sys

def record_audio(duration, output_file):
    chunk = 1024  
    format = pyaudio.paInt16  
    channels = 2  
    rate = 44100  

    p = pyaudio.PyAudio()

    stream = p.open(format=format,channels=channels,rate=rate,input=True,frames_per_buffer=chunk)

    print("Recording started")

    frames = []

    for _ in range(0, int(rate / chunk * duration)):
        data = stream.read(chunk)
        frames.append(data)

    print("Finished recording")

    stream.stop_stream()
    stream.close()
    p.terminate()
    wf = wave.open(output_file, 'wb')
    wf.setnchannels(channels)
    wf.setsampwidth(p.get_sample_size(format))
    wf.setframerate(rate)
    wf.writeframes(b''.join(frames))
    wf.close()

if __name__ == "__main__":
    if len(sys.argv) != 2:
        print("Usage: python audioInput.py <duration_in_seconds>")
        sys.exit(1)

    duration = int(sys.argv[1])
    output_file = "output.wav"
    record_audio(duration, output_file)
