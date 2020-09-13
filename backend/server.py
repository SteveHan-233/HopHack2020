import cv2
from tool.utils import *
from tool.torch_utils import *
from tool.darknet2pytorch import Darknet
import eventlet
import socketio
import os
import time
import csv
import numpy as np
from shapely.geometry import Point
from shapely.geometry.polygon import Polygon


directory = "./photos"

# Width and height of the images.
# This is slightly lower than HD because we had to cut some pixels out during stabilization
width = 1866
height = 1009

sio = socketio.Server()
app = socketio.WSGIApp(sio, static_files={
    '/': {'content_type': 'text/html', 'filename': 'index.html'}
})

# initialize Yolo.v4
m = Darknet('./cfg/yolov4.cfg')
m.print_network()
m.load_weights('./yolov4.weights')
print('Loading weights from %s... Done!' % ('./yolov4.weights'))


@sio.event
def connect(sid, environ):
    print('connect ', sid)
    parking_spots = []

    with open('parking_lot.csv', mode='r') as file:
        csvFile = csv.reader(file)
        next(csvFile)
        for lines in csvFile:
            parking_spots.append(Polygon([(int(lines[1]), int(lines[2])), (int(lines[3]), int(
                lines[4])), (int(lines[5]), int(lines[6])), (int(lines[7]), int(lines[8]))]))

    num_parking_spots = len(parking_spots)

    dirs = os.listdir(directory)
    dirs.sort(reverse=True)

    # parking spots with their corresponding timestamps (seconds since the car has parked)
    timestamps = [-1] * num_parking_spots

    for filename in dirs:
        if filename.endswith(".jpg"):
            t1 = time.time()
            img_path = f"{directory}/{filename}"
            img = cv2.imread(img_path)
            sized = cv2.resize(img, (m.width, m.height))
            sized = cv2.cvtColor(sized, cv2.COLOR_BGR2RGB)

            # detecting bounding boxes for objects
            boxes = do_detect(m, sized, 0.4, 0.6, False)[0]
            # [[x1, y1, x2, y2, confidence, confidence, class (2 is car)], ...]

            empty = [True] * num_parking_spots
            for i in range(num_parking_spots):
                for j in range(len(boxes)):
                    # is car
                    if int(boxes[j][6]) == 2:
                        ax = boxes[j][0] * width
                        ay = boxes[j][1] * height
                        bx = boxes[j][2] * width
                        by = boxes[j][3] * height
                        mid = Point((ax + bx) / 2, by * 0.95)
                        empty[i] &= not parking_spots[i].contains(mid)

            # update the timestamp array accordingly
            for i in range(len(empty)):
                if empty[i]:
                    timestamps[i] = -1
                else:
                    timestamps[i] += 1

            print(f"{filename}: {timestamps}")
            t2 = time.time()
            print(t2 - t1)
            sio.emit('frame', timestamps)


@sio.event
def disconnect(sid):
    print('disconnect ', sid)


if __name__ == '__main__':
    eventlet.wsgi.server(eventlet.listen(('', 5000)), app)
