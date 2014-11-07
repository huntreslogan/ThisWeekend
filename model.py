from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import create_engine
from sqlalchemy import ForeignKey
from sqlalchemy import Column, Integer, String, Date
from sqlalchemy.orm import sessionmaker, scoped_session
from sqlalchemy.orm import relationship, backref


engine = create_engine("sqlite:///thisweekend.db", echo = False)
session = scoped_session(sessionmaker(bind = engine, autocommit = False, autoflush = False))

Base = declarative_base()
Base.query = session.query_property()


class User(Base):
	__tablename__ = "users"

	id = Column(Integer, primary_key = True)
	email = Column(String(64), nullable = True)
	password = Column(String(64), nullable = True)
	music_event = relationship("MusicEvent", backref = "users")



class MusicEvent(Base):
	__tablename__ = "musicEvents"

	id = Column(Integer,primary_key = True)
	user_id = Column(Integer, ForeignKey("users.id"))
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

class ArtsEvent(Base):
	__tablename__ = "artsEvents"

	id = Column(Integer,primary_key = True)
	user_id = Column(Integer, ForeignKey("users.id"))
	city = Column(String(64))
	title = Column(String(120), nullable = False)
	date = Column(Date)
	start_time = Column(String(15))
	end_time = Column(String(15))
	venue = Column(String(64), nullable = False)
	url = Column(String(120))
	description = Column(String(120))
	eb_id = Column(Integer)
	price = Column(String(15))
	subcategory = Column(String(64))
	image = Column(String(64))