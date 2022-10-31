## Start Flask Server
### Windows

    1. .\venv\Scripts\Activate
    2. py server.py
    
### MacOS/Linux

    1. source venv/bin/activate
    2. python server.py


## Installation Setup

1. Install anaconda for creating an environment [(Link)](https://www.anaconda.com/products/distribution)

2. Create a virtual environment (using either conda/ venv) with python=3.9 and activate it
    (as tensorflow only supports python 3.6 to 3.9)
    (Take conda as an example)
    ```
    conda create -n NAME_OF_YOUR_ENV python=3.9
    conda activate NAME_OF_YOUR_ENV
    ```

3. Install mediapipe and tensorflow for facial recognition and identification
    ```
    pip install mediapipe
    pip install tensorflow
    ```

4. Install nodejs and flask and supporting packages for frontend
    ```
    conda install -c anaconda flask
    conda install -c conda-forge flask-mail
    conda install -c conda-forge nodejs
    pip install python-dotenv
    conda install -c anaconda flask-cors
    ```

    #### MySQL setup setup
5. Install mysql-connector-python and python-dotenv for connecting to the database
    ```
    pip install mysql-connector-python
    pip install python-dotenv
    ```

6. Install XAMPP to your computer [(Link)](https://www.apachefriends.org/)

7. create _.env_ file under folder /flask/

    Type the following. (The YOUR_PASSWORD can be found in the following steps.)
    ```
    MYSQL_PASSWORD='YOUR_PASSWORD'
    ```

    If MySQL is launched with a port other than 3306, Type the following.
    ```
    MYSQL_PORT='PORT_NUMBER'
    ```



8. Launch XAMPP. Go to phpMyAdmin.
    On the top launch bar, click 'User accounts'. 
    Search for the column with 'User name' = 'root' and 'Host name' = 'localhost'. 
    Look at the password column, if the Password column said 'No', then leave the YOUR_PASSWORD empty (i.e. an empty string). Otherwise, copy the value to YOUR_PASSWORD.


    Then save the _.env_ file.

9. Create a database named 'project'. Import the .sql file in discord to 'project' database.

## Start the application
1. Activate the environment, cd to the web folder and install packages for nodejs
```
cd web
npm install
```

2. Start the frontend
```
npm start
```

3. Open another terminal, activate the environment.
    cd to the flask folder and run the backend
```
cd flask
python app.py
```


## MYSQL setup

Assume XAMPP is installed in your computer.

1. Install the following packages

    * mysql-connector-python
    * python-dotenv

    (Take conda as example)
    ```
    pip install mysql-connector-python
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



### Facial recognition setup

The model is a bit rough but still performs better than opencv default one.

1. Create a virtual environment (using either conda/ venv) with python=3.9 
    (as tensorflow only upports python 3.6 to 3.9)
    Take conda as an example: 
    ```
    conda create -n NAME_OF_YOUR_ENV python=3.9
    ```
2. Install mediapipe and tensorflow
    ```
    pip install mediapipe
    pip install tensorflow
    ```

3. run the inference.py in folder face_recognition
    ```
    cd face_recognition
    python inference.py
    ```
    