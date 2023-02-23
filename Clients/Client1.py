import time, random
from flask import Flask, render_template
from flask_socketio import SocketIO, emit
from flask_cors import CORS
from threading import Thread
import gevent
import eventlet
eventlet.monkey_patch()


company_list = ["RELIANCE",
                "TCS",
                "HDFC Bank",
                "INFOSYS",
                "ICICI BANK",
                "HUL LTD",
                "ITC LTD",
                "SBI",
                "Airtel",
                "Bajaj Finance",
                "LIC India",
                "KOTAK Bank",
                "L&T",
                "HCL",
                "Google",
                "Apple",
                "Microsoft",
                "Amazon",
                "Tesla",
                "Meta",
                "SpaceX",
                "Netflix",
                "Spotify"
                ]

app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret!'
CORS(app,resources={r"/*":{"origins":"*"}})
socketio = SocketIO(app, cors_allowed_origins='http://localhost:3000')

def send_data():
    start = time.time()
    for i in range(500):
        time.sleep(0.02)
        now = time.time()
        data = {
            'tag1': company_list[random.randint(0, len(company_list) - 1)],
            'tag2': 'TAG2-ID' + str(random.randint(0, 200)),
            'tag3': 'TAG3-ID' + str(random.randint(0, 200)),
            'metric1': random.randint(50, 100), # random.uniform(0, 100),
            'metric2': random.randint(50, 100),
            'time': round(now,2)
        }
        socketio.emit('data_event', data)
        time.sleep(0)
        print(i,now-start)

@app.route('/')
def index():
    return render_template('index.html')

@socketio.on('connect')
def handle_connect():
    print('A user connected')
    time.sleep(3)
    emit('greeting', {'clientId': 1})
    socketio.sleep(0)

    Thread(target=send_data).start()
    # time.sleep(3)
    # start = time.time()
    # for i in range(500):
    #     time.sleep(0.01)
    #     now = time.time()
    #     data = {
    #         'tag1': company_list[random.randint(0, len(company_list) - 1)],
    #         'tag2': 'TAG2-ID' + str(random.randint(0, 200)),
    #         'tag3': 'TAG3-ID' + str(random.randint(0, 200)),
    #         'metric1': random.randint(50, 100), # random.uniform(0, 100),
    #         'metric2': random.randint(50, 100),
    #         'time': now
    #     }
    #     emit('data_event', data, ignore_queue=True)
    #     socketio.sleep(0)
    #
    #     print(i, now - start)


@socketio.on('disconnect')
def handle_disconnect():
    print('A user disconnected')

if __name__ == '__main__':
    socketio.run(app, host='0.0.0.0', port=5000)