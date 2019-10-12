import sqlalchemy
from sqlalchemy import Column, Integer, String, Boolean, Date, Float
from sqlalchemy import Table, PrimaryKeyConstraint
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

# table for lake lavel measurements
class Lake_levels(Base):
    __tablename__ = 'lake_levels'
    id = Column(Integer())
    elevation = Column(Float())
    read_date = Column(Date())
    datum_adj = Column(String())
    __table_args__ = (
        PrimaryKeyConstraint('id', 'read_date'),
        {},
    )

# table for lake names and ids
class Lake_names(Base):
    __tablename__ = 'lake_names'
    id = Column(Integer(), primary_key=True)
    name = Column(String())


