from flask import Flask, request, jsonify
import pymysql
from flask_cors import CORS

# Configure Flask app
app = Flask(__name__)
CORS(app)

# Configure MySQL connection
DB_HOST = 'database-3.ch4kw4k6ursu.us-east-1.rds.amazonaws.com'
DB_USER = 'admin'
DB_PASSWORD = '12345678'
DB_NAME = 'cc'

# Function to create a connection to MySQL


def get_db_connection():
    return pymysql.connect(host=DB_HOST, user=DB_USER, password=DB_PASSWORD, database=DB_NAME)

# Route to create a textFile entity in the database


@app.route('/textFile', methods=['POST'])
def create_textFile():
    data = request.json
    print(data)
    if 'file_name' not in data or 'language' not in data:
        return jsonify({'error': 'Missing fields'}), 400

    try:
        conn = get_db_connection()
        cursor = conn.cursor()

        community_id = data.get('community_id')
        if community_id == '':
            community_id = None
        cursor.execute('INSERT INTO TextFiles (language, name, communityid) VALUES (%s, %s, %s)',
                       (data['language'], data['file_name'], community_id))
        conn.commit()

        cursor.close()
        conn.close()

        return jsonify({'success': True}), 200
    except Exception as e:
        print(e)
        return jsonify({'error': str(e)}), 500

# Route to retrieve a textFile entity from the database by ID


@app.route('/textFile/<int:id>', methods=['GET'])
def get_textFile(id):
    try:
        conn = get_db_connection()
        cursor = conn.cursor()

        cursor.execute(
            'SELECT id, name, language, communityid FROM TextFile WHERE id = %s', (id,))
        textFile = cursor.fetchone()

        cursor.close()
        conn.close()

        if textFile:
            return jsonify({'id': textFile[0], 'file_name': textFile[1], 'language': textFile[2], 'community_id': textFile[3]}), 200
        else:
            return jsonify({'error': 'textFile not found'}), 404
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@app.route('/textFile', methods=['GET'])
def get_textFiles():
    try:
        conn = get_db_connection()
        cursor = conn.cursor()

        cursor.execute(
            'SELECT id, name, language, communityid FROM TextFiles')
        textFiles = cursor.fetchall()

        cursor.close()
        conn.close()

        if textFiles:
            textFile_list = []
            for textFile in textFiles:
                textFile_list.append({
                    'id': textFile[0],
                    'name': textFile[1],
                    'language': textFile[2],
                    'community_id': textFile[3]
                })
            return jsonify(textFile_list), 200
        else:
            return jsonify({'error': 'textFile not found'}), 404
    except Exception as e:
        return jsonify({'error': str(e)}), 500


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)  # Run the Flask app
