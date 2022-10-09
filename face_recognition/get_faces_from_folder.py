# generate chopped image from video camera capture
# for training facial login model using teachable machine by Google

import mediapipe as mp
import cv2

import os
from pathlib import Path

# relative path of the data stored
# change them if necessary
INPUT_FOLDER_NAME = "data_19-09-2022"
OUTPUT_FOLDER_NAME = 'output_data_19-09-2022'

IMG_FORMATS = 'bmp', 'jpeg', 'jpg', 'png', 'tif', 'tiff'

def get_all_images(folder_in_path):
    '''
    Find all images under the folder 'folder_in_path' recursively
    Return a list of path of the images
    '''
    files_list = []

    for root, dirs, files in os.walk(folder_in_path, topdown=False):
        for name in files:
            files_list.append(os.path.join(root, name))

    images = [x for x in files_list if x.split('.')[-1].lower() in IMG_FORMATS]

    return images

def generate_blurred_image_path(image_path, folder_in_path, folder_out_path):
    '''
    Generate the path for storing blurred image
    Return the path of the blurred image
    '''
    rel_p = os.path.relpath(image_path, start=str(folder_in_path.resolve()))
    blurred_img_p = os.path.join(str(folder_out_path.resolve()), rel_p)

    return blurred_img_p


def face_detection(images_path):
    mp_face_detection = mp.solutions.face_detection
    mp_drawing = mp.solutions.drawing_utils

    folder_in_path = Path(INPUT_FOLDER_NAME).resolve()
    folder_out_path = Path(OUTPUT_FOLDER_NAME).resolve()


    with mp_face_detection.FaceDetection(
        model_selection=1, min_detection_confidence=0.5) as face_detection:

        for image_path in images_path:
            # generate output path
            cropped_img_path = generate_blurred_image_path(image_path, folder_in_path, folder_out_path)
            head, _ = os.path.split(cropped_img_path)

            if not os.path.exists(head):
                os.makedirs(head)
            
            image = cv2.imread(image_path)
            # Convert the BGR image to RGB and process it with MediaPipe Face Detection.
            results = face_detection.process(cv2.cvtColor(image, cv2.COLOR_BGR2RGB))

            # Draw face detections of each face.
            if not results.detections:
                continue
            annotated_image = image.copy()

            if results.detections:
                detection = results.detections[0]

                bbox = detection.location_data.relative_bounding_box     
                img_h, img_w = image.shape[:2]
                xmin, ymin, w, h = int(bbox.xmin * img_w), int(bbox.ymin * img_h), int(bbox.width * img_w), int(bbox.height * img_h)

                # crop the image then save it
                img_cropped = image[ymin: ymin + h + 1, xmin: xmin + w + 1]

                cv2.imwrite(cropped_img_path, img_cropped)

                print('saved:', cropped_img_path)


                

            # for detection in results.detections:
            #     print('Nose tip:')
            #     print(mp_face_detection.get_key_point(
            #         detection, mp_face_detection.FaceKeyPoint.NOSE_TIP))
            #     mp_drawing.draw_detection(annotated_image, detection)
            #     print(detection)

                # mp_drawing.draw_detection(annotated_image, detection)
                
                # cv2.imshow("annotated_image", annotated_image)
                # cv2.imshow("cropped_image", img_cropped)
                # print("cropped_image.shape:", img_cropped.shape)
                # k = cv2.waitKey(0)
                # if k == ord('q'):
                #     break


def main():
    folder_name = os.path.join(INPUT_FOLDER_NAME)

    images_path = get_all_images(folder_name)

    face_detection(images_path)


if __name__ == '__main__':
    main()