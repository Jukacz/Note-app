from configuration import *


@app.route('/tak', methods=['GET', 'POST'])
def my_profile():
    response_body = {
        "name": "Starter",
        "about": "this is react starter witch backend (flask)!"
    }
    return response_body
