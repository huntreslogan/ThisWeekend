from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import create_engine
from sqlalchemy import ForeignKey
from sqlalchemy import Column, Integer, String, Date, Table
from sqlalchemy.orm import sessionmaker, scoped_session
from sqlalchemy.orm import relationship, backref


engine = create_engine("sqlite:///thisweekend.db", echo = False)
session = scoped_session(sessionmaker(bind = engine, autocommit = False, autoflush = False))

Base = declarative_base()
Base.query = session.query_property()

user_events = Table('user_event_association', Base.metadata,
    Column('user_id', Integer, ForeignKey('users.id')),
    Column('event_id', Integer, ForeignKey('events.id'))
)

class User(Base):
	__tablename__ = "users"

	id = Column(Integer, primary_key = True)
	username = Column(String(64), nullable = True)
	email = Column(String(64), nullable = True)
	password = Column(String(64), nullable = True)

	events = relationship("Event",
                    secondary=user_events,
                    backref=backref("users"))


class Event(Base):
	__tablename__ = "events"

	id = Column(Integer,primary_key = True)
	event_type=Column(String(64), nullable = False)
	city = Column(String(64))
	title = Column(String(120), nullable = False)
	date = Column(Date)
	start_time = Column(String(15))
	end_time = Column(String(15))
	venue = Column(String(64), nullable = False)
	status = Column(String(20), nullable = True)
	url = Column(String(120))
	description = Column(String(120))
	eb_id = Column(Integer)
	price = Column(String(15))
	table_service = Column(String(10))
	image = Column(String(64))

def main(Base):
    """In case we need this for something"""
    Base.metadata.create_all(engine)

if __name__ == "__main__":
    main(Base)
