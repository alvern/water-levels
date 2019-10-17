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
        'measurements': measurements_json
    }
    
    return lake_dict

# ======================================================================================
# data setup:

# read lake info and lake level measurements from csv's
lake_id_df = pd.read_csv("resources/lake_info_transformed.csv", index_col='id')
lake_levels_df = pd.read_csv("resources/scraped_lake_measurements.csv")


# format all lake data as JSON
# ----------------------------

# list of included lake_ids to iterate through
lake_id_list = lake_levels_df.groupby('id').all().index

# empty list for json format
lakes_json = []

# loop through included lake_ids
for lake_id in lake_id_list:
    lake_dict = lake_to_dict(lake_id, lake_levels_df)
    lakes_json.append(lake_dict)

# create list of lake names
lake_list = []

for id in lake_id_list:
    lake_list.append(lake_id_df['name'][id])
# --------------------------

# create dict storing each item in lakes_json as value, keyed by lake name
lake_dict = {}

for i in range(len(lake_list)):
    lake_dict[lake_list[i]] = lakes_json[i]
# ------------------------------------------------------------------------




# ---------------------------------------------------------------------------------
# FLASK ROUTES
# ---------------------------------------------------------------------------------

@app.route("/")
def index():
    """Return the homepage."""
    return render_template("jack_d3.html")


@app.route("/api/lakes")
def all_lake_data():
    """Return lakes_json"""
    return jsonify(lakes_json)

# route returns api with json of all data for a specific lake
@app.route("/api/lakes/<lake>")
def lake_data(lake):
    """Returns json of lake data for a specific lake, identified by name (case sensitive)"""
    return jsonify(lake_dict[lake])




# define main behavior
if __name__ == "__main__":
    app.run(debug=True)