#main.py
# Import the Flask module that has been installed.
from flask import Flask
from flask import send_file

# Creating a new "app" by using the Flask constructor. Passes __name__ as a parameter.
app = Flask(__name__)

# Annotation that allows the function to be hit at the specific URL.
@app.route("/")
# Generic Python functino that returns "Hello world!"
def index():
    return "Hello world!"

# Annotation that allows the function to be hit at the specific URL (/books).
@app.route("/books")
# Generic Python functino that returns books.json
def books():
    return send_file('books.json')
    
# Checks to see if the name of the package is the run as the main package.
if __name__ == "__main__":
    # Runs the Flask application only if the main.py file is being run.
    app.run()