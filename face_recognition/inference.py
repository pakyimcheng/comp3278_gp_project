# Inferencing using trained keras model by Teachable mechine by Google
# First we apply Mediapipe (also created by Google) to do face detection (very fast with cpu only)
# Then chopped the image to get the face only
# Next we feed the chopped image to the neural network and perform face identification.
# require mediapipe and tensorflow

import mediapipe as mp
import cv2

from keras.models import load_model
from PIL import Image, ImageOps
import numpy as np

# from 09-10-2022/converted_model/labels.txt
class_names = {
    0: "Enoch",
    1: "Jacky",
    2: "Michael",
    3: "Samuel",
    4: "Wally"
}

def inference(model, img_rgb_cropped):
    data = np.ndarray(shape=(1, 224, 224, 3), dtype=np.float32)

    # resize and normalization for keras
    img_rgb_cropped = cv2.resize(img_rgb_cropped, (224, 224), interpolation = cv2.INTER_AREA)
    normalized_img = (img_rgb_cropped.astype(np.float32) / 127.0) - 1
    
    data[0] = normalized_img

    prediction = model.predict(data)
    index = np.argmax(prediction)
    class_name = class_names[index]
    confidence_score = prediction[0][index]

    if confidence_score >= 0.5:
        return class_name, confidence_score
    else:
        return "NONE", 0


def main():
    model = load_model('09-10-2022/converted_keras/keras_model.h5')

    # get camera input
    # mediapipe to detect faces, get the first face (not supporting multiple faces)
    # crop and resize to (224, 224, 3) in RGB

    cap = cv2.VideoCapture(0)

    mp_face_detection = mp.solutions.face_detection
    mp_drawing = mp.solutions.drawing_utils

    with mp_face_detection.FaceDetection(
        model_selection=0, min_detection_confidence=0.5) as face_detection:

        while True:
            success, image = cap.read()

            if not success:
                continue

            image_rgb = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
            image_rgb.flags.writeable = False
            results = face_detection.process(image_rgb)

            image_rgb.flags.writeable = True
            if results.detections:
                detection = results.detections[0]

                bbox = detection.location_data.relative_bounding_box     
                img_h, img_w = image.shape[:2]
                xmin, ymin, w, h = int(bbox.xmin * img_w), int(bbox.ymin * img_h), int(bbox.width * img_w), int(bbox.height * img_h)

                # crop the image
                img_rgb_cropped = image_rgb[ymin: ymin + h + 1, xmin: xmin + w + 1]

                class_name, confidence_score = inference(model, img_rgb_cropped)


                # draw on the image
                mp_drawing.draw_detection(image, detection)
                cv2.putText(image, 
                    "class_name: {}, keras conf: {:.2f}".format(class_name, confidence_score),
                    (xmin, ymin - 5),
                    cv2.FONT_HERSHEY_SIMPLEX,
                    1, (0, 255, 0), 2, cv2.LINE_AA)

            cv2.imshow("image", image)
            k = cv2.waitKey(1)
            if k == ord('q'):
                break

    cap.release()
    cv2.destroyAllWindows()


if __name__ == "__main__":
    main()