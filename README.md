## Start Flask Server
### Windows

    1. .\venv\Scripts\Activate
    2. py server.py
    
### MacOS/Linux

    1. source venv/bin/activate
    2. python server.py

## Facial recognition/ identification model

The model is a bit rough but still performs better than opencv default one.

### Setup
1. Create a virtual environment (using either conda/ venv) with python=3.9 
    (as tensorflow only upports python 3.6 to 3.9)
    Take conda as an example: 
    ```
    conda create -n NAME_OF_YOUR_ENV python=3.9.10
    ```
2. Install mediapipe
    ```
    pip install mediapipe
    ```
3. Install tensorflow
    ```
    pip install tensorflow
    ```
4. run the inference.py in folder face_recognition
    ```
    cd face_recognition
    python inference.py
    ```
    