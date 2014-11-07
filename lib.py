from flask import Flask, render_template, request, flash, session
import eventbrite
import model
import os
import json
import jinja2

app = Flask(__name__)

@app.route("/events")
def events():
    # return "<html><script> var eventstring = '" + json.dumps(apicall()) + "';alert(eventstring);</script></html>"
    return json.dumps(apicall())

@app.route("/")
def index():

    return render_template("index.html")

def apicall(maxresults = 10, page = 1):
    if page > 1:
        return
    auth_tokens = {'app_key':  os.environ['app_key'],
                      'user_key': os.environ['user_key']}
    client = eventbrite.EventbriteClient(auth_tokens)

    # categories=["music", "visual & performing arts", "food & drink", "fashion & beauty", "film, media & entertainment"]
    # for category in categories:
    response = client.event_search({"city":"San Francisco","category":"music", "max": maxresults, "page": page})
    rendered_events = []
    print response
    events = response['events']

    for i in range(len(events)):
        if "event" in events[i]:
            event = events[i]["event"]

            row = [event['title'], event['id'],event["status"],event["url"], event['venue']['name'], event["description"]]
            rendered_events.append(row)

            print "\n"
            # if "tickets" in event:
            #     tickets = event["tickets"]
            #     for j in range(len(tickets)):

                    # ticket_list = [tickets[j]["ticket"]]
                    # rendered_events.append(ticket_list)
            #     #pass
            # # print events[i]["event"]["title"]
            # print "\n"
        else :
            total_items = events[i]["summary"]["total_items"]
            if (maxresults * page) < total_items:
                next_page = page + 1
                print "NEED TO CALL AGAIN!"
                apicall(page = next_page)
            else:
                print "GOT ALL THE STUFF!"

    return rendered_events





if __name__=="__main__":
    app.run(debug=True)
