# GoPollv2

Create polls and view voting changes in real-time

## What so special about GoPollv2?

    Since polls are meant to be short lived, I've decided to store the data in Redis which allows for much faster data fetching. Redis also has a pubsub mode, which allows me to scale horizontally.
    Aside from that, it entirely uses Websockets to communicate with the server there are no http requests to be found here.

### Technologies used

- React
- NodeJS
- Redis
