# COMP3278 Group Project Group 9
## Installation Guide

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

    #### MySQL setup
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

9. Create a database named 'project' (all lowercase). Import the .sql file in discord to 'project' database  in phpMyAdmin.
    
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
After that, the app will open a tab for you automatically. If not, open a web browser and go to http://localhost:3000/

3. Open another terminal, activate the environment.
    cd to the flask folder and run the backend
```
cd flask
python app.py
```

4. Use the Application
* Login using Facial Recognition or Email and Password
* If you have a Lecture/Tutorial in the next 60 minutes, you will see a notification at the  left side of the Home Page and you can naviagte to the "Upcoming Course" Page and see the course Info.
Else, you can always go to the "TimeTable" Page to view your personal timetable in the current week.
* To view all your login records, head to the Records Page, you will find all your login records there, including login ID, IP Address and Login Duration.

### Appendix
#### Facial recognition testing

The model is a bit rough but still performs better than opencv default one.

(Skip step 1 and 2 if you have followed the installation Setup above)

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