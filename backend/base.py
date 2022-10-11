from ast import Return
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
        print("Dostalem")
        data = json.loads(request.data.decode())
        add_note = Notes(title=data["title"],
                         content=json.dumps(data["content"]))
        db.session.add(add_note)
        db.session.flush()
        db.session.refresh(add_note)
        # print(add_note.id)
        db.session.commit()
        return str(add_note.id)


@app.route("/note", methods=["GET", "PATCH", "DELETE"])
def note():
    note_id = int(request.args.get("id"))
    query = Notes.query.filter_by(id=note_id).first()
    if (query == None):
        return abort(404)
    elif request.method == "PATCH":
        query.content = json.dumps(json.loads(
            request.data.decode("utf-8"))["content"])
        db.session.commit()
        # print(json.dumps(json.loads(request.data.decode("utf-8"))["content"]))
        return "Success!"
    elif request.method == "GET":
        json.loads(query.content)["blocks"][0]["text"]
        if (query):
            return jsonify({"id": query.id, "title": query.title, "content": query.content})
        return abort(404)
    elif request.method == "DELETE":
        return "goofy"


@app.route("/test", methods=["POST", "GET"])
def test():
    note = json.loads(request.data.decode("utf-8"))
    print(note["content"][0])
