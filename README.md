Readme
======

Overview
========

This Weekend is an event search application using data from Eventbrite and AngularJS with a focus on providing both performance and accuracy in returning results. It was inspired by Eventbrite's goal to produce a user friendly, household product for customers searching for events as opposed to organizing them.

Features
========

<h4>Users can: </h4>
<ul>
<li>Log-in/logout and sign-in to their account</li>
<li>Query a list of events with keywords, dates, venues etc.</li>
<li>Order their results by date or alphabet</li>
<li>Select events to see their details</li>
<li>Save events to view later</li>
<li>Share events with other users</li>
</ul>

Event List View
===============

<img src="screenshots/eventlist.jpg" width="100%">

Event Detail View
=================

<img src="screenshots/eventdetail.jpg" width="100%">

Saved Events
============

<img src="screenshots/savedevents.jpg" width="100%>">

Technologies and Stack
======================

<h4>Front-end</h4>

AngularJS framework, CSS, HTML, Twitter Bootstrap

<h4>Back-end</h4>

Python, SQLALchemy, Sqlite, Flask, Eventbrite API

### Installation

Install dependencies using pip:

    $ pip install -r requirements.txt

While you wait, obtain credentials for the Eventbrite API:

    * [App key](http://eventbrite.com/api/key)
    * [User key](http://eventbrite.com/userkeyapi)

### Running server

    $ app_key=<YOUR_EVENTBRITE_APP_KEY> \
      user_key=<YOUR_EVENTBRITE_USER_KEY> \
      python server.py

