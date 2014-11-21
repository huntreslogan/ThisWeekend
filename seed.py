import model

def migrate():
	data = model.session.query(model.ArtsEvent).all()
	for event in data:
		newEvent = model.MusicEvent()
		newEvent.title = event.title
		newEvent.venue = event.venue
		newEvent.city = event.city
		newEvent.title = event.title
		newEvent.date = event.date
		newEvent.start_time = event.start_time
		newEvent.end_time = event.end_time
		newEvent.venue = event.venue
		#newEvent.status = event.status
		newEvent.url = event.url
		newEvent.description = event.description
		newEvent.eb_id = event.eb_id
		newEvent.price = event.price
		#newEvent.table_service = event.table_service
		newEvent.image = event.image
		newEvent.event_type = "art"
		model.session.add(newEvent)

	model.session.commit()

if __name__ == "__main__":
	migrate()