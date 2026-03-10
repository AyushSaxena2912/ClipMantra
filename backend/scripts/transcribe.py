import sys
import json
from faster_whisper import WhisperModel

audio_path = sys.argv[1]
output_path = sys.argv[2]

try:

    # Railway friendly model
    model = WhisperModel(
        "tiny",
        device="cpu",
        compute_type="int8"
    )

    segments, info = model.transcribe(audio_path)

    result = {
        "text": "",
        "segments": []
    }

    for segment in segments:

        result["text"] += segment.text + " "

        result["segments"].append({
            "start": float(segment.start),
            "end": float(segment.end),
            "text": segment.text.strip()
        })

    with open(output_path, "w") as f:
        json.dump(result, f)

    print("Transcription completed")

except Exception as e:

    print("Transcription error:", str(e))
    sys.exit(1)