from configuration import *
with app.app_context():
    from models import Notes, User
    # query = Notes.query.all()


@app.route('/notes', methods=['GET', 'POST'])
def my_profile():
    if request.method == "GET":
        query = Notes.query.all()
        # content_of_note = query.content
        # json.loads(content_of_note)["blocks"][0]["text"]
        fajnie = [{"id": note.id, "name": note.title,
                   "note": json.loads(note.content)["blocks"][0]["text"]} for note in query]
        return jsonify(tuple(fajnie))
    elif request.method == "POST":
        data = json.loads(request.data.decode())
        print(data["title"], data["content"])
        add_note = Notes(title=data["title"], content=json.dumps(data["content"]))
        db.session.add(add_note)
        db.session.commit()
        return "Succes!"


@app.route("/note", methods=["GEt", "POST"])
def note():
    note_id = int(request.args.get("id"))
    query = Notes.query.filter_by(id=note_id).first()
    json.loads(query.content)["blocks"][0]["text"]
    if (query):
        return jsonify({"id": query.id, "title": query.title, "content": query.content})
    return abort(404)

@app.route("/test", methods=["POST", "GET"])
def test():
    note = json.loads(request.data.decode("utf-8"))
    print(note["content"][0])
