import sqlite3
conn = sqlite3.connect('watersheds.db')
# Enable SpatialLite extension
conn.enable_load_extension(True)
conn.load_extension('/home/alvern/anaconda3/lib/mod_spatialite.so')
# Create the masic countries table
conn.execute('select InitSpatialMetadata(1)')
# conn.execute('create table places (id integer primary key, name text);')
# Add a MULTIPOLYGON Geometry column
#conn.execute("SELECT AddGeometryColumn('places', 'geom', 4326, 'MULTIPOLYGON', 2);")
# Add a spatial index against the new column
#conn.execute("SELECT CreateSpatialIndex('places', 'geom');")
# Now populate the table
from shapely.geometry.multipolygon import MultiPolygon
from shapely.geometry import shape
import requests
geojson = requests.get('./Subwatersheds.geojson').json()
# Convert to "Well Known Text" format
wkt = shape(geojson['geometry']).wkt
# Insert and commit the record
conn.execute("INSERT INTO places (id, name, geom) VALUES(null, ?, GeomFromText(?, 4326))", (
   "Wales", wkt
))
conn.commit()