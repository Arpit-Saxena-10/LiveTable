# LiveTable
A React application that receives high frequency from flask clients using web-sockets and displays them real-time with filtering, sorting options


# Demonstration 
![image](https://user-images.githubusercontent.com/63216094/220954132-0ceda44b-7111-4095-b628-9f92070d1c80.png)
For a video demonstration, please go to this google drive link
[Video Demonstration](https://drive.google.com/drive/u/0/folders/1WQRI3MutJF5MqPsg4RjJvJHlM3azFO0_)

# Steps for setting up React frontend

- React code is in the live-table-frontend directory
- run the command -> npm install  -> This will install all the required packages (you should have node, npm installed before running this command)
- run the command -> npm start -> This will run the frontend application

# Steps for setting up Flask client

- The code for the flask client is in the Clients/Client1.py file and the packages required to run this file are in the requirements.txt file
- Initiate and activate a virtual environment using the following steps
  - pip install virtualenv
  - virtualenv env-name -> this will create an environment named env-name
  - To activate this env in windows run -> <path_to_env_folder>/Scripts/activate
  - To activate this env in linux run -> source <path_to_env_folder>/bin/activate
  - now install all packages listed in requirements.txt file by running -> pip install -r <path_to_requirements.txt file>
- now you can start the Flask application by running the Client1.py file by -> python Client1.py

- After a few seconds, the client will start sending the data to the frontend

# New Feature Added :

- Live Counter of the number of rows received from Clients

# Required Improvements:

- As of now, the data received from websocket is not saved so if we refresh the data will be lost. We can fix this by making the sure the state "persists" by saving it to localStorage
- As of now, the sort feature will only work after all the rows have been received (although it works for the filter feature). To fix this, we need to save whether to sort based on a column or not in a boolean state. On updating the data, we will check this state and add the new rows based on the correct sorted order
