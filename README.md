## Start Flask Server
### Windows

    1. .\venv\Scripts\Activate
    2. py server.py
    
### MacOS/Linux

    1. source venv/bin/activate
    2. python server.py

## Facial recognition/ identification model

The model is a bit rough but still performs better than opencv default one.


## MYSQL setup

Assume XAMPP is installed in your computer.

1. Install the following packages

    * mysql-connector-python
    * python-dotenv

    (Take conda as example)
    ```
    conda install -c anaconda mysql-connector-python
    pip install python-dotenv
    ```

2. create _.env_ file under folder /flask/

    Type the following. (The YOUR_PASSWORD can be found in the following steps.)

    ```
    MYSQL_PASSWORD='YOUR_PASSWORD'
    ```

3. Launch XAMPP. Go to phpMyAdmin.
    On the top launch bar, click 'User accounts'. Search for the column with 'User name' = 'root' and 'Host name' = 'localhost'. Look at the password column, if the Password column said 'No', then leave the YOUR_PASSWORD empty. Otherwise, copy the value to YOUR_PASSWORD.

    Then save the _.env_ file.

4. Create a database namely 'project'. Import the .sql file in discord to 'project' database.



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
    