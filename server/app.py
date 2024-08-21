from flask import Flask, request, make_response, jsonify
from flask_cors import CORS
from flask_migrate import Migrate
from flask_restful import Api, Resource
from datetime import datetime
from models import db, Owner, Pet, Worker, Groomer, GroomerPet, WorkerPet

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.json.compact = False

CORS(app)
migrate = Migrate(app, db)

db.init_app(app)

api = Api(app)

@app.route('/owners', methods=['GET', 'POST'])
def owners():
    if request.method == 'GET':
        owners = Owner.query.all()
        return make_response(
            jsonify([owner.to_dict() for owner in owners]),
            200,
        )
    elif request.method == 'POST':
        data = request.get_json()
        new_owner = Owner(
            username=data.get('username'),
            password=data.get('password'),
        )
        db.session.add(new_owner)
        db.session.commit()
        return make_response(new_owner.to_dict(), 201)

@app.route('/owners/<int:id>', methods=['GET', 'PATCH', 'DELETE'])
def owner_by_id(id):
    owner = Owner.query.filter(Owner.id == id).first()

    if owner is None:
        response_body = {"message": "Owner not found in our database, please try again"}
        return make_response(response_body, 404)

    if request.method == 'GET':
        return make_response(owner.to_dict(), 200)
    
    elif request.method == 'PATCH':
        data = request.get_json()
        for attr, value in data.items():
            setattr(owner, attr, value)
        db.session.add(owner)
        db.session.commit()
        return make_response(owner.to_dict(), 200)
    
    elif request.method == 'DELETE':
        db.session.delete(owner)
        db.session.commit()
        response_body = {
            "delete_successful": True,
            "message": "Owner deleted."
        }
        return make_response(response_body, 200)

@app.route('/pets', methods=['GET', 'POST'])
def pets():
    if request.method == 'GET':
        pets = Pet.query.all()
        return make_response(
            jsonify([pet.to_dict() for pet in pets]), 200
        )
    
    elif request.method == 'POST': #when adding a pet if there is no owner it breaks, make sure to add a default for the owner being none (need to add owner_id)
        data = request.get_json()
        new_pet = Pet(
            name=data.get('name'),
            breed=data.get('breed'),
            age=data.get('age'),
            owner_id=data.get('owner_id')
        )
        db.session.add(new_pet)
        db.session.commit()
        return make_response(new_pet.to_dict(), 201)

@app.route('/pets/<int:id>', methods=['GET', 'PATCH', 'DELETE'])
def pet_by_id(id):
    pet = Pet.query.filter(Pet.id == id).first()

    if pet is None:
        response_body = {"message": "Pet not found in our database, please try again"}
        return make_response(response_body, 404)

    if request.method == 'GET':
        return make_response(pet.to_dict(), 200)
    
    elif request.method == 'PATCH':
        data = request.get_json()
        for attr, value in data.items():
            setattr(pet, attr, value)
        db.session.add(pet)
        db.session.commit()
        return make_response(pet.to_dict(), 200)
    
    elif request.method == 'DELETE':
        db.session.delete(pet)
        db.session.commit()
        response_body = {
            "delete_successful": True,
            "message": "Pet deleted."
        }
        return make_response(response_body, 200)

@app.route('/workers', methods=['GET', 'POST'])
def workers():
    if request.method == 'GET':
        workers = Worker.query.all()
        return make_response(
            jsonify([worker.to_dict() for worker in workers]), 200
        )
    
    elif request.method == 'POST':
        data = request.get_json()
        new_worker = Worker(
            username=data.get('username'),
            password=data.get('password'),
            pet_walker=data.get('pet_walker'),
            pet_sitter=data.get('pet_sitter'),
        )
        db.session.add(new_worker)
        db.session.commit()
        return make_response(new_worker.to_dict(), 201)

@app.route('/workers/<int:id>', methods=['GET', 'PATCH', 'DELETE'])
def worker_by_id(id):
    worker = Worker.query.filter(Worker.id == id).first()

    if worker is None:
        response_body = {"message": "Worker not found in our database, please try again"}
        return make_response(response_body, 404)

    if request.method == 'GET':
        return make_response(worker.to_dict(), 200)
    
    elif request.method == 'PATCH':
        data = request.get_json()
        for attr, value in data.items():
            setattr(worker, attr, value)
        db.session.add(worker)
        db.session.commit()
        return make_response(worker.to_dict(), 200)
    
    elif request.method == 'DELETE':
        db.session.delete(worker)
        db.session.commit()
        response_body = {
            "delete_successful": True,
            "message": "Worker deleted."
        }
        return make_response(response_body, 200)

@app.route('/groomers', methods=['GET', 'POST'])
def groomers():
    if request.method == 'GET':
        groomers = Groomer.query.all()
        return make_response(
            jsonify([groomer.to_dict() for groomer in groomers]), 200
        )
    
    elif request.method == 'POST':
        data = request.get_json()
        new_groomer = Groomer(
            username=data.get('username'),
            password=data.get('password'),
            hours=data.get('hours'),
            address=data.get('address')
        )
        db.session.add(new_groomer)
        db.session.commit()
        return make_response(new_groomer.to_dict(), 201)

