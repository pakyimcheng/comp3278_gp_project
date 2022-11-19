## Start Flask Server
### Windows

    1. .\venv\Scripts\Activate
    2. py app.py
    
### MacOS/Linux

    1. source venv/bin/activate
    2. python app.py


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

9. Create a database named 'project' (all lowercase). Import the .sql file in discord to 'project' database  in phpMyAdmin.

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

4. Create a database namely 'project'(all lowercase). Import the .sql file in discord to 'project' database in phpMyAdmin.



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
4. Navigating to the Application
```
Open a Web Browser and go to http://localhost:3000/
* When you do `npm start`, the app may open the tab for you automically
Login using Facial Recognition or Email and Password
```

5. Use the Application  
If you have a Lecture/Tutorial in the next 60 minutes, you will see a notification at the  left side of the Home Page and you can naviagte to the "Upcoming Course" Page and see the course Info.    
Else, you can always go to the "TimeTable" Page to view your personal timetable in the current week.
To view all your login records, head to the Records Page, you will find all your login records there, including login ID, IP Address and Login Duration.
