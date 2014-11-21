import model

def main():
	user = model.session.query(model.User).filter_by(id = 1).one()

	event = model.session.query(model.Event).filter_by(id = 2).one()

	print dir(model.user_events)

	user.events.append(event)

	model.session.commit()

	# assoc = model.user_events
	# assoc.user_id = user.id
	# assoc.event_id = event.id

	# model.session.add(assoc)
	# model.session.commit()

if __name__ == "__main__":
	main()