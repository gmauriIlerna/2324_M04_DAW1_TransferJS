import os
import json
from flask import Flask, request, jsonify, abort
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/', methods=['GET', 'POST'])
def index():
    if request.method == 'GET':
        filename = request.headers.get('File-Name')
        if not filename:
            return jsonify({'error': 'File-Name header is missing'}), 400
        # Construct file path
        file_path = os.path.join(app.root_path, 'uploads', filename + ".json")
        # Check if the file exists
        if not os.path.exists(file_path):
            return jsonify({'error': 'File not found'}), 404
        # Read data from file
        with open(file_path, 'r') as file:
            data = json.load(file)
        return jsonify(data), 200

    elif request.method == 'POST':
        # Get the headers data from the POST request
        headers = request.headers
        # Check if the request data is in JSON format
        if request.is_json:
            if 'File-Name' in request.headers:
                # If Content-Type header is present
                #Get group name
                file_name = headers.get('File-Name')
                # Parse JSON data
                data = request.json
                #Save data to a file
                file_path = os.path.join(app.root_path, 'uploads', f"{file_name}" + ".json")
                with open(file_path, 'w') as file:
                    file.write(json.dumps(data))
                message = f"POST request received. Data: {data}"
                return jsonify({'message': 'File-Name header is present'}), 200
            else:
                # If Content-Type header is not present, return an error
                return jsonify({'error': 'File-Name header is missing'}), 400
        else:
            # If not JSON
            return jsonify({'error': 'ERROR NOT A JSON'}), 400



if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
