from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import create_engine
from sqlalchemy import ForeignKey
from sqlalchemy import Column, Integer, String, DateTime
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
	title = Column(String(120), nullable = False)
	venue = Column(String(64), nullable = False)
	status = Column(String(20), nullable = True)
	url = Column(String(120))
	description = Column(String(120))

