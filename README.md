# Express.js Tweets API

This is a simple Express.js API that fetches tweet data from an external JSON file and provides endpoints to retrieve tweets, extract external links, and get user profile details.

## Features

- Fetch all tweets (creation time, ID, and text)
- Retrieve external links grouped by tweet IDs
- Get tweet details by tweet ID
- Get user profile details by screen name

## Prerequisites

Make sure you have the following installed:

- Node.js (version 14 or higher)
- npm (comes with Node.js)

## Installation

### Clone the repository:

```sh
git clone https://github.com/osama-313/Express.js-Tweets-API.git
```
### Install dependencies:
```sh
npm install
```
## Running the Server
### To start the Express.js server, run:

```sh
node server.mjs
```

### The server will run at:
```sh
http://localhost:3000
```

## API Endpoints

### 1. Get All Tweets

**Endpoint:** GET `/tweets`

**Response:**
```json
[
    {
        "created_at": "Wed Mar 13 23:01:36 +0000 2013",
        "id": "311975360667459585",
        "text": "Was wondering why @billgates cc'd me on story abt @MSFTResearch cool viral search tool; discovered I'm featured in it http://t.co/g6oSeEIEUr"
    },
    {
        "created_at": "Wed Mar 13 22:16:59 +0000 2013",
        "id": "311964132205268992",
        "text": "The one page everyone in Hollywood is watching http://t.co/jaX0uQqk4W  This is the film industry's Pebble Watch moment."
    },
    {
        "created_at": "Wed Mar 13 13:16:30 +0000 2013",
        "id": "311828115477372928",
        "text": "I reflected on why the #sxsw induction means so much to me and it took >140 chars: http://t.co/rJWz0jKrqf"
    },
    {
        "created_at": "Tue Mar 12 13:29:12 +0000 2013",
        "id": "311468922962587651",
        "text": "How to Create an Early Stage Pitch Deck\nhttp://t.co/TdYB5I6xBl\n(Great advice from @ryanspoon )"
    },
    {
        "created_at": "Tue Mar 12 11:05:00 +0000 2013",
        "id": "311432631726264320",
        "text": "1st gear Empathy, 2nd gear Prototype, 3rd gear Align w/ Reality http://t.co/QxDfp2GLcQ by @Jabaldaia http://t.co/CLcxKevjrY"
    }
]

```
### 2. Get All External Links Grouped by Tweet IDs

**Endpoint:** GET `/tweets/links`

**Response:**
```json

{
    "311975360667459585": [
        "http://t.co/g6oSeEIEUr"
    ],
    "311964132205268992": [
        "http://t.co/jaX0uQqk4W"
    ],
    "311828115477372928": [
        "http://t.co/rJWz0jKrqf"
    ],
    "311468922962587651": [
        "http://t.co/TdYB5I6xBl"
    ],
    "311432631726264320": [
        "http://t.co/QxDfp2GLcQ",
        "http://t.co/CLcxKevjrY"
    ]
}
```

### 3. Get Tweet Details by ID

**Endpoint:** GET `/tweets/:id`

**Example:** GET `/tweets/311975360667459585`

**Response:**
```json
{
    "created_at": "Wed Mar 13 23:01:36 +0000 2013",
    "text": "Was wondering why @billgates cc'd me on story abt @MSFTResearch cool viral search tool; discovered I'm featured in it http://t.co/g6oSeEIEUr",
    "user_screen_name": "timoreilly"
}
```
### 4. Get User Profile Details by Screen Name

**Endpoint:** GET `/user/:screen_name`

**Example:** GET `/user/timoreilly`

**Response:**
```json
{
    "location": "Sebastopol, CA",
    "description": "Founder and CEO, O'Reilly Media. Watching the alpha geeks, sharing their stories, helping the future unfold.",
    "followers_count": 1679016,
    "friends_count": 1012
}
```
## Notes

- The API fetches data from this JSON file.
- Make sure you have an active internet connection since data is fetched dynamically.
