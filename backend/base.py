from configuration import *
with app.app_context():
    from models import Notes, User
    # query = Notes.query.all()


@app.route('/notes', methods=['GET', 'POST'])
def my_profile():
    if request.method == "GET":
        query = Notes.query.all()
        fajnie = [{"id": note.id, "name": note.title,
                   "note": note.content} for note in query]
        return jsonify(tuple(fajnie))
    elif request.method == "POST":
        data = json.loads(request.data.decode())
        print(data["name"], data["note"])
        add_note = Notes(title=data["name"], content=data["note"])
        db.session.add(add_note)
        db.session.commit()
        return "Succes!"


@app.route("/note", methods=["GEt", "POST"])
def note():
    note_id = int(request.args.get("id"))
    query = Notes.query.filter_by(id=note_id).first()
    if (query):
        return jsonify({"id": query.id, "title": query.title, "content": query.content})
    return abort(404)
