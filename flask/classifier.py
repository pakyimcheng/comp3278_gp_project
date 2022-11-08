import mediapipe as mp
import cv2
from keras.models import load_model
from PIL import Image
import numpy as np

MODEL_PATH = "09-10-2022/converted_keras/keras_model.h5"

# associate with the model
class_names = {0: "Enoch", 1: "Jacky", 2: "Michael", 3: "Samuel", 4: "Wally"}


def load_keras_model():
    return load_model(MODEL_PATH)


def inference(model, img_rgb_cropped):
    data = np.ndarray(shape=(1, 224, 224, 3), dtype=np.float32)

    # resize and normalization for keras
    img_rgb_cropped = cv2.resize(
        img_rgb_cropped, (224, 224), interpolation=cv2.INTER_AREA
    )
    normalized_img = (img_rgb_cropped.astype(np.float32) / 127.0) - 1

    data[0] = normalized_img

    prediction = model.predict(data)
    index = np.argmax(prediction)
    class_name = class_names[index]
    confidence_score = prediction[0][index]

    if confidence_score >= 0.5:
        return class_name, confidence_score, index
    else:
        return "NULL", 0.0, -1


model = load_keras_model()
mp_face_detection = mp.solutions.face_detection.FaceDetection(
    model_selection=0, min_detection_confidence=0.5
)


def get_prediction(img_bytes):
    """
    Get prediction
    Return a dictionary with two keys class_name and confidence_score
    """
    image = np.array(Image.open(img_bytes).convert("RGB"), dtype=np.uint8)
    img_rgb = np.array(image)
    img_rgb.flags.writeable = False

    results = mp_face_detection.process(img_rgb)

    img_rgb.flags.writeable = True

    if results.detections:
        detection = results.detections[0]

        bbox = detection.location_data.relative_bounding_box
        img_h, img_w = image.shape[:2]
        xmin, ymin, w, h = (
            int(bbox.xmin * img_w),
            int(bbox.ymin * img_h),
            int(bbox.width * img_w),
            int(bbox.height * img_h),
        )

        # crop the image
        img_rgb_cropped = img_rgb[ymin : ymin + h + 1, xmin : xmin + w + 1]

        class_name, confidence_score, idx = inference(model, img_rgb_cropped)

        return {
            "class_name": class_name,
            "confidence_score": float(confidence_score),
            "index": int(idx),
        }

    return {"class_name": "NULL", "confidence_score": 0.0, "index": None}
