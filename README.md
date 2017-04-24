# Niskalaukaus BF4 Servers Statistics page and live scoreboard

This project was generated with [angular-cli](https://github.com/angular/angular-cli) version 1.0.0-beta.26.

## Page is meant only for our servers players to easily view stats.

## Features
- Main home page for guide to join our platoon or server.
- Live server details.
- Live scoreboard for players on server.
- Statistic page (Search by soldier name, by date or get all-time stats).
- Admins listing page with a profile pictures and their online status.

## Technical data

- This website uses Angular 2 as framework.
- For backend data is handled with a Node.js, Express.js, MongoDB and Mongoose.
- Statistics are fetched from gameserver api.
- Live scoreboard data is fetched from rconnet api every 8s and then cached
  to MongoDB with a Mongoose Schema. Node.js (Express.js) is then serving data to clients.
