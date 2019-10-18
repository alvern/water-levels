# dependencies
import pandas as pd
from flask import Flask, jsonify, render_template

app = Flask(__name__)


# function to convert all lake data (df) for a given lake id into dict format
def lake_to_dict(lake_id, df):

    # grab all measurements for lake
    elevations = list(df.loc[df.id == lake_id].elevation)
    read_dates = list(df.loc[df.id == lake_id].read_date)
    datum_adjs = list(df.loc[df.id == lake_id].datum_adj)
    
    measurements = list(zip(elevations, read_dates, datum_adjs))

    measurement_keys = ['elevation', 'read_date', 'datum_adj']
    
    # make measurements json format
    measurements_json = []
    for i in range(len(measurements)):
        measurement_dict = dict(zip(measurement_keys, measurements[i]))
        measurements_json.append(measurement_dict)

    # create lake_dict using measurements_json
    lake_dict = {
        'name': lake_id_df['name'][lake_id],
        'id': lake_id,
        'location': {
            'lat': lake_id_df['lat'][lake_id],
            'lng': lake_id_df['lng'][lake_id]
        },
        'measurements': {
            'read_date': read_dates,
            'elevation': elevations,
            'datum_adj': datum_adjs
        }
    }
    
    return lake_dict

# ======================================================================================
# data setup:

# read in creek info
creek_sites_df = pd.read_csv("data/geospatial/site_locations_edited.csv")

# read lake info and lake level measurements from csv's
lake_id_df = pd.read_csv("resources/lake_info_transformed.csv", index_col='id')
lake_levels_df = pd.read_csv("resources/scraped_lake_measurements.csv")

creek_levels_df = pd.read_csv("resources/all_creek_levels.csv")

# format all lake data as JSON
# ----------------------------

# list of included lake_ids to iterate through
lake_id_list = list(lake_id_df.index)

# set id as its own column (in addition to the index)
lake_id_df['id'] = lake_id_list

# empty list for json format
lakes_json = []

# loop through included lake_ids
for lake_id in lake_id_list:
    lake_dict = lake_to_dict(lake_id, lake_levels_df)
    lakes_json.append(lake_dict)

# create list of lake names
lake_list = list(lake_id_df['name'])

# create dict storing each item in lakes_json as value, keyed by lake name
lake_dict = {}

for i in range(len(lake_list)):
    lake_dict[lake_list[i]] = lakes_json[i]
# ------------------------------------------------------------------------

lake_id_df.reset_index(drop=True, inplace=True)

# ---------------------------------------------------------------------------------
# FLASK ROUTES
# ---------------------------------------------------------------------------------

@app.route("/")
def index():
    """Return the homepage."""
    return render_template("index.html")

@app.route("/map")
def map():
    """Renders template for map"""
    return render_template("index.html")

@app.route("/api/chart_builder/<lake_id>")
def chart_builder(lake_id):
    """stores lake_id, redirects to lake_line_chart"""
    return jsonify(lake_dict)


@app.route("/api/lakes/<lake_id>")
def lake_data(lake_id):
    """Returns json of lake data for a specific lake, chosen by id"""
    
    # get df of only data relevant to this lake
    lake_df = lake_levels_df.loc[lake_levels_df['id'] == int(lake_id)]
    
    # format data as dict (keys: columns, values: list of values in column)
    data = {
        'read_dates': list(lake_df.read_date),
        'elevations': list(lake_df.elevation)
    }

    return jsonify(data)


@app.route("/api/creeks/<creek_id>")
def creek_data(creek_id):
    """Returns json of creek data for a specific creek site, chosen by id"""

    # get df of only data relevant to this creek
    temp_df = creek_levels_df[creek_levels_df['id'] == creek_id]

    # group by date, add column for id again
    creek_df = temp_df.groupby('date').mean().reset_index(drop=False)
    creek_df['id'] = creek_id

    # format data as dict (keys: columns, values: list of values in column)
    data = {
        'id': list(creek_df['id']),
        'date': list(creek_df.date),
        'elevation': list(creek_df.elevation)
    }

    return jsonify(data)


@app.route("/api/lake_info")
def lake_info():
    """Returns json of lake info (lat, lng, name, id)"""
    return jsonify(lake_id_df.to_dict(orient='index'))

@app.route("/api/creek_info")
def creek_info():
    """Returns json of creek info (site, name, lat, long)"""
    return jsonify(creek_sites_df.to_dict(orient='index'))

@app.route("/lake_line_chart")
def lake_line_chart():
    """Renders template for lake line chart."""
    return render_template("line_chart.html")


# define main behavior
if __name__ == "__main__":
    app.run(debug=True)