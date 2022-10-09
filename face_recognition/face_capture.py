# Mostly copied from provided script
# for generating sample images for training our face identification model

import cv2
import os

# Specify the `user_name` and number of captures
user_name = "Michael"
NUM_OF_PICS = 400

def main():
    video_capture = cv2.VideoCapture(0)


    if not os.path.exists('data/{}'.format(user_name)):
        os.makedirs('data/{}'.format(user_name))

    cnt = 0
    font = cv2.FONT_HERSHEY_SIMPLEX
    bottomLeftCornerOfText = (350, 50)
    fontScale = 1
    fontColor = (102, 102, 225)
    lineType = 2

    # skip the first frame
    ret, frame = video_capture.read()

    # Open camera
    while True:
        # Capture frame-by-frame
        ret, frame = video_capture.read()

        if not ret:
            print("Can't receive frame (stream end?). Exiting ...")

        # Display the resulting frame
        # Store the captured images in `data/Jack`
        cv2.imwrite("data/{}/{}{:03d}.png".format(user_name, user_name, cnt), frame)
        cnt += 1

        if cnt >= NUM_OF_PICS:
            break

        cv2.putText(frame, "No of frame: {}".format(cnt), (20, 20), cv2.FONT_HERSHEY_SIMPLEX, 1, (255, 0, 0), 2)

        cv2.imshow('Video', frame)
        cv2.waitKey(2)

    
    # When everything is done, release the capture
    video_capture.release()
    cv2.destroyAllWindows()


if __name__ == "__main__":
    main()
