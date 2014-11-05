from flask import Flask 
import eventbrite 
import os

app = Flask(__name__)

@app.route("/")
def index():
    return apicall()

def apicall(maxresults = 10, page = 1):
    if page > 1:
        return
    auth_tokens = {'app_key':  os.environ['app_key'],
                      'user_key': os.environ['user_key']}
    client = eventbrite.EventbriteClient(auth_tokens)

    # response = client.event_get({'id':13167758119})
    # print response

    #response=client.eventsearch({'q':"dance"})
    response = client.event_search({"city":"San Francisco","category":"music", "max": maxresults, "page": page})
    rendered_events = ''
    #print response
    events = response['events']
    for i in range(len(events)):
        if "event" in events[i]:
            event = events[i]["event"]
            
            row = [event['title'],str(event['id'])]
            rendered_events += ",".join(row)

            print "\n"
            # if "tickets" in event:
            #     tickets = event["tickets"]
            #     for j in range(len(tickets)):
                    
            #         print tickets[j]["ticket"]
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

# apicall()

if __name__=="__main__":
    app.run(debug=True)