@app.route('/groomers/<int:id>', methods=['GET', 'PATCH', 'DELETE'])
def groomer_by_id(id):
    groomer = Groomer.query.filter(Groomer.id == id).first()

    if groomer is None:
        response_body = {"message": "Groomer not found in our database, please try again"}
        return make_response(response_body, 404)

    if request.method == 'GET':
        return make_response(groomer.to_dict(), 200)
    
    elif request.method == 'PATCH':
        data = request.get_json()
        for attr, value in data.items():
            setattr(groomer, attr, value)
        db.session.add(groomer)
        db.session.commit()
        return make_response(groomer.to_dict(), 200)
    
    elif request.method == 'DELETE':
        db.session.delete(groomer)
        db.session.commit()
        response_body = {
            "delete_successful": True,
            "message": "Groomer deleted."
        }
        return make_response(response_body, 200)

@app.route('/groomer_pets', methods=['GET', 'POST'])
def groomer_pets():
    if request.method == 'GET':
        groomer_pets = GroomerPet.query.all()
        return make_response(
            jsonify([gp.to_dict() for gp in groomer_pets]), 200
        )
    
    elif request.method == 'POST': #needs appointment_time and groomer_id or it will crash
        data = request.get_json()
        appointment_time = datetime.fromtimestamp(data.get('appointment_time'))
        new_groomer_pet = GroomerPet(
            appointment_time=appointment_time,
            groomer_id=data.get('groomer_id'),
            pet_id=data.get('pet_id'),
        )
        db.session.add(new_groomer_pet)
        db.session.commit()
        return make_response(new_groomer_pet.to_dict(), 201)

@app.route('/groomer_pets/<int:id>', methods=['GET', 'PATCH', 'DELETE'])
def groomer_pet_by_id(id):
    groomer_pet = GroomerPet.query.filter(GroomerPet.id == id).first()

    if groomer_pet is None:
        response_body = {"message": "GroomerPet not found in our database, please try again"}
        return make_response(response_body, 404)

    if request.method == 'GET':
        return make_response(groomer_pet.to_dict(), 200)
    
    elif request.method == 'PATCH':
        data = request.get_json()
        if 'appointment_time' in data:
            appointment_time = datetime.fromtimestamp(data['appointment_time'])
            groomer_pet.appointment_time = appointment_time
        for attr, value in data.items():
            setattr(groomer_pet, attr, value)
        db.session.add(groomer_pet)
        db.session.commit()
        return make_response(groomer_pet.to_dict(), 200)
    
    elif request.method == 'DELETE':
        db.session.delete(groomer_pet)
        db.session.commit()
        response_body = {
            "delete_successful": True,
            "message": "GroomerPet deleted."
        }
        return make_response(response_body, 200)

@app.route('/worker_pets', methods=['GET', 'POST'])
def worker_pets():
    if request.method == 'GET':
        worker_pets = WorkerPet.query.all()
        return make_response(
            jsonify([wp.to_dict() for wp in worker_pets]), 200
        )
    
    elif request.method == 'POST': #if worker_id, pet_id, or arrival_time is missing POST request will fail
        data = request.get_json()
        arrival_time = datetime.fromtimestamp(data.get('arrival_time'))
        new_worker_pet = WorkerPet(
            arrival_time=arrival_time,
            worker_id=data.get('worker_id'),
            pet_id=data.get('pet_id'),
        )
        db.session.add(new_worker_pet)
        db.session.commit()
        return make_response(new_worker_pet.to_dict(), 201)

@app.route('/worker_pets/<int:id>', methods=['GET', 'PATCH', 'DELETE'])
def worker_pet_by_id(id):
    worker_pet = WorkerPet.query.filter(WorkerPet.id == id).first()

    if worker_pet is None:
        response_body = {"message": "WorkerPet not found in our database, please try again"}
        return make_response(response_body, 404)

    if request.method == 'GET':
        return make_response(worker_pet.to_dict(), 200)
    
    elif request.method == 'PATCH':
        data = request.get_json()
        if 'arrival_time' in data:
            arrival_time = datetime.fromtimestamp(data['arrival_time'])
            worker_pet.arrival_time = arrival_time
        for attr, value in data.items():
            setattr(worker_pet, attr, value)
        db.session.add(worker_pet)
        db.session.commit()
        return make_response(worker_pet.to_dict(), 200)
    
    elif request.method == 'DELETE':
        db.session.delete(worker_pet)
        db.session.commit()
        response_body = {
            "delete_successful": True,
            "message": "WorkerPet deleted."
        }
        return make_response(response_body, 200)

if __name__ == "__main__":
    app.run(port=5555, debug=True)
