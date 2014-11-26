from flask import Flask, render_template, request, flash, session, jsonify
# from flask.ext.cors import CORS
# import eventbrite
import model
# import os
import json

from sqlalchemy.orm import class_mapper

app = Flask(__name__)
app.secret_key = "djakljdfgahgfoahufha"

# cors = CORS(app)

# @app.route("/events")
# def events():
    # return "<html><script> var eventstring = '" + json.dumps(apicall()) + "';alert(eventstring);</script></html>"
    # return json.dumps(apicall())

# @app.route("/")
# def index():

#   return render_template("index.html")

# def apicall(maxresults = 10, page = 1):
#     if page > 1:
#         return
#     auth_tokens = {'app_key':  os.environ['app_key'],
#                       'user_key': os.environ['user_key']}
#     client = eventbrite.EventbriteClient(auth_tokens)

#     # categories=["music", "visual & performing arts", "food & drink", "fashion & beauty", "film, media & entertainment"]
#     # for category in categories:
#     response = client.event_search({"city":"San Francisco","category":"music", "max": maxresults, "page": page})
#     rendered_events = []
#     # print response
#     events = response['events']

#     for i in range(len(events)):
#         if "event" in events[i]:
#             event = events[i]["event"]

#             row = [event['title'], event['id'],event["status"],event["url"], event['venue']['name'], event["description"]]
#             rendered_events.append(row)

#             print "\n"
#             # if "tickets" in event:
#             #     tickets = event["tickets"]
#             #     for j in range(len(tickets)):

#                     # ticket_list = [tickets[j]["ticket"]]
#                     # rendered_events.append(ticket_list)
#             #     #pass
#             # # print events[i]["event"]["title"]
#             # print "\n"
#         else :
#             total_items = events[i]["summary"]["total_items"]
#             if (maxresults * page) < total_items:
#                 next_page = page + 1
#                 print "NEED TO CALL AGAIN!"
#                 apicall(page = next_page)
#             else:
#                 print "GOT ALL THE STUFF!"

#     return rendered_events


def handler(o):

  if hasattr(o, 'isoformat') and callable(o.isoformat):
        return o.isoformat()
  raise TypeError("Can't serialize %r" % (o,))


def serialize(model):
  """Transforms a model into a dictionary which can be dumped to JSON."""
  # first we get the names of all the columns on your model
  columns = [c.key for c in class_mapper(model.__class__).columns]
  # then we return their values in a dict
  return dict((c, getattr(model, c)) for c in columns)

# we can then use this for your particular example

@app.route("/api/events")
def json_my_data():
    serialized_events = [
      serialize(event)
      for event in model.session.query(model.Event).all()
    ]
    events = json.dumps(serialized_events, default=handler)
    return events

@app.route("/api/eventdetail/<int:id>")
def gimme_some_deets(id):
    serialize_event = serialize(model.session.query(model.Event).filter_by(id = id).one())
    event = json.dumps(serialize_event, default=handler)
    print event
    return event


@app.route('/')
def index():

  return render_template('index.html')


@app.route('/submituser', methods=['POST'])
def signup():
    userData = request.data
    pythonData= json.loads(userData)
    print pythonData
    newUser = model.User()
    username = pythonData['username']
    print username
    email = pythonData['email']
    password = pythonData['password']
    newUser.username = username
    newUser.email = email
    newUser.password = password
    session['username'] = newUser.username
    session['email'] = newUser.email
    session['password'] = newUser.password
    print session
    model.session.add(newUser)
    model.session.commit()

    return "Yay!"

@app.route("/login", methods=["POST"])
def login():
    userData = request.data
    print "userData", userData
    pythonData = json.loads(userData)
    print "pythonData", pythonData
    username = pythonData['username']
    password = pythonData['password']
    thisUser = model.session.query(model.User).filter_by(username = username).first()
    print "thisUser", thisUser
    if thisUser.password != password:
      return "Please enter correct password"
    else:
      session['username'] = thisUser.username
      session['id'] = thisUser.id
      print session
      return "Thank you for logging in!"

    if thisUser:
      return "worked" # not a list. Just the user object.
    else:
      return "failed"

@app.route("/savedevent", methods=["POST"])
def savedEvent():
    Data = request.data
    username = session.get('username')
    pythonData = json.loads(Data)
    thisUser = model.session.query(model.User).filter_by(username = username).first()
    event_id = pythonData['id']
    print (thisUser.username, event_id)
    user = model.session.query(model.User).filter_by(username = username).one()
    event = model.session.query(model.Event).filter_by(id = event_id).one()
    user.events.append(event)
    model.session.commit()

    return "Woot!"

@app.route("/modalevents")
def modalEvents():
  username = session.get('username')
  print username
  thisUser = model.session.query(model.User).filter_by(username = username).first()
  savedevents = thisUser.events
  newSaved = []
  for event in savedevents:
    newEvent = serialize(event)
    newSaved.append(newEvent)

  return json.dumps(newSaved, default = handler)
  # return Response(json.dumps(newSaved, default = handler), content_type="application/json")




@app.route('/test')
def test():
  return "Hi this is the session: " + str(session)
  # user = model.session.query(model.User).filter_by(username=username).first()
  # print user.events

if __name__=="__main__":
    # json_my_data()
    # gimme_some_deets(2)
    # test()
    app.run(debug=True)
