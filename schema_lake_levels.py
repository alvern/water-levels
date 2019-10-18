import sqlalchemy
from sqlalchemy import Column, Integer, String, Boolean, Date, Float, Time
from sqlalchemy import Table, PrimaryKeyConstraint
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

#---------------------------------------------------
# tables for lakes
#---------------------------------------------------

# table for lake level measurements
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
    lat = Column(Float())
    lng = Column(Float())

#===================================================


# #---------------------------------------------------
# # tables for weather data
# #---------------------------------------------------

# # table for hitsoric precipitation data from msp airport
# class Precip_msp(Base):
#     __tablename__ = 'precip_msp'
#     date = Column(Date(), primary_key=True)
#     precip = Column(Float())

# #===================================================


# #--------------------------------------------------
# # tables for creek data
# #--------------------------------------------------

# # creek: cgl01
# class Creek_cgl01(Base):
#     __tablename__ = 'creek_cgl01'
#     date = Column(Date())
#     time = Column(Time())
#     elevation = Column(Float())
#     __table_args__ = (
#         PrimaryKeyConstraint('date', 'time'),
#         {},
#     )

# # creek: clo01
# class Creek_clo01(Base):
#     __tablename__ = 'creek_clo01'
#     date = Column(Date())
#     time = Column(Time())
#     elevation = Column(Float())
#     __table_args__ = (
#         PrimaryKeyConstraint('date', 'time'),
#         {},
#     )

# # creek: clo08
# class Creek_clo08(Base):
#     __tablename__ = 'creek_clo08'
#     date = Column(Date())
#     time = Column(Time())
#     elevation = Column(Float())
#     __table_args__ = (
#         PrimaryKeyConstraint('date', 'time'),
#         {},
#     )

# # creek: clo09
# class Creek_cgl09(Base):
#     __tablename__ = 'creek_cgl09'
#     date = Column(Date())
#     time = Column(Time())
#     elevation = Column(Float())
#     __table_args__ = (
#         PrimaryKeyConstraint('date', 'time'),
#         {},
#     )

# # creek: cmh01
# class Creek_cmh01(Base):
#     __tablename__ = 'creek_cmh01'
#     date = Column(Date())
#     time = Column(Time())
#     elevation = Column(Float())
#     __table_args__ = (
#         PrimaryKeyConstraint('date', 'time'),
#         {},
#     )

# # creek: cpa01
# class Creek_cpa01(Base):
#     __tablename__ = 'creek_cpa01'
#     date = Column(Date())
#     time = Column(Time())
#     elevation = Column(Float())
#     __table_args__ = (
#         PrimaryKeyConstraint('date', 'time'),
#         {},
#     )

# #==================================================