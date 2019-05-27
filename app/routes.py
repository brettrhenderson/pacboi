from app import app
from flask import render_template

@app.route('/')
@app.route('/index')
@app.route('/home')
def index():
    return render_template('pacman_home.html')

@app.route('/history')
def pacman_history():
    return render_template('pacman_learn.html')

@app.route('/play')
def play_game():
    return render_template('game.html')