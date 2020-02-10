# GoPollv2

Create polls and view voting changes in real-time

# What so special about GoPollv2?

Since polls are meant to be short lived, I've decided to store the data in Redis which allows for much faster data fetching. Redis also has a pubsub mode, which allows me to scale horizontally.
Aside from that, it entirely uses Websockets to communicate with the server there are no http requests to be found here.

### Technologies used

- React
- NodeJS
- Redis

### Dear diary

SocketIO uses /socket.io as the default path
How to get real ip using socketio - https://www.cnblogs.com/time-is-life/p/9598453.html

How to horizontally scale - https://www.reddit.com/r/node/comments/8vbwbk/best_way_to_scale_for_websocket_support/e1mhddk/?context=3

Serve spa if 404
`try_files $uri $uri/ /index.html?q=$uri&$args`
